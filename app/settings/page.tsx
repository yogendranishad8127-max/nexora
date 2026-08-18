"use client";

import { useEffect, useState } from "react";

const sections = [
  {
    id: "account",
    title: "Account",
    description: "Manage your personal account and login settings.",
    items: [
      "Profile",
      "Name",
      "Email",
      "Profile Photo",
      "Change Password",
      "Login Sessions",
      "Logout",
    ],
  },
  {
    id: "workspace",
    title: "Workspace / Company",
    description: "Manage your company and workspace information.",
    items: [
      "Company Name",
      "Logo",
      "Description",
      "Website URL",
      "Contact Information",
      "Timezone",
      "Language",
      "Currency",
    ],
  },
  {
    id: "access",
    title: "Users & Access",
    description: "Control users, roles, departments and permissions.",
    items: [
      "User Management",
      "Roles & Permissions",
      "Department Access",
      "Invite Users",
      "Remove Users",
      "Access Levels",
      "CEO / Admin / Tech / Audit",
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Protect your NEXORA workspace.",
    items: [
      "Two-Factor Authentication",
      "Password & Security",
      "Active Sessions",
      "Login History",
      "Device Management",
      "Security Alerts",
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Choose which notifications you receive.",
    items: [
      "Email Notifications",
      "Task Notifications",
      "Project Notifications",
      "User Activity",
      "Security Alerts",
      "Published Work Notifications",
    ],
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize how NEXORA looks.",
    items: [
      "Dark / Light Mode",
      "Accent Color",
      "Dashboard Layout",
      "Sidebar Settings",
    ],
  },
  {
    id: "content",
    title: "Content",
    description: "Manage content and media preferences.",
    items: [
      "YouTube Settings",
      "Published Work Settings",
      "Media Settings",
      "Upload Preferences",
    ],
  },
  {
    id: "projects",
    title: "Projects & Tasks",
    description: "Configure project and task defaults.",
    items: [
      "Default Project Settings",
      "Task Statuses",
      "Priority Levels",
      "Project Visibility",
      "Default Assignments",
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect external services with NEXORA.",
    items: [
      "Firebase",
      "YouTube",
      "Google Services",
      "Email Service",
      "Other API Integrations",
    ],
  },
  {
    id: "data",
    title: "Data",
    description: "Manage your workspace data.",
    items: [
      "Export Data",
      "Import Data",
      "Backup",
      "Activity Logs",
      "Delete Data",
    ],
  },
  {
    id: "system",
    title: "System",
    description: "Advanced system and administration controls.",
    items: [
      "System Status",
      "Maintenance Mode",
      "Audit Logs",
      "Admin Activity",
      "API Settings",
    ],
  },
];

const toggleItems = [
  "Two-Factor Authentication",
  "Email Notifications",
  "Task Notifications",
  "Project Notifications",
  "User Activity",
  "Security Alerts",
  "Published Work Notifications",
  "Maintenance Mode",
];

/* ================= SECTION ICON ================= */

function getSectionIcon(id: string) {
  switch (id) {
    case "account":
      return "●";

    case "workspace":
      return "▣";

    case "access":
      return "♙";

    case "security":
      return "◆";

    case "notifications":
      return "●";

    case "appearance":
      return "◐";

    case "content":
      return "▶";

    case "projects":
      return "✓";

    case "integrations":
      return "⌘";

    case "data":
      return "▤";

    case "system":
      return "⚙";

    default:
      return "•";
  }
}

/* ================= SETTINGS PAGE ================= */

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const active = sections.find(
    (section) => section.id === activeSection
  );

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      <div className="flex min-h-screen">

        {/* ================= SIDEBAR ================= */}

        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#0c0c0c] p-6 md:block">

          {/* Logo */}

          <div className="mb-10">

            <a href="/dashboard">

              <div className="text-xl font-bold tracking-tight">
                NEXORA
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Owner OS
              </p>

            </a>

          </div>

          {/* Dashboard */}

          <nav className="space-y-1">

            <a
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <span>⌂</span>
              Dashboard
            </a>

          </nav>

          {/* ================= SETTINGS ================= */}

          <div className="mt-8">

            <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
              Settings
            </p>

            <nav className="space-y-1">

              {sections.map((section) => (

                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveItem(null);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                    activeSection === section.id
                      ? "bg-white/10 font-medium text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >

                  <span className="w-5 text-center text-xs">
                    {getSectionIcon(section.id)}
                  </span>

                  {section.title}

                </button>

              ))}

            </nav>

          </div>

          {/* ================= SYSTEM ================= */}

          <div className="mt-8">

            <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
              System
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveSection("danger");
                setActiveItem(null);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                activeSection === "danger"
                  ? "bg-red-500/10 font-medium text-red-400"
                  : "text-gray-400 hover:bg-red-500/5 hover:text-red-400"
              }`}
            >

              <span className="w-5 text-center">
                ⚠
              </span>

              Danger Zone

            </button>

          </div>

          {/* ================= PUBLIC WEBSITE ================= */}

          <div className="mt-10 border-t border-white/10 pt-6">

            <a
              href="/"
              className="flex items-center gap-2 px-4 text-sm text-gray-500 transition hover:text-white"
            >

              <span>↗</span>

              Public Website

            </a>

          </div>

        </aside>

        {/* ================= MAIN ================= */}

        <section className="min-w-0 flex-1">

          {/* Top Header */}

          <header className="border-b border-white/10 px-6 py-6 md:px-10">

            <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
              System Control
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-500">
              Manage your NEXORA account, workspace, users,
              security, content and system controls.
            </p>

          </header>

          {/* ================= SETTINGS CONTENT ================= */}

          <div className="px-6 py-8 md:px-10">

            {activeSection === "danger" ? (

              <DangerZone />

            ) : (

              <div className="rounded-2xl border border-white/10 bg-white/[0.03]">

                {/* Section Header */}

                <div className="border-b border-white/10 p-6 md:p-8">

                  <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
                    Settings
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {active?.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {active?.description}
                  </p>

                </div>

                {/* Settings Items */}

                <div className="divide-y divide-white/10">

                  {active?.items.map((item) => (

                    <SettingRow
                      key={item}
                      title={item}
                      onManage={() => setActiveItem(item)}
                    />

                  ))}

                </div>

              </div>

            )}

          </div>

        </section>

      </div>

      {/* ================= MANAGE MODAL ================= */}

      {activeItem && (

        <SettingsModal
          title={activeItem}
          onClose={() => setActiveItem(null)}
        />

      )}

    </main>
  );
}

/* ================= SETTING ROW ================= */

function SettingRow({
  title,
  onManage,
}: {
  title: string;
  onManage: () => void;
}) {

  const isToggle = toggleItems.includes(title);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {

    const saved = localStorage.getItem(
      `nexora-setting-${title}`
    );

    if (saved !== null) {
      setEnabled(saved === "true");
    }

  }, [title]);

  function toggleSetting() {

    const newValue = !enabled;

    setEnabled(newValue);

    localStorage.setItem(
      `nexora-setting-${title}`,
      String(newValue)
    );

  }

  return (

    <div className="flex items-center justify-between gap-6 p-6 transition hover:bg-white/[0.02]">

      <div>

        <h3 className="text-sm font-medium">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-600">
          Manage {title.toLowerCase()}.
        </p>

      </div>

      {isToggle ? (

        <button
          type="button"
          onClick={toggleSetting}
          aria-label={`Toggle ${title}`}
          className={`relative h-6 w-11 rounded-full transition ${
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
          onClick={onManage}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          Manage
        </button>

      )}

    </div>

  );
}

