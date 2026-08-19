"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Public website aur login par sidebar nahi
  const hideSidebar =
    pathname === "/" ||
    pathname.startsWith("/login");

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Dashboard Layout */}
      <div className="flex min-h-screen">

        {/* Fixed / Independent Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 md:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 md:ml-72">
          {children}
        </main>

      </div>

    </div>
  );
}