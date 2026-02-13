"use client";

interface InlineToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  className?: string;
}

export function InlineToggle({
  value,
  onChange,
  label,
  className = "",
}: InlineToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`inline-flex items-center gap-2 cursor-pointer transition-all duration-200 ${className}`}
      title={`Click to ${value ? "disable" : "enable"}`}
    >
      <div
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
          value ? "bg-amber-500" : "bg-white/10"
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
            value ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </div>
      {label && (
        <span className="text-xs text-text-muted">{label}</span>
      )}
    </button>
  );
}
