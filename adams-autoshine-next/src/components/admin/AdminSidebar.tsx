"use client";

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
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-4 transition-colors",
              pathname === "/admin/dashboard"
                ? "bg-amber-50 text-amber-700"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <div className="flex items-center gap-2 px-3 mb-1.5">
                <group.icon className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {group.label}
                </span>
              </div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    pathname === item.href
                      ? "bg-amber-50 text-amber-700 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
