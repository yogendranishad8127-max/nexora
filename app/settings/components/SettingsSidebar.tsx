"use client";

type Section = {
  id: string;
  title: string;
  icon: string;
};

type SettingsSidebarProps = {
  sections: Section[];
  activeSection: string;
  onSelect: (id: string) => void;
};

export function SettingsSidebar({
  sections,
  activeSection,
  onSelect,
}: SettingsSidebarProps) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#0c0c0c] p-6 md:block">
      <div className="mb-10">
        <a href="/dashboard">
          <div className="text-xl font-bold tracking-tight text-white">
            NEXORA
          </div>

          <p className="mt-1 text-xs text-gray-500">
            Owner OS
          </p>
        </a>
      </div>

      <a
        href="/dashboard"
        className="mb-8 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
      >
        <span>⌂</span>
        <span>Dashboard</span>
      </a>

      <div>
        <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
          Settings
        </p>

        <nav className="space-y-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelect(section.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                  isActive
                    ? "bg-white/10 font-medium text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-xs">
                  {section.icon}
                </span>

                <span>{section.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-8">
        <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
          System
        </p>

        <button
          type="button"
          onClick={() => onSelect("danger")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
            activeSection === "danger"
              ? "bg-red-500/10 font-medium text-red-400"
              : "text-gray-400 hover:bg-red-500/5 hover:text-red-400"
          }`}
        >
          <span className="w-5 text-center">⚠</span>
          <span>Danger Zone</span>
        </button>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6">
        <a
          href="/"
          className="flex items-center gap-2 px-4 text-sm text-gray-500 transition hover:text-white"
        >
          <span>↗</span>
          <span>Public Website</span>
        </a>
      </div>
    </aside>
  );
}