"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center relative">
      <div className="flex items-baseline justify-center">
        <span className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-amber leading-none">
          {count.toLocaleString()}
        </span>
        {suffix && (
          <span className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-amber">
            {suffix}
          </span>
        )}
      </div>
      <div className="text-[0.9rem] text-text-muted mt-2 font-medium">
        {label}
      </div>
    </div>
  );
}
