import Link from "next/link";
import { stories, finds, videos } from "./content";
import { Footer, Header, StoryCard } from "./components";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">A European travel journal by T</p>
          <h1>Stories gathered<br /><em>the long way round.</em></h1>
          <p className="dek">Cities, cheeses, market treasures, and the small details that make a trip worth retelling.</p>
          <Link className="button" href="/travel-stories">Wander with me <span>↗</span></Link>
          <p className="postcard-note">currently daydreaming about<br /><strong>one more market morning</strong></p>
        </div>
        <div className="hero-photo photo" role="img" aria-label="Sunlit street in an old European town">
          <span className="photo-label">Les Baux-de-Provence, France</span>
          <div className="stamp">T<br /><small>elsewhere</small></div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><span>TRAVEL NOTES · GOOD CHEESE · MARKET TREASURES · LONG LUNCHES · TRAVEL NOTES · GOOD CHEESE · MARKET TREASURES ·</span></div>

      <section className="section shell" id="stories">
        <div className="section-heading">
          <div><p className="eyebrow">Fresh from the notebook</p><h2>Featured stories</h2></div>
          <Link className="text-link" href="/travel-stories">All travel stories →</Link>
        </div>
        <div className="story-grid">{stories.slice(0, 3).map((story, index) => <StoryCard key={story.slug} story={story} featured={index === 0} />)}</div>
      </section>

      <section className="market-section" id="markets">
        <div className="shell">
          <div className="section-heading light"><div><p className="eyebrow">Brought home, somehow</p><h2>Market discoveries</h2></div><Link className="text-link" href="/markets-finds">See the whole haul →</Link></div>
          <div className="finds-grid">{finds.map((find, index) => <Link className={`find-card tilt-${index + 1}`} href="/markets-finds" key={find.name}><div className="find-image photo" style={{backgroundImage:`url('${find.image}')`}}><span>{find.place}</span></div><p className="catalog">FIND № 0{index + 1}</p><h3>{find.name}</h3><p>{find.note}</p></Link>)}</div>
        </div>
      </section>

      <section className="cheese-feature shell" id="cheese">
        <div className="cheese-art"><div className="cheese-wheel"><span>9.2</span><small>/10<br />would smuggle<br />again</small></div></div>
        <div className="cheese-copy">
          <p className="eyebrow">Cheese of the moment · France</p>
          <h2>A shamelessly runny<br /><em>Époisses</em></h2>
          <p>Washed in marc de Bourgogne, louder than the table beside us, and absolutely worth wrapping in three layers of paper.</p>
          <dl><div><dt>Smells like</dt><dd>A very old cellar</dd></div><div><dt>Tastes like</dt><dd>Butter with opinions</dd></div><div><dt>Best with</dt><dd>Bread, patience, no plans</dd></div></dl>
          <Link className="button plum" href="/cheese-stories">More cheese stories <span>↗</span></Link>
        </div>
      </section>

      <section className="video-section" id="videos">
        <div className="shell video-layout">
          <div><p className="eyebrow">Press play &amp; come along</p><h2>Moving pictures<br />from the road</h2><p className="video-intro">For the moments that need more than a photograph: market mornings, train windows, and cheese pulls in real time.</p><Link className="text-link" href="/videos">Watch all videos →</Link></div>
          <div className="video-card"><div className="video-thumb photo" style={{backgroundImage:`url('${videos[0].image}')`}}><a className="play" href={videos[0].youtube} aria-label="Watch latest travel video on YouTube">▶</a><span className="photo-label">NEW VIDEO · 12:48</span></div><h3>{videos[0].title}</h3><p>{videos[0].description}</p></div>
        </div>
      </section>
      <section className="newsletter shell"><p className="eyebrow">Postcards, minus the postage</p><h2>A little note from elsewhere.</h2><p>Occasional stories, excellent cheeses, and market finds delivered when there’s something worth sharing.</p><form><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="your@email.com" /><button type="submit">Send me wandering →</button></form></section>
      <Footer />
    </main>
  );
}
