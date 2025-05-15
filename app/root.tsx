import { LoaderFunction, json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
} from "@remix-run/react";
import { useEffect } from "react";
import { ClientOnly } from "remix-utils/client-only";
import * as gtag from "./utils/gtag";
import { tosBannerCookie } from "./data/cookie.server";
import CookieBanner, { LAST_UPDATED_DATE } from "./components/CookieBanner/CookieBanner";
import Whatsapp from "./components/Whatsapp/Whatsapp";

export const meta = () => {
  return [
    { title: "24Mobility - Die besten Mietkauf-Angebote in Hannover und Umgebung!" },
    {
      property: "og:title",
      content: "24Mobility - Die besten Mietkauf-Angebote in Hannover und Umgebung!",
    },
    {
      name: "title",
      content: "24Mobility - Die besten Mietkauf-Angebote in Hannover und Umgebung!"
    },
    {
      name: "description",
      content: "Kaufen Sie hier ein PKW auf Mietkauf! Ihr PKW Mietkaufen jetzt bei uns! PKW Mietkauf in Hannover",
    },
    {
      name: "robots",
      content: "index, follow"
    },
    {
      name: "keywords",
      content: "pkw mietkauf, mietkauf pkw, auto mietkauf, auto mietkaufen, pkw mietkaufen hannover, mietkaufen auto, pkw mietkauf hannover, mietkauf pkw hannover, mietkauf hannover, auto mietkaufen hannover"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,height=device-height, target-densitydpi=device-dpi"
    },
    {
      name: "charset",
      content: "utf-8"
    }
  ];
};

export const loader: LoaderFunction = async ({request}) => {
      const cookieHeader = request.headers.get("Cookie");
      const cookie = await tosBannerCookie.parse(cookieHeader);

      if (cookie) {
        return json({ showTOSBanner: cookie?.dateTOSRead < LAST_UPDATED_DATE });
      }
      return json(
        { showTOSBanner: true },
        {
          headers: {
            "Set-Cookie": await tosBannerCookie.serialize({
              dateTOSRead: 0,
            }),
          },
        }
      );
    }

export function Layout({ children }: { children: React.ReactNode }) {
  let gaTrackingId = 'G-5G3TFXYDR6';

  const { showTOSBanner } = useLoaderData<typeof loader>();

  const matches = useMatches();

  const location = useLocation();

  console.log(gaTrackingId);
  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

  console.log(showTOSBanner);
  return (
    <html lang="en">
      <head>
              
      <script async dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaTrackingId}');
            `
        }} />

<script async dangerouslySetInnerHTML={{ __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '1123059735992339');
                    fbq('track', 'PageView');
            `
        }} />

        <ClientOnly fallback={null}>
          { () => 
            <script async dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5GCVRMWJ');
                  `
              }} />
            }
        </ClientOnly>

        <ClientOnly fallback={null}>
          { () => 
            <script async dangerouslySetInnerHTML={{ __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '1123059735992339');
                    fbq('track', 'PageView');
                  `
              }} />
            }
        </ClientOnly>
        <noscript><img height="1" width="1" style={{display: 'none'}}
src="https://www.facebook.com/tr?id=1123059735992339&ev=PageView&noscript=1"
/></noscript>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GCVRMWJ"
        height="0" width="0" style={{display: 'none',visibility:'hidden'}}></iframe></noscript>
        {children}
        {showTOSBanner ? <CookieBanner /> : null}
        <ScrollRestoration />
        <Scripts />
        <Whatsapp />
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}

export default App;
