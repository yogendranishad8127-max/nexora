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

type Department = {
  id: string;
  name: string;
  description: string;
  status: string;
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function loadDepartments() {
    try {
      const snapshot = await getDocs(
        collection(db, "departments")
      );

      const data: Department[] = snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<Department, "id">),
      }));

      setDepartments(data);
    } catch (error) {
      console.error("Department load error:", error);
    }
  }

  useEffect(() => {
    loadDepartments();
  }, []);

  async function createDepartment() {
    if (!name.trim()) {
      alert("Department name required hai.");
      return;
    }

    try {
      await addDoc(collection(db, "departments"), {
        name: name.trim(),
        description: description.trim(),
        status: "Active",
        createdAt: new Date(),
      });

      alert("Department successfully create ho gaya!");

      setName("");
      setDescription("");
      setShowForm(false);

      await loadDepartments();
    } catch (error) {
      console.error("Department save error:", error);
      alert("Department save nahi hua.");
    }
  }

  async function deleteDepartment(id: string) {
    const confirmed = confirm(
      "Kya aap is department ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(
        doc(db, "departments", id)
      );

      await loadDepartments();
    } catch (error) {
      console.error("Department delete error:", error);
      alert("Department delete nahi hua.");
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

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
              Organization
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Departments
            </h1>

            <p className="mt-2 text-gray-500">
              Create and manage your organization departments.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200"
          >
            + Create Department
          </button>

        </div>

        {/* Create Form */}
        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold">
              Create Department
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Department Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. Technology"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="What does this department do?"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={createDepartment}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
              >
                Save Department
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

        {/* Departments */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

          <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-wider text-gray-500">
            <span>Department</span>
            <span>Description</span>
            <span>Action</span>
          </div>

          {departments.length === 0 ? (

            <div className="px-6 py-12 text-center text-gray-500">
              No departments created yet.
            </div>

          ) : (

            departments.map((department) => (

              <div
                key={department.id}
                className="grid grid-cols-3 items-center border-b border-white/10 px-6 py-5"
              >

                <div>
                  <p className="font-medium">
                    {department.name}
                  </p>

                  <span className="mt-1 inline-block text-xs text-green-400">
                    ● {department.status}
                  </span>
                </div>

                <p className="text-sm text-gray-400">
                  {department.description || "—"}
                </p>

                <button
                  onClick={() =>
                    deleteDepartment(department.id)
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