"use client";

import { useEffect, useRef, useState } from "react";

const destinations = [
  "/posts/bologna-before-breakfast",
  "/posts/blue-hour-lisbon",
  "/posts/rainy-sunday-paris",
  "/posts/train-to-lake-como",
  "/places/paris",
  "/places/amsterdam",
  "/places/isle-of-skye",
  "/places/strasbourg",
  "/places/salzburg",
  "/places/gordes",
  "/places/roussillon",
  "/markets-finds",
  "/cheese-stories",
  "/videos",
];

export function SiteWayfinder() {
  const trail = useRef<HTMLDivElement>(null);
  const [departing, setDeparting] = useState(false);

  useEffect(() => {
    const element = trail.current;
    if (!element) return;
    let frame = 0;

    function update() {
      frame = 0;
      if (!element) return;
      const distance = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      element.style.setProperty("--site-progress", progress.toFixed(4));
      element.classList.toggle("is-visible", window.scrollY > 90);
    }

    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function wander() {
    if (departing) return;
    const choices = destinations.filter((href) => href !== window.location.pathname);
    const random = globalThis.crypto?.getRandomValues(new Uint32Array(1))[0] ?? Math.floor(Math.random() * 2 ** 32);
    const destination = choices[random % choices.length];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setDeparting(true);
    document.documentElement.classList.add("is-wandering");
    window.setTimeout(() => window.location.assign(destination), reduced ? 0 : 560);
  }

  return (
    <>
      <div className="site-trail" ref={trail} aria-hidden="true">
        <svg viewBox="0 0 24 100" preserveAspectRatio="none"><path pathLength="1" d="M12 0 C3 14 21 25 12 39 S4 62 13 76 S18 90 12 100" /></svg>
        <i />
        <span>the long way</span>
      </div>
      <button className="wander-trigger" type="button" onClick={wander} disabled={departing} aria-label="Take me to a surprise place or story">
        <span>{departing ? "Taking the" : "Take me"}</span>
        <b>{departing ? "long way…" : "somewhere"}</b>
        <i aria-hidden="true">↝</i>
      </button>
      <div className="wander-wash" aria-hidden="true"><span>Taking the long way…</span></div>
    </>
  );
}
