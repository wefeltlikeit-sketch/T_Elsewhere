"use client";

import type { PointerEvent } from "react";
import type { Find } from "../content";

export function FindObject({ find, index }: { find: Find; index: number }) {
  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--find-rx", `${y * -4}deg`);
    event.currentTarget.style.setProperty("--find-ry", `${x * 5}deg`);
    event.currentTarget.style.setProperty("--find-sx", `${50 + x * 16}%`);
    event.currentTarget.style.setProperty("--find-sy", `${38 + y * 12}%`);
    event.currentTarget.style.setProperty("--find-shadow", `${x * 14}px`);
  };

  const settle = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--find-rx");
    event.currentTarget.style.removeProperty("--find-ry");
    event.currentTarget.style.removeProperty("--find-sx");
    event.currentTarget.style.removeProperty("--find-sy");
    event.currentTarget.style.removeProperty("--find-shadow");
  };

  return <article className={`find-object find-object-${index + 1}`} tabIndex={0} onPointerMove={move} onPointerLeave={settle}>
    <span className="find-tape" aria-hidden="true" />
    <div className="find-object-photo photo" style={{ backgroundImage: `url('${find.image}')` }}><span>{find.place}</span></div>
    <div className="find-object-copy">
      <p className="catalog">CATALOG № {String(index + 1).padStart(2, "0")}</p>
      <h2>{find.name}</h2>
      <p>{find.note}</p>
      <small>Found slowly · packed carefully</small>
    </div>
  </article>;
}
