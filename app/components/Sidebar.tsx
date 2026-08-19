"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavigation = [
  {
    href: "/dashboard",
    icon: "⌂",
    label: "Dashboard",
  },
  {
    href: "/projects",
    icon: "▣",
    label: "Projects",
  },
  {
    href: "/tasks",
    icon: "✓",
    label: "Tasks",
  },
  {
    href: "/departments",
    icon: "▦",
    label: "Departments",
  },
  {
    href: "/roles",
    icon: "◈",
    label: "Roles & Permissions",
  },
  {
    href: "/users",
    icon: "♙",
    label: "Users",
  },
];

const contentNavigation = [
  {
    href: "/youtube",
    icon: "▶",
    label: "YouTube Work",
  },
  {
    href: "/upcoming-projects",
    icon: "◆",
    label: "Upcoming Projects",
  },
  {
    href: "/published-work",
    icon: "★",
    label: "Published Work",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/[0.08] bg-[#070709]">

      {/* ================= BRAND ================= */}

      <div className="shrink-0 border-b border-white/[0.08] px-6 py-6">
        <Link href="/dashboard" className="group block">

          <div className="flex items-center gap-3">

            {/* Logo */}

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-purple-400/20 bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-transparent shadow-lg shadow-purple-900/20">

              <div className="absolute inset-0 bg-purple-500/10 blur-xl" />

              <span className="relative text-sm font-black tracking-tight text-white">
                YBN
              </span>

            </div>

            {/* Brand */}

            <div>
              <div className="text-lg font-black tracking-[0.18em] text-white">
                YBN
              </div>

              <div className="-mt-1 text-[9px] font-semibold tracking-[0.35em] text-purple-400">
                GROUP
              </div>
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />

            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-600">
              Owner OS
            </span>

          </div>

        </Link>
      </div>

      {/* ================= SCROLLABLE NAVIGATION ================= */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          px-4
          py-6
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-white/10
          hover:scrollbar-thumb-white/20
        "
      >

        {/* WORKSPACE */}

        <SidebarSection title="Workspace">

          {mainNavigation.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={isActive(item.href)}
            />
          ))}

        </SidebarSection>

        {/* CONTENT */}

        <SidebarSection title="Content">

          {contentNavigation.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={isActive(item.href)}
            />
          ))}

        </SidebarSection>

        {/* SYSTEM */}

        <SidebarSection title="System">

          <SidebarItem
            href="/settings"
            icon="⚙"
            label="Settings"
            active={isActive("/settings")}
          />

        </SidebarSection>

      </div>

      {/* ================= FIXED BOTTOM ================= */}

      <div className="shrink-0 border-t border-white/[0.08] bg-[#070709] p-4">

        {/* Public Website */}

        <Link
          href="/"
          className="group mb-4 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 transition hover:border-purple-500/20 hover:bg-purple-500/[0.05]"
        >

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-sm text-gray-500 transition group-hover:bg-purple-500/10 group-hover:text-purple-400">
            ↗
          </div>

          <div>
            <p className="text-xs font-medium text-gray-300">
              Public Website
            </p>

            <p className="mt-0.5 text-[10px] text-gray-600">
              Open YBN Group
            </p>
          </div>

        </Link>

        {/* Owner */}

        <div className="flex items-center gap-3 rounded-xl bg-white/[0.025] px-3 py-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-xs font-bold shadow-lg shadow-purple-900/30">
            Y
          </div>

          <div className="min-w-0">

            <p className="truncate text-xs font-semibold text-white">
              Yogendra
            </p>

            <p className="mt-0.5 text-[10px] text-gray-600">
              CEO · Full Access
            </p>

          </div>

          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />

        </div>

      </div>

    </aside>
  );
}


/* =========================================================
   SIDEBAR SECTION
========================================================= */

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">

      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-600">
        {title}
      </p>

      <nav className="space-y-1">
        {children}
      </nav>

    </div>
  );
}


/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-purple-500/[0.14] to-indigo-500/[0.05] text-white"
          : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
      }`}
    >

      {/* Active Indicator */}

      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50" />
      )}

      {/* Icon */}

      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm transition ${
          active
            ? "bg-purple-500/15 text-purple-300"
            : "bg-white/[0.025] text-gray-600 group-hover:bg-white/[0.06] group-hover:text-gray-300"
        }`}
      >
        {icon}
      </span>

      {/* Label */}

      <span className="truncate font-medium">
        {label}
      </span>

      {/* Active Dot */}

      {active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400 shadow-md shadow-purple-400/50" />
      )}

    </Link>
  );
}