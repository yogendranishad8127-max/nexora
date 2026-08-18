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

type Project = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  priority: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Business");
  const [status, setStatus] = useState("Planning");
  const [priority, setPriority] = useState("Medium");

  async function loadProjects() {
    try {
      const snapshot = await getDocs(
        collection(db, "projects")
      );

      const data: Project[] = snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<Project, "id">),
      }));

      setProjects(data);
    } catch (error) {
      console.error("Projects load error:", error);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function createProject() {
    if (!name.trim()) {
      alert("Project name required hai.");
      return;
    }

    try {
      await addDoc(collection(db, "projects"), {
        name: name.trim(),
        description: description.trim(),
        category,
        status,
        priority,
        createdAt: new Date(),
      });

      alert("Project successfully create ho gaya!");

      setName("");
      setDescription("");
      setCategory("Business");
      setStatus("Planning");
      setPriority("Medium");
      setShowForm(false);

      await loadProjects();
    } catch (error) {
      console.error("Project save error:", error);
      alert("Project save nahi hua.");
    }
  }

  async function deleteProject(id: string) {
    const confirmed = confirm(
      "Kya aap is project ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(
        doc(db, "projects", id)
      );

      await loadProjects();
    } catch (error) {
      console.error("Project delete error:", error);
      alert("Project delete nahi hua.");
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
              Workspace
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Projects
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your business ideas, active work and upcoming builds.
            </p>

          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200"
          >
            + New Project
          </button>

        </div>

        {/* Create Project Form */}
        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold">
              Create Project
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new project to your NEXORA workspace.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* Project Name */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Project Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. NEXORA Website"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                >
                  <option value="Business">
                    Business
                  </option>

                  <option value="Technology">
                    Technology
                  </option>

                  <option value="YouTube">
                    YouTube
                  </option>

                  <option value="Website">
                    Website
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                >
                  <option value="Planning">
                    Planning
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="On Hold">
                    On Hold
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                >
                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Critical">
                    Critical
                  </option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">

                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Project ke baare mein likhein..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />

              </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

              <button
                onClick={createProject}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
              >
                Save Project
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

        {/* Projects List */}
        <div className="mt-8">

          {projects.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl">
                +
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                No projects yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Create your first project to start managing your work.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
              >
                Create First Project
              </button>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h2 className="font-semibold">
                        {project.name}
                      </h2>

                      <p className="mt-1 text-xs text-purple-400">
                        {project.category}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        project.status === "Active"
                          ? "bg-green-500/10 text-green-400"
                          : project.status === "Completed"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      {project.status}
                    </span>

                  </div>

                  <p className="mt-5 line-clamp-3 text-sm text-gray-500">
                    {project.description || "No description added."}
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-xs text-gray-500">
                      Priority:{" "}
                      <span className="text-gray-300">
                        {project.priority}
                      </span>
                    </span>

                    <button
                      onClick={() =>
                        deleteProject(project.id)
                      }
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}