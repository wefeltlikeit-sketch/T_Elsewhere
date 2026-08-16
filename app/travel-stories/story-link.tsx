"use client";

import type { MouseEvent, ReactNode } from "react";

export function StoryLink({ slug, children }: { slug: string; children: ReactNode }) {
  const transitionName = `story-${slug}`;

  function prepareTransition(event: MouseEvent<HTMLAnchorElement>) {
    const image = event.currentTarget.querySelector<HTMLElement>("[data-story-image]");
    if (!image) return;

    document.querySelectorAll<HTMLElement>("[data-story-image]").forEach((item) => {
      item.style.viewTransitionName = "none";
    });
    image.style.viewTransitionName = transitionName;
  }

  return (
    <a
      href={`/posts/${slug}`}
      data-page-transition
      onPointerDown={prepareTransition}
      onClick={prepareTransition}
    >
      {children}
    </a>
  );
}
