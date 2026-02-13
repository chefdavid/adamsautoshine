"use client";

import { Loader2, Check, Save, Undo2 } from "lucide-react";

interface FloatingSaveBarProps {
  show: boolean;
  state: "idle" | "saving" | "saved";
  onSave: () => void;
  onDiscard: () => void;
}

export function FloatingSaveBar({ show, state, onSave, onDiscard }: FloatingSaveBarProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#141432]/95 backdrop-blur-sm border-t border-amber-500/30 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-amber-400 font-medium">
            Unsaved changes
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onDiscard}
              disabled={state === "saving"}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-40"
            >
              <Undo2 className="h-3.5 w-3.5" />
              Discard
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={state === "saving"}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                state === "saved"
                  ? "bg-emerald-500 text-white"
                  : state === "saving"
                  ? "bg-amber-400 text-white cursor-not-allowed"
                  : "btn-gradient text-[#0A0A1A] hover:shadow-amber-glow"
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
          </div>
        </div>
      </div>
    </div>
  );
}
