"use client";

import { useEffect, useState } from "react";

type SettingsModalProps = {
  title: string;
  onClose: () => void;
};

export default function SettingsModal({
  title,
  onClose,
}: SettingsModalProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const savedValue = localStorage.getItem(
      `nexora-value-${title}`
    );

    if (savedValue !== null) {
      setValue(savedValue);
    }
  }, [title]);

  function saveSetting() {
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
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-purple-400">
              Settings
            </p>

            <h2 className="mt-2 text-lg font-semibold text-white">
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

        <div className="p-6">
          <label className="text-sm text-gray-400">
            {title}
          </label>

          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={`Enter ${title.toLowerCase()}`}
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500/50"
          />

          <p className="mt-3 text-xs text-gray-600">
            Your setting will be saved locally for this
            NEXORA workspace.
          </p>
        </div>

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
            onClick={saveSetting}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}