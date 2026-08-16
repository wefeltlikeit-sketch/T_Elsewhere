import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header, StoryCard } from "../../components";
import { findsForPlace, storiesForPlace, videosForPlace } from "../../content";
import { chaptersFor, getPlace, places, visitCount } from "../../places";

export function generateStaticParams() { return places.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlace(slug);
  if (!place) return {};
  return { title: `${place.city}, ${place.country}`, description: `Stories, photographs, finds, tips, and films collected in ${place.city}.` };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = getPlace(slug);
  if (!place) notFound();
  const stories = storiesForPlace(slug);
  const finds = findsForPlace(slug);
  const videos = videosForPlace(slug);
  const total = stories.length + finds.length + videos.length;
  const visits = chaptersFor(place);

  return <main><Header />
    <section className="place-detail-hero shell">
      <Link className="place-back" href="/places">← The atlas</Link>
      <p className="eyebrow">{place.country} · Location file</p>
      <h1>{place.city}</h1>
      <p className="place-detail-dek">Everything gathered here, kept together: the long reads, quick notes, photographs, things brought home, and views from above.</p>
      <div className="place-detail-meta"><span>{visitCount(place)} {visitCount(place) === 1 ? "visit" : "visits"}</span><span>{total} {total === 1 ? "piece" : "pieces"} collected</span></div>
    </section>

    <section className="place-cabinet shell">
      <aside><p className="eyebrow">Inside this file</p><h2>A shelf for<br />{place.city}.</h2><dl><div><dt>Stories</dt><dd>{stories.length}</dd></div><div><dt>Market finds</dt><dd>{finds.length}</dd></div><div><dt>Films</dt><dd>{videos.length}</dd></div></dl></aside>
      <div className="place-contents">
        {total === 0 && <div className="empty-shelf"><span>Filed for later</span><h3>The place is here.<br />The stories are coming.</h3><p>This location already belongs in the atlas. As photographs, tips, finds, and films are published, they’ll collect here automatically.</p><Link className="text-link" href="/travel-stories">Browse all field notes →</Link></div>}
        {stories.length > 0 && <div className="content-group"><p className="eyebrow">Stories &amp; notes</p><div className="place-story-grid">{stories.map((story) => <StoryCard story={story} key={story.slug} />)}</div></div>}
        {finds.length > 0 && <div className="content-group"><p className="eyebrow">Market finds</p>{finds.map((find) => <article className="place-find" key={find.name}><div className="photo" style={{ backgroundImage: `url('${find.image}')` }} /><div><h3>{find.name}</h3><p>{find.note}</p></div></article>)}</div>}
        {videos.length > 0 && <div className="content-group"><p className="eyebrow">Films &amp; footage</p>{videos.map((video) => <a className="place-video" href={video.youtube} key={video.title}><div className="photo" style={{ backgroundImage: `url('${video.image}')` }}><span className="play">▶</span></div><div><h3>{video.title}</h3><p>{video.description}</p></div></a>)}</div>}
      </div>
    </section>

    <section className="visit-strip"><div className="shell"><p className="eyebrow">Visits in the notebook</p><div>{visits.map((visit) => <span key={visit.id}><small>{visit.date}</small>{visit.title}</span>)}</div></div></section>
    <Footer />
  </main>;
}
