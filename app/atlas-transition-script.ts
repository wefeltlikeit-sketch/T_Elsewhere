/**
 * Runs before page content is parsed. On a return from a location file, it
 * names the matching atlas card early enough for the browser to pair the old
 * location title with the new card during a cross-document transition.
 */
export const ATLAS_TRANSITION_SCRIPT = `(function(){try{var p=new URLSearchParams(location.search).get("return");if(!p||!/^[a-z0-9-]+$/.test(p))return;document.documentElement.dataset.returnPlace=p;var s=document.createElement("style");s.textContent='[data-atlas-card="'+p+'"]{view-transition-name:place-'+p+'}';document.head.appendChild(s)}catch(e){}})();`;
