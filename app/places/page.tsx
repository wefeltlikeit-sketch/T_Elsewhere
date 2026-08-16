import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { countries, countrySlug, getPlace, pins, places, placesInCountry, visitCount } from "../places";
import { contentCountForPlace } from "../content";
import { AtlasLink } from "./atlas-link";

export const metadata: Metadata = {
  title: "Places — A Personal Atlas",
  description: "An atlas of every city, village, and island visited — with stories, photographs, market finds, tips, and films gathered along the way.",
};

export default function PlacesPage() {
  const countryList = countries();
  const returnVisits = places.filter((place) => visitCount(place) > 1).length;
  return <main>
    <Header />
    <section className="atlas-hero shell">
      <div>
        <p className="eyebrow">The location index · 2024 onward</p>
        <h1>Where the road<br /><em>has taken me.</em></h1>
      </div>
      <div className="atlas-intro-wrap">
        <p className="atlas-intro">A growing cabinet of cities, villages, islands, and excellent detours. Choose a place to gather everything found there — stories, photographs, market treasures, tips, and films.</p>
        <dl className="atlas-tally" aria-label="Atlas totals">
          <div><dt>{places.length}</dt><dd>places</dd></div>
          <div><dt>{countryList.length}</dt><dd>countries</dd></div>
          <div><dt>{returnVisits}</dt><dd>returned to</dd></div>
        </dl>
      </div>
    </section>

    <section className="atlas-wrap shell" aria-labelledby="map-title">
      <div className="atlas-heading">
        <div><p className="eyebrow">Fold-out map № 01</p><h2 id="map-title">Find your bearings</h2></div>
        <p>Choose a pin to open its place.</p>
      </div>
      <div className="atlas-map">
        <div className="map-wash wash-one" /><div className="map-wash wash-two" /><div className="map-wash wash-three" />
        <svg className="atlas-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d="M29 10 C26 12 24 15 23 18 S30 25 34 29 S42 38 46 42 S44 50 43 55" />
          <path pathLength="1" d="M43 55 C47 53 49 53 52 53 S52 57 53 59 S54 66 55 69" />
          <path pathLength="1" d="M43 55 C42 62 42 67 42 69 S44 71 45 72 M45 72 C48 75 49 78 48 79 S51 81 52 82" />
          <path pathLength="1" d="M52 53 C56 51 58 52 60 53 S62 57 64 58 S68 54 71 55 S73 58 75 59" />
        </svg>
        <span className="sea-note sea-one">North Sea</span><span className="sea-note sea-two">Mediterranean</span>
        {pins.map((pin, index) => {
          const place = getPlace(pin.place);
          const returned = place ? visitCount(place) > 1 : false;
          return <AtlasLink key={pin.place} place={pin.place} className={`map-pin pin-${index % 3}${returned ? " returned" : ""}`} href={`/places/${pin.place}`} style={{left:`${pin.left}%`,top:`${pin.top}%`}} aria-label={`Open the ${pin.label} location page`}>
            {returned && <b className="return-ring" aria-hidden="true" />}<i /><span>{pin.label}</span>
          </AtlasLink>;
        })}
        <div className="map-key"><span><i /> open a location</span><small>Not to scale. Very much to feeling.</small></div>
      </div>
    </section>

    <nav className="country-jump shell" aria-label="Jump to a country">
      <p className="eyebrow">Browse by country</p>
      <div>{countryList.map(country => <a href={`#${countrySlug(country)}`} key={country}>{country}<span>{placesInCountry(country).length}</span></a>)}</div>
    </nav>

    <section className="location-index shell">
      <aside className="index-intro"><p className="eyebrow">The card catalogue</p><h2>Places, not<br />itineraries.</h2><p>A city appears once, however many times the road leads back. Each card opens a shelf for everything gathered there.</p><div className="index-legend"><span>Stories</span><span>Photographs</span><span>Market finds</span><span>Tips</span><span>Films</span></div></aside>
      <div className="country-shelves">
        {countryList.map((country, countryIndex) => {
          const countryPlaces = placesInCountry(country);
          return <article className={`country-shelf country-tone-${countryIndex % 3}`} id={countrySlug(country)} key={country}>
            <header>
              <div><p className="eyebrow">Country № {String(countryIndex + 1).padStart(2, "0")}</p><h3>{country}</h3></div>
              <Link href={`/places/country/${countrySlug(country)}`}>View all {countryPlaces.length} {countryPlaces.length === 1 ? "place" : "places"} <span>↗</span></Link>
            </header>
            <div className="location-grid">
              {countryPlaces.map((place, placeIndex) => {
                const count = contentCountForPlace(place.slug);
                const visits = visitCount(place);
                const size = (count > 0 || visits > 1 || placeIndex % 9 === 0) ? "feature" : placeIndex % 5 === 0 ? "wide" : "";
                return <AtlasLink place={place.slug} data-atlas-card={place.slug} className={`location-card ${size}`} href={`/places/${place.slug}`} key={place.slug}>
                  <p>{count > 0 ? `${count} ${count === 1 ? "piece" : "pieces"} collected` : "Shelf open"}</p>
                  <h4>{place.city}</h4>
                  <small>{visits > 1 ? `${visits} visits · returned to` : "Explore the place"}<span aria-hidden="true">↗</span></small>
                </AtlasLink>;
              })}
            </div>
          </article>;
        })}
      </div>
    </section>

    <section className="atlas-cta">
      <div className="shell"><p className="eyebrow">The map is never finished</p><h2>There’s always room<br />for one more pin.</h2><Link className="button" href="/travel-stories">Read the field notes <span>↗</span></Link></div>
    </section>
    <Footer />
  </main>;
}
