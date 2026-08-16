import type { Metadata } from "next";
import { Footer, Header, PageHero } from "../components";
import { stories } from "../content";
import { StoryLink } from "./story-link";

export const metadata: Metadata = {
  title: "Travel Stories",
  description: "Field notes from trains, tables, cities, and the side streets worth taking slowly.",
};

export default function Page() {
  return (
    <main className="stories-page">
      <Header active="stories" />
      <PageHero
        kicker="Notes from trains, tables & side streets"
        title="Travel Stories"
        intro="The cities I loved, the turns I nearly missed, and the details that followed me home."
      />
      <aside className="story-ledger shell" aria-label="Notebook index">
        <span><b>{String(stories.length).padStart(2, "0")}</b> entries in the notebook</span>
        <i>Open at the page that catches your eye</i>
        <span>Filed by place, not itinerary</span>
      </aside>
      <section className="shell journal-index" aria-label="Travel story index">
        {stories.map((story, index) => (
          <article className="journal-entry" key={story.slug}>
            <StoryLink slug={story.slug}>
              <div
                className="journal-photo photo"
                data-story-image
                style={{ backgroundImage: `url('${story.image}')` }}
              >
                <span className="photo-label">{story.place}</span>
                <span className="journal-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="journal-copy">
                <p className="eyebrow">{story.category} · {story.read}</p>
                <h2>{story.title}</h2>
                <p>{story.excerpt}</p>
                <span className="journal-date">{story.date}</span>
                <span className="read-more">Turn the page →</span>
              </div>
              <span className="margin-note" aria-hidden="true">
                {index % 2 === 0 ? "worth the early start" : "keep this one"}
              </span>
            </StoryLink>
          </article>
        ))}
      </section>
      <Footer />
    </main>
  );
}
