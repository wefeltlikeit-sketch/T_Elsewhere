import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { chapters, pins, placesInChapter } from "../places";
import { doorwayFor } from "../content";

export const metadata: Metadata = {
  title: "Places I’ve Pointed a Camera At",
  description: "A personal atlas of European cities, villages, islands, and excellent detours.",
};

export default function PlacesPage() {
  return <main>
    <Header />
    <section className="atlas-hero shell">
      <div>
        <p className="eyebrow">A personal atlas · 2024 onward</p>
        <h1>Places I’ve<br /><em>Pointed a Camera At</em></h1>
      </div>
      <p className="atlas-intro">A growing catalogue of cities, villages, islands, and detours — arranged by the trips that stitched them together. No bucket list, just places that made me stop and look.</p>
    </section>

    <section className="atlas-wrap shell" aria-labelledby="map-title">
      <div className="atlas-heading">
        <div><p className="eyebrow">Fold-out map № 01</p><h2 id="map-title">Where the road has wandered</h2></div>
        <p>Choose a pin to drop into that travel chapter.</p>
      </div>
      <div className="atlas-map">
        <div className="map-wash wash-one" /><div className="map-wash wash-two" /><div className="map-wash wash-three" />
        <span className="sea-note sea-one">North Sea</span><span className="sea-note sea-two">Mediterranean</span>
        {pins.map((pin, index) => <a key={pin.label} className={`map-pin pin-${index % 3}`} href={`#${pin.chapter}`} style={{left:`${pin.left}%`,top:`${pin.top}%`}} aria-label={`Go to ${pin.label}`}>
          <i /><span>{pin.label}</span>
        </a>)}
        <div className="map-key"><span><i /> a pause worth remembering</span><small>Not to scale. Very much to feeling.</small></div>
      </div>
    </section>

    <nav className="chapter-jump shell" aria-label="Jump to a travel chapter">
      {chapters.map(chapter => <a href={`#${chapter.id}`} key={chapter.id}><span>{chapter.number}</span>{chapter.date}</a>)}
    </nav>

    <section className="journey-index shell">
      <div className="index-intro"><p className="eyebrow">The long way round</p><h2>Six journeys,<br />one growing index.</h2><p>Every card is a future doorway: to a story, a market find, a cheese worth remembering, or simply a corner I liked the look of.</p></div>
      <div className="chapters">
        {chapters.map(chapter => <article className={`place-chapter ${chapter.colour}`} id={chapter.id} key={chapter.id}>
          <header><span className="chapter-number">{chapter.number}</span><div><p className="eyebrow">{chapter.date}</p><h3>{chapter.title}</h3><p>{chapter.note}</p></div></header>
          <div className="place-grid">
            {placesInChapter(chapter.id).map(({ place, size }) => {
              // A card only becomes a doorway once something real points at it.
              // Everything else stays an inert div — see doorwayFor in ../content.
              const href = doorwayFor(place.slug);
              const body = <><p>{place.country}</p><h4>{place.city}</h4><small>{chapter.date}</small></>;
              return href
                ? <Link className={`place-card ${size}`} href={href} key={place.slug}>{body}</Link>
                : <div className={`place-card ${size}`} key={place.slug}>{body}</div>;
            })}
          </div>
        </article>)}
      </div>
    </section>

    <section className="atlas-cta">
      <div className="shell"><p className="eyebrow">The map is never finished</p><h2>There’s always room<br />for one more pin.</h2><Link className="button" href="/travel-stories">Wander with me <span>↗</span></Link></div>
    </section>
    <Footer />
  </main>;
}