/* ================= SETTINGS MODAL ================= */

function SettingsModal({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {

  const [value, setValue] = useState("");

  useEffect(() => {

    const saved = localStorage.getItem(
      `nexora-value-${title}`
    );

    if (saved) {
      setValue(saved);
    }

  }, [title]);

  function save() {

    localStorage.setItem(
      `nexora-value-${title}`,
      value
    );

    onClose();

  }

  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      onClick={onClose}
    >

      <div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#101010] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-purple-400">
              Settings
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              {title}
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/5 hover:text-white"
          >
            ×
          </button>

        </div>

        {/* Content */}

        <div className="p-6">

          <label className="text-sm text-gray-400">
            {title}
          </label>

          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={`Enter ${title.toLowerCase()}`}
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/50"
          />

          <p className="mt-3 text-xs text-gray-600">
            This setting will be connected to your NEXORA
            workspace data.
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-white/10 p-6">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={save}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  );
}

/* ================= DANGER ZONE ================= */

function DangerZone() {

  return (

    <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03]">

      <div className="border-b border-red-500/10 p-6 md:p-8">

        <h2 className="text-xl font-semibold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          These actions can permanently affect your NEXORA
          workspace and data.
        </p>

      </div>

      <div className="divide-y divide-red-500/10">

        <DangerAction
          title="Reset Workspace"
          description="Reset workspace configuration."
        />

        <DangerAction
          title="Delete Users"
          description="Permanently remove selected users."
        />

        <DangerAction
          title="Delete Workspace"
          description="Permanently delete the entire workspace."
        />

        <DangerAction
          title="Permanently Delete Account"
          description="Delete your NEXORA account and associated data."
        />

      </div>

    </div>

  );
}

/* ================= DANGER ACTION ================= */

function DangerAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {

  const [confirm, setConfirm] = useState(false);

  return (

    <div className="flex items-center justify-between gap-6 p-6">

      <div>

        <h3 className="text-sm font-medium text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>

      </div>

      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
      >
        Manage
      </button>

      {confirm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#101010] p-6">

            <h2 className="text-lg font-semibold text-red-400">
              {title}
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Are you sure you want to continue?
              This action may permanently affect your workspace.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}