"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type PermissionKey =
  | "dashboard.view"
  | "projects.view"
  | "projects.create"
  | "projects.edit"
  | "projects.delete"
  | "tasks.view"
  | "tasks.create"
  | "tasks.edit"
  | "tasks.delete"
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "departments.view"
  | "departments.create"
  | "departments.edit"
  | "departments.delete"
  | "roles.view"
  | "roles.create"
  | "roles.edit"
  | "roles.delete"
  | "youtube.view"
  | "youtube.create"
  | "youtube.edit"
  | "youtube.delete"
  | "upcomingProjects.view"
  | "upcomingProjects.create"
  | "upcomingProjects.edit"
  | "upcomingProjects.delete"
  | "publishedWork.view"
  | "publishedWork.create"
  | "publishedWork.edit"
  | "publishedWork.delete"
  | "settings.manage";

type PermissionGroup = {
  key: string;
  label: string;
  permissions: {
    key: PermissionKey;
    label: string;
  }[];
};

type Role = {
  id: string;
  name: string;
  description: string;
  level: number;
  permissions: PermissionKey[];
  createdAt?: unknown;
  updatedAt?: unknown;
};

const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    permissions: [
      {
        key: "dashboard.view",
        label: "View",
      },
    ],
  },

  {
    key: "projects",
    label: "Projects",
    permissions: [
      {
        key: "projects.view",
        label: "View",
      },
      {
        key: "projects.create",
        label: "Create",
      },
      {
        key: "projects.edit",
        label: "Edit",
      },
      {
        key: "projects.delete",
        label: "Delete",
      },
    ],
  },

  {
    key: "tasks",
    label: "Tasks",
    permissions: [
      {
        key: "tasks.view",
        label: "View",
      },
      {
        key: "tasks.create",
        label: "Create",
      },
      {
        key: "tasks.edit",
        label: "Edit",
      },
      {
        key: "tasks.delete",
        label: "Delete",
      },
    ],
  },

  {
    key: "users",
    label: "Users",
    permissions: [
      {
        key: "users.view",
        label: "View",
      },
      {
        key: "users.create",
        label: "Create",
      },
      {
        key: "users.edit",
        label: "Edit",
      },
      {
        key: "users.delete",
        label: "Delete",
      },
    ],
  },

  {
    key: "departments",
    label: "Departments",
    permissions: [
      {
        key: "departments.view",
        label: "View",
      },
      {
        key: "departments.create",
        label: "Create",
      },
      {
        key: "departments.edit",
        label: "Edit",
      },
      {
        key: "departments.delete",
        label: "Delete",
      },
    ],
  },

  {
    key: "roles",
    label: "Roles & Permissions",
    permissions: [
      {
        key: "roles.view",
        label: "View",
      },
      {
        key: "roles.create",
        label: "Create",
      },
      {
        key: "roles.edit",
        label: "Edit",
      },
      {
        key: "roles.delete",
        label: "Delete",
      },
    ],
  },

  {
    key: "youtube",
    label: "YouTube",
    permissions: [
      {
        key: "youtube.view",
        label: "View",
      },
      {
        key: "youtube.create",
        label: "Create",
      },
      {
        key: "youtube.edit",
        label: "Edit",
      },
      {
        key: "youtube.delete",
        label: "Delete",
      },
    ],
  },

  {
    key: "upcomingProjects",
    label: "Upcoming Projects",
    permissions: [
      {
        key: "upcomingProjects.view",
        label: "View",
      },
      {
        key: "upcomingProjects.create",
        label: "Create",
      },
      {
        key: "upcomingProjects.edit",
        label: "Edit",
      },
      {
        key: "upcomingProjects.delete",
        label: "Delete",
      },
    ],
  },

  {
    key: "publishedWork",
    label: "Published Work",
    permissions: [
      {
        key: "publishedWork.view",
        label: "View",
      },
      {
        key: "publishedWork.create",
        label: "Create",
      },
      {
        key: "publishedWork.edit",
        label: "Edit",
      },
      {
        key: "publishedWork.delete",
        label: "Delete",
      },
    ],
  },

  {
    key: "settings",
    label: "Settings",
    permissions: [
      {
        key: "settings.manage",
        label: "Manage",
      },
    ],
  },
];

