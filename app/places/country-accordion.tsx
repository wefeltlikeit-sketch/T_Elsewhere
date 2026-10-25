"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AtlasLink } from "./atlas-link";

export type CountryAccordionGroup = {
  country: string;
  slug: string;
  places: {
    slug: string;
    city: string;
    count: number;
    visits: number;
    hasPhoto: boolean;
    size: "" | "feature" | "wide";
  }[];
};

type CountryAccordionProps = {
  groups: CountryAccordionGroup[];
};

export function CountryAccordion({ groups }: CountryAccordionProps) {
  const [openCountry, setOpenCountry] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const returnPlace = new URLSearchParams(window.location.search).get("return");
    const returnGroup = returnPlace ? groups.find((group) => group.places.some((place) => place.slug === returnPlace)) : undefined;
    if (hash && groups.some((group) => group.slug === hash)) setOpenCountry(hash);
    else if (returnGroup) setOpenCountry(returnGroup.slug);
  }, [groups]);

  const chooseCountry = (slug: string, shouldScroll = false) => {
    const waitForClosingDrawer = Boolean(shouldScroll && openCountry && openCountry !== slug);
    setOpenCountry((current) => current === slug && !shouldScroll ? null : slug);
    if (shouldScroll) {
      history.replaceState(null, "", `#${slug}`);
      window.setTimeout(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, waitForClosingDrawer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 780 : 0);
    }
  };

  return <>
    <nav className="country-jump shell" aria-label="Open a country collection">
      <p className="eyebrow">Browse by country</p>
      <div>{groups.map((group) => <button type="button" className={openCountry === group.slug ? "active" : ""} aria-expanded={openCountry === group.slug} aria-controls={`${group.slug}-places`} onClick={() => chooseCountry(group.slug, true)} key={group.slug}>{group.country}<span>{group.places.length}</span></button>)}</div>
    </nav>

    <section className="location-index shell">
      <aside className="index-intro"><p className="eyebrow">The card catalogue</p><h2>Places, not<br />itineraries.</h2><p>Open a country to find every city, village, island, and worthwhile detour gathered there.</p><div className="index-legend"><span>Stories</span><span>Photographs</span><span>Market finds</span><span>Tips</span><span>Films</span></div></aside>
      <div className="country-drawers">
        {groups.map((group, countryIndex) => {
          const isOpen = openCountry === group.slug;
          const panelId = `${group.slug}-places`;
          const headingId = `${group.slug}-heading`;
          return <article className={`country-drawer country-tone-${countryIndex % 3}${isOpen ? " is-open" : ""}`} id={group.slug} key={group.slug}>
            <button className="country-drawer-trigger" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => chooseCountry(group.slug)}>
              <span className="country-drawer-number">{String(countryIndex + 1).padStart(2, "0")}</span>
              <span className="country-drawer-title"><small>Country file</small><strong id={headingId}>{group.country}</strong></span>
              <span className="country-drawer-count">{group.places.length} {group.places.length === 1 ? "place" : "places"}</span>
              <span className="country-drawer-mark" aria-hidden="true"><i /><i /></span>
            </button>
            <div className="country-drawer-panel" id={panelId} role="region" aria-labelledby={headingId} aria-hidden={!isOpen} inert={!isOpen}>
              <div className="country-drawer-inner">
                <div className="country-drawer-tools"><p>Everything gathered in {group.country}, filed by place.</p><Link href={`/places/country/${group.slug}`}>Open the country overview <span>↗</span></Link></div>
                <div className="location-grid">
                  {group.places.map((place) => <AtlasLink place={place.slug} data-atlas-card={place.slug} className={`location-card ${place.size}${place.hasPhoto ? " has-photo" : ""}`} href={`/places/${place.slug}`} key={place.slug}>
                    <p>{place.count > 0 ? `${place.count} ${place.count === 1 ? "piece" : "pieces"} collected` : "Shelf open"}</p>
                    <h4>{place.city}</h4>
                    <small>{place.visits > 1 ? `${place.visits} visits · returned to` : "Explore the place"}<span aria-hidden="true">↗</span></small>
                  </AtlasLink>)}
                </div>
              </div>
            </div>
          </article>;
        })}
      </div>
    </section>
  </>;
}
