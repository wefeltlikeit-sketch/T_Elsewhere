import Link from "next/link";
import { finds, stories, videos } from "./content";
import { Footer, Header, StoryCard } from "./components";
import { countries, places } from "./places";
import { HomeJourney } from "./home-journey";

const atlasPins = [
  ["Paris", "24%", "32%"],
  ["Amsterdam", "43%", "18%"],
  ["Lisbon", "15%", "67%"],
  ["Bologna", "58%", "61%"],
  ["Athens", "79%", "76%"],
];

function Chapter({ number, label }: { number: string; label: string }) {
  return <div className="home-chapter"><span>{number}</span><p>{label}</p><i /></div>;
}

export default function Home() {
  return (
    <main className="home-page">
      <Header />
      <section className="hero home-hero shell">
        <div className="hero-copy">
          <p className="eyebrow">A European travel journal by T</p>
          <h1>Stories gathered<br /><em>the long way round.</em></h1>
          <p className="dek">Cities, cheeses, market treasures, and the small details that make a trip worth retelling.</p>
          <a className="button" href="#home-journey">Start wandering <span>↓</span></a>
          <p className="postcard-note">currently daydreaming about<br /><strong>one more market morning</strong></p>
        </div>
        <div className="hero-photo photo" role="img" aria-label="Rocamadour rising above the Alzou valley">
          <span className="photo-label">Rocamadour, France</span>
          <div className="stamp">C<br /><small>&amp; cobbles</small></div>
          <span className="hero-route-mark" aria-hidden="true"><i />The road starts here</span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><span>TRAVEL NOTES · GOOD CHEESE · MARKET TREASURES · LONG LUNCHES · TRAVEL NOTES · GOOD CHEESE · MARKET TREASURES · LONG LUNCHES ·</span></div>

      <HomeJourney>
        <section className="home-stop home-story-stop shell" id="stories">
          <Chapter number="01" label="Open the notebook" />
          <div className="section-heading">
            <div><p className="eyebrow">Fresh from the notebook</p><h2>Stories worth<br />missing a train for.</h2></div>
            <div className="home-heading-note"><p>Field notes, wrong turns, and the details that followed me home.</p><Link className="text-link" href="/travel-stories">All travel stories →</Link></div>
          </div>
          <div className="story-grid">{stories.slice(0, 3).map((story, index) => <StoryCard key={story.slug} story={story} featured={index === 0} />)}</div>
        </section>

        <section className="home-stop home-atlas-stop" id="atlas-preview">
          <div className="shell">
            <Chapter number="02" label="Choose a direction" />
            <div className="home-atlas-layout">
              <div className="home-atlas-copy">
                <p className="eyebrow">The living atlas</p>
                <h2>Every place<br /><em>leaves a mark.</em></h2>
                <p>One growing map for the cities, villages, islands, and excellent detours collected along the way.</p>
                <dl><div><dt>{places.length}</dt><dd>places</dd></div><div><dt>{countries().length}</dt><dd>countries</dd></div></dl>
                <Link className="button" href="/places">Open the atlas <span>↗</span></Link>
              </div>
              <Link className="home-atlas-preview" href="/places" aria-label="Explore the living atlas">
                <div className="home-map-wash wash-a" /><div className="home-map-wash wash-b" /><div className="home-map-wash wash-c" />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M15 67 C25 54 31 40 43 18 S51 44 58 61 S72 72 79 76" /></svg>
                {atlasPins.map(([label, left, top], index) => <span className={`home-map-pin pin-${index}`} style={{ left, top }} key={label}><i />{label}</span>)}
                <small>Not to scale. Very much to feeling.</small>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-stop home-market-stop shell" id="markets">
          <Chapter number="03" label="Bring something home" />
          <div className="section-heading">
            <div><p className="eyebrow">Brought home, somehow</p><h2>Objects with<br />a story attached.</h2></div>
            <div className="home-heading-note"><p>A cabinet of useful souvenirs, impractical treasures, and very good decisions.</p><Link className="text-link" href="/markets-finds">See the whole haul →</Link></div>
          </div>
          <div className="home-find-grid">{finds.slice(0, 3).map((find, index) => <Link className="home-find" href="/markets-finds" key={find.name}><span className="home-find-tape" /><div className="photo" style={{backgroundImage:`url('${find.image}')`}}><span>{find.place}</span></div><p className="catalog">Find № {String(index + 1).padStart(2, "0")}</p><h3>{find.name}</h3><p>{find.note}</p></Link>)}</div>
        </section>

        <section className="home-stop home-cheese-stop" id="cheese">
          <div className="shell"><Chapter number="04" label="Stop for cheese" /></div>
          <div className="cheese-feature shell">
            <div className="cheese-art"><span className="cheese-orbit" aria-hidden="true">washed rind · burgundy · gloriously unruly · </span><div className="cheese-wheel"><span>9.2</span><small>/10<br />would smuggle<br />again</small></div></div>
            <div className="cheese-copy">
              <p className="eyebrow">Cheese of the moment · France</p>
              <h2>A shamelessly runny<br /><em>Époisses</em></h2>
              <p>Washed in marc de Bourgogne, louder than the table beside us, and absolutely worth wrapping in three layers of paper.</p>
              <dl><div><dt>Smells like</dt><dd>A very old cellar</dd></div><div><dt>Tastes like</dt><dd>Butter with opinions</dd></div><div><dt>Best with</dt><dd>Bread, patience, no plans</dd></div></dl>
              <Link className="button plum" href="/cheese-stories">More cheese stories <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="home-stop home-film-stop" id="videos">
          <div className="shell"><Chapter number="05" label="See it in motion" /></div>
          <div className="shell home-film-layout">
            <div className="home-film-copy"><p className="eyebrow">Press play &amp; come along</p><h2>Some moments<br />need to move.</h2><p>Market mornings, train windows, and everything better seen with the sound on.</p><Link className="text-link" href="/videos">Enter the screening room →</Link></div>
            <a className="home-film" href={videos[0].youtube} aria-label={`Watch ${videos[0].title} on YouTube`}><div className="photo" style={{backgroundImage:`url('${videos[0].image}')`}}><span className="home-film-count">01</span><i>▶</i><small>Play field film</small></div><h3>{videos[0].title}</h3><p>{videos[0].description}</p></a>
          </div>
        </section>
      </HomeJourney>

      <section className="newsletter shell"><p className="eyebrow">Postcards, minus the postage</p><h2>A little note from elsewhere.</h2><p>Occasional stories, excellent cheeses, and market finds delivered when there’s something worth sharing.</p><form><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="your@email.com" /><button type="submit">Send me wandering →</button></form></section>
      <Footer />
    </main>
  );
}
