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
    description: "Personal account settings",
    icon: "●",
  },
  {
    id: "workspace",
    title: "Workspace / Company",
    description: "Company and workspace",
    icon: "▣",
  },
  {
    id: "access",
    title: "Users & Access",
    description: "Users, roles and permissions",
    icon: "♙",
  },
  {
    id: "security",
    title: "Security",
    description: "Account protection",
    icon: "◆",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Notification preferences",
    icon: "●",
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Theme and dashboard",
    icon: "◐",
  },
  {
    id: "content",
    title: "Content",
    description: "Content and media",
    icon: "▶",
  },
  {
    id: "projects",
    title: "Projects & Tasks",
    description: "Project configuration",
    icon: "✓",
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "External services",
    icon: "⌘",
  },
  {
    id: "data",
    title: "Data",
    description: "Import and export",
    icon: "▤",
  },
  {
    id: "system",
    title: "System",
    description: "System administration",
    icon: "⚙",
  },
];

const toggleDefaults = {
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
  theme: "Dark",
  companyName: "",
  companyDescription: "",
  websiteUrl: "",
  contactInformation: "",
  dashboardLayout: "Default",
  accentColor: "Purple",
  youtubeChannel: "",
};

type ToggleKey = keyof typeof toggleDefaults;

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [language, setLanguage] = useState(defaultValues.language);
  const [currency, setCurrency] = useState(defaultValues.currency);
  const [timezone, setTimezone] = useState(defaultValues.timezone);

  const [theme, setTheme] = useState(defaultValues.theme);

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

  /* -----------------------------
     THEME
  ----------------------------- */

  function applyTheme(value: string) {
    const root = document.documentElement;

    root.classList.remove("dark", "light");

    if (value === "Dark") {
      root.classList.add("dark");
      return;
    }

    if (value === "Light") {
      root.classList.add("light");
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.add(prefersDark ? "dark" : "light");
  }

  /* -----------------------------
     LOAD SETTINGS
  ----------------------------- */

  useEffect(() => {
    const get = (key: string, fallback: string) =>
      localStorage.getItem(key) ?? fallback;

    setLanguage(get("nexora-language", defaultValues.language));
    setCurrency(get("nexora-currency", defaultValues.currency));
    setTimezone(get("nexora-timezone", defaultValues.timezone));

    setTheme(get("nexora-theme", defaultValues.theme));

    setCompanyName(get("nexora-company-name", ""));
    setCompanyDescription(
      get("nexora-company-description", "")
    );

    setWebsiteUrl(get("nexora-website-url", ""));
    setContactInformation(
      get("nexora-contact-information", "")
    );

    setDashboardLayout(
      get(
        "nexora-dashboard-layout",
        defaultValues.dashboardLayout
      )
    );

    setAccentColor(
      get("nexora-accent-color", defaultValues.accentColor)
    );

    setYoutubeChannel(
      get("nexora-youtube-channel", "")
    );

    const savedToggles = { ...toggleDefaults };

    (
      Object.keys(toggleDefaults) as ToggleKey[]
    ).forEach((key) => {
      const saved = localStorage.getItem(
        `nexora-toggle-${key}`
      );

      if (saved !== null) {
        savedToggles[key] = saved === "true";
      }
    });

    setToggles(savedToggles);

    applyTheme(
      get("nexora-theme", defaultValues.theme)
    );

    document.documentElement.setAttribute(
      "data-accent",
      get(
        "nexora-accent-color",
        defaultValues.accentColor
      )
    );

    setLoaded(true);
  }, []);

  /* -----------------------------
     LIVE THEME
  ----------------------------- */

  useEffect(() => {
    if (!loaded) return;

    applyTheme(theme);

    document.documentElement.setAttribute(
      "data-accent",
      accentColor
    );

    if (theme !== "System") return;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      applyTheme("System");
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [theme, accentColor, loaded]);

  /* -----------------------------
     HELPERS
  ----------------------------- */

  function save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function selectSection(id: string) {
    setActiveSection(id);
    setMobileMenuOpen(false);
  }

  function updateLanguage(value: string) {
    setLanguage(value);
    save("nexora-language", value);
  }

  function updateCurrency(value: string) {
    setCurrency(value);
    save("nexora-currency", value);
  }

  function updateTimezone(value: string) {
    setTimezone(value);
    save("nexora-timezone", value);
  }

  function updateTheme(value: string) {
    setTheme(value);
    save("nexora-theme", value);
    applyTheme(value);
  }

  function updateCompanyName(value: string) {
    setCompanyName(value);
    save("nexora-company-name", value);
  }

  function updateCompanyDescription(value: string) {
    setCompanyDescription(value);
    save("nexora-company-description", value);
  }

  function updateWebsiteUrl(value: string) {
    setWebsiteUrl(value);
    save("nexora-website-url", value);
  }

  function updateContactInformation(value: string) {
    setContactInformation(value);
    save("nexora-contact-information", value);
  }

  function updateDashboardLayout(value: string) {
    setDashboardLayout(value);
    save("nexora-dashboard-layout", value);
  }

  function updateAccentColor(value: string) {
    setAccentColor(value);
    save("nexora-accent-color", value);

    document.documentElement.setAttribute(
      "data-accent",
      value
    );
  }

  function updateYoutubeChannel(value: string) {
    setYoutubeChannel(value);
    save("nexora-youtube-channel", value);
  }

  function toggleSetting(key: ToggleKey) {
    setToggles((current) => {
      const newValue = !current[key];

      localStorage.setItem(
        `nexora-toggle-${key}`,
        String(newValue)
      );

      return {
        ...current,
        [key]: newValue,
      };
    });
  }

  /* -----------------------------
     PAGE
  ----------------------------- */

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="flex min-h-screen">
        {/* LEFT SETTINGS SIDEBAR */}

        <SettingsSidebar
          sections={sections}
          activeSection={activeSection}
          onSelect={selectSection}
        />

        {/* MAIN */}

        <section className="min-w-0 flex-1">
          {/* HEADER */}

          <header className="border-b border-white/10 px-5 py-6 sm:px-6 lg:px-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                  System Control
                </p>

                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Settings
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Manage your NEXORA account, workspace,
                  security, notifications, content,
                  projects and system controls.
                </p>
              </div>

              {/* MOBILE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(true)
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:bg-white/[0.06] lg:hidden"
              >
                Settings
              </button>
            </div>
          </header>

          {/* CONTENT */}

          <div className="px-5 py-6 sm:px-6 sm:py-8 lg:px-10">
            {activeSection === "danger" ? (
              <DangerZone />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="border-b border-white/10 p-6 sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400">
                    Settings
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {activeSectionData?.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
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
                    companyDescription={
                      companyDescription
                    }
                    websiteUrl={websiteUrl}
                    contactInformation={
                      contactInformation
                    }
                    timezone={timezone}
                    language={language}
                    currency={currency}
                    onCompanyNameChange={
                      updateCompanyName
                    }
                    onCompanyDescriptionChange={
                      updateCompanyDescription
                    }
                    onWebsiteUrlChange={
                      updateWebsiteUrl
                    }
                    onContactInformationChange={
                      updateContactInformation
                    }
                    onTimezoneChange={
                      updateTimezone
                    }
                    onLanguageChange={
                      updateLanguage
                    }
                    onCurrencyChange={
                      updateCurrency
                    }
                  />
                )}

                {activeSection === "access" && (
                  <AccessSettings />
                )}

                {activeSection === "security" && (
                  <SecuritySettings
                    enabled={toggles.twoFactor}
                    onToggle={() =>
                      toggleSetting("twoFactor")
                    }
                  />
                )}

                {activeSection ===
                  "notifications" && (
                  <NotificationSettings
                    toggles={toggles}
                    onToggle={toggleSetting}
                  />
                )}

                {activeSection === "appearance" && (
                  <AppearanceSettings
                    theme={theme}
                    dashboardLayout={
                      dashboardLayout
                    }
                    accentColor={accentColor}
                    onThemeChange={updateTheme}
                    onDashboardLayoutChange={
                      updateDashboardLayout
                    }
                    onAccentColorChange={
                      updateAccentColor
                    }
                  />
                )}

                {activeSection === "content" && (
                  <ContentSettings
                    youtubeChannel={
                      youtubeChannel
                    }
                    onYoutubeChannelChange={
                      updateYoutubeChannel
                    }
                  />
                )}

                {activeSection === "projects" && (
                  <ProjectsSettings />
                )}

                {activeSection ===
                  "integrations" && (
                  <IntegrationsSettings />
                )}

                {activeSection === "data" && (
                  <DataSettings />
                )}

                {activeSection === "system" && (
                  <SystemSettings
                    enabled={
                      toggles.maintenanceMode
                    }
                    onToggle={() =>
                      toggleSetting(
                        "maintenanceMode"
                      )
                    }
                  />
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* MOBILE SETTINGS DRAWER */}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 lg:hidden"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        >
          <div
            className="h-full"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex h-full">
              <div className="h-full">
                <div className="absolute right-4 top-4 z-10">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="rounded-lg border border-white/10 bg-[#101010] px-3 py-2 text-gray-400"
                  >
                    ×
                  </button>
                </div>

                <SettingsSidebar
                  sections={sections}
                  activeSection={activeSection}
                  onSelect={selectSection}
                  mobile
                />
              </div>

              <div className="flex-1" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =====================================================
   ACCOUNT
===================================================== */

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
        control={
          <span className="text-xs text-gray-600">
            Coming with account profile
          </span>
        }
      />

      <SettingRow
        title="Name"
        description="Your display name for the NEXORA workspace."
        control={
          <span className="text-xs text-gray-600">
            Account
          </span>
        }
      />

      <SettingRow
        title="Email"
        description="Your account email address."
        control={
          <span className="text-xs text-gray-600">
            Firebase Auth
          </span>
        }
      />

      <SettingRow
        title="Profile Photo"
        description="Update your account profile photo."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Profile photo upload will be connected to Firebase Storage."
              )
            }
            className="button-secondary"
          >
            Change
          </button>
        }
      />

      <SettingRow
        title="Change Password"
        description="Change your account password."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Password change will be connected to Firebase Authentication."
              )
            }
            className="button-secondary"
          >
            Change
          </button>
        }
      />

      <SettingRow
        title="Login Sessions"
        description="Review active login sessions."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Session management will be connected to authentication."
              )
            }
            className="button-secondary"
          >
            View
          </button>
        }
      />

      <SettingRow
        title="Logout"
        description="Sign out from your NEXORA account."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Logout will be connected to Firebase Authentication."
              )
            }
            className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
          >
            Logout
          </button>
        }
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

