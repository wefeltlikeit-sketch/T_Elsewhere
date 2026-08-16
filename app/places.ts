/**
 * Canonical place data for "T, Elsewhere".
 *
 * Single source of truth for everywhere T has actually been. Stories, finds and
 * cheeses reference places by `slug`; nothing else should hardcode a city name.
 *
 * A place is recorded once and carries a `visits` array, so somewhere returned
 * to — Paris, repeatedly — stays one place with a history rather than two
 * unrelated rows. `order` preserves each chapter's original hand-arranged grid
 * sequence; `size` is per-visit because the same city can be weighted
 * differently in different chapters.
 *
 * Map pins are deliberately a separate, curated list. They are hand-placed by
 * eye and cover a fraction of the places below, which is the point: the map is
 * drawn, not plotted. Not to scale. Very much to feeling.
 */

export type PlaceSize = "" | "medium" | "large";
export type ChapterColour = "olive" | "plum" | "terra";

export type Chapter = {
  id: string;
  number: string;
  date: string;
  title: string;
  note: string;
  colour: ChapterColour;
};

/** One appearance of a place within a chapter's grid. */
export type Visit = {
  chapter: string;
  size: PlaceSize;
  /** Position within that chapter's grid, preserving the original order. */
  order: number;
};

export type Place = {
  slug: string;
  city: string;
  country: string;
  visits: Visit[];
};

/** A hand-placed marker on the fold-out map. Percentages, chosen by eye. */
export type Pin = {
  /** Place slug this pin refers to. */
  place: string;
  /** Short label as drawn on the map — may be shorter than the full city name. */
  label: string;
  left: number;
  top: number;
  /** Chapter anchor the pin jumps to. */
  chapter: string;
};

export const chapters: Chapter[] = [
  { id: "low-countries", number: "01", date: "October 2024", colour: "olive",
    title: "Canals, crooked houses & one more Paris walk",
    note: "Amsterdam to Belgium, then south to Paris — a first chapter written in bicycles, brick, and café tables." },
  { id: "alps-alsace", number: "02", date: "December 2024", colour: "plum",
    title: "Alpine light, Milanese corners & Alsatian winter",
    note: "A cold-weather loop through Switzerland and northern Italy, ending among the painted façades of Alsace." },
  { id: "scotland", number: "03", date: "June 2025", colour: "terra",
    title: "Scotland, scattered across the sea",
    note: "Edinburgh to the Highlands, the Hebrides, and Orkney — stone, weather, ferries, and impossible greens." },
  { id: "dordogne", number: "04", date: "October 2025", colour: "olive",
    title: "Honey-coloured villages of the Dordogne",
    note: "Market baskets, walnut groves, cliffside sanctuaries, and villages that reward taking the slower road." },
  { id: "central-europe", number: "05", date: "December 2025", colour: "plum",
    title: "Christmas markets & Central European trains",
    note: "Bavaria, Salzburg, Vienna, and Bratislava, with a final Paris encore for good measure." },
  { id: "provence", number: "06", date: "May–June 2026", colour: "terra",
    title: "Ochre, olives & the villages of Provence",
    note: "The Luberon in warm light: market mornings, hill towns, and roads bordered by plane trees." },
];

