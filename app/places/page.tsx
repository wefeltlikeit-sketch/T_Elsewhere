import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { countries, countrySlug, pins, places, placesInCountry, visitCount } from "../places";
import { contentCountForPlace } from "../content";

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
        <h1>Every place,<br /><em>once.</em></h1>
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
        <span className="sea-note sea-one">North Sea</span><span className="sea-note sea-two">Mediterranean</span>
        {pins.map((pin, index) => <Link key={pin.place} className={`map-pin pin-${index % 3}`} href={`/places/${pin.place}`} style={{left:`${pin.left}%`,top:`${pin.top}%`}} aria-label={`Open the ${pin.label} location page`}>
          <i /><span>{pin.label}</span>
        </Link>)}
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
                return <Link className={`location-card ${size}`} href={`/places/${place.slug}`} key={place.slug}>
                  <p>{count > 0 ? `${count} ${count === 1 ? "piece" : "pieces"} collected` : "Shelf open"}</p>
                  <h4>{place.city}</h4>
                  <small>{visits > 1 ? `${visits} visits · returned to` : "Explore the place"}<span aria-hidden="true">↗</span></small>
                </Link>;
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
