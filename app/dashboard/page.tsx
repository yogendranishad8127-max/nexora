"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StatCard = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  href: string;
  accent: string;
};

const stats: StatCard[] = [
  {
    title: "Active Projects",
    value: "0",
    subtitle: "No active projects",
    icon: "▣",
    href: "/projects",
    accent: "purple",
  },
  {
    title: "Pending Tasks",
    value: "0",
    subtitle: "Everything is clear",
    icon: "✓",
    href: "/tasks",
    accent: "blue",
  },
  {
    title: "Team Members",
    value: "0",
    subtitle: "No members added",
    icon: "♙",
    href: "/users",
    accent: "cyan",
  },
  {
    title: "Published Work",
    value: "0",
    subtitle: "Nothing published",
    icon: "★",
    href: "/published-work",
    accent: "green",
  },
];

const quickActions = [
  {
    title: "New Project",
    description: "Start a new business project",
    icon: "+",
    href: "/projects",
  },
  {
    title: "Create Task",
    description: "Add work that needs to be done",
    icon: "✓",
    href: "/tasks",
  },
  {
    title: "Manage Team",
    description: "Manage users and access",
    icon: "♙",
    href: "/users",
  },
  {
    title: "YouTube Work",
    description: "Manage your creator ecosystem",
    icon: "▶",
    href: "/youtube",
  },
];

