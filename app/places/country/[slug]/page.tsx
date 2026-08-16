import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../../components";
import { contentCountForPlace } from "../../../content";
import { countries, countrySlug, getCountry, photoForPlace, placesInCountry, visitCount } from "../../../places";
import { AtlasLink } from "../../atlas-link";

export function generateStaticParams() { return countries().map((country) => ({ slug: countrySlug(country) })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(slug);
  return country ? { title: `${country} — Places`, description: `Every place visited in ${country}, with the stories and finds gathered there.` } : {};
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();
  const countryPlaces = placesInCountry(country);
  const pieces = countryPlaces.reduce((sum, place) => sum + contentCountForPlace(place.slug) + (photoForPlace(place.slug) ? 1 : 0), 0);
  const visits = countryPlaces.reduce((sum, place) => sum + visitCount(place), 0);

  return <main><Header active="places" />
    <section className="country-detail-hero shell"><Link className="place-back" href="/places">← The atlas</Link><p className="eyebrow">Country file · {String(countryPlaces.length).padStart(2, "0")} places</p><h1>{country}</h1><p>Every stop in one place — from the cities that anchored a journey to the small detours that changed its shape.</p><div className="place-detail-meta"><span>{countryPlaces.length} places</span><span>{visits} visits</span><span>{pieces} pieces collected</span></div></section>
    <section className="country-detail-index shell"><div className="country-detail-heading"><p className="eyebrow">The location index</p><h2>Choose a place</h2></div><div className="country-place-list">{countryPlaces.map((place, index) => { const count = contentCountForPlace(place.slug) + (photoForPlace(place.slug) ? 1 : 0); return <AtlasLink place={place.slug} href={`/places/${place.slug}`} key={place.slug}><span>{String(index + 1).padStart(2, "0")}</span><h3>{place.city}</h3><p>{count > 0 ? `${count} collected` : "File open"}</p><i>↗</i></AtlasLink>; })}</div></section>
    <Footer />
  </main>;
}
