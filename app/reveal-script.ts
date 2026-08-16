/**
 * Scroll reveals for "Cheese & Cobblestones" — as a blocking inline script, not a React
 * component.
 *
 * WHY IT LOOKS LIKE THIS
 *
 * The previous version hid content in CSS and relied on a React effect to
 * reveal it. That fails closed: any problem — a hydration error, a stale
 * deploy, a browser quirk — leaves a blank page. It did, twice.
 *
 * This version fails open. The stylesheet only hides anything when
 * <html class="reveal-on"> is present, and that class is added by the script
 * below. So:
 *
 *   - script never parses, or throws, or the browser is too old  → no class
 *     is added → every page renders normally, just without animation
 *   - JavaScript disabled entirely                               → same
 *   - prefers-reduced-motion                                     → same
 *   - script runs                                                → class added
 *     before first paint, so there is no flash of visible-then-hidden content
 *
 * It also drops React entirely. Client-side navigation is picked up by a
 * MutationObserver watching the body, so there is no dependency on hydration,
 * on effect lifecycles, or on the router — the three things that broke it
 * before. Written in conservative ES5 so a parse error can't be the failure.
 */

type Group = {
  /** Container to observe. */
  p: string;
  /** Children to reveal, relative to the container. */
  c: string;
  /** Milliseconds between each child. */
  s: number;
  /** Milliseconds before the group starts. */
  d: number;
  /** Ceiling on accumulated stagger, so long grids don't run away. */
  m: number;
};

const GROUPS: Group[] = [
  // Shared patterns
  { p: ".section-heading", c: ":scope > div > *, :scope > .text-link", s: 90, d: 0, m: 9e9 },
  { p: ".story-grid", c: ":scope > .story-card", s: 130, d: 0, m: 9e9 },
  { p: ".finds-grid", c: ":scope > .find-card", s: 110, d: 0, m: 9e9 },
  { p: ".cheese-copy", c: ":scope > *:not(dl)", s: 110, d: 0, m: 9e9 },
  { p: ".cheese-copy dl", c: ":scope > div", s: 150, d: 0, m: 9e9 },
  { p: ".video-layout", c: ":scope > div:first-child > *", s: 100, d: 0, m: 9e9 },
  { p: ".video-layout", c: ":scope > .video-card", s: 0, d: 260, m: 9e9 },
  { p: ".newsletter", c: ":scope > *", s: 100, d: 0, m: 9e9 },
  { p: ".home-chapter", c: ":scope > *", s: 80, d: 0, m: 9e9 },
  { p: ".home-atlas-layout", c: ":scope > *", s: 170, d: 0, m: 9e9 },
  { p: ".home-find-grid", c: ":scope > .home-find", s: 130, d: 0, m: 390 },
  { p: ".home-film-layout", c: ":scope > *", s: 180, d: 0, m: 9e9 },

  // Archive / interior pages
  { p: ".archive-grid", c: ":scope > .story-card", s: 110, d: 0, m: 620 },
  { p: ".finds-archive", c: ":scope > .find-archive-card", s: 100, d: 0, m: 620 },
  { p: ".finds-cabinet", c: ":scope > .find-object", s: 130, d: 0, m: 620 },
  { p: ".cheese-grid", c: ":scope > .cheese-card", s: 120, d: 0, m: 620 },
  { p: ".videos-grid", c: ":scope > .video-card", s: 110, d: 0, m: 620 },
  { p: ".journal-index", c: ":scope > .journal-entry", s: 90, d: 0, m: 360 },
  { p: ".screening-list", c: ":scope > .screening", s: 180, d: 0, m: 360 },

  // Places: the atlas. The map assembles the way one would be drawn —
  // washes soak in, seas get named, pins go in one at a time, key signs last.
  { p: ".atlas-heading", c: ":scope > div > *, :scope > p", s: 90, d: 0, m: 9e9 },
  { p: ".atlas-map", c: ":scope > .map-wash", s: 160, d: 0, m: 9e9 },
  { p: ".atlas-map", c: ":scope > .sea-note", s: 140, d: 380, m: 9e9 },
  { p: ".atlas-map", c: ":scope > .map-pin", s: 45, d: 520, m: 900 },
  { p: ".atlas-map", c: ":scope > .map-key", s: 0, d: 700, m: 9e9 },
  { p: ".chapter-jump", c: ":scope > a", s: 70, d: 0, m: 9e9 },
  { p: ".index-intro", c: ":scope > *", s: 100, d: 0, m: 9e9 },
  { p: ".place-chapter", c: ":scope > header > *", s: 90, d: 0, m: 9e9 },
  { p: ".place-chapter", c: ":scope > .place-grid > .place-card", s: 30, d: 180, m: 620 },
  { p: ".atlas-cta .shell", c: ":scope > *", s: 100, d: 0, m: 9e9 },
];

export const REVEAL_SCRIPT = `(function(){
var G=${JSON.stringify(GROUPS)};
var H=document.documentElement,C="reveal-on";
function off(){try{H.classList.remove(C)}catch(e){}}
try{
  if(!window.IntersectionObserver||!window.MutationObserver||!document.querySelectorAll)return;
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  H.classList.add(C);
}catch(e){off();return}
var io=null,mo=null,seen=[],done=[],timer=null;
function known(a,el){for(var i=0;i<a.length;i++)if(a[i]===el)return true;return false}
function reveal(p){
  if(known(done,p))return;
  done.push(p);
  for(var i=0;i<G.length;i++){
    var g=G[i];
    if(!p.matches||!p.matches(g.p))continue;
    var kids=p.querySelectorAll(g.c);
    for(var j=0;j<kids.length;j++){
      var d=g.d+Math.min(j*g.s,g.m);
      kids[j].style.setProperty("--rd",d+"ms");
    }
    (function(list){
      (window.requestAnimationFrame||function(f){setTimeout(f,16)})(function(){
        for(var k=0;k<list.length;k++)list[k].classList.add("is-in");
      });
    })(kids);
  }
}
function scan(){
  try{
    for(var i=0;i<G.length;i++){
      var ps=document.querySelectorAll(G[i].p);
      for(var j=0;j<ps.length;j++){
        if(known(seen,ps[j]))continue;
        seen.push(ps[j]);io.observe(ps[j]);
      }
    }
  }catch(e){off()}
}
function heal(){
  try{
    var vh=window.innerHeight||document.documentElement.clientHeight||0;
    for(var i=0;i<seen.length;i++){
      var el=seen[i];
      if(known(done,el))continue;
      var r=el.getBoundingClientRect();
      if(r.top<vh&&r.bottom>0)reveal(el);
    }
  }catch(e){off()}
}
function start(){
  try{
    io=new IntersectionObserver(function(es){
      for(var i=0;i<es.length;i++){
        if(!es[i].isIntersecting)continue;
        io.unobserve(es[i].target);reveal(es[i].target);
      }
    },{rootMargin:"0px 0px -12% 0px",threshold:0.1});
    scan();
    mo=new MutationObserver(function(){
      if(timer)clearTimeout(timer);
      timer=setTimeout(scan,60);
    });
    mo.observe(document.body,{childList:true,subtree:true});
    if(window.addEventListener)window.addEventListener("load",function(){setTimeout(heal,1200)},false);
  }catch(e){off()}
}
if(document.readyState==="loading"&&document.addEventListener)document.addEventListener("DOMContentLoaded",start,false);
else start();
})();`;
