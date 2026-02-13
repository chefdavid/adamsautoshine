"use client";

interface DarkPreviewContainerProps {
  children: React.ReactNode;
  className?: string;
  sectionBg?: "dark" | "section";
}

export function DarkPreviewContainer({
  children,
  className = "",
  sectionBg = "section",
}: DarkPreviewContainerProps) {
  const bg = sectionBg === "dark" ? "bg-bg-dark" : "bg-bg-section";

  return (
    <div className="relative">
      <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-medium text-amber-400/60 bg-white/5 border border-white/5">
        Edit Mode
      </div>
      <div
        className={`rounded-2xl overflow-hidden border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.4)] ${bg} ${className}`}
        style={{
          colorScheme: "dark",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
