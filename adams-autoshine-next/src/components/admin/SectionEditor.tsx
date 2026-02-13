"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FloatingSaveBar } from "./inline/FloatingSaveBar";
import { Skeleton } from "@/components/ui/skeleton";

interface SectionEditorProps {
  section: string;
  title: string;
  description?: string;
  children: (props: {
    data: Record<string, unknown>;
    updateData: (newData: Record<string, unknown>) => void;
    updateField: (key: string, value: unknown) => void;
  }) => React.ReactNode;
}

export function SectionEditor({
  section,
  title,
  description,
  children,
}: SectionEditorProps) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle"
  );
  const originalData = useRef<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/content/${section}`);
        const json = await res.json();
        setData(json.data);
        originalData.current = JSON.parse(JSON.stringify(json.data));
      } catch {
        console.error("Failed to fetch section data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [section]);

  const updateData = useCallback((newData: Record<string, unknown>) => {
    setData(newData);
    setHasChanges(true);
    setSaveState("idle");
  }, []);

  const updateField = useCallback((key: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
    setHasChanges(true);
    setSaveState("idle");
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaveState("saving");

    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (res.ok) {
        setSaveState("saved");
        setHasChanges(false);
        originalData.current = JSON.parse(JSON.stringify(data));
        setTimeout(() => setSaveState("idle"), 2000);
      } else {
        setSaveState("idle");
        alert("Failed to save changes. Please try again.");
      }
    } catch {
      setSaveState("idle");
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleDiscard = () => {
    if (originalData.current) {
      setData(JSON.parse(JSON.stringify(originalData.current)));
      setHasChanges(false);
      setSaveState("idle");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 bg-slate-200" />
        <Skeleton className="h-4 w-96 bg-slate-200" />
        <Skeleton className="h-64 w-full bg-slate-200" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">
          No data found. Initialize content from the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && (
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        )}
      </div>

      {children({ data: data as Record<string, unknown>, updateData, updateField })}

      <FloatingSaveBar
        show={hasChanges}
        state={saveState}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
}
