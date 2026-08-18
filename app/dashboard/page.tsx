import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* ================= MAIN DASHBOARD ================= */}
      <section className="min-h-screen">
        {/* ================= TOP BAR ================= */}
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-10">
          <div>
            <p className="text-sm text-gray-500">
              Owner Workspace
            </p>

            <h1 className="mt-1 text-xl font-semibold">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                CEO
              </p>

              <p className="text-xs text-gray-500">
                Full Access
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-semibold">
              C
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="px-6 py-8 md:px-10">
          {/* ================= WELCOME ================= */}
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
              Owner Workspace
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Good Evening, CEO.
            </h2>

            <p className="mt-2 text-gray-500">
              Control your projects, team, content and business from one place.
            </p>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Active Projects */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-500">
                Active Projects
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>

              <p className="mt-2 text-xs text-gray-600">
                Nothing active yet
              </p>
            </div>

            {/* Tasks */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-500">
                Tasks
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>

              <p className="mt-2 text-xs text-gray-600">
                No pending tasks
              </p>
            </div>

            {/* Departments */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-500">
                Departments
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>

              <p className="mt-2 text-xs text-gray-600">
                Organization departments
              </p>
            </div>

            {/* Published Work */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-500">
                Published Work
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>

              <p className="mt-2 text-xs text-gray-600">
                No public content yet
              </p>
            </div>
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div className="mt-10">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                Quick Actions
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Quickly access the most important workspace actions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* New Project */}
              <Link
                href="/projects"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-purple-500/50 hover:bg-purple-500/5"
              >
                <div className="mb-4 text-2xl">
                  +
                </div>

                <h4 className="font-semibold">
                  New Project
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Create a new project
                </p>
              </Link>

              {/* New Task */}
              <Link
                href="/tasks"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-purple-500/50 hover:bg-purple-500/5"
              >
                <div className="mb-4 text-2xl">
                  ✓
                </div>

                <h4 className="font-semibold">
                  New Task
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Add a task
                </p>
              </Link>

              {/* Roles */}
              <Link
                href="/roles"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-purple-500/50 hover:bg-purple-500/5"
              >
                <div className="mb-4 text-2xl">
                  ♙
                </div>

                <h4 className="font-semibold">
                  Roles & Permissions
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Manage access
                </p>
              </Link>

              {/* Published Work */}
              <Link
                href="/published-work"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-purple-500/50 hover:bg-purple-500/5"
              >
                <div className="mb-4 text-2xl">
                  ↑
                </div>

                <h4 className="font-semibold">
                  Publish Work
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Manage public content
                </p>
              </Link>
            </div>
          </div>

          {/* ================= WORKSPACE ================= */}
          <div className="mt-10">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                Workspace
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Manage every part of your business from here.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Projects */}
              <Link
                href="/projects"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ▣
                </div>

                <h4 className="mt-5 font-semibold">
                  Projects
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Manage current business projects and development work.
                </p>
              </Link>

              {/* Tasks */}
              <Link
                href="/tasks"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ✓
                </div>

                <h4 className="mt-5 font-semibold">
                  Tasks
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Track tasks, deadlines and team responsibilities.
                </p>
              </Link>

              {/* Users */}
              <Link
                href="/users"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ♙
                </div>

                <h4 className="mt-5 font-semibold">
                  Users
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Manage team members and their roles.
                </p>
              </Link>

              {/* Departments */}
              <Link
                href="/departments"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ▦
                </div>

                <h4 className="mt-5 font-semibold">
                  Departments
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Create and organize company departments.
                </p>
              </Link>

              {/* Roles */}
              <Link
                href="/roles"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ♙
                </div>

                <h4 className="mt-5 font-semibold">
                  Roles & Permissions
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Control who can access different parts of NEXORA.
                </p>
              </Link>

              {/* YouTube */}
              <Link
                href="/youtube"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ▶
                </div>

                <h4 className="mt-5 font-semibold">
                  YouTube Work
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Manage videos, ideas, scripts and YouTube projects.
                </p>
              </Link>

              {/* Upcoming Projects */}
              <Link
                href="/upcoming-projects"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ◆
                </div>

                <h4 className="mt-5 font-semibold">
                  Upcoming Projects
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Keep track of projects you plan to build next.
                </p>
              </Link>

              {/* Published Work */}
              <Link
                href="/published-work"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ★
                </div>

                <h4 className="mt-5 font-semibold">
                  Published Work
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Decide what work should be visible publicly.
                </p>
              </Link>

              {/* Settings */}
              <Link
                href="/settings"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="text-2xl">
                  ⚙
                </div>

                <h4 className="mt-5 font-semibold">
                  Settings
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Configure your NEXORA workspace.
                </p>
              </Link>
            </div>
          </div>

          {/* ================= UPCOMING PROJECTS ================= */}
          <div className="mt-10">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Upcoming Projects
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Projects you are planning.
                </p>
              </div>

              <Link
                href="/upcoming-projects"
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                View all
              </Link>
            </div>

            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-xl">
                +
              </div>

              <h4 className="mt-4 font-medium">
                No upcoming projects
              </h4>

              <p className="mt-2 text-sm text-gray-600">
                Your future projects will appear here.
              </p>

              <Link
                href="/upcoming-projects"
                className="mt-5 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
              >
                Create Project
              </Link>
            </div>
          </div>

          {/* ================= PUBLIC PORTFOLIO ================= */}
          <div className="mt-10">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                Public Portfolio
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Only the work you approve will appear on your public website.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />

                    <span className="text-sm text-gray-400">
                      Nothing published
                    </span>
                  </div>

                  <h4 className="mt-3 text-lg font-semibold">
                    Your public portfolio is empty
                  </h4>

                  <p className="mt-2 max-w-2xl text-sm text-gray-500">
                    Add your best projects, achievements and selected work.
                    Only content marked as public will be visible to visitors.
                  </p>
                </div>

                <Link
                  href="/published-work"
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium hover:bg-white/5"
                >
                  Manage Published Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}