const workspace = [
  {
    title: "Projects",
    description:
      "Manage business projects, development work and long-term ventures.",
    icon: "▣",
    href: "/projects",
  },
  {
    title: "Tasks",
    description:
      "Track deadlines, responsibilities and daily execution.",
    icon: "✓",
    href: "/tasks",
  },
  {
    title: "Departments",
    description:
      "Organize YBN GROUP into departments and business functions.",
    icon: "▦",
    href: "/departments",
  },
  {
    title: "Users",
    description:
      "Manage team members, accounts and workspace access.",
    icon: "♙",
    href: "/users",
  },
  {
    title: "Roles & Permissions",
    description:
      "Control what every user can access inside the workspace.",
    icon: "◇",
    href: "/roles",
  },
  {
    title: "YouTube Work",
    description:
      "Manage channels, content ideas, videos and creator projects.",
    icon: "▶",
    href: "/youtube",
  },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070709] text-white">
      {/* ========================================================= */}
      {/* AMBIENT BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[5%] top-[-180px] h-[520px] w-[520px] rounded-full bg-purple-700/[0.08] blur-[150px]" />

        <div className="absolute right-[-100px] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-700/[0.07] blur-[150px]" />

        <div className="absolute bottom-[-250px] left-[35%] h-[600px] w-[600px] rounded-full bg-fuchsia-700/[0.05] blur-[160px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
      </div>

      {/* ========================================================= */}
      {/* TOP BAR */}
      {/* ========================================================= */}

      <header className="relative z-10 border-b border-white/[0.07] bg-black/20 backdrop-blur-2xl">
        <div className="flex min-h-[76px] items-center justify-between px-6 md:px-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-400">
              YBN GROUP
            </p>

            <h1 className="mt-1 text-lg font-semibold tracking-tight">
              Owner Workspace
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                Yogendra
              </p>

              <p className="text-xs text-gray-500">
                {currentTime || "CEO"}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-400/20 bg-gradient-to-br from-purple-500/30 via-indigo-500/20 to-blue-500/20 text-sm font-bold shadow-lg shadow-purple-900/20">
              Y
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================================= */}

      <div className="relative z-10 px-5 py-7 md:px-10 md:py-10">
        <div className="mx-auto max-w-[1600px]">
          {/* ===================================================== */}
          {/* HERO */}
          {/* ===================================================== */}

          <section className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.065] via-white/[0.025] to-purple-500/[0.035] p-7 shadow-2xl shadow-black/30 md:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[330px] w-[330px] rounded-full bg-purple-600/[0.12] blur-[110px]" />

            <div className="pointer-events-none absolute -bottom-40 right-[25%] h-[300px] w-[300px] rounded-full bg-blue-600/[0.07] blur-[100px]" />

            <div className="relative max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/15 bg-purple-500/[0.06] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300">
                  Owner Control Center
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-bold tracking-[-0.03em] md:text-6xl">
                Good Evening,
                <span className="block bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">
                  Yogendra.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
                Your central command center for managing YBN GROUP,
                projects, content, people and everything you're building.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                >
                  + New Project
                </Link>

                <Link
                  href="/youtube"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-purple-400/30 hover:bg-purple-500/[0.06]"
                >
                  Open YouTube Work
                </Link>
              </div>
            </div>
          </section>

          {/* ===================================================== */}
          {/* OVERVIEW */}
          {/* ===================================================== */}

          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                  Overview
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  Business Snapshot
                </h3>
              </div>

              <span className="hidden text-xs text-gray-600 sm:block">
                Live workspace data
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <Link
                  key={stat.title}
                  href={stat.href}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.045]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {stat.title}
                      </p>

                      <p className="mt-4 text-4xl font-bold tracking-tight">
                        {stat.value}
                      </p>

                      <p className="mt-2 text-xs text-gray-600">
                        {stat.subtitle}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-lg text-gray-300 transition group-hover:border-purple-400/20 group-hover:bg-purple-500/[0.08] group-hover:text-purple-300">
                      {stat.icon}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-xs font-medium text-gray-600 transition group-hover:text-purple-400">
                    Open
                    <span className="ml-1 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ===================================================== */}
          {/* QUICK ACTIONS */}
          {/* ===================================================== */}

          <section className="mt-10">
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                Shortcuts
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Quick Actions
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                The fastest way to get work done.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-purple-500/[0.035]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-xl text-purple-300 transition group-hover:border-purple-400/30 group-hover:bg-purple-500/[0.08]">
                    {action.icon}
                  </div>

                  <h4 className="mt-5 font-semibold">
                    {action.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {action.description}
                  </p>

                  <div className="mt-5 text-xs font-medium text-gray-700 transition group-hover:text-purple-400">
                    Open →
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ===================================================== */}
          {/* WORKSPACE */}
          {/* ===================================================== */}

          <section className="mt-10">
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                Management
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Workspace
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Everything you need to operate YBN GROUP.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {workspace.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition duration-300 hover:border-white/[0.15] hover:bg-white/[0.045]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-lg text-gray-300">
                      {item.icon}
                    </div>

                    <span className="text-gray-700 transition group-hover:translate-x-1 group-hover:text-purple-400">
                      →
                    </span>
                  </div>

                  <h4 className="mt-6 font-semibold">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* ===================================================== */}
          {/* LOWER GRID */}
          {/* ===================================================== */}

          <section className="mt-10 grid gap-5 xl:grid-cols-2">
            {/* Upcoming Projects */}

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                    Roadmap
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    Upcoming Projects
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your next ideas and ventures.
                  </p>
                </div>

                <Link
                  href="/upcoming-projects"
                  className="text-xs font-medium text-purple-400 hover:text-purple-300"
                >
                  View all →
                </Link>
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-white/[0.1] bg-black/10 p-9 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-xl text-gray-500">
                  +
                </div>

                <h4 className="mt-4 font-medium">
                  No upcoming projects
                </h4>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-600">
                  Your future ideas and projects will appear here.
                </p>

                <Link
                  href="/upcoming-projects"
                  className="mt-5 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
                >
                  Add Project
                </Link>
              </div>
            </div>

            {/* Recent Activity */}

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                  System
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  Recent Activity
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Latest workspace events.
                </p>
              </div>

              <div className="mt-7 space-y-3">
                <div className="flex gap-4 rounded-xl border border-white/[0.06] bg-black/10 p-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-purple-400 shadow-lg shadow-purple-500/40" />

                  <div>
                    <p className="text-sm font-medium">
                      Owner workspace initialized
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      YBN GROUP Owner OS is ready.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-white/[0.06] bg-black/10 p-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-400 shadow-lg shadow-blue-500/40" />

                  <div>
                    <p className="text-sm font-medium">
                      Public website connected
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      YBN GROUP public website is available.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-white/[0.06] bg-black/10 p-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-400 shadow-lg shadow-green-500/40" />

                  <div>
                    <p className="text-sm font-medium">
                      Owner access enabled
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Full workspace access is active.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-white/[0.06] bg-black/10 p-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-yellow-400 shadow-lg shadow-yellow-500/40" />

                  <div>
                    <p className="text-sm font-medium">
                      Workspace awaiting data
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Projects, tasks and team data will appear here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================== */}
          {/* PUBLIC PORTFOLIO */}
          {/* ===================================================== */}

          <section className="mt-10">
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-r from-white/[0.035] via-purple-500/[0.025] to-blue-500/[0.025] p-6 md:p-7">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/40" />

                    <span className="text-xs font-medium text-gray-400">
                      Public Portfolio
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold">
                    Nothing published yet
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Only projects, achievements and selected work that you
                    approve will appear on the public YBN GROUP website.
                  </p>
                </div>

                <Link
                  href="/published-work"
                  className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition hover:border-purple-400/20 hover:bg-white/[0.07]"
                >
                  Manage Portfolio →
                </Link>
              </div>
            </div>
          </section>

          {/* ===================================================== */}
          {/* FOOTER */}
          {/* ===================================================== */}

          <footer className="mt-12 border-t border-white/[0.06] py-8">
            <div className="flex flex-col justify-between gap-3 text-xs text-gray-600 sm:flex-row">
              <p>
                NEXORA Owner OS • YBN GROUP
              </p>

              <p>
                Private workspace
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}