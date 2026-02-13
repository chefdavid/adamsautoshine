"use client";

import { useState, useRef, useEffect } from "react";
import { ICON_MAP, ICON_NAMES } from "@/lib/icon-map";

interface InlineIconProps {
  value: string;
  onChange: (name: string) => void;
  className?: string;
}

export function InlineIcon({ value, onChange, className = "" }: InlineIconProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICON_MAP[value];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`cursor-pointer border border-transparent rounded-lg p-1 -m-1 transition-all duration-200 hover:border-dashed hover:border-amber-500/60 hover:shadow-[0_0_8px_rgba(245,158,11,0.15)] ${className}`}
        title="Click to change icon"
      >
        {Icon && <Icon className="h-full w-full" />}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 top-full left-0 w-[280px] bg-[#1a1a3e] border border-white/10 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
          <div className="grid grid-cols-5 gap-1 p-2">
            {ICON_NAMES.map((name) => {
              const OptionIcon = ICON_MAP[name];
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] transition-colors ${
                    value === name
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                  title={name}
                >
                  <OptionIcon className="h-5 w-5" />
                  <span className="truncate w-full text-center">{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