/* =====================================================
   WORKSPACE
===================================================== */

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
  onCompanyDescriptionChange: (
    value: string
  ) => void;
  onWebsiteUrlChange: (value: string) => void;
  onContactInformationChange: (
    value: string
  ) => void;
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
        description="Company phone, email or other contact information."
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
            options={[
              "INR",
              "USD",
              "EUR",
              "GBP",
              "AED",
            ]}
          />
        }
      />
    </div>
  );
}

/* =====================================================
   ACCESS
===================================================== */

function AccessSettings() {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="User Management"
        description="Manage workspace users."
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

/* =====================================================
   SECURITY
===================================================== */

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
        control={
          <Toggle
            enabled={enabled}
            onClick={onToggle}
          />
        }
      />

      <SettingRow
        title="Password & Security"
        description="Review and manage password security."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Password security will be connected to Firebase Authentication."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />

      <SettingRow
        title="Active Sessions"
        description="Review devices currently signed into your account."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Active sessions will be connected to authentication."
              )
            }
            className="button-secondary"
          >
            View
          </button>
        }
      />

      <SettingRow
        title="Login History"
        description="Review recent account login activity."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Login history will be connected to backend audit logs."
              )
            }
            className="button-secondary"
          >
            View
          </button>
        }
      />

      <SettingRow
        title="Device Management"
        description="Manage devices connected to your account."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Device management will be connected to authentication."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />

      <SettingRow
        title="Security Alerts"
        description="Receive important security notifications."
        control={
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
            Enabled
          </span>
        }
      />
    </div>
  );
}

