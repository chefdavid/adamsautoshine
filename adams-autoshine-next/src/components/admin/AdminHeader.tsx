"use client";

import { useRouter } from "next/navigation";
import { Menu, ExternalLink, LogOut } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center px-5 gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-500 hover:text-slate-700"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h2 className="text-sm font-semibold text-slate-900 flex-1">
        Admin Panel
      </h2>

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"
      >
        <ExternalLink className="h-4 w-4" />
        <span className="hidden sm:inline">View Live Site</span>
      </a>

      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
}
