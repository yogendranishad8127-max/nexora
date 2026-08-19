"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Inactive";
  createdAt?: unknown;
};

const ROLES = ["CEO", "Admin", "Tech", "Audit"];

const ROLE_DEPARTMENTS: Record<string, string> = {
  CEO: "Executive",
  Admin: "Administration",
  Tech: "Technology",
  Audit: "Audit",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const department = ROLE_DEPARTMENTS[role] || "General";

  async function loadUsers() {
    try {
      setLoading(true);

      const snapshot = await getDocs(collection(db, "users"));

      const data: User[] = snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<User, "id">),
      }));

      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function createUser() {
    if (!name.trim()) {
      alert("Please enter the user's name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter the user's email.");
      return;
    }

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      alert("A user with this email already exists.");
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, "users"), {
        name: name.trim(),
        email: email.trim(),
        role,
        department,
        status,
        createdAt: new Date(),
      });

      setName("");
      setEmail("");
      setRole("Admin");
      setStatus("Active");
      setShowForm(false);

      await loadUsers();
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Unable to create the user.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(user: User) {
    try {
      const newStatus =
        user.status === "Active" ? "Inactive" : "Active";

      await updateDoc(doc(db, "users", user.id), {
        status: newStatus,
      });

      await loadUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Unable to update the user.");
    }
  }

  async function deleteUser(user: User) {
    if (user.role === "CEO") {
      alert("The CEO account cannot be deleted.");
      return;
    }

    const confirmed = confirm(
      `Delete ${user.name}'s account record?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, "users", user.id));
      await loadUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Unable to delete the user.");
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* ================= HEADER ================= */}

      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple-400">
              Organization
            </p>

            <h1 className="mt-1 text-xl font-semibold">
              Users
            </h1>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            + Add User
          </button>

        </div>
      </header>

      {/* ================= CONTENT ================= */}

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* PAGE INTRO */}

        <div className="mb-8">

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
            Team Management
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Users
          </h2>

          <p className="mt-2 max-w-2xl text-gray-500">
            Manage team members, roles, departments and account status
            from one place.
          </p>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">
              Total Users
            </p>

            <p className="mt-3 text-3xl font-bold">
              {users.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">
              Active Users
            </p>

            <p className="mt-3 text-3xl font-bold text-emerald-400">
              {users.filter((user) => user.status === "Active").length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">
              Inactive Users
            </p>

            <p className="mt-3 text-3xl font-bold text-yellow-400">
              {users.filter((user) => user.status === "Inactive").length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">
              Administrators
            </p>

            <p className="mt-3 text-3xl font-bold text-purple-400">
              {
                users.filter(
                  (user) =>
                    user.role === "CEO" ||
                    user.role === "Admin"
                ).length
              }
            </p>
          </div>

        </div>

        {/* ================= CREATE USER ================= */}

        {showForm && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <div>
              <h3 className="text-xl font-semibold">
                Add User
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add a team member to your organization.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none transition placeholder:text-gray-700 focus:border-purple-500/50"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none transition placeholder:text-gray-700 focus:border-purple-500/50"
                />
              </div>

              {/* ROLE */}

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Role
                </label>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none"
                >
                  {ROLES.filter((item) => item !== "CEO").map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* DEPARTMENT */}

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Department
                </label>

                <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.05] px-4 py-3 text-sm text-purple-300">
                  {department}
                </div>
              </div>

              {/* STATUS */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm text-gray-300">
                  Account Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as "Active" | "Inactive"
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                onClick={createUser}
                disabled={saving}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create User"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>

            </div>

          </section>
        )}

        {/* ================= USERS ================= */}

        <section className="mt-10">

          <div className="mb-5">

            <h3 className="text-lg font-semibold">
              Team Members
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              All users currently registered in your organization.
            </p>

          </div>

          {loading ? (

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-sm text-gray-500">
                Loading users...
              </p>
            </div>

          ) : users.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-xl">
                ♙
              </div>

              <h4 className="mt-5 font-semibold">
                No users yet
              </h4>

              <p className="mt-2 text-sm text-gray-600">
                Add your first team member to get started.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-gray-200"
              >
                Add First User
              </button>

            </div>

          ) : (

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {users.map((user) => (

                <div
                  key={user.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
                >

                  {/* USER HEADER */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 text-sm font-bold text-purple-300">
                        {user.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">

                        <h4 className="truncate font-semibold">
                          {user.name}
                        </h4>

                        <p className="mt-1 truncate text-xs text-gray-600">
                          {user.email}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {user.status}
                    </span>

                  </div>

                  {/* ROLE */}

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">

                      <p className="text-[10px] uppercase tracking-wider text-gray-600">
                        Role
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-300">
                        {user.role}
                      </p>

                    </div>

                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">

                      <p className="text-[10px] uppercase tracking-wider text-gray-600">
                        Department
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-gray-300">
                        {user.department}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

                    <button
                      onClick={() => toggleStatus(user)}
                      className="text-xs text-gray-500 transition hover:text-white"
                    >
                      {user.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    {user.role !== "CEO" && (
                      <button
                        onClick={() => deleteUser(user)}
                        className="text-xs text-red-400 transition hover:text-red-300"
                      >
                        Delete
                      </button>
                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}