/* =====================================================
   NOTIFICATIONS
===================================================== */

function NotificationSettings({
  toggles,
  onToggle,
}: {
  toggles: typeof toggleDefaults;
  onToggle: (key: ToggleKey) => void;
}) {
  const items: {
    key: ToggleKey;
    title: string;
    description: string;
  }[] = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive important notifications by email.",
    },
    {
      key: "taskNotifications",
      title: "Task Notifications",
      description:
        "Receive updates about assigned tasks.",
    },
    {
      key: "projectNotifications",
      title: "Project Notifications",
      description:
        "Receive updates about projects.",
    },
    {
      key: "userActivity",
      title: "User Activity",
      description:
        "Receive notifications about workspace activity.",
    },
    {
      key: "securityAlerts",
      title: "Security Alerts",
      description:
        "Receive important security alerts.",
    },
    {
      key: "publishedNotifications",
      title: "Published Work Notifications",
      description:
        "Receive notifications when published work changes.",
    },
  ];

  return (
    <div className="divide-y divide-white/10">
      {items.map((item) => (
        <SettingRow
          key={item.key}
          title={item.title}
          description={item.description}
          control={
            <Toggle
              enabled={toggles[item.key]}
              onClick={() =>
                onToggle(item.key)
              }
            />
          }
        />
      ))}
    </div>
  );
}

