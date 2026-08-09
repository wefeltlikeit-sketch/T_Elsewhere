"use client";

import { useEffect } from "react";

/**
 * Scroll reveals for "T, Elsewhere".
 *
 * Deliberately attaches to selectors that already exist in the markup, so the
 * page components stay untouched — no wrapper elements, no extra class names,
 * no data attributes in the JSX.
 *
 * Each group is observed at the *container* level so its children can be
 * staggered together, the way a row of photographs gets laid out one after
 * another rather than all at once. A container may carry several groups; the
 * atlas map uses four to wash in, then label, then pin, then sign itself.
 *
 * The hidden state lives in globals.css behind `prefers-reduced-motion:
 * no-preference`, so reduced-motion visitors never enter it and can never end
 * up staring at invisible content.
 */

type Group = {
  /** Container to observe. */
  parent: string;
  /** Children to reveal, relative to the container. */
  child: string;
  /** Milliseconds between each child. */
  stagger: number;
  /** Milliseconds before the group starts. */
  delay?: number;
  /**
   * Ceiling on the accumulated stagger. Without this, a chapter like the
   * Dordogne — 26 cards — would still be arriving several seconds after the
   * reader got there.
   */
  max?: number;
};

const GROUPS: Group[] = [
  // ── Shared patterns ────────────────────────────────────────────────────
  { parent: ".section-heading", child: ":scope > div > *, :scope > .text-link", stagger: 90 },
  { parent: ".story-grid", child: ":scope > .story-card", stagger: 130 },
  { parent: ".finds-grid", child: ":scope > .find-card", stagger: 110 },
  { parent: ".cheese-copy", child: ":scope > *:not(dl)", stagger: 110 },
  { parent: ".cheese-copy dl", child: ":scope > div", stagger: 150 },
  { parent: ".video-layout", child: ":scope > div:first-child > *", stagger: 100 },
  { parent: ".video-layout", child: ":scope > .video-card", stagger: 0, delay: 260 },
  { parent: ".newsletter", child: ":scope > *", stagger: 100 },

  // ── Archive / interior pages ───────────────────────────────────────────
  { parent: ".archive-grid", child: ":scope > .story-card", stagger: 110 },
  { parent: ".finds-archive", child: ":scope > .find-archive-card", stagger: 100 },
  { parent: ".cheese-grid", child: ":scope > .cheese-card", stagger: 120 },
  { parent: ".videos-grid", child: ":scope > .video-card", stagger: 110 },

  // ── Places: the atlas ──────────────────────────────────────────────────
  { parent: ".atlas-heading", child: ":scope > div > *, :scope > p", stagger: 90 },

  // The map assembles the way one would be drawn: colour washes soak in
  // first, the seas get named, then the pins go in one at a time, and the
  // key is signed last. Roughly 1.5s, once, and only when it's on screen.
  { parent: ".atlas-map", child: ":scope > .map-wash", stagger: 160 },
  { parent: ".atlas-map", child: ":scope > .sea-note", stagger: 140, delay: 380 },
  { parent: ".atlas-map", child: ":scope > .map-pin", stagger: 45, delay: 520, max: 900 },
  { parent: ".atlas-map", child: ":scope > .map-key", stagger: 0, delay: 700 },

  { parent: ".chapter-jump", child: ":scope > a", stagger: 70 },
  { parent: ".index-intro", child: ":scope > *", stagger: 100 },

  // Chapter header first, then its grid of places — capped so the biggest
  // chapters don't outstay the scroll.
  { parent: ".place-chapter", child: ":scope > header > *", stagger: 90 },
  { parent: ".place-chapter", child: ":scope > .place-grid > .place-card", stagger: 30, delay: 180, max: 620 },

  { parent: ".atlas-cta .shell", child: ":scope > *", stagger: 100 },
];

type Bundle = { children: HTMLElement[]; stagger: number; delay: number; max: number };

export default function Reveal() {
  useEffect(() => {
    const bundles = new Map<Element, Bundle[]>();

    try {
      for (const group of GROUPS) {
        document.querySelectorAll(group.parent).forEach((parent) => {
          const children = Array.from(
            parent.querySelectorAll<HTMLElement>(group.child),
          );
          if (!children.length) return;

          const bundle: Bundle = {
            children,
            stagger: group.stagger,
            delay: group.delay ?? 0,
            max: group.max ?? Number.POSITIVE_INFINITY,
          };

          const existing = bundles.get(parent);
          if (existing) existing.push(bundle);
          else bundles.set(parent, [bundle]);
        });
      }
    } catch {
      // A bad selector should never cost the reader the page.
      revealEverything();
      return;
    }

    if (!("IntersectionObserver" in window) || bundles.size === 0) {
      revealEverything();
      return;
    }

    const show = (group: Bundle[]) => {
      for (const bundle of group) {
        bundle.children.forEach((child, index) => {
          const stagger = Math.min(index * bundle.stagger, bundle.max);
          child.style.setProperty("--rd", `${bundle.delay + stagger}ms`);
        });
      }
      // One frame's grace so the delays land before the class flips.
      requestAnimationFrame(() => {
        for (const bundle of group) {
          bundle.children.forEach((child) => child.classList.add("is-in"));
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const group = bundles.get(entry.target);
          observer.unobserve(entry.target);
          if (group) show(group);
        }
      },
      {
        // Hold the reveal until the block is meaningfully on screen, rather
        // than firing the instant a single pixel crosses the fold.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.1,
      },
    );

    bundles.forEach((_group, parent) => observer.observe(parent));

    return () => observer.disconnect();
  }, []);

  return null;
}

/** Last resort: drop every element straight into its finished state. */
function revealEverything() {
  for (const group of GROUPS) {
    document.querySelectorAll(group.parent).forEach((parent) => {
      parent
        .querySelectorAll<HTMLElement>(group.child)
        .forEach((child) => child.classList.add("is-in"));
    });
  }
}