export const places: Place[] = [
  { slug: "amsterdam", city: "Amsterdam", country: "Netherlands", visits: [{ chapter: "low-countries", size: "large", order: 0 }] },
  { slug: "katwoude", city: "Katwoude", country: "Netherlands", visits: [{ chapter: "low-countries", size: "", order: 1 }] },
  { slug: "volendam", city: "Volendam", country: "Netherlands", visits: [{ chapter: "low-countries", size: "", order: 2 }] },
  { slug: "bruges", city: "Bruges", country: "Belgium", visits: [{ chapter: "low-countries", size: "large", order: 3 }] },
  { slug: "brussels", city: "Brussels", country: "Belgium", visits: [{ chapter: "low-countries", size: "medium", order: 4 }] },
  { slug: "paris", city: "Paris", country: "France", visits: [{ chapter: "low-countries", size: "large", order: 5 }, { chapter: "central-europe", size: "medium", order: 6 }] },
  { slug: "altdorf", city: "Altdorf", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "", order: 0 }] },
  { slug: "basel", city: "Basel", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "medium", order: 1 }] },
  { slug: "bern", city: "Bern", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "", order: 2 }] },
  { slug: "brienz", city: "Brienz", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "", order: 3 }] },
  { slug: "gentilino", city: "Gentilino", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "", order: 4 }] },
  { slug: "interlaken", city: "Interlaken", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "", order: 5 }] },
  { slug: "lucerne", city: "Lucerne", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "medium", order: 6 }] },
  { slug: "lugano", city: "Lugano", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "", order: 7 }] },
  { slug: "zurich", city: "Zürich", country: "Switzerland", visits: [{ chapter: "alps-alsace", size: "", order: 8 }] },
  { slug: "milan", city: "Milan", country: "Italy", visits: [{ chapter: "alps-alsace", size: "large", order: 9 }] },
  { slug: "colmar", city: "Colmar", country: "France", visits: [{ chapter: "alps-alsace", size: "", order: 10 }] },
  { slug: "obernai", city: "Obernai", country: "France", visits: [{ chapter: "alps-alsace", size: "", order: 11 }] },
  { slug: "strasbourg", city: "Strasbourg", country: "France", visits: [{ chapter: "alps-alsace", size: "large", order: 12 }] },
  { slug: "edinburgh", city: "Edinburgh", country: "Scotland", visits: [{ chapter: "scotland", size: "large", order: 0 }] },
  { slug: "isle-of-lewis", city: "Isle of Lewis", country: "Scotland", visits: [{ chapter: "scotland", size: "large", order: 1 }] },
  { slug: "isle-of-harris", city: "Isle of Harris", country: "Scotland", visits: [{ chapter: "scotland", size: "medium", order: 2 }] },
  { slug: "orkney", city: "Orkney", country: "Scotland", visits: [{ chapter: "scotland", size: "medium", order: 3 }] },
  { slug: "stromness", city: "Stromness", country: "Scotland", visits: [{ chapter: "scotland", size: "large", order: 4 }] },
  { slug: "kirkwall", city: "Kirkwall", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 5 }] },
  { slug: "isle-of-skye", city: "Isle of Skye", country: "Scotland", visits: [{ chapter: "scotland", size: "medium", order: 6 }] },
  { slug: "portree", city: "Portree", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 7 }] },
  { slug: "stornoway", city: "Stornoway", country: "Scotland", visits: [{ chapter: "scotland", size: "medium", order: 8 }] },
  { slug: "inverness", city: "Inverness", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 9 }] },
  { slug: "fort-william", city: "Fort William", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 10 }] },
  { slug: "ullapool", city: "Ullapool", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 11 }] },
  { slug: "thurso", city: "Thurso", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 12 }] },
  { slug: "wick", city: "Wick", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 13 }] },
  { slug: "helmsdale", city: "Helmsdale", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 14 }] },
  { slug: "ballachulish", city: "Ballachulish", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 15 }] },
  { slug: "callander", city: "Callander", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 16 }] },
  { slug: "dalmally", city: "Dalmally", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 17 }] },
  { slug: "doune", city: "Doune", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 18 }] },
  { slug: "killin", city: "Killin", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 19 }] },
  { slug: "kyle", city: "Kyle", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 20 }] },
  { slug: "lairg", city: "Lairg", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 21 }] },
  { slug: "lochearnhead", city: "Lochearnhead", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 22 }] },
  { slug: "south-queensferry", city: "South Queensferry", country: "Scotland", visits: [{ chapter: "scotland", size: "", order: 23 }] },
  { slug: "sarlat-la-caneda", city: "Sarlat-la-Canéda", country: "France", visits: [{ chapter: "dordogne", size: "large", order: 0 }] },
  { slug: "rocamadour", city: "Rocamadour", country: "France", visits: [{ chapter: "dordogne", size: "large", order: 1 }] },
  { slug: "castelnaud-la-chapelle", city: "Castelnaud-la-Chapelle", country: "France", visits: [{ chapter: "dordogne", size: "large", order: 2 }] },
  { slug: "souillac", city: "Souillac", country: "France", visits: [{ chapter: "dordogne", size: "large", order: 3 }] },
  { slug: "beynac-et-cazenac", city: "Beynac-et-Cazenac", country: "France", visits: [{ chapter: "dordogne", size: "medium", order: 4 }] },
  { slug: "bergerac", city: "Bergerac", country: "France", visits: [{ chapter: "dordogne", size: "medium", order: 5 }] },
  { slug: "perigueux", city: "Périgueux", country: "France", visits: [{ chapter: "dordogne", size: "medium", order: 6 }] },
  { slug: "beaulieu-sur-dordogne", city: "Beaulieu-sur-Dordogne", country: "France", visits: [{ chapter: "dordogne", size: "", order: 7 }] },
  { slug: "campagne", city: "Campagne", country: "France", visits: [{ chapter: "dordogne", size: "", order: 8 }] },
  { slug: "castels-et-bezenac", city: "Castels et Bézenac", country: "France", visits: [{ chapter: "dordogne", size: "", order: 9 }] },
  { slug: "collonges-la-rouge", city: "Collonges-la-Rouge", country: "France", visits: [{ chapter: "dordogne", size: "", order: 10 }] },
  { slug: "lacave", city: "Lacave", country: "France", visits: [{ chapter: "dordogne", size: "", order: 11 }] },
  { slug: "lalinde", city: "Lalinde", country: "France", visits: [{ chapter: "dordogne", size: "", order: 12 }] },
  { slug: "le-bugue", city: "Le Bugue", country: "France", visits: [{ chapter: "dordogne", size: "", order: 13 }] },
  { slug: "les-eyzies", city: "Les Eyzies", country: "France", visits: [{ chapter: "dordogne", size: "", order: 14 }] },
  { slug: "limeuil", city: "Limeuil", country: "France", visits: [{ chapter: "dordogne", size: "", order: 15 }] },
  { slug: "marquay", city: "Marquay", country: "France", visits: [{ chapter: "dordogne", size: "", order: 16 }] },
  { slug: "meyrals", city: "Meyrals", country: "France", visits: [{ chapter: "dordogne", size: "", order: 17 }] },
  { slug: "montignac", city: "Montignac", country: "France", visits: [{ chapter: "dordogne", size: "", order: 18 }] },
  { slug: "peyrilles", city: "Peyrilles", country: "France", visits: [{ chapter: "dordogne", size: "", order: 19 }] },
  { slug: "saint-cyprien", city: "Saint-Cyprien", country: "France", visits: [{ chapter: "dordogne", size: "", order: 20 }] },
  { slug: "saint-julien-maumont", city: "Saint-Julien-Maumont", country: "France", visits: [{ chapter: "dordogne", size: "", order: 21 }] },
  { slug: "saint-sozy", city: "Saint-Sozy", country: "France", visits: [{ chapter: "dordogne", size: "", order: 22 }] },
  { slug: "turenne", city: "Turenne", country: "France", visits: [{ chapter: "dordogne", size: "", order: 23 }] },
  { slug: "vitrac", city: "Vitrac", country: "France", visits: [{ chapter: "dordogne", size: "", order: 24 }] },
  { slug: "vezac", city: "Vézac", country: "France", visits: [{ chapter: "dordogne", size: "", order: 25 }] },
  { slug: "munich", city: "Munich", country: "Germany", visits: [{ chapter: "central-europe", size: "large", order: 0 }] },
  { slug: "nuremberg", city: "Nuremberg", country: "Germany", visits: [{ chapter: "central-europe", size: "medium", order: 1 }] },
  { slug: "ettal", city: "Ettal", country: "Germany", visits: [{ chapter: "central-europe", size: "", order: 2 }] },
  { slug: "salzburg", city: "Salzburg", country: "Austria", visits: [{ chapter: "central-europe", size: "large", order: 3 }] },
  { slug: "vienna", city: "Vienna", country: "Austria", visits: [{ chapter: "central-europe", size: "large", order: 4 }] },
  { slug: "bratislava", city: "Bratislava", country: "Slovakia", visits: [{ chapter: "central-europe", size: "large", order: 5 }] },
  { slug: "puteaux", city: "Puteaux", country: "France", visits: [{ chapter: "central-europe", size: "", order: 7 }] },
  { slug: "gordes", city: "Gordes", country: "France", visits: [{ chapter: "provence", size: "large", order: 0 }] },
  { slug: "roussillon", city: "Roussillon", country: "France", visits: [{ chapter: "provence", size: "large", order: 1 }] },
  { slug: "l-isle-sur-la-sorgue", city: "L’Isle-sur-la-Sorgue", country: "France", visits: [{ chapter: "provence", size: "medium", order: 2 }] },
  { slug: "lourmarin", city: "Lourmarin", country: "France", visits: [{ chapter: "provence", size: "medium", order: 3 }] },
  { slug: "menerbes", city: "Ménerbes", country: "France", visits: [{ chapter: "provence", size: "medium", order: 4 }] },
  { slug: "apt", city: "Apt", country: "France", visits: [{ chapter: "provence", size: "", order: 5 }] },
  { slug: "fontaine-de-vaucluse", city: "Fontaine-de-Vaucluse", country: "France", visits: [{ chapter: "provence", size: "", order: 6 }] },
  { slug: "gargas", city: "Gargas", country: "France", visits: [{ chapter: "provence", size: "", order: 7 }] },
  { slug: "goult", city: "Goult", country: "France", visits: [{ chapter: "provence", size: "", order: 8 }] },
  { slug: "joucas", city: "Joucas", country: "France", visits: [{ chapter: "provence", size: "", order: 9 }] },
  { slug: "lacoste", city: "Lacoste", country: "France", visits: [{ chapter: "provence", size: "", order: 10 }] },
  { slug: "rustrel", city: "Rustrel", country: "France", visits: [{ chapter: "provence", size: "", order: 11 }] },
  { slug: "saint-saturnin-les-apt", city: "Saint-Saturnin-lès-Apt", country: "France", visits: [{ chapter: "provence", size: "", order: 12 }] },
  { slug: "venasque", city: "Venasque", country: "France", visits: [{ chapter: "provence", size: "", order: 13 }] },
];