/* =====================================================
   APPEARANCE
===================================================== */

function AppearanceSettings({
  theme,
  dashboardLayout,
  accentColor,
  onThemeChange,
  onDashboardLayoutChange,
  onAccentColorChange,
}: {
  theme: string;
  dashboardLayout: string;
  accentColor: string;
  onThemeChange: (value: string) => void;
  onDashboardLayoutChange: (
    value: string
  ) => void;
  onAccentColorChange: (
    value: string
  ) => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Theme"
        description="Choose how NEXORA should appear."
        control={
          <Select
            value={theme}
            onChange={onThemeChange}
            options={[
              "Dark",
              "Light",
              "System",
            ]}
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
            options={[
              "Default",
              "Compact",
              "Wide",
            ]}
          />
        }
      />

      <SettingRow
        title="Sidebar Settings"
        description="Configure dashboard sidebar behaviour."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Sidebar is currently fixed on the left side."
              )
            }
            className="button-secondary"
          >
            Left Sidebar
          </button>
        }
      />
    </div>
  );
}

/* =====================================================
   CONTENT
===================================================== */

function ContentSettings({
  youtubeChannel,
  onYoutubeChannelChange,
}: {
  youtubeChannel: string;
  onYoutubeChannelChange: (
    value: string
  ) => void;
}) {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="YouTube Settings"
        description="Configure YouTube publishing preferences."
        href="/youtube"
      />

      <SettingRow
        title="Published Work"
        description="Configure published work preferences."
        href="/published-work"
      />

      <SettingRow
        title="Media Settings"
        description="Manage media and content preferences."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Media preferences are ready for backend integration."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />

      <SettingRow
        title="Upload Preferences"
        description="Configure default upload behaviour."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Upload preferences are ready for backend integration."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
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

/* =====================================================
   PROJECTS
===================================================== */

function ProjectsSettings() {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Projects"
        description="Manage projects."
        href="/projects"
      />

      <SettingRow
        title="Tasks"
        description="Manage task workflow."
        href="/tasks"
      />

      <SettingRow
        title="Task Statuses"
        description="Configure task workflow statuses."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Task status configuration will be connected to the Tasks module."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />

      <SettingRow
        title="Priority Levels"
        description="Configure project and task priorities."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Priority configuration will be connected to the Projects module."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />

      <SettingRow
        title="Project Visibility"
        description="Configure who can see projects."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Project visibility will be connected to roles and permissions."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />

      <SettingRow
        title="Default Assignments"
        description="Configure default project assignments."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Default assignments will be connected to Users and Roles."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />
    </div>
  );
}

