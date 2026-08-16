"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomeJourney({ children }: { children: ReactNode }) {
  const journey = useRef<HTMLDivElement>(null);
  const route = useRef<SVGPathElement>(null);
  const car = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = journey.current;
    const routePath = route.current;
    const carElement = car.current;
    if (!element || !routePath || !carElement) return;
    const pathElement: SVGPathElement = routePath;
    const vehicleElement: HTMLDivElement = carElement;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let direction = 1;

    function update() {
      frame = 0;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.72;
      const distance = Math.max(rect.height - window.innerHeight * 0.36, 1);
      const progress = reduced.matches ? 1 : Math.min(1, Math.max(0, (start - rect.top) / distance));
      element.style.setProperty("--journey-progress", progress.toFixed(4));

      const matrix = pathElement.getScreenCTM();
      if (!matrix) return;
      const length = pathElement.getTotalLength();
      const pointAt = (position: number) => {
        const point = pathElement.getPointAtLength(Math.min(length, Math.max(0, position)));
        return new DOMPoint(point.x, point.y).matrixTransform(matrix);
      };
      const point = pointAt(progress * length);
      const before = pointAt(progress * length - 3);
      const after = pointAt(progress * length + 3);
      if (Math.abs(after.x - before.x) > 1) direction = after.x < before.x ? -1 : 1;
      vehicleElement.style.setProperty("--car-x", `${point.x - rect.left}px`);
      vehicleElement.style.setProperty("--car-y", `${point.y - rect.top}px`);
      vehicleElement.style.setProperty("--car-facing", String(direction));
      vehicleElement.dataset.positioned = "true";
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
        <path className="home-route-casing" pathLength="1" d="M50 0 C50 6 17 7 17 18 S84 27 78 39 S16 48 23 60 S86 69 76 81 S50 93 50 100" />
        <path className="home-route-guide" pathLength="1" d="M50 0 C50 6 17 7 17 18 S84 27 78 39 S16 48 23 60 S86 69 76 81 S50 93 50 100" />
        <path ref={route} className="home-route-progress" pathLength="1" d="M50 0 C50 6 17 7 17 18 S84 27 78 39 S16 48 23 60 S86 69 76 81 S50 93 50 100" />
      </svg>
      <div className="journey-car" ref={car} aria-hidden="true">
        <svg viewBox="0 0 76 40" role="presentation">
          <ellipse className="citroen-shadow" cx="38" cy="33" rx="31" ry="4" />
          <path className="citroen-body" d="M5 25.5c1.2-3.8 4.2-6.2 9-7.1l7-9.2c1.8-2.4 4.3-3.7 7.4-3.7h17.2c3.4 0 6.1 1.4 8.1 4.2l6.2 8.8 8.1 1.7c2.1.4 3.5 2.2 3.5 4.3v4.2H5z" />
          <path className="citroen-window" d="M23 18.2l4.8-8.1h8.7v8.1zM39.8 10.1h6c2 0 3.5.8 4.7 2.5l3.9 5.6H39.8z" />
          <path className="citroen-detail" d="M8.5 24.2h7.2M57.5 22.2h9.2M37.8 7.4v12.3M6.7 27.7h63" />
          <circle className="citroen-tyre" cx="21" cy="29" r="6.5" /><circle className="citroen-hub" cx="21" cy="29" r="2.4" />
          <circle className="citroen-tyre" cx="57" cy="29" r="6.5" /><circle className="citroen-hub" cx="57" cy="29" r="2.4" />
        </svg>
      </div>
      {children}
    </div>
  );
}
