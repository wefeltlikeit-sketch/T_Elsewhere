import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";

export const metadata: Metadata = {
  title: "Places I’ve Pointed a Camera At",
  description: "A personal atlas of European cities, villages, islands, and excellent detours.",
};

const chapters = [
  {
    id: "low-countries",
    date: "October 2024",
    number: "01",
    title: "Canals, crooked houses & one more Paris walk",
    note: "Amsterdam to Belgium, then south to Paris — a first chapter written in bicycles, brick, and café tables.",
    colour: "olive",
    places: [
      ["Amsterdam", "Netherlands", "large"], ["Katwoude", "Netherlands", ""], ["Volendam", "Netherlands", ""],
      ["Bruges", "Belgium", "large"], ["Brussels", "Belgium", "medium"], ["Paris", "France", "large"],
    ],
  },
  {
    id: "alps-alsace",
    date: "December 2024",
    number: "02",
    title: "Alpine light, Milanese corners & Alsatian winter",
    note: "A cold-weather loop through Switzerland and northern Italy, ending among the painted façades of Alsace.",
    colour: "plum",
    places: [
      ["Altdorf", "Switzerland", ""], ["Basel", "Switzerland", "medium"], ["Bern", "Switzerland", ""],
      ["Brienz", "Switzerland", ""], ["Gentilino", "Switzerland", ""], ["Interlaken", "Switzerland", ""],
      ["Lucerne", "Switzerland", "medium"], ["Lugano", "Switzerland", ""], ["Zürich", "Switzerland", ""],
      ["Milan", "Italy", "large"], ["Colmar", "France", ""], ["Obernai", "France", ""], ["Strasbourg", "France", "large"],
    ],
  },
  {
    id: "scotland",
    date: "June 2025",
    number: "03",
    title: "Scotland, scattered across the sea",
    note: "Edinburgh to the Highlands, the Hebrides, and Orkney — stone, weather, ferries, and impossible greens.",
    colour: "terra",
    places: [
      ["Edinburgh", "Scotland", "large"], ["Isle of Lewis", "Scotland", "large"], ["Isle of Harris", "Scotland", "medium"],
      ["Orkney", "Scotland", "medium"], ["Stromness", "Scotland", "large"], ["Kirkwall", "Scotland", ""],
      ["Isle of Skye", "Scotland", "medium"], ["Portree", "Scotland", ""], ["Stornoway", "Scotland", "medium"],
      ["Inverness", "Scotland", ""], ["Fort William", "Scotland", ""], ["Ullapool", "Scotland", ""],
      ["Thurso", "Scotland", ""], ["Wick", "Scotland", ""], ["Helmsdale", "Scotland", ""],
      ["Ballachulish", "Scotland", ""], ["Callander", "Scotland", ""], ["Dalmally", "Scotland", ""],
      ["Doune", "Scotland", ""], ["Killin", "Scotland", ""], ["Kyle", "Scotland", ""],
      ["Lairg", "Scotland", ""], ["Lochearnhead", "Scotland", ""], ["South Queensferry", "Scotland", ""],
    ],
  },
  {
    id: "dordogne",
    date: "October 2025",
    number: "04",
    title: "Honey-coloured villages of the Dordogne",
    note: "Market baskets, walnut groves, cliffside sanctuaries, and villages that reward taking the slower road.",
    colour: "olive",
    places: [
      ["Sarlat-la-Canéda", "France", "large"], ["Rocamadour", "France", "large"], ["Castelnaud-la-Chapelle", "France", "large"],
      ["Souillac", "France", "large"], ["Beynac-et-Cazenac", "France", "medium"], ["Bergerac", "France", "medium"],
      ["Périgueux", "France", "medium"], ["Beaulieu-sur-Dordogne", "France", ""], ["Campagne", "France", ""],
      ["Castels et Bézenac", "France", ""], ["Collonges-la-Rouge", "France", ""], ["Lacave", "France", ""],
      ["Lalinde", "France", ""], ["Le Bugue", "France", ""], ["Les Eyzies", "France", ""],
      ["Limeuil", "France", ""], ["Marquay", "France", ""], ["Meyrals", "France", ""],
      ["Montignac", "France", ""], ["Peyrilles", "France", ""], ["Saint-Cyprien", "France", ""],
      ["Saint-Julien-Maumont", "France", ""], ["Saint-Sozy", "France", ""], ["Turenne", "France", ""],
      ["Vitrac", "France", ""], ["Vézac", "France", ""],
    ],
  },
  {
    id: "central-europe",
    date: "December 2025",
    number: "05",
    title: "Christmas markets & Central European trains",
    note: "Bavaria, Salzburg, Vienna, and Bratislava, with a final Paris encore for good measure.",
    colour: "plum",
    places: [
      ["Munich", "Germany", "large"], ["Nuremberg", "Germany", "medium"], ["Ettal", "Germany", ""],
      ["Salzburg", "Austria", "large"], ["Vienna", "Austria", "large"], ["Bratislava", "Slovakia", "large"],
      ["Paris", "France", "medium"], ["Puteaux", "France", ""],
    ],
  },
  {
    id: "provence",
    date: "May–June 2026",
    number: "06",
    title: "Ochre, olives & the villages of Provence",
    note: "The Luberon in warm light: market mornings, hill towns, and roads bordered by plane trees.",
    colour: "terra",
    places: [
      ["Gordes", "France", "large"], ["Roussillon", "France", "large"], ["L’Isle-sur-la-Sorgue", "France", "medium"],
      ["Lourmarin", "France", "medium"], ["Ménerbes", "France", "medium"], ["Apt", "France", ""],
      ["Fontaine-de-Vaucluse", "France", ""], ["Gargas", "France", ""], ["Goult", "France", ""],
      ["Joucas", "France", ""], ["Lacoste", "France", ""], ["Rustrel", "France", ""],
      ["Saint-Saturnin-lès-Apt", "France", ""], ["Venasque", "France", ""],
    ],
  },
] as const;

const pins = [
  ["Orkney", 29, 10, "scotland"], ["Isle of Lewis", 23, 18, "scotland"], ["Edinburgh", 34, 29, "scotland"],
  ["Amsterdam", 46, 42, "low-countries"], ["Bruges", 42, 47, "low-countries"], ["Paris", 43, 55, "low-countries"],
  ["Strasbourg", 52, 53, "alps-alsace"], ["Basel", 53, 59, "alps-alsace"], ["Milan", 55, 69, "alps-alsace"],
  ["Sarlat", 42, 69, "dordogne"], ["Rocamadour", 45, 72, "dordogne"], ["Munich", 60, 53, "central-europe"],
  ["Salzburg", 64, 58, "central-europe"], ["Vienna", 71, 55, "central-europe"], ["Bratislava", 75, 59, "central-europe"],
  ["Gordes", 48, 79, "provence"], ["Roussillon", 52, 82, "provence"],
] as const;

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
        {pins.map(([name, left, top, chapter], index) => <a key={name} className={`map-pin pin-${index % 3}`} href={`#${chapter}`} style={{left:`${left}%`,top:`${top}%`}} aria-label={`Go to ${name}`}>
          <i /><span>{name}</span>
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
            {chapter.places.map(([city, country, size]) => <div className={`place-card ${size}`} key={`${city}-${country}`}>
              <p>{country}</p><h4>{city}</h4><small>{chapter.date}</small>
            </div>)}
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
