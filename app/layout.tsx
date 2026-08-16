import type { Metadata } from "next"; import "./globals.css"; import { REVEAL_SCRIPT } from "./reveal-script"; import { ATLAS_TRANSITION_SCRIPT } from "./atlas-transition-script";
export const metadata: Metadata={metadataBase:new URL("https://cheeseandcobblestones.com"),title:{default:"Cheese & Cobblestones — Stories, food & finds",template:"%s · Cheese & Cobblestones"},description:"Stories, food, market finds, cheese, and films gathered from European cities and villages along the long way round.",openGraph:{title:"Cheese & Cobblestones",description:"Stories, food & finds gathered the long way round.",images:["/og-cheese-cobblestones.png"]},twitter:{card:"summary_large_image",title:"Cheese & Cobblestones",description:"Stories, food & finds gathered the long way round.",images:["/og-cheese-cobblestones.png"]}};
// The reveal script runs blocking, as the first thing in <body>, so the
// "reveal-on" class lands before any content paints — no flash. If it never
// runs, the class is never added and the stylesheet hides nothing. See
// ./reveal-script for why this isn't a React component.
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><script dangerouslySetInnerHTML={{__html:ATLAS_TRANSITION_SCRIPT}} /><script dangerouslySetInnerHTML={{__html:REVEAL_SCRIPT}} />{children}</body></html>}
