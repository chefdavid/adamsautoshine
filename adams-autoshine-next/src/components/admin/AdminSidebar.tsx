"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Star,
  Trophy,
  Hash,
  Tag,
  ImageIcon,
  CalendarCheck,
  Inbox,
  Users,
  CircleHelp,
  MapPin,
  Search,
  FileText,
  Megaphone,
  Clock,
  Settings,
  LayoutDashboard,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Content",
    icon: FileText,
    items: [
      { href: "/admin/dashboard/hero", label: "Hero Section", icon: Sparkles },
      { href: "/admin/dashboard/services", label: "Services", icon: Settings },
      { href: "/admin/dashboard/why-us", label: "Why Choose Us", icon: Trophy },
      { href: "/admin/dashboard/stats", label: "Stats & Numbers", icon: Hash },
      { href: "/admin/dashboard/pricing", label: "Pricing", icon: Tag },
      { href: "/admin/dashboard/gallery", label: "Gallery", icon: ImageIcon },
      { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: Star },
      { href: "/admin/dashboard/faqs", label: "FAQs", icon: CircleHelp },
      { href: "/admin/dashboard/about", label: "About Us", icon: Users },
      { href: "/admin/dashboard/cta-banner", label: "CTA Banner", icon: Megaphone },
    ],
  },
  {
    label: "Booking",
    icon: CalendarCheck,
    items: [
      { href: "/admin/dashboard/submissions", label: "Submissions", icon: Inbox },
      { href: "/admin/dashboard/booking-perks", label: "Booking Perks", icon: CalendarCheck },
      { href: "/admin/dashboard/service-options", label: "Service Options", icon: Clock },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    items: [
      { href: "/admin/dashboard/contact", label: "Contact Info", icon: MapPin },
      { href: "/admin/dashboard/seo", label: "SEO & Metadata", icon: Search },
      { href: "/admin/dashboard/footer", label: "Footer", icon: FileText },
    ],
  },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  // Auto-expand groups that contain the active page
  const initialOpen = navGroups.reduce<Record<string, boolean>>((acc, group) => {
    acc[group.label] = group.items.some((item) => pathname === item.href);
    return acc;
  }, {});

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(initialOpen);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200">
          <Link
            href="/admin/dashboard"
            className="text-lg font-bold text-slate-900"
          >
            Adam&apos;s<span className="text-amber-500">Autoshine</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <Link
            href="/admin/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-2 transition-colors",
              pathname === "/admin/dashboard"
                ? "bg-amber-50 text-amber-700"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          {navGroups.map((group) => {
            const isOpen = openGroups[group.label] ?? false;
            const hasActive = group.items.some((item) => pathname === item.href);

            return (
              <div key={group.label} className="mb-1">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    hasActive
                      ? "text-amber-700 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <group.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">{group.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
                      isOpen && "rotate-90"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="ml-3 pl-3 border-l border-slate-200 mt-0.5 mb-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors",
                          pathname === item.href
                            ? "bg-amber-50 text-amber-700 font-medium"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        )}
                      >
                        <item.icon className="h-3.5 w-3.5" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