/* =====================================================
   INTEGRATIONS
===================================================== */

function IntegrationsSettings() {
  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Firebase"
        description="Authentication and database integration."
        control={
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
            Connected
          </span>
        }
      />

      <SettingRow
        title="YouTube"
        description="YouTube API integration."
        href="/youtube"
      />

      <SettingRow
        title="Google Services"
        description="Google service integrations."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Google Services integration will be configured here."
              )
            }
            className="button-secondary"
          >
            Configure
          </button>
        }
      />

      <SettingRow
        title="Email Service"
        description="Configure email delivery services."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Email service configuration will be added when the backend is connected."
              )
            }
            className="button-secondary"
          >
            Configure
          </button>
        }
      />

      <SettingRow
        title="Other API Integrations"
        description="Manage additional API connections."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Additional API integrations will be managed here."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />
    </div>
  );
}

/* =====================================================
   DATA
===================================================== */

function DataSettings() {
  function exportSettings() {
    const data: Record<string, unknown> = {};

    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);

      if (key?.startsWith("nexora-")) {
        data[key] = localStorage.getItem(key);
      }
    }

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "nexora-settings-backup.json";

    document.body.appendChild(link);
    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  }

  function importSettings() {
    const input =
      document.createElement("input");

    input.type = "file";
    input.accept = ".json,application/json";

    input.onchange = () => {
      const file = input.files?.[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        try {
          const parsed = JSON.parse(
            String(reader.result)
          );

          Object.entries(parsed).forEach(
            ([key, value]) => {
              if (
                key.startsWith("nexora-") &&
                typeof value === "string"
              ) {
                localStorage.setItem(
                  key,
                  value
                );
              }
            }
          );

          alert(
            "Settings imported successfully. Reloading..."
          );

          window.location.reload();
        } catch {
          alert(
            "Invalid NEXORA settings file."
          );
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }

  return (
    <div className="divide-y divide-white/10">
      <SettingRow
        title="Export Settings"
        description="Download your current NEXORA settings as a JSON file."
        control={
          <button
            type="button"
            onClick={exportSettings}
            className="button-secondary"
          >
            Export
          </button>
        }
      />

      <SettingRow
        title="Import Settings"
        description="Restore settings from a NEXORA JSON backup."
        control={
          <button
            type="button"
            onClick={importSettings}
            className="button-secondary"
          >
            Import
          </button>
        }
      />

      <SettingRow
        title="Backup"
        description="Create a local backup of NEXORA settings."
        control={
          <button
            type="button"
            onClick={exportSettings}
            className="button-secondary"
          >
            Backup
          </button>
        }
      />

      <SettingRow
        title="Activity Logs"
        description="Review workspace activity logs."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Activity logs will be connected to Firestore."
              )
            }
            className="button-secondary"
          >
            View
          </button>
        }
      />

      <SettingRow
        title="Delete Local Settings"
        description="Remove all locally saved NEXORA settings from this browser."
        control={
          <button
            type="button"
            onClick={() => {
              const confirmed =
                window.confirm(
                  "Delete all locally saved NEXORA settings?"
                );

              if (!confirmed) return;

              Object.keys(localStorage)
                .filter((key) =>
                  key.startsWith("nexora-")
                )
                .forEach((key) =>
                  localStorage.removeItem(key)
                );

              window.location.reload();
            }}
            className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>
        }
      />
    </div>
  );
}

