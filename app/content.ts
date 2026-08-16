// `place` stays the display string ("Bologna, Italy"). `places` is the join:
// slugs from ./places, which is what actually connects content to the atlas.
// Leave `places` off until a piece genuinely belongs to somewhere real — an
// empty doorway is worse than no doorway.
export type Story = { slug:string; category:string; place:string; title:string; excerpt:string; image:string; date:string; read:string; places?:string[]; };
export type Find = { name:string; place:string; note:string; image:string; places?:string[]; };
export type Video = { title:string; description:string; youtube:string; image:string; places?:string[]; };
export const stories: Story[] = [
  {slug:"bologna-before-breakfast",category:"Travel story",place:"Bologna, Italy",title:"Bologna before breakfast",excerpt:"Porticoes, pink morning light, and the particular joy of having nowhere urgent to be.",image:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=85",date:"June 18, 2026",read:"6 min read"},
  {slug:"blue-hour-lisbon",category:"City notes",place:"Lisbon, Portugal",title:"Lisbon at the blue hour",excerpt:"A tram, three miradouros, and the tiled doorway I nearly walked past.",image:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85",date:"May 29, 2026",read:"5 min read"},
  {slug:"rainy-sunday-paris",category:"Weekend away",place:"Paris, France",title:"A rainy Sunday in Paris",excerpt:"The case for wet pavements, warm bread, and one very small museum.",image:"/photos/paris-montmartre.jpg",date:"April 12, 2026",read:"7 min read",places:["paris"]},
  {slug:"train-to-lake-como",category:"Slow travel",place:"Lombardy, Italy",title:"The little train to Lake Como",excerpt:"Window seats, missed stops, and a lunch that took all afternoon.",image:"https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=85",date:"March 8, 2026",read:"8 min read"},
];
export const finds: Find[] = [
  {name:"A striped linen tea towel",place:"Arles, France",note:"Too cheerful to leave behind.",image:"https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=85"},
  {name:"Three tiny olive forks",place:"Athens, Greece",note:"Necessary? No. Perfect? Yes.",image:"https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=85"},
  {name:"A very serious plum jug",place:"Porto, Portugal",note:"Made it home in one piece.",image:"https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85"},
  {name:"The market basket",place:"Palermo, Italy",note:"Still carrying everything.",image:"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=85"},
];
export const videos: Video[] = [{title:"A slow market morning in Provence",description:"Come for the peaches, stay for the cheese counter and the world’s friendliest dog.",youtube:"https://www.youtube.com/",image:"/photos/lourmarin-market.jpg"},{title:"48 hours in Lisbon",description:"Trams, tiles, tinned fish, repeat.",youtube:"https://www.youtube.com/",image:"https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=85"}];

/* ── The join ──────────────────────────────────────────────────────────────
   Everything that can point at a place, queried by place slug. The atlas uses
   this to decide whether a card is a real doorway or still just a card, so
   doorways open by themselves as content gets published — no second edit. */

export function storiesForPlace(slug: string): Story[] {
  return stories.filter((story) => story.places?.includes(slug));
}

export function findsForPlace(slug: string): Find[] {
  return finds.filter((find) => find.places?.includes(slug));
}

export function videosForPlace(slug: string): Video[] {
  return videos.filter((video) => video.places?.includes(slug));
}

/** How many pieces of content point at a place. */
export function contentCountForPlace(slug: string): number {
  return (
    storiesForPlace(slug).length +
    findsForPlace(slug).length +
    videosForPlace(slug).length
  );
}

/**
 * Where a place card should lead — or null if nothing points there yet, in
 * which case the card stays an inert div rather than promising a door that
 * opens onto nothing. Stories win, then finds, then videos.
 */
export function doorwayFor(slug: string): string | null {
  const story = storiesForPlace(slug)[0];
  if (story) return `/posts/${story.slug}`;
  if (findsForPlace(slug).length > 0) return "/markets-finds";
  if (videosForPlace(slug).length > 0) return "/videos";
  return null;
}
