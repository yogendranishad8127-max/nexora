"use client";

import { useEffect, useState } from "react";
import { SettingsSidebar } from "./components/SettingsSidebar";

type Section = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const sections: Section[] = [
  {
    id: "account",
    title: "Account",
    description: "Manage your personal account and login settings.",
    icon: "●",
  },
  {
    id: "workspace",
    title: "Workspace / Company",
    description: "Manage your company and workspace information.",
    icon: "▣",
  },
  {
    id: "access",
    title: "Users & Access",
    description: "Control users, roles, departments and permissions.",
    icon: "♙",
  },
  {
    id: "security",
    title: "Security",
    description: "Protect your NEXORA workspace.",
    icon: "◆",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Choose which notifications you receive.",
    icon: "●",
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize how NEXORA looks.",
    icon: "◐",
  },
  {
    id: "content",
    title: "Content",
    description: "Manage content and media preferences.",
    icon: "▶",
  },
  {
    id: "projects",
    title: "Projects & Tasks",
    description: "Configure project and task defaults.",
    icon: "✓",
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect external services with NEXORA.",
    icon: "⌘",
  },
  {
    id: "data",
    title: "Data",
    description: "Manage your workspace data.",
    icon: "▤",
  },
  {
    id: "system",
    title: "System",
    description: "Advanced system and administration controls.",
    icon: "⚙",
  },
];

const toggleDefaults: Record<string, boolean> = {
  twoFactor: false,
  emailNotifications: true,
  taskNotifications: true,
  projectNotifications: true,
  userActivity: true,
  securityAlerts: true,
  publishedNotifications: true,
  maintenanceMode: false,
};

