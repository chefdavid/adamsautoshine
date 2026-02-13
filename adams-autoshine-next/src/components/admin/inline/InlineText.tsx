"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";

interface InlineTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "span" | "p" | "div";
  inputType?: "text" | "number";
}

export function InlineText({
  value,
  onChange,
  className = "",
  placeholder = "Click to edit...",
  tag: Tag = "span",
  inputType = "text",
}: InlineTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const confirm = () => {
    setEditing(false);
    const finalValue = inputType === "number" ? draft : draft;
    if (finalValue !== String(value)) {
      onChange(inputType === "number" ? (Number(draft) as unknown as string) : draft);
    }
  };

  const cancel = () => {
    setEditing(false);
    setDraft(String(value));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      confirm();
    } else if (e.key === "Escape") {
      cancel();
    }
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        type={inputType}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={confirm}
        onKeyDown={handleKeyDown}
        className={`bg-transparent border-2 border-amber-500 rounded px-1 outline-none w-full ${className}`}
        style={{ font: "inherit", lineHeight: "inherit", letterSpacing: "inherit" }}
      />
    );
  }

  const displayValue = String(value) || placeholder;
  const isEmpty = !value;

  return (
    <Tag
      onClick={() => setEditing(true)}
      className={`cursor-pointer border border-transparent rounded px-1 -mx-1 transition-all duration-200 hover:border-dashed hover:border-amber-500/60 hover:shadow-[0_0_8px_rgba(245,158,11,0.15)] ${
        isEmpty ? "opacity-40 italic" : ""
      } ${className}`}
      title="Click to edit"
    >
      {displayValue}
    </Tag>
  );
}
