import type { Metadata } from "next";
import { Footer, Header, PageHero } from "../components";
import { videos } from "../content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Market mornings, train windows, cheese counters, and moving pictures from the road.",
};

export default function Page() {
  return (
    <main className="videos-page">
      <Header />
      <div className="cinema-curtain">
        <PageHero
          kicker="The road, in motion"
          title="Moving pictures"
          intro="Market mornings, train windows, cheese counters—and everything better seen with the sound on."
        />
        <div className="film-rule" aria-hidden="true"><span>Field films</span><i /><span>Cheese &amp; Cobblestones</span></div>
        <section className="shell screening-list" aria-label="Travel videos">
          {videos.map((video, index) => (
            <article className={`screening ${index === 0 ? "feature" : ""}`} key={video.title}>
              <a href={video.youtube} aria-label={`Watch ${video.title} on YouTube`}>
                <div className="film-frame">
                  <div className="video-still photo" style={{ backgroundImage: `url('${video.image}')` }} />
                  <span className="film-count">{String(index + 1).padStart(2, "0")}</span>
                  <span className="cinema-play" aria-hidden="true">▶</span>
                  <span className="film-caption">Play field film</span>
                </div>
                <div className="screening-copy">
                  <p className="eyebrow">Film {String(index + 1).padStart(2, "0")} · From the road</p>
                  <h2>{video.title}</h2>
                  <p>{video.description}</p>
                  <span>Watch now ↗</span>
                </div>
              </a>
            </article>
          ))}
        </section>
        <p className="end-title">More reels are being developed.</p>
      </div>
      <Footer />
    </main>
  );
}
