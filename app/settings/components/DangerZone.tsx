"use client";

import { useState } from "react";

type DangerActionProps = {
  title: string;
  description: string;
};

function DangerAction({
  title,
  description,
}: DangerActionProps) {
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
              This action may permanently affect your
              NEXORA workspace and data.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setConfirm(false);
                }}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
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

export default function DangerZone() {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03]">
      <div className="border-b border-red-500/10 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          These actions can permanently affect your
          NEXORA workspace and data.
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