const defaultValues = {
  language: "English",
  currency: "INR",
  timezone: "Asia/Kolkata",
  companyName: "",
  companyDescription: "",
  websiteUrl: "",
  contactInformation: "",
  dashboardLayout: "Default",
  accentColor: "Purple",
  youtubeChannel: "",
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [language, setLanguage] = useState(defaultValues.language);
  const [currency, setCurrency] = useState(defaultValues.currency);
  const [timezone, setTimezone] = useState(defaultValues.timezone);

  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [contactInformation, setContactInformation] = useState("");

  const [dashboardLayout, setDashboardLayout] = useState(
    defaultValues.dashboardLayout
  );

  const [accentColor, setAccentColor] = useState(
    defaultValues.accentColor
  );

  const [youtubeChannel, setYoutubeChannel] = useState("");

  const [toggles, setToggles] = useState(toggleDefaults);

  const activeSectionData = sections.find(
    (section) => section.id === activeSection
  );

  useEffect(() => {
    setLanguage(
      localStorage.getItem("nexora-language") || defaultValues.language
    );

    setCurrency(
      localStorage.getItem("nexora-currency") || defaultValues.currency
    );

    setTimezone(
      localStorage.getItem("nexora-timezone") || defaultValues.timezone
    );

    setCompanyName(
      localStorage.getItem("nexora-company-name") || ""
    );

    setCompanyDescription(
      localStorage.getItem("nexora-company-description") || ""
    );

    setWebsiteUrl(
      localStorage.getItem("nexora-website-url") || ""
    );

    setContactInformation(
      localStorage.getItem("nexora-contact-information") || ""
    );

    setDashboardLayout(
      localStorage.getItem("nexora-dashboard-layout") ||
        defaultValues.dashboardLayout
    );

    setAccentColor(
      localStorage.getItem("nexora-accent-color") ||
        defaultValues.accentColor
    );

    setYoutubeChannel(
      localStorage.getItem("nexora-youtube-channel") || ""
    );

    const savedToggles = { ...toggleDefaults };

    Object.keys(toggleDefaults).forEach((key) => {
      const saved = localStorage.getItem(`nexora-toggle-${key}`);

      if (saved !== null) {
        savedToggles[key] = saved === "true";
      }
    });

    setToggles(savedToggles);
  }, []);

  function selectSection(id: string) {
    setActiveSection(id);
    setMobileMenuOpen(false);
  }

  function saveValue(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function updateLanguage(value: string) {
    setLanguage(value);
    saveValue("nexora-language", value);
  }

  function updateCurrency(value: string) {
    setCurrency(value);
    saveValue("nexora-currency", value);
  }

  function updateTimezone(value: string) {
    setTimezone(value);
    saveValue("nexora-timezone", value);
  }

  function updateCompanyName(value: string) {
    setCompanyName(value);
    saveValue("nexora-company-name", value);
  }

  function updateCompanyDescription(value: string) {
    setCompanyDescription(value);
    saveValue("nexora-company-description", value);
  }

  function updateWebsiteUrl(value: string) {
    setWebsiteUrl(value);
    saveValue("nexora-website-url", value);
  }

  function updateContactInformation(value: string) {
    setContactInformation(value);
    saveValue("nexora-contact-information", value);
  }

  function updateDashboardLayout(value: string) {
    setDashboardLayout(value);
    saveValue("nexora-dashboard-layout", value);
  }

  function updateAccentColor(value: string) {
    setAccentColor(value);
    saveValue("nexora-accent-color", value);
  }

  function updateYoutubeChannel(value: string) {
    setYoutubeChannel(value);
    saveValue("nexora-youtube-channel", value);
  }

  function toggleSetting(key: keyof typeof toggleDefaults) {
    const newValue = !toggles[key];

    setToggles((current) => ({
      ...current,
      [key]: newValue,
    }));

    localStorage.setItem(
      `nexora-toggle-${key}`,
      String(newValue)
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="flex min-h-screen">
        <SettingsSidebar
          sections={sections}
          activeSection={activeSection}
          onSelect={selectSection}
        />

        <section className="min-w-0 flex-1">
          <header className="border-b border-white/10 px-6 py-6 md:px-10">
            <div className="flex items-start justify-between gap-4">
              <div>
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
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 md:hidden"
              >
                Settings
              </button>
            </div>
          </header>

          <div className="px-6 py-8 md:px-10">
            {activeSection === "danger" ? (
              <DangerZone />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="border-b border-white/10 p-6 md:p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
                    Settings
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {activeSectionData?.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {activeSectionData?.description}
                  </p>
                </div>

                {activeSection === "account" && (
                  <AccountSettings
                    language={language}
                    onLanguageChange={updateLanguage}
                  />
                )}

                {activeSection === "workspace" && (
                  <WorkspaceSettings
                    companyName={companyName}
                    companyDescription={companyDescription}
                    websiteUrl={websiteUrl}
                    contactInformation={contactInformation}
                    timezone={timezone}
                    language={language}
                    currency={currency}
                    onCompanyNameChange={updateCompanyName}
                    onCompanyDescriptionChange={
                      updateCompanyDescription
                    }
                    onWebsiteUrlChange={updateWebsiteUrl}
                    onContactInformationChange={
                      updateContactInformation
                    }
                    onTimezoneChange={updateTimezone}
                    onLanguageChange={updateLanguage}
                    onCurrencyChange={updateCurrency}
                  />
                )}

                {activeSection === "access" && <AccessSettings />}

                {activeSection === "security" && (
                  <SecuritySettings
                    enabled={toggles.twoFactor}
                    onToggle={() => toggleSetting("twoFactor")}
                  />
                )}

                {activeSection === "notifications" && (
                  <NotificationSettings
                    toggles={toggles}
                    onToggle={toggleSetting}
                  />
                )}

                {activeSection === "appearance" && (
                  <AppearanceSettings
                    dashboardLayout={dashboardLayout}
                    accentColor={accentColor}
                    onDashboardLayoutChange={
                      updateDashboardLayout
                    }
                    onAccentColorChange={updateAccentColor}
                  />
                )}

                {activeSection === "content" && (
                  <ContentSettings
                    youtubeChannel={youtubeChannel}
                    onYoutubeChannelChange={
                      updateYoutubeChannel
                    }
                  />
                )}

                {activeSection === "projects" && <ProjectsSettings />}

                {activeSection === "integrations" && (
                  <IntegrationsSettings />
                )}

                {activeSection === "data" && <DataSettings />}

                {activeSection === "system" && (
                  <SystemSettings
                    enabled={toggles.maintenanceMode}
                    onToggle={() =>
                      toggleSetting("maintenanceMode")
                    }
                  />
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="h-full w-80 max-w-[85%] bg-[#0c0c0c] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="text-xl font-bold">NEXORA</div>

                <p className="text-xs text-gray-500">
                  Settings
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl text-gray-500"
              >
                ×
              </button>
            </div>

            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => selectSection(section.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm ${
                    activeSection === section.id
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <span className="w-5 text-center">
                    {section.icon}
                  </span>

                  {section.title}
                </button>
              ))}

              <button
                type="button"
                onClick={() => selectSection("danger")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm ${
                  activeSection === "danger"
                    ? "bg-red-500/10 text-red-400"
                    : "text-gray-400 hover:bg-red-500/5"
                }`}
              >
                <span className="w-5 text-center">⚠</span>

                Danger Zone
              </button>
            </nav>
          </div>
        </div>
      )}
    </main>
  );
}

function AccountSettings({
  language,
  onLanguageChange,
}: {
  language: string;
  onLanguageChange: (value: string) => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Profile"
        description="Manage your personal profile information."
      />

      <SettingRow
        title="Name"
        description="Your display name for the NEXORA workspace."
      />

      <SettingRow
        title="Email"
        description="Your account email address."
      />

      <SettingRow
        title="Profile Photo"
        description="Update your account profile photo."
      />

      <SettingRow
        title="Change Password"
        description="Change your account password."
      />

      <SettingRow
        title="Login Sessions"
        description="Review active login sessions."
      />

      <SettingRow
        title="Logout"
        description="Sign out from your NEXORA account."
      />

      <SettingRow
        title="Language"
        description="Choose the language used by NEXORA."
        control={
          <Select
            value={language}
            onChange={onLanguageChange}
            options={[
              "English",
              "Hindi",
              "Spanish",
              "French",
              "German",
            ]}
          />
        }
      />
    </div>
  );
}

function WorkspaceSettings({
  companyName,
  companyDescription,
  websiteUrl,
  contactInformation,
  timezone,
  language,
  currency,
  onCompanyNameChange,
  onCompanyDescriptionChange,
  onWebsiteUrlChange,
  onContactInformationChange,
  onTimezoneChange,
  onLanguageChange,
  onCurrencyChange,
}: {
  companyName: string;
  companyDescription: string;
  websiteUrl: string;
  contactInformation: string;
  timezone: string;
  language: string;
  currency: string;
  onCompanyNameChange: (value: string) => void;
  onCompanyDescriptionChange: (value: string) => void;
  onWebsiteUrlChange: (value: string) => void;
  onContactInformationChange: (value: string) => void;
  onTimezoneChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingInput
        title="Company Name"
        description="The official name of your company."
        value={companyName}
        onChange={onCompanyNameChange}
        placeholder="Enter company name"
      />

      <SettingInput
        title="Description"
        description="A short description of your company."
        value={companyDescription}
        onChange={onCompanyDescriptionChange}
        placeholder="Enter company description"
      />

      <SettingInput
        title="Website URL"
        description="Your official company website."
        value={websiteUrl}
        onChange={onWebsiteUrlChange}
        placeholder="https://example.com"
      />

      <SettingInput
        title="Contact Information"
        description="Company phone number, email or other contact information."
        value={contactInformation}
        onChange={onContactInformationChange}
        placeholder="Enter contact information"
      />

      <SettingRow
        title="Timezone"
        description="Timezone used for workspace dates and schedules."
        control={
          <Select
            value={timezone}
            onChange={onTimezoneChange}
            options={[
              "Asia/Kolkata",
              "UTC",
              "America/New_York",
              "Europe/London",
              "Asia/Dubai",
            ]}
          />
        }
      />

      <SettingRow
        title="Language"
        description="Default language for the workspace."
        control={
          <Select
            value={language}
            onChange={onLanguageChange}
            options={[
              "English",
              "Hindi",
              "Spanish",
              "French",
              "German",
            ]}
          />
        }
      />

      <SettingRow
        title="Currency"
        description="Default currency used by your workspace."
        control={
          <Select
            value={currency}
            onChange={onCurrencyChange}
            options={["INR", "USD", "EUR", "GBP", "AED"]}
          />
        }
      />
    </div>
  );
}

function AccessSettings() {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="User Management"
        description="Manage workspace users from the Users section."
        href="/users"
      />

      <SettingRow
        title="Roles & Permissions"
        description="Configure roles and access permissions."
        href="/roles"
      />

      <SettingRow
        title="Department Access"
        description="Control access based on departments."
        href="/departments"
      />

      <SettingRow
        title="Invite Users"
        description="Invite new members to your workspace."
        href="/users"
      />

      <SettingRow
        title="Remove Users"
        description="Remove users from the workspace."
        href="/users"
      />

      <SettingRow
        title="Access Levels"
        description="Manage CEO, Admin, Tech and Audit access levels."
        href="/roles"
      />
    </div>
  );
}

function SecuritySettings({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Two-Factor Authentication"
        description="Add an additional security layer to your account."
        control={<Toggle enabled={enabled} onClick={onToggle} />}
      />

      <SettingRow
        title="Password & Security"
        description="Review and manage password security."
      />

      <SettingRow
        title="Active Sessions"
        description="Review devices currently signed into your account."
      />

      <SettingRow
        title="Login History"
        description="Review recent account login activity."
      />

      <SettingRow
        title="Device Management"
        description="Manage devices connected to your account."
      />

      <SettingRow
        title="Security Alerts"
        description="Receive important security notifications."
      />
    </div>
  );
}

function NotificationSettings({
  toggles,
  onToggle,
}: {
  toggles: Record<string, boolean>;
  onToggle: (key: keyof typeof toggleDefaults) => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Email Notifications"
        description="Receive important notifications by email."
        control={
          <Toggle
            enabled={toggles.emailNotifications}
            onClick={() => onToggle("emailNotifications")}
          />
        }
      />

      <SettingRow
        title="Task Notifications"
        description="Receive updates about assigned tasks."
        control={
          <Toggle
            enabled={toggles.taskNotifications}
            onClick={() => onToggle("taskNotifications")}
          />
        }
      />

      <SettingRow
        title="Project Notifications"
        description="Receive updates about projects."
        control={
          <Toggle
            enabled={toggles.projectNotifications}
            onClick={() => onToggle("projectNotifications")}
          />
        }
      />

      <SettingRow
        title="User Activity"
        description="Receive notifications about workspace user activity."
        control={
          <Toggle
            enabled={toggles.userActivity}
            onClick={() => onToggle("userActivity")}
          />
        }
      />

      <SettingRow
        title="Security Alerts"
        description="Receive important security alerts."
        control={
          <Toggle
            enabled={toggles.securityAlerts}
            onClick={() => onToggle("securityAlerts")}
          />
        }
      />

      <SettingRow
        title="Published Work Notifications"
        description="Receive notifications when published work changes."
        control={
          <Toggle
            enabled={toggles.publishedNotifications}
            onClick={() =>
              onToggle("publishedNotifications")
            }
          />
        }
      />
    </div>
  );
}

function AppearanceSettings({
  dashboardLayout,
  accentColor,
  onDashboardLayoutChange,
  onAccentColorChange,
}: {
  dashboardLayout: string;
  accentColor: string;
  onDashboardLayoutChange: (value: string) => void;
  onAccentColorChange: (value: string) => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Dark / Light Mode"
        description="Choose how NEXORA should appear."
        control={
          <Select
            value="Dark"
            onChange={() => {}}
            options={["Dark", "Light", "System"]}
          />
        }
      />

      <SettingRow
        title="Accent Color"
        description="Choose the main accent color."
        control={
          <Select
            value={accentColor}
            onChange={onAccentColorChange}
            options={[
              "Purple",
              "Blue",
              "Green",
              "Orange",
              "Red",
            ]}
          />
        }
      />

      <SettingRow
        title="Dashboard Layout"
        description="Choose your preferred dashboard layout."
        control={
          <Select
            value={dashboardLayout}
            onChange={onDashboardLayoutChange}
            options={["Default", "Compact", "Wide"]}
          />
        }
      />

      <SettingRow
        title="Sidebar Settings"
        description="Configure dashboard sidebar behaviour."
      />
    </div>
  );
}

function ContentSettings({
  youtubeChannel,
  onYoutubeChannelChange,
}: {
  youtubeChannel: string;
  onYoutubeChannelChange: (value: string) => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="YouTube Settings"
        description="Configure YouTube publishing and channel preferences."
        href="/youtube"
      />

      <SettingRow
        title="Published Work Settings"
        description="Configure published work preferences."
        href="/published-work"
      />

      <SettingRow
        title="Media Settings"
        description="Manage media and content preferences."
      />

      <SettingRow
        title="Upload Preferences"
        description="Configure default upload behaviour."
      />

      <SettingInput
        title="YouTube Channel"
        description="Save your default YouTube channel identifier."
        value={youtubeChannel}
        onChange={onYoutubeChannelChange}
        placeholder="Channel ID or channel URL"
      />
    </div>
  );
}

function ProjectsSettings() {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Default Project Settings"
        description="Configure default project behaviour."
        href="/projects"
      />

      <SettingRow
        title="Task Statuses"
        description="Configure task workflow statuses."
        href="/tasks"
      />

      <SettingRow
        title="Priority Levels"
        description="Configure project and task priorities."
      />

      <SettingRow
        title="Project Visibility"
        description="Configure who can see projects."
      />

      <SettingRow
        title="Default Assignments"
        description="Configure default project assignments."
      />
    </div>
  );
}

function IntegrationsSettings() {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Firebase"
        description="Firebase authentication and database integration."
      />

      <SettingRow
        title="YouTube"
        description="YouTube API integration."
        href="/youtube"
      />

      <SettingRow
        title="Google Services"
        description="Google service integrations."
      />

      <SettingRow
        title="Email Service"
        description="Configure email delivery services."
      />

      <SettingRow
        title="Other API Integrations"
        description="Manage additional API connections."
      />
    </div>
  );
}

function DataSettings() {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Export Data"
        description="Export workspace data."
        control={
          <button
            type="button"
            onClick={() =>
              alert("Data export will be connected to your backend.")
            }
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 hover:bg-white/5 hover:text-white"
          >
            Export
          </button>
        }
      />

      <SettingRow
        title="Import Data"
        description="Import workspace data."
        control={
          <button
            type="button"
            onClick={() =>
              alert("Data import will be connected to your backend.")
            }
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 hover:bg-white/5 hover:text-white"
          >
            Import
          </button>
        }
      />

      <SettingRow
        title="Backup"
        description="Manage workspace backups."
      />

      <SettingRow
        title="Activity Logs"
        description="Review workspace activity logs."
      />

      <SettingRow
        title="Delete Data"
        description="Permanently delete selected workspace data."
      />
    </div>
  );
}

function SystemSettings({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="System Status"
        description="NEXORA system is currently operational."
        control={
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
            Operational
          </span>
        }
      />

      <SettingRow
        title="Maintenance Mode"
        description="Temporarily enable maintenance mode."
        control={
          <Toggle
            enabled={enabled}
            onClick={onToggle}
          />
        }
      />

      <SettingRow
        title="Audit Logs"
        description="Review administrative audit activity."
      />

      <SettingRow
        title="Admin Activity"
        description="Review administrator actions."
      />

      <SettingRow
        title="API Settings"
        description="Manage application API configuration."
      />
    </div>
  );
}

function SettingRow({
  title,
  description,
  control,
  href,
}: {
  title: string;
  description: string;
  control?: React.ReactNode;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 p-6 transition hover:bg-white/[0.02]">
      <div className="min-w-0">
        <h3 className="text-sm font-medium">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-600">
          {description}
        </p>
      </div>

      {control ? (
        control
      ) : href ? (
        <a
          href={href}
          className="shrink-0 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          Open
        </a>
      ) : (
        <span className="shrink-0 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-600">
          Manage
        </span>
      )}
    </div>
  );
}

function SettingInput({
  title,
  description,
  value,
  onChange,
  placeholder,
}: {
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <h3 className="text-sm font-medium">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-600">
          {description}
        </p>
      </div>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500/50 md:max-w-sm"
      />
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-lg border border-white/10 bg-[#101010] px-3 py-2 text-xs text-white outline-none focus:border-purple-500/50"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
          className="bg-[#101010]"
        >
          {option}
        </option>
      ))}
    </select>
  );
}

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? "bg-purple-600" : "bg-white/10"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function DangerZone() {
  const [confirm, setConfirm] = useState<string | null>(null);

  const actions = [
    {
      title: "Reset Workspace",
      description: "Reset workspace configuration.",
    },
    {
      title: "Delete Users",
      description: "Permanently remove selected users.",
    },
    {
      title: "Delete Workspace",
      description: "Permanently delete the entire workspace.",
    },
    {
      title: "Permanently Delete Account",
      description:
        "Delete your NEXORA account and associated data.",
    },
  ];

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
        {actions.map((action) => (
          <div
            key={action.title}
            className="flex items-center justify-between gap-6 p-6"
          >
            <div>
              <h3 className="text-sm font-medium text-white">
                {action.title}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {action.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setConfirm(action.title)}
              className="shrink-0 rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
            >
              Manage
            </button>
          </div>
        ))}
      </div>

      {confirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={() => setConfirm(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#101010] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-red-400">
              {confirm}
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Are you sure you want to continue?
              This action may permanently affect your
              workspace.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(
                    `${confirm} requires backend confirmation before execution.`
                  );
                  setConfirm(null);
                }}
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