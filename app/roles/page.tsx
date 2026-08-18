"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type Role = {
  id: string;
  name: string;
  department: string;
  description: string;
  level: number;
};

const ROLE_DEPARTMENTS: Record<string, string> = {
  CEO: "Executive",
  Admin: "Administration",
  Tech: "Technology",
  Audit: "Audit",
};

const ROLE_LEVELS: Record<string, number> = {
  CEO: 100,
  Admin: 80,
  Tech: 50,
  Audit: 50,
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("Admin");
  const [description, setDescription] = useState("");

  async function loadRoles() {
    const snapshot = await getDocs(collection(db, "roles"));

    const data: Role[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<Role, "id">),
    }));

    setRoles(data);
  }

  useEffect(() => {
    loadRoles();
  }, []);

  const department = ROLE_DEPARTMENTS[name] || "General";
  const level = ROLE_LEVELS[name] || 10;

  async function createRole() {
    if (!name) {
      alert("Role select karo.");
      return;
    }

    const alreadyExists = roles.some(
      (role) => role.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      alert(`${name} role already exists.`);
      return;
    }

    await addDoc(collection(db, "roles"), {
      name,
      department,
      description: description.trim(),
      level,
      createdAt: new Date(),
    });

    setDescription("");
    setShowForm(false);

    await loadRoles();
  }

  async function deleteRole(role: Role) {
    if (role.name === "CEO") {
      alert("CEO role delete nahi kiya ja sakta.");
      return;
    }

    if (!confirm(`${role.name} role delete karna hai?`)) {
      return;
    }

    await deleteDoc(doc(db, "roles", role.id));

    await loadRoles();
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <a
              href="/dashboard"
              className="text-xl font-bold tracking-tight"
            >
              NEXORA
            </a>

            <p className="text-xs text-gray-500">
              Owner OS
            </p>
          </div>

          <a
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-white"
          >
            ← Dashboard
          </a>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Title */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
              Organization
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Roles & Permissions
            </h1>

            <p className="mt-2 text-gray-500">
              Manage roles and their departments.
            </p>

          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200"
          >
            + Create Role
          </button>

        </div>

        {/* Create Form */}
        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold">
              Create Role
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Department automatically assign hoga.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm text-gray-300">
                  Role
                </label>

                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3"
                >
                  <option value="Admin">
                    Admin
                  </option>

                  <option value="Tech">
                    Tech
                  </option>

                  <option value="Audit">
                    Audit
                  </option>
                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm text-gray-300">
                  Department
                </label>

                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 px-4 py-3 text-purple-300">
                  {department}
                </div>

              </div>

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Role responsibilities..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                />

              </div>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={createRole}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
              >
                Save Role
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-white/10 px-6 py-3 text-gray-400"
              >
                Cancel
              </button>

            </div>

          </div>
        )}

        {/* Default hierarchy */}
        <div className="mt-10">

          <h2 className="text-lg font-semibold">
            NEXORA Role Hierarchy
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* CEO */}
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">
                  CEO
                </h3>

                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                  LEVEL 100
                </span>

              </div>

              <p className="mt-2 text-sm text-purple-300">
                Executive
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Complete access to the entire NEXORA system.
              </p>

            </div>

            {/* Admin */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">
                  Admin
                </h3>

                <span className="text-xs text-gray-500">
                  LEVEL 80
                </span>

              </div>

              <p className="mt-2 text-sm text-gray-400">
                Administration
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Workspace and management operations.
              </p>

            </div>

            {/* Tech */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">
                  Tech
                </h3>

                <span className="text-xs text-gray-500">
                  LEVEL 50
                </span>

              </div>

              <p className="mt-2 text-sm text-gray-400">
                Technology
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Technical projects, development and systems.
              </p>

            </div>

            {/* Audit */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">
                  Audit
                </h3>

                <span className="text-xs text-gray-500">
                  LEVEL 50
                </span>

              </div>

              <p className="mt-2 text-sm text-gray-400">
                Audit
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Review, verification and audit operations.
              </p>

            </div>

          </div>

        </div>

        {/* Custom roles */}
        <div className="mt-10">

          <h2 className="text-lg font-semibold">
            Saved Roles
          </h2>

          <div className="mt-5">

            {roles.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">

                <p className="text-gray-500">
                  No custom roles created yet.
                </p>

                <p className="mt-2 text-xs text-gray-600">
                  Create Admin, Tech or Audit roles above.
                </p>

              </div>

            ) : (

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                {roles.map((role) => (

                  <div
                    key={role.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="font-semibold">
                        {role.name}
                      </h3>

                      <span className="text-xs text-purple-400">
                        {role.department}
                      </span>

                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                      {role.description || "No description added."}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-xs text-gray-600">
                        Access Level: {role.level}
                      </span>

                      {role.name !== "CEO" && (
                        <button
                          onClick={() => deleteRole(role)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}