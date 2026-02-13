"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Settings,
  Trophy,
  Hash,
  Tag,
  ImageIcon,
  CalendarCheck,
  Star,
  CircleHelp,
  MapPin,
  Search,
  FileText,
  Users,
  Megaphone,
  Clock,
  Loader2,
  Database,
  ExternalLink,
} from "lucide-react";

const sections = [
  { href: "/admin/dashboard/hero", label: "Hero Section", icon: Sparkles },
  { href: "/admin/dashboard/services", label: "Services", icon: Settings },
  { href: "/admin/dashboard/why-us", label: "Why Choose Us", icon: Trophy },
  { href: "/admin/dashboard/stats", label: "Stats & Numbers", icon: Hash },
  { href: "/admin/dashboard/pricing", label: "Pricing", icon: Tag },
  { href: "/admin/dashboard/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/dashboard/booking-perks", label: "Booking Perks", icon: CalendarCheck },
  { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/dashboard/faqs", label: "FAQs", icon: CircleHelp },
  { href: "/admin/dashboard/service-options", label: "Service Options", icon: Clock },
  { href: "/admin/dashboard/about", label: "About Us", icon: Users },
  { href: "/admin/dashboard/cta-banner", label: "CTA Banner", icon: Megaphone },
  { href: "/admin/dashboard/contact", label: "Contact Info", icon: MapPin },
  { href: "/admin/dashboard/seo", label: "SEO & Metadata", icon: Search },
  { href: "/admin/dashboard/footer", label: "Footer", icon: FileText },
];

export default function DashboardHomePage() {
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState("");

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const json = await res.json();
      if (res.ok) {
        setSeedResult("Content initialized successfully!");
      } else {
        setSeedResult(`Error: ${json.error}`);
      }
    } catch {
      setSeedResult("Failed to initialize content.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all your website content from here.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-amber-500 text-white hover:bg-amber-600 transition-colors disabled:opacity-50"
        >
          {seeding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          Initialize Content
        </button>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Live Site
        </a>
      </div>

      {seedResult && (
        <div
          className={`mb-6 p-3 rounded-lg text-sm ${
            seedResult.includes("Error") || seedResult.includes("Failed")
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {seedResult}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50 text-amber-500 group-hover:bg-amber-100 transition-colors">
              <section.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {section.label}
              </h3>
              <p className="text-xs text-slate-400">Edit content</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