export const pins: Pin[] = [
  { place: "orkney", label: "Orkney", left: 29, top: 10, chapter: "scotland" },
  { place: "isle-of-lewis", label: "Isle of Lewis", left: 23, top: 18, chapter: "scotland" },
  { place: "edinburgh", label: "Edinburgh", left: 34, top: 29, chapter: "scotland" },
  { place: "amsterdam", label: "Amsterdam", left: 46, top: 42, chapter: "low-countries" },
  { place: "bruges", label: "Bruges", left: 42, top: 47, chapter: "low-countries" },
  { place: "paris", label: "Paris", left: 43, top: 55, chapter: "low-countries" },
  { place: "strasbourg", label: "Strasbourg", left: 52, top: 53, chapter: "alps-alsace" },
  { place: "basel", label: "Basel", left: 53, top: 59, chapter: "alps-alsace" },
  { place: "milan", label: "Milan", left: 55, top: 69, chapter: "alps-alsace" },
  { place: "sarlat-la-caneda", label: "Sarlat", left: 42, top: 69, chapter: "dordogne" },
  { place: "rocamadour", label: "Rocamadour", left: 45, top: 72, chapter: "dordogne" },
  { place: "munich", label: "Munich", left: 60, top: 53, chapter: "central-europe" },
  { place: "salzburg", label: "Salzburg", left: 64, top: 58, chapter: "central-europe" },
  { place: "vienna", label: "Vienna", left: 71, top: 55, chapter: "central-europe" },
  { place: "bratislava", label: "Bratislava", left: 75, top: 59, chapter: "central-europe" },
  { place: "gordes", label: "Gordes", left: 48, top: 79, chapter: "provence" },
  { place: "roussillon", label: "Roussillon", left: 52, top: 82, chapter: "provence" },
];

