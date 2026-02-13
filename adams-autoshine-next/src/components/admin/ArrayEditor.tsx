"use client";

import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";

interface ArrayEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (item: T) => void) => React.ReactNode;
  createItem: () => T;
  itemLabel?: (item: T, index: number) => string;
}

export function ArrayEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  itemLabel,
}: ArrayEditorProps<T>) {
  const addItem = () => {
    onChange([...items, createItem()]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, item: T) => {
    const newItems = [...items];
    newItems[index] = item;
    onChange(newItems);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-slate-200 rounded-lg p-4 bg-slate-50"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-slate-300" />
              <span className="text-sm font-medium text-slate-600">
                {itemLabel ? itemLabel(item, index) : `Item ${index + 1}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
                className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, "down")}
                disabled={index === items.length - 1}
                className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          {renderItem(item, index, (updated) => updateItem(index, updated))}
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-amber-600 border border-dashed border-amber-300 rounded-lg hover:bg-amber-50 transition-colors w-full justify-center"
      >
        <Plus className="h-4 w-4" />
        Add Item
      </button>
    </div>
  );
}