const DEFAULT_ROLES = [
  {
    name: "CEO",
    description:
      "Complete access to the entire YBN Group workspace.",
    level: 100,
  },
  {
    name: "Admin",
    description:
      "Organization and workspace management access.",
    level: 80,
  },
  {
    name: "Tech",
    description:
      "Technical projects, development and systems.",
    level: 50,
  },
  {
    name: "Audit",
    description:
      "Review, verification and audit operations.",
    level: 40,
  },
];

function getAllPermissions(): PermissionKey[] {
  return PERMISSION_GROUPS.flatMap((group) =>
    group.permissions.map((permission) => permission.key)
  );
}

function getDefaultPermissions(
  roleName: string
): PermissionKey[] {
  const allPermissions = getAllPermissions();

  switch (roleName) {
    case "CEO":
      return allPermissions;

    case "Admin":
      return allPermissions.filter((permission) => {
        if (
          permission === "roles.delete" ||
          permission === "users.delete" ||
          permission === "departments.delete" ||
          permission === "youtube.delete" ||
          permission === "upcomingProjects.delete" ||
          permission === "publishedWork.delete"
        ) {
          return false;
        }

        return true;
      });

    case "Tech":
      return [
        "dashboard.view",

        "projects.view",
        "projects.create",
        "projects.edit",

        "tasks.view",
        "tasks.create",
        "tasks.edit",

        "youtube.view",
        "youtube.create",
        "youtube.edit",

        "upcomingProjects.view",
        "upcomingProjects.create",
        "upcomingProjects.edit",

        "publishedWork.view",
        "publishedWork.create",
        "publishedWork.edit",
      ];

    case "Audit":
      return [
        "dashboard.view",
        "projects.view",
        "tasks.view",
        "users.view",
        "departments.view",
        "roles.view",
        "youtube.view",
        "upcomingProjects.view",
        "publishedWork.view",
      ];

    default:
      return [];
  }
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingRoleId, setEditingRoleId] =
    useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(10);
  const [permissions, setPermissions] = useState<
    PermissionKey[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadRoles() {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "roles")
      );

      const data: Role[] = snapshot.docs.map((item) => {
        const raw = item.data();

        return {
          id: item.id,
          name: String(raw.name ?? ""),
          description: String(raw.description ?? ""),
          level: Number(raw.level ?? 10),
          permissions: Array.isArray(raw.permissions)
            ? (raw.permissions as PermissionKey[])
            : [],
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
        };
      });

      data.sort((a, b) => b.level - a.level);

      setRoles(data);
    } catch (error) {
      console.error("Failed to load roles:", error);
      alert("Unable to load roles.");
    } finally {
      setLoading(false);
    }
  }

  async function createDefaultRoles() {
    try {
      const snapshot = await getDocs(
        collection(db, "roles")
      );

      const existingNames = snapshot.docs.map((item) =>
        String(item.data().name ?? "").toLowerCase()
      );

      const missingRoles = DEFAULT_ROLES.filter(
        (role) =>
          !existingNames.includes(role.name.toLowerCase())
      );

      if (missingRoles.length === 0) {
        return;
      }

      for (const role of missingRoles) {
        await addDoc(collection(db, "roles"), {
          name: role.name,
          description: role.description,
          level: role.level,
          permissions: getDefaultPermissions(role.name),
          createdAt: new Date(),
          updatedAt: new Date(),
          systemRole: true,
        });
      }
    } catch (error) {
      console.error(
        "Failed to create default roles:",
        error
      );
    }
  }

  useEffect(() => {
    async function initializeRoles() {
      await createDefaultRoles();
      await loadRoles();
    }

    initializeRoles();
  }, []);

  function resetForm() {
    setName("");
    setDescription("");
    setLevel(10);
    setPermissions([]);
    setEditingRoleId(null);
    setShowForm(false);
  }

  function startCreate() {
    setEditingRoleId(null);
    setName("Admin");
    setDescription(
      "Organization and workspace management access."
    );
    setLevel(80);
    setPermissions(getDefaultPermissions("Admin"));
    setShowForm(true);
  }

  function startEdit(role: Role) {
    if (role.name === "CEO") {
      alert("The CEO role cannot be edited.");
      return;
    }

    setEditingRoleId(role.id);
    setName(role.name);
    setDescription(role.description);
    setLevel(role.level);
    setPermissions(role.permissions);
    setShowForm(true);
  }

  function togglePermission(
    permission: PermissionKey
  ) {
    setPermissions((current) => {
      if (current.includes(permission)) {
        return current.filter(
          (item) => item !== permission
        );
      }

      return [...current, permission];
    });
  }

  function toggleGroup(group: PermissionGroup) {
    const groupPermissions = group.permissions.map(
      (permission) => permission.key
    );

    const allSelected = groupPermissions.every(
      (permission) =>
        permissions.includes(permission)
    );

    if (allSelected) {
      setPermissions((current) =>
        current.filter(
          (permission) =>
            !groupPermissions.includes(permission)
        )
      );
    } else {
      setPermissions((current) => [
        ...new Set([
          ...current,
          ...groupPermissions,
        ]),
      ]);
    }
  }

  async function saveRole() {
    const cleanName = name.trim();

    if (!cleanName) {
      alert("Please enter a role name.");
      return;
    }

    if (cleanName.length < 2) {
      alert("Role name must contain at least 2 characters.");
      return;
    }

    if (cleanName.toLowerCase() === "ceo") {
      alert("The CEO role is a protected system role.");
      return;
    }

    if (level < 1 || level > 99) {
      alert(
        "Access level must be between 1 and 99."
      );
      return;
    }

    if (permissions.length === 0) {
      alert(
        "Please select at least one permission."
      );
      return;
    }

    const duplicate = roles.some(
      (role) =>
        role.name.toLowerCase() ===
          cleanName.toLowerCase() &&
        role.id !== editingRoleId
    );

    if (duplicate) {
      alert(
        "A role with this name already exists."
      );
      return;
    }

    try {
      setSaving(true);

      const roleData = {
        name: cleanName,
        description: description.trim(),
        level,
        permissions: [...new Set(permissions)],
        updatedAt: new Date(),
      };

      if (editingRoleId) {
        await updateDoc(
          doc(db, "roles", editingRoleId),
          roleData
        );
      } else {
        await addDoc(collection(db, "roles"), {
          ...roleData,
          createdAt: new Date(),
          systemRole: false,
        });
      }

      resetForm();
      await loadRoles();
    } catch (error) {
      console.error(
        "Failed to save role:",
        error
      );

      alert(
        "Unable to save the role. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteRole(role: Role) {
    if (role.name === "CEO") {
      alert(
        "The CEO role cannot be deleted."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete the ${role.name} role?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(
        doc(db, "roles", role.id)
      );

      if (editingRoleId === role.id) {
        resetForm();
      }

      await loadRoles();
    } catch (error) {
      console.error(
        "Failed to delete role:",
        error
      );

      alert(
        "Unable to delete the role. Please try again."
      );
    }
  }

  const totalPermissions =
    getAllPermissions().length;

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* ================= HEADER ================= */}

      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple-400">
              Organization
            </p>

            <h1 className="mt-1 text-xl font-semibold">
              Roles & Permissions
            </h1>
          </div>

          <button
            type="button"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                startCreate();
              }
            }}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            {showForm
              ? "Close"
              : "+ Create Role"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* ================= INTRO ================= */}

        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
            Access Control
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Roles & Permissions
          </h2>

          <p className="mt-2 max-w-2xl text-gray-500">
            Define exactly what each role can view,
            create, edit and delete across the YBN
            Group workspace.
          </p>
        </div>

        {/* ================= CREATE / EDIT FORM ================= */}

        {showForm && (
          <section className="rounded-2xl border border-purple-500/20 bg-white/[0.03] p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h3 className="text-xl font-semibold">
                  {editingRoleId
                    ? "Edit Role"
                    : "Create Role"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Assign only the permissions this
                  role should have.
                </p>
              </div>

              <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.05] px-4 py-3 text-right">
                <p className="text-[10px] uppercase tracking-wider text-gray-600">
                  Selected Permissions
                </p>

                <p className="mt-1 text-lg font-bold text-purple-300">
                  {permissions.length}
                </p>
              </div>
            </div>

            {/* BASIC DETAILS */}

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Role Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Example: Marketing Manager"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none transition placeholder:text-gray-700 focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Access Level
                </label>

                <input
                  type="number"
                  min={1}
                  max={99}
                  value={level}
                  onChange={(e) =>
                    setLevel(
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-purple-500/50"
                />

                <p className="mt-2 text-xs text-gray-600">
                  1 = lowest access · 99 =
                  highest custom access
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Describe this role's responsibilities..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none transition placeholder:text-gray-700 focus:border-purple-500/50"
                />
              </div>
            </div>

            {/* PERMISSIONS */}

            <div className="mt-8">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h4 className="font-semibold">
                    Permissions
                  </h4>

                  <p className="mt-1 text-sm text-gray-600">
                    Select only the actions this role
                    is allowed to perform.
                  </p>
                </div>

                <div className="text-xs text-gray-600">
                  {permissions.length} selected
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {PERMISSION_GROUPS.map(
                  (group) => {
                    const groupPermissions =
                      group.permissions.map(
                        (permission) =>
                          permission.key
                      );

                    const allSelected =
                      groupPermissions.every(
                        (permission) =>
                          permissions.includes(
                            permission
                          )
                      );

                    return (
                      <div
                        key={group.key}
                        className="rounded-2xl border border-white/[0.08] bg-black/20 p-5"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium">
                            {group.label}
                          </h5>

                          <button
                            type="button"
                            onClick={() =>
                              toggleGroup(group)
                            }
                            className="text-xs text-purple-400 transition hover:text-purple-300"
                          >
                            {allSelected
                              ? "Clear"
                              : "Select All"}
                          </button>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {group.permissions.map(
                            (permission) => {
                              const selected =
                                permissions.includes(
                                  permission.key
                                );

                              return (
                                <button
                                  key={
                                    permission.key
                                  }
                                  type="button"
                                  onClick={() =>
                                    togglePermission(
                                      permission.key
                                    )
                                  }
                                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition ${
                                    selected
                                      ? "border-purple-500/30 bg-purple-500/10 text-purple-300"
                                      : "border-white/[0.06] bg-white/[0.02] text-gray-600 hover:border-white/10 hover:text-gray-300"
                                  }`}
                                >
                                  <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                                      selected
                                        ? "border-purple-400 bg-purple-500 text-white"
                                        : "border-white/20"
                                    }`}
                                  >
                                    {selected
                                      ? "✓"
                                      : ""}
                                  </span>

                                  {
                                    permission.label
                                  }
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* FORM ACTIONS */}

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={saveRole}
                disabled={saving}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingRoleId
                    ? "Save Changes"
                    : "Create Role"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </section>
        )}

        {/* ================= ROLE LIST ================= */}

        <section className="mt-10">
          <div className="mb-5">
            <h3 className="text-lg font-semibold">
              Organization Roles
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Every user will inherit permissions
              from their assigned role.
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-sm text-gray-500">
                Loading roles...
              </p>
            </div>
          ) : roles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
              <h4 className="font-semibold">
                No roles created yet
              </h4>

              <p className="mt-2 text-sm text-gray-600">
                Create your first role to define
                workspace access.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => {
                const isCEO =
                  role.name === "CEO";

                const permissionCount = isCEO
                  ? totalPermissions
                  : role.permissions.length;

                const permissionPercentage =
                  totalPermissions > 0
                    ? Math.min(
                        100,
                        (permissionCount /
                          totalPermissions) *
                          100
                      )
                    : 0;

                return (
                  <div
                    key={role.id}
                    className={`rounded-2xl border p-6 ${
                      isCEO
                        ? "border-purple-500/30 bg-purple-500/[0.05]"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    {/* HEADER */}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold">
                          {role.name}
                        </h4>

                        <p className="mt-1 text-xs text-gray-600">
                          Access Level{" "}
                          {role.level}
                        </p>
                      </div>

                      {isCEO && (
                        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-[10px] font-semibold text-purple-400">
                          FULL ACCESS
                        </span>
                      )}
                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-4 min-h-[48px] text-sm leading-6 text-gray-500">
                      {role.description ||
                        "No description added."}
                    </p>

                    {/* PERMISSION COUNT */}

                    <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Permissions
                        </span>

                        <span className="text-sm font-semibold text-purple-300">
                          {permissionCount}
                        </span>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                          style={{
                            width: `${permissionPercentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      {isCEO ? (
                        <span className="text-xs text-gray-600">
                          Protected system role
                        </span>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              startEdit(role)
                            }
                            className="text-xs text-purple-400 transition hover:text-purple-300"
                          >
                            Edit Permissions
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteRole(role)
                            }
                            className="text-xs text-red-400 transition hover:text-red-300"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ================= SECURITY NOTE ================= */}

        <section className="mt-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              ✓
            </div>

            <div>
              <h4 className="font-semibold">
                Permission-Based Access
              </h4>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                Users should only receive the
                permissions assigned to their role.
                The interface can hide unauthorized
                actions, while Firebase Security Rules
                must enforce the same permissions on
                the server side.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}