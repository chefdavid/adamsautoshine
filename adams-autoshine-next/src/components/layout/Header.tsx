"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface HeaderProps {
  phone?: string;
  phoneHref?: string;
}

export function Header({ phone, phoneHref }: HeaderProps) {
  const scrolled = useScrollPosition(50);
  const activeSection = useActiveSection(
    NAV_LINKS.map((l) => l.href.replace("#", ""))
  );
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-dark/95 backdrop-blur-xl py-2.5 shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
          : "bg-transparent py-4"
      )}
    >
      <nav className="max-w-[1200px] mx-auto px-5 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2.5 text-text-white text-[1.3rem] font-bold z-[1001] hover:text-text-white">
          <span>
            Adams<span className="text-amber">Autoshine</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-text-muted text-[0.9rem] font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:text-text-white hover:bg-white/5",
                  activeSection === link.href.replace("#", "") &&
                    "text-text-white bg-white/5"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#booking"
          className="hidden md:inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-lg font-semibold text-[0.9rem] btn-gradient text-bg-dark border-2 border-amber transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow"
        >
          Book Now
        </Link>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="z-[1001] text-text-white hover:bg-white/5">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[80%] max-w-[320px] bg-bg-dark/98 backdrop-blur-xl border-l border-border-subtle pt-24 px-8"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-text-muted text-[1.1rem] font-medium px-4 py-3.5 rounded-lg transition-all duration-300 hover:text-text-white hover:bg-white/5",
                    activeSection === link.href.replace("#", "") &&
                      "text-text-white bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg font-semibold text-base btn-gradient text-bg-dark border-2 border-amber"
              >
                Book Now
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
