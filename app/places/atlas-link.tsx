"use client";

import type { AnchorHTMLAttributes, PointerEvent, MouseEvent } from "react";

type AtlasLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  place: string;
};

/**
 * A normal document link with a progressively enhanced shared-element name.
 * Keeping it as an anchor lets the native cross-document transition run while
 * unsupported browsers receive ordinary navigation with no special handling.
 */
export function AtlasLink({ href, place, onPointerDown, onClick, ...props }: AtlasLinkProps) {
  const activate = (target: HTMLAnchorElement) => {
    document.querySelectorAll<HTMLElement>("[data-atlas-place]").forEach((node) => {
      node.style.viewTransitionName = "none";
    });
    target.style.viewTransitionName = `place-${place}`;
  };

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    activate(event.currentTarget);
    onPointerDown?.(event);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    activate(event.currentTarget);
    onClick?.(event);
  };

  return <a href={href} data-atlas-place={place} onPointerDown={handlePointerDown} onClick={handleClick} {...props} />;
}