/* =====================================================
   SYSTEM
===================================================== */

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
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Audit logs will be connected to Firestore."
              )
            }
            className="button-secondary"
          >
            View
          </button>
        }
      />

      <SettingRow
        title="Admin Activity"
        description="Review administrator actions."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "Admin activity will be connected to Firestore."
              )
            }
            className="button-secondary"
          >
            View
          </button>
        }
      />

      <SettingRow
        title="API Settings"
        description="Manage application API configuration."
        control={
          <button
            type="button"
            onClick={() =>
              alert(
                "API configuration will be added when backend API management is implemented."
              )
            }
            className="button-secondary"
          >
            Manage
          </button>
        }
      />
    </div>
  );
}

/* =====================================================
   DANGER ZONE
===================================================== */

function DangerZone() {
  const [confirm, setConfirm] =
    useState<string | null>(null);

  const actions = [
    {
      title: "Reset Workspace",
      description:
        "Reset locally saved workspace configuration.",
      action: "reset",
    },
    {
      title: "Delete Users",
      description:
        "User deletion requires backend confirmation.",
      action: "users",
    },
    {
      title: "Delete Workspace",
      description:
        "Workspace deletion requires backend confirmation.",
      action: "workspace",
    },
    {
      title: "Permanently Delete Account",
      description:
        "Account deletion requires Firebase backend confirmation.",
      action: "account",
    },
  ];

  function execute(action: string) {
    if (action === "reset") {
      Object.keys(localStorage)
        .filter((key) =>
          key.startsWith("nexora-")
        )
        .forEach((key) =>
          localStorage.removeItem(key)
        );

      alert(
        "Local NEXORA settings have been reset."
      );

      window.location.reload();

      return;
    }

    alert(
      "This destructive action is protected until backend/Firebase confirmation is connected."
    );

    setConfirm(null);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/[0.03]">
      <div className="border-b border-red-500/10 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-red-400">
          Advanced
        </p>

        <h2 className="mt-2 text-xl font-semibold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          These actions can permanently affect your
          workspace and data.
        </p>
      </div>

      <div className="divide-y divide-red-500/10">
        {actions.map((action) => (
          <div
            key={action.title}
            className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-sm font-medium">
                {action.title}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {action.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setConfirm(action.title)
              }
              className="self-start rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 sm:self-auto"
            >
              Manage
            </button>
          </div>
        ))}
      </div>

      {confirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={() => setConfirm(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#101010] p-6"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <h2 className="text-lg font-semibold text-red-400">
              {confirm}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Are you sure you want to continue?
              Destructive backend actions will only
              execute after Firebase/backend
              confirmation is implemented.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setConfirm(null)
                }
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  execute(
                    actions.find(
                      (item) =>
                        item.title === confirm
                    )?.action ?? ""
                  )
                }
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

/* =====================================================
   GENERIC COMPONENTS
===================================================== */

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
    <div className="flex flex-col gap-4 p-5 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="min-w-0">
        <h3 className="text-sm font-medium text-white">
          {title}
        </h3>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-600">
          {description}
        </p>
      </div>

      <div className="shrink-0">
        {control ? (
          control
        ) : href ? (
          <a
            href={href}
            className="button-secondary inline-block"
          >
            Open
          </a>
        ) : (
          <span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-600">
            Manage
          </span>
        )}
      </div>
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
    <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h3 className="text-sm font-medium text-white">
          {title}
        </h3>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-600">
          {description}
        </p>
      </div>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500/50 lg:max-w-md"
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
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="min-w-[130px] rounded-lg border border-white/10 bg-[#101010] px-3 py-2 text-xs text-white outline-none focus:border-purple-500/50"
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
      aria-pressed={enabled}
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
  );
}