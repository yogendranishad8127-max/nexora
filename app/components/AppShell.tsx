"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login aur public website par dashboard sidebar nahi chahiye
  const hideSidebar =
    pathname === "/" ||
    pathname.startsWith("/login");

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#080808] text-white">

      <Sidebar />

      <section className="min-w-0 flex-1">
        {children}
      </section>

    </div>
  );
}