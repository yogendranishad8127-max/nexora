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

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type Department = {
  id: string;
  name: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [department, setDepartment] = useState("");

  async function loadUsers() {
    try {
      const snapshot = await getDocs(
        collection(db, "users")
      );

      const data: User[] = snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<User, "id">),
      }));

      setUsers(data);
    } catch (error) {
      console.error("Users load error:", error);
    }
  }

  async function loadDepartments() {
    try {
      const snapshot = await getDocs(
        collection(db, "departments")
      );

      const data: Department[] = snapshot.docs.map((item) => ({
        id: item.id,
        name: item.data().name,
      }));

      setDepartments(data);
    } catch (error) {
      console.error("Departments load error:", error);
    }
  }

  useEffect(() => {
    loadUsers();
    loadDepartments();
  }, []);

  async function createUser() {
    if (!name.trim() || !email.trim() || !department) {
      alert("Name, Email aur Department required hai.");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        name: name.trim(),
        email: email.trim(),
        role,
        department,
        createdAt: new Date(),
      });

      alert("User successfully save ho gaya!");

      setName("");
      setEmail("");
      setRole("Admin");
      setDepartment("");
      setShowForm(false);

      await loadUsers();
    } catch (error) {
      console.error("User save error:", error);
      alert("User save nahi hua.");
    }
  }

  async function removeUser(id: string) {
    const confirmDelete = confirm(
      "Kya aap is user ko delete karna chahte hain?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", id));

      await loadUsers();
    } catch (error) {
      console.error("User delete error:", error);
      alert("User delete nahi hua.");
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <a
              href="/dashboard"
              className="text-xl font-bold"
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

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Title */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
              Organization
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Users
            </h1>

            <p className="mt-2 text-gray-500">
              Manage NEXORA team members and roles.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200"
          >
            + Create User
          </button>

        </div>

        {/* Create User Form */}
        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold">
              Create User
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a team member to your NEXORA workspace.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. Rahul Kumar"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Email
                </label>

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  type="email"
                  placeholder="rahul@example.com"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Role
                </label>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
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

                  <option value="Owner">
                    Owner
                  </option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Department
                </label>

                <select
                  value={department}
                  onChange={(e) =>
                    setDepartment(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                >
                  <option value="">
                    Select Department
                  </option>

                  {departments.map((item) => (
                    <option
                      key={item.id}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

              <button
                onClick={createUser}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
              >
                Save User
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-white/10 px-6 py-3 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>

            </div>

          </div>
        )}

        {/* Users Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

          <div className="grid grid-cols-4 border-b border-white/10 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-wider text-gray-500">

            <span>Name</span>

            <span>Email</span>

            <span>Role</span>

            <span>Action</span>

          </div>

          {users.length === 0 ? (

            <div className="px-6 py-12 text-center text-gray-500">
              No users created yet.
            </div>

          ) : (

            users.map((user) => (

              <div
                key={user.id}
                className="grid grid-cols-4 items-center border-b border-white/10 px-6 py-5"
              >

                <div>
                  <p className="font-medium">
                    {user.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {user.department}
                  </p>
                </div>

                <span className="text-gray-400">
                  {user.email}
                </span>

                <span className="text-purple-400">
                  {user.role}
                </span>

                <button
                  onClick={() =>
                    removeUser(user.id)
                  }
                  className="text-left text-red-400 hover:text-red-300"
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </main>
  );
}