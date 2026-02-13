"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";

interface InlineTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function InlineTextArea({
  value,
  onChange,
  className = "",
  placeholder = "Click to edit...",
}: InlineTextAreaProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
      autoResize();
    }
  }, [editing]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  const confirm = () => {
    setEditing(false);
    if (draft !== value) {
      onChange(draft);
    }
  };

  const cancel = () => {
    setEditing(false);
    setDraft(value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      cancel();
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      confirm();
    }
  };

  if (editing) {
    return (
      <textarea
        ref={textareaRef}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          autoResize();
        }}
        onBlur={confirm}
        onKeyDown={handleKeyDown}
        className={`bg-transparent border-2 border-amber-500 rounded px-1 outline-none w-full resize-none ${className}`}
        style={{ font: "inherit", lineHeight: "inherit", letterSpacing: "inherit" }}
        rows={2}
      />
    );
  }

  const displayValue = value || placeholder;
  const isEmpty = !value;

  return (
    <p
      onClick={() => setEditing(true)}
      className={`cursor-pointer border border-transparent rounded px-1 -mx-1 transition-all duration-200 hover:border-dashed hover:border-amber-500/60 hover:shadow-[0_0_8px_rgba(245,158,11,0.15)] whitespace-pre-wrap ${
        isEmpty ? "opacity-40 italic" : ""
      } ${className}`}
      title="Click to edit (Ctrl+Enter to save)"
    >
      {displayValue}
    </p>
  );
}