const bySlug = new Map(places.map((place) => [place.slug, place]));

export function getPlace(slug: string): Place | undefined {
  return bySlug.get(slug);
}

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

/**
 * Places belonging to a chapter, in their original hand-arranged order, each
 * paired with the card size for that particular visit.
 */
export function placesInChapter(chapterId: string): { place: Place; size: PlaceSize }[] {
  const rows: { place: Place; size: PlaceSize; order: number }[] = [];
  for (const place of places) {
    for (const visit of place.visits) {
      if (visit.chapter === chapterId) {
        rows.push({ place, size: visit.size, order: visit.order });
      }
    }
  }
  rows.sort((a, b) => a.order - b.order);
  return rows.map(({ place, size }) => ({ place, size }));
}

/** How many separate trips took T here. */
export function visitCount(place: Place): number {
  return place.visits.length;
}

/** Places returned to more than once, most-visited first. */
export function returnedTo(): Place[] {
  return places
    .filter((place) => place.visits.length > 1)
    .sort((a, b) => b.visits.length - a.visits.length);
}

/** Chapters a place appears in, in chronological (declaration) order. */
export function chaptersFor(place: Place): Chapter[] {
  const ids = new Set(place.visits.map((visit) => visit.chapter));
  return chapters.filter((chapter) => ids.has(chapter.id));
}

/** Country names in first-appearance order, for the location-first atlas. */
export function countries(): string[] {
  return [...new Set(places.map((place) => place.country))];
}

export function countrySlug(country: string): string {
  return country
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function placesInCountry(country: string): Place[] {
  return places.filter((place) => place.country === country);
}

export function getCountry(slug: string): string | undefined {
  return countries().find((country) => countrySlug(country) === slug);
}
