"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomeJourney({ children }: { children: ReactNode }) {
  const journey = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = journey.current;
    if (!element) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!element) return;
      if (reduced.matches) {
        element.style.setProperty("--journey-progress", "1");
        return;
      }
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.72;
      const distance = Math.max(rect.height - window.innerHeight * 0.36, 1);
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
      element.style.setProperty("--journey-progress", progress.toFixed(4));
    }

    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduced.addEventListener?.("change", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduced.removeEventListener?.("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="home-journey" id="home-journey" ref={journey}>
      <svg className="home-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M50 0 C50 6 17 7 17 18 S84 27 78 39 S16 48 23 60 S86 69 76 81 S50 93 50 100" />
      </svg>
      {children}
    </div>
  );
}
