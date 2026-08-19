import { NextResponse } from "next/server";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin environment variables are missing.");
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const app = getFirebaseAdmin();

    const auth = getAuth(app);
    const db = getFirestore(app);

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const role = String(body.role ?? "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "Please enter the user's name." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Please enter the user's email." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must contain at least 6 characters." },
        { status: 400 }
      );
    }

    if (!role) {
      return NextResponse.json(
        { error: "Please select a role." },
        { status: 400 }
      );
    }

    const roleSnapshot = await db
      .collection("roles")
      .where("name", "==", role)
      .limit(1)
      .get();

    if (roleSnapshot.empty) {
      return NextResponse.json(
        { error: "The selected role does not exist." },
        { status: 400 }
      );
    }

    const roleData = roleSnapshot.docs[0].data();

    const permissions = Array.isArray(roleData.permissions)
      ? roleData.permissions
      : [];

    const department = String(
      roleData.department ?? "General"
    );

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
      disabled: false,
    });

    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      role,
      department,
      permissions,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await auth.setCustomUserClaims(userRecord.uid, {
      role,
      permissions,
    });

    return NextResponse.json({
      success: true,
      user: {
        uid: userRecord.uid,
        name,
        email,
        role,
        department,
        permissions,
      },
    });
  } catch (error: unknown) {
    console.error("Create user error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create the user.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}