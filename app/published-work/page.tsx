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

type Work = {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string;
};

export default function PublishedWorkPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Project");
  const [url, setUrl] = useState("");

  async function loadWorks() {
    const snapshot = await getDocs(
      collection(db, "publishedWork")
    );

    const data: Work[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<Work, "id">),
    }));

    setWorks(data);
  }

  useEffect(() => {
    loadWorks();
  }, []);

  async function createWork() {
    if (!title.trim()) {
      alert("Title required hai.");
      return;
    }

    await addDoc(collection(db, "publishedWork"), {
      title: title.trim(),
      description: description.trim(),
      type,
      url: url.trim(),
      createdAt: new Date(),
    });

    setTitle("");
    setDescription("");
    setType("Project");
    setUrl("");
    setShowForm(false);

    await loadWorks();
  }

  async function deleteWork(id: string) {
    if (!confirm("Published work delete karna hai?")) return;

    await deleteDoc(
      doc(db, "publishedWork", id)
    );

    await loadWorks();
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
              Portfolio
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Published Work
            </h1>

            <p className="mt-2 text-gray-500">
              Manage work that is approved for your public website.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black"
          >
            + Publish Work
          </button>

        </div>

        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold">
              Add Published Work
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Work title"
                className="rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-xl border border-white/10 bg-black px-4 py-3"
              >
                <option>Project</option>
                <option>Website</option>
                <option>YouTube</option>
                <option>Achievement</option>
                <option>Other</option>
              </select>

              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Public URL"
                className="rounded-xl border border-white/10 bg-black px-4 py-3 outline-none md:col-span-2"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
                rows={5}
                className="resize-none rounded-xl border border-white/10 bg-black px-4 py-3 outline-none md:col-span-2"
              />

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={createWork}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
              >
                Publish
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

          {works.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

              <div className="text-4xl">
                ★
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                No published work
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Approved projects will appear here.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {works.map((work) => (

                <div
                  key={work.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >

                  <div className="flex justify-between gap-3">

                    <h2 className="font-semibold">
                      {work.title}
                    </h2>

                    <span className="text-xs text-green-400">
                      Published
                    </span>

                  </div>

                  <p className="mt-2 text-xs text-purple-400">
                    {work.type}
                  </p>

                  <p className="mt-4 text-sm text-gray-500">
                    {work.description || "No description added."}
                  </p>

                  <div className="mt-6 flex justify-between">

                    {work.url ? (
                      <a
                        href={work.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-purple-400"
                      >
                        Open Work
                      </a>
                    ) : (
                      <span className="text-xs text-gray-600">
                        No URL
                      </span>
                    )}

                    <button
                      onClick={() => deleteWork(work.id)}
                      className="text-xs text-red-400"
                    >
                      Remove
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