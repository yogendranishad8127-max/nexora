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

type Video = {
  id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  youtubeUrl: string;
};

export default function YouTubePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Idea");
  const [category, setCategory] = useState("Technology");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  async function loadVideos() {
    const snapshot = await getDocs(collection(db, "youtube"));

    const data: Video[] = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<Video, "id">),
    }));

    setVideos(data);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function createVideo() {
    if (!title.trim()) {
      alert("Video title required hai.");
      return;
    }

    await addDoc(collection(db, "youtube"), {
      title: title.trim(),
      description: description.trim(),
      status,
      category,
      youtubeUrl: youtubeUrl.trim(),
      createdAt: new Date(),
    });

    setTitle("");
    setDescription("");
    setStatus("Idea");
    setCategory("Technology");
    setYoutubeUrl("");
    setShowForm(false);

    await loadVideos();
  }

  async function deleteVideo(id: string) {
    if (!confirm("Kya aap is video ko delete karna chahte hain?")) {
      return;
    }

    await deleteDoc(doc(db, "youtube", id));
    await loadVideos();
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

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
              Content
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              YouTube Work
            </h1>

            <p className="mt-2 text-gray-500">
              Manage video ideas, scripts and published videos.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200"
          >
            + New Video
          </button>

        </div>

        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold">
              Add YouTube Work
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Video Title
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Video title"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3"
                >
                  <option>Technology</option>
                  <option>Business</option>
                  <option>Education</option>
                  <option>Entertainment</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3"
                >
                  <option>Idea</option>
                  <option>Script</option>
                  <option>Recording</option>
                  <option>Editing</option>
                  <option>Ready</option>
                  <option>Published</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  YouTube URL
                </label>

                <input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-300">
                  Description / Notes
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Video ke notes..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
                />
              </div>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={createVideo}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
              >
                Save Video
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

          {videos.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

              <div className="text-4xl">
                ▶
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                No YouTube work yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Add your first video idea.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {videos.map((video) => (

                <div
                  key={video.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >

                  <div className="flex justify-between gap-3">

                    <h2 className="font-semibold">
                      {video.title}
                    </h2>

                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                      {video.status}
                    </span>

                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    {video.category}
                  </p>

                  <p className="mt-4 text-sm text-gray-500">
                    {video.description || "No notes added."}
                  </p>

                  <div className="mt-6 flex justify-between">

                    {video.youtubeUrl ? (
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-purple-400"
                      >
                        Open YouTube
                      </a>
                    ) : (
                      <span className="text-xs text-gray-600">
                        No URL
                      </span>
                    )}

                    <button
                      onClick={() => deleteVideo(video.id)}
                      className="text-xs text-red-400"
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