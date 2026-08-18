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

type UpcomingProject = {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: string;
  targetDate: string;
};

export default function UpcomingProjectsPage() {
  const [projects, setProjects] = useState<UpcomingProject[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Business");
  const [priority, setPriority] = useState("Medium");
  const [targetDate, setTargetDate] = useState("");

  async function loadProjects() {
    const snapshot = await getDocs(
      collection(db, "upcomingProjects")
    );

    const data: UpcomingProject[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<UpcomingProject, "id">),
    }));

    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function createProject() {
    if (!name.trim()) {
      alert("Project name required hai.");
      return;
    }

    await addDoc(collection(db, "upcomingProjects"), {
      name: name.trim(),
      description: description.trim(),
      category,
      priority,
      targetDate,
      createdAt: new Date(),
    });

    setName("");
    setDescription("");
    setCategory("Business");
    setPriority("Medium");
    setTargetDate("");
    setShowForm(false);

    await loadProjects();
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete karna hai?")) return;

    await deleteDoc(
      doc(db, "upcomingProjects", id)
    );

    await loadProjects();
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-5">

          <div>
            <a href="/dashboard" className="text-xl font-bold">
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

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
              Planning
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Upcoming Projects
            </h1>

            <p className="mt-2 text-gray-500">
              Ideas and projects you want to build in the future.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black"
          >
            + Add Project
          </button>

        </div>

        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold">
              New Upcoming Project
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className="rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-white/10 bg-black px-4 py-3"
              >
                <option>Business</option>
                <option>Technology</option>
                <option>YouTube</option>
                <option>Website</option>
                <option>Other</option>
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="rounded-xl border border-white/10 bg-black px-4 py-3"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>

              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="rounded-xl border border-white/10 bg-black px-4 py-3"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project description..."
                rows={4}
                className="resize-none rounded-xl border border-white/10 bg-black px-4 py-3 outline-none md:col-span-2"
              />

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={createProject}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
              >
                Save
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

        <div className="mt-8">

          {projects.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

              <div className="text-4xl">
                ◆
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                No upcoming projects
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Your future ideas will appear here.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >

                  <div className="flex justify-between gap-3">

                    <h2 className="font-semibold">
                      {project.name}
                    </h2>

                    <span className="text-xs text-purple-400">
                      {project.priority}
                    </span>

                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    {project.category}
                  </p>

                  <p className="mt-4 text-sm text-gray-500">
                    {project.description || "No description added."}
                  </p>

                  {project.targetDate && (
                    <p className="mt-5 text-xs text-gray-400">
                      Target: {project.targetDate}
                    </p>
                  )}

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="mt-6 text-xs text-red-400"
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </main>
  );
}