"use client";

import { Loader2, Check, Save } from "lucide-react";

interface SaveButtonProps {
  state: "idle" | "saving" | "saved";
  onClick: () => void;
}

export function SaveButton({ state, onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={state === "saving"}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
        state === "saved"
          ? "bg-emerald-500 text-white"
          : state === "saving"
          ? "bg-amber-400 text-white cursor-not-allowed"
          : "bg-amber-500 text-white hover:bg-amber-600"
      }`}
    >
      {state === "saving" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : state === "saved" ? (
        <>
          <Check className="h-4 w-4" />
          Saved!
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save Changes
        </>
      )}
    </button>
  );
}
