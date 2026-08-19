import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../service-account/firebase-admin.json";

const adminApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount as Parameters<typeof cert>[0]),
      })
    : getApps()[0];

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);

export default adminApp;