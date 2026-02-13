"use client";

import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export function BackToTop() {
  const visible = useScrollPosition(500);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 w-12 h-12 btn-gradient border-none rounded-full text-bg-dark flex items-center justify-center cursor-pointer z-[999] shadow-[0_4px_16px_rgba(245,158,11,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-glow-lg"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
