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
    icon: "♙",
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
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-[#0c0c0c] p-6 md:block">

      {/* Logo */}
      <div className="mb-10">
        <div className="text-xl font-bold tracking-tight">
          NEXORA
        </div>

        <p className="mt-1 text-xs text-gray-500">
          Owner OS
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1">

        {mainNavigation.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                active
                  ? "bg-white/10 font-medium text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

      </nav>

      {/* Content */}
      <div className="mt-8">

        <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
          Content
        </p>

        <nav className="space-y-1">

          {contentNavigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  active
                    ? "bg-white/10 font-medium text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

        </nav>

      </div>

      {/* System */}
      <div className="mt-8">

        <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
          System
        </p>

        <nav className="space-y-1">

          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
              isActive("/settings")
                ? "bg-white/10 font-medium text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span>⚙</span>
            Settings
          </Link>

        </nav>

      </div>

      {/* Public Website */}
      <div className="mt-10 border-t border-white/10 pt-6">

        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-white"
        >
          <span>↗</span>
          Public Website
        </Link>

      </div>

    </aside>
  );
}