import type { Metadata } from "next"; import "./globals.css"; import { REVEAL_SCRIPT } from "./reveal-script";
export const metadata: Metadata={metadataBase:new URL("https://t-elsewhere.example"),title:{default:"T, Elsewhere — Stories gathered the long way round",template:"%s · T, Elsewhere"},description:"A warm European travel journal of cities, market finds, cheese stories, and videos from the road.",openGraph:{title:"T, Elsewhere",description:"Stories gathered the long way round.",images:["/og.png"]},twitter:{card:"summary_large_image",title:"T, Elsewhere",description:"Stories gathered the long way round.",images:["/og.png"]}};
// The reveal script runs blocking, as the first thing in <body>, so the
// "reveal-on" class lands before any content paints — no flash. If it never
// runs, the class is never added and the stylesheet hides nothing. See
// ./reveal-script for why this isn't a React component.
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><script dangerouslySetInnerHTML={{__html:REVEAL_SCRIPT}} />{children}</body></html>}
