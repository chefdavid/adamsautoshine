"use client";

import { useState } from "react";
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";

interface InlineArrayManagerProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (item: T) => void) => React.ReactNode;
  createItem: () => T;
  className?: string;
  addLabel?: string;
}

export function InlineArrayManager<T>({
  items,
  onChange,
  renderItem,
  createItem,
  className = "",
  addLabel = "Add Item",
}: InlineArrayManagerProps<T>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const updateItem = (index: number) => (updated: T) => {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, createItem()]);
  };

  return (
    <div className={`relative ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {renderItem(item, index, updateItem(index))}

          {hoveredIndex === index && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full flex flex-col gap-0.5 z-10">
              <button
                type="button"
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                className="p-1 rounded bg-white/10 hover:bg-amber-500/30 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                title="Move up"
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className="p-1 rounded bg-white/10 hover:bg-amber-500/30 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                title="Move down"
              >
                <ChevronDown className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1 rounded bg-white/10 hover:bg-red-500/40 text-white/60 hover:text-red-300 transition-colors"
                title="Remove"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-white/40 text-xs hover:border-amber-500/50 hover:text-amber-400 transition-colors"
      >
        <Plus className="h-3 w-3" />
        {addLabel}
      </button>
    </div>
  );
}
