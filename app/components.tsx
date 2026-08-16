import Link from "next/link";
import type { Story } from "./content";

type NavSection = "stories" | "places" | "finds" | "cheese" | "videos" | "about";
const navLinks: { href: string; label: React.ReactNode; section: NavSection }[] = [
  { href: "/travel-stories", label: "Travel Stories", section: "stories" },
  { href: "/places", label: "Places", section: "places" },
  { href: "/markets-finds", label: <>Markets &amp; Finds</>, section: "finds" },
  { href: "/cheese-stories", label: "Cheese Stories", section: "cheese" },
  { href: "/videos", label: "Videos", section: "videos" },
  { href: "/about", label: "About", section: "about" },
];

function PageLink({href,className,children,current}:{href:string;className?:string;children:React.ReactNode;current?:boolean}){return <a href={href} className={className} data-page-transition aria-current={current?"page":undefined}>{children}</a>}

export function Header({active}:{active?:NavSection}){return <header className="site-header"><div className="shell header-inner"><PageLink href="/" className="brand"><span>CHEESE</span><i> &amp; </i>COBBLESTONES<small>stories, food &amp; finds gathered the long way round</small></PageLink><nav aria-label="Main navigation">{navLinks.map(link=><PageLink href={link.href} current={active===link.section} key={link.href}>{link.label}</PageLink>)}</nav><details className="mobile-menu"><summary>Menu</summary><div>{navLinks.map(link=><PageLink href={link.href} current={active===link.section} key={link.href}>{link.label}</PageLink>)}</div></details></div></header>}
export function Footer(){return <footer><div className="shell footer-inner"><div className="footer-brand"><span>CHEESE</span><i> &amp; </i>COBBLESTONES<p>Stories, food &amp; finds gathered the long way round.</p></div><nav><PageLink href="/travel-stories">Stories</PageLink><PageLink href="/places">Places</PageLink><PageLink href="/markets-finds">Finds</PageLink><PageLink href="/cheese-stories">Cheese</PageLink><PageLink href="/videos">Videos</PageLink><PageLink href="/about">About</PageLink></nav><p className="copyright">© 2026 Cheese &amp; Cobblestones<br />Made with crumbs in the keyboard.</p></div></footer>}
export function StoryCard({story,featured=false}:{story:Story;featured?:boolean}){return <article className={`story-card ${featured?"featured":""}`}><Link href={`/posts/${story.slug}`}><div className="story-image photo" style={{backgroundImage:`url('${story.image}')`}}><span className="photo-label">{story.place}</span></div><p className="eyebrow">{story.category} · {story.read}</p><h3>{story.title}</h3><p>{story.excerpt}</p><span className="read-more">Read the story →</span></Link></article>}
export function PageHero({kicker,title,intro}:{kicker:string;title:string;intro:string}){return <section className="page-hero shell"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p>{intro}</p></section>}
