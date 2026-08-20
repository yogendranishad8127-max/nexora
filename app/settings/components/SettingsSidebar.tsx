"use client";

type Section = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type SettingsSidebarProps = {
  sections: Section[];
  activeSection: string;
  onSelect: (id: string) => void;
  mobile?: boolean;
};

export function SettingsSidebar({
  sections,
  activeSection,
  onSelect,
  mobile = false,
}: SettingsSidebarProps) {
  return (
    <aside
      className={
        mobile
          ? "h-full w-80 max-w-[85vw] overflow-y-auto bg-[#0c0c0c] p-5"
          : "sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-white/10 bg-[#0c0c0c] p-5 lg:block"
      }
    >
      <div className="mb-8 px-2">
        <div className="text-xl font-bold tracking-tight text-white">
          NEXORA
        </div>

        <p className="mt-1 text-xs text-gray-500">
          Owner Workspace
        </p>
      </div>

      <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
        Settings
      </div>

      <nav className="space-y-1">
        {sections.map((section) => {
          const active = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(section.id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                active
                  ? "bg-purple-500/10 text-white"
                  : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs ${
                  active
                    ? "bg-purple-500/15 text-purple-400"
                    : "bg-white/[0.03] text-gray-500 group-hover:text-gray-300"
                }`}
              >
                {section.icon}
              </span>

              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {section.title}
                </span>

                <span className="mt-0.5 block truncate text-[10px] text-gray-600">
                  {section.description}
                </span>
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onSelect("danger")}
          className={`group mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
            activeSection === "danger"
              ? "bg-red-500/10 text-red-400"
              : "text-gray-400 hover:bg-red-500/[0.04] hover:text-red-300"
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs ${
              activeSection === "danger"
                ? "bg-red-500/10 text-red-400"
                : "bg-white/[0.03] text-gray-500"
            }`}
          >
            ⚠
          </span>

          <span>
            <span className="block text-sm font-medium">
              Danger Zone
            </span>

            <span className="mt-0.5 block text-[10px] text-gray-600">
              Destructive actions
            </span>
          </span>
        </button>
      </nav>
    </aside>
  );
}