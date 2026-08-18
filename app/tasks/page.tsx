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

type Task = {
  id: string;
  title: string;
  description: string;
  project: string;
  status: string;
  priority: string;
  assignedTo: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");

  async function loadTasks() {
    try {
      const snapshot = await getDocs(
        collection(db, "tasks")
      );

      const data: Task[] = snapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<Task, "id">),
      }));

      setTasks(data);
    } catch (error) {
      console.error("Tasks load error:", error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function createTask() {
    if (!title.trim()) {
      alert("Task title required hai.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        description: description.trim(),
        project: project.trim(),
        status,
        priority,
        assignedTo: assignedTo.trim(),
        createdAt: new Date(),
      });

      alert("Task successfully create ho gaya!");

      setTitle("");
      setDescription("");
      setProject("");
      setStatus("Pending");
      setPriority("Medium");
      setAssignedTo("");
      setShowForm(false);

      await loadTasks();
    } catch (error) {
      console.error("Task save error:", error);
      alert("Task save nahi hua.");
    }
  }

  async function deleteTask(id: string) {
    const confirmed = confirm(
      "Kya aap is task ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(
        doc(db, "tasks", id)
      );

      await loadTasks();
    } catch (error) {
      console.error("Task delete error:", error);
      alert("Task delete nahi hua.");
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
              Tasks
            </h1>

            <p className="mt-2 text-gray-500">
              Track work, deadlines, priorities and responsibilities.
            </p>

          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200"
          >
            + New Task
          </button>

        </div>

        {/* Create Task Form */}
        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold">
              Create Task
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new task to your workspace.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Task Title
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="e.g. Design homepage"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>

              {/* Project */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Project
                </label>

                <input
                  value={project}
                  onChange={(e) =>
                    setProject(e.target.value)
                  }
                  placeholder="e.g. NEXORA Website"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />
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
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Review">
                    Review
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

              {/* Assigned To */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Assigned To
                </label>

                <input
                  value={assignedTo}
                  onChange={(e) =>
                    setAssignedTo(e.target.value)
                  }
                  placeholder="Team member name"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />
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
                  placeholder="Task ke baare mein likhein..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
                />

              </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

              <button
                onClick={createTask}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
              >
                Save Task
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

        {/* Task List */}
        <div className="mt-8">

          {tasks.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl">
                ✓
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                No tasks yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Create your first task to start tracking work.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
              >
                Create First Task
              </button>

            </div>

          ) : (

            <div className="space-y-4">

              {tasks.map((task) => (

                <div
                  key={task.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >

                  <div className="flex flex-col justify-between gap-5 md:flex-row">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="font-semibold">
                          {task.title}
                        </h2>

                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                          {task.status}
                        </span>

                        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                          {task.priority}
                        </span>

                      </div>

                      <p className="mt-3 text-sm text-gray-500">
                        {task.description || "No description added."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-5 text-xs text-gray-500">

                        <span>
                          Project:{" "}
                          <span className="text-gray-300">
                            {task.project || "Not assigned"}
                          </span>
                        </span>

                        <span>
                          Assigned:{" "}
                          <span className="text-gray-300">
                            {task.assignedTo || "Not assigned"}
                          </span>
                        </span>

                      </div>

                    </div>

                    <div>

                      <button
                        onClick={() =>
                          deleteTask(task.id)
                        }
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>

                    </div>

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