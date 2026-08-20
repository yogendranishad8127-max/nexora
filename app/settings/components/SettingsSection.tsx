"use client";

type SettingItem = {
  title: string;
  description: string;
  type?: "manage" | "toggle";
};

type SettingsSectionProps = {
  title: string;
  description: string;
  items: SettingItem[];
  values: Record<string, boolean>;
  onToggle: (title: string) => void;
  onManage: (title: string) => void;
};

export default function SettingsSection({
  title,
  description,
  items,
  values,
  onToggle,
  onManage,
}: SettingsSectionProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/10 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
          Settings
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      </div>

      <div className="divide-y divide-white/10">
        {items.map((item) => {
          const isToggle = item.type === "toggle";
          const enabled = values[item.title] ?? false;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between gap-6 p-6 transition hover:bg-white/[0.02]"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-gray-600">
                  {item.description}
                </p>
              </div>

              {isToggle ? (
                <button
                  type="button"
                  onClick={() => onToggle(item.title)}
                  aria-label={`Toggle ${item.title}`}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    enabled
                      ? "bg-purple-600"
                      : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      enabled
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onManage(item.title)}
                  className="shrink-0 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  Manage
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}