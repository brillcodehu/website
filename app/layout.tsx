import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BrillCode | Egyedi landing oldal 24 órán belül – 9 400 Ft",
  description:
    "Professzionális, konverziófókuszú landing oldal készítése 24 óra alatt. Nem sablon, hanem egyedi fejlesztés. Gyors, megbízható, eredményes.",
  keywords: [
    "landing oldal",
    "landing page",
    "weboldal készítés",
    "egyedi weboldal",
    "konverzió optimalizálás",
    "24 órás weboldal",
    "olcsó landing oldal",
    "magyar webfejlesztés",
  ],
  authors: [{ name: "BrillCode" }],
  creator: "BrillCode",
  publisher: "BrillCode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://brillcode.hu"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://brillcode.hu",
    siteName: "BrillCode",
    title: "Egyedi landing oldal 24 órán belül – 9 400 Ft | BrillCode",
    description:
      "Professzionális, konverziófókuszú landing oldal készítése 24 óra alatt. Nem sablon, hanem egyedi fejlesztés.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BrillCode - Egyedi landing oldal 24 órán belül",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egyedi landing oldal 24 órán belül – 9 400 Ft | BrillCode",
    description:
      "Professzionális, konverziófókuszú landing oldal készítése 24 óra alatt. Nem sablon, hanem egyedi fejlesztés.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Schema.org JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://brillcode.hu/#business",
      name: "BrillCode",
      description:
        "Egyedi, konverziófókuszú landing oldalak készítése 24 órán belül.",
      url: "https://brillcode.hu",
      priceRange: "9400 Ft",
      areaServed: {
        "@type": "Country",
        name: "Hungary",
      },
      serviceType: "Landing Page Development",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Landing oldal szolgáltatások",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Egyedi landing oldal",
              description:
                "Professzionális, egyedi fejlesztésű landing oldal 24 órán belül",
            },
            price: "9400",
            priceCurrency: "HUF",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://brillcode.hu/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Hogyan lehet egyedi és mégis ilyen olcsó?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Produktizált rendszert használunk: bevált komponensekből építünk, de minden oldal egyedi igények szerint készül. Nincs sablon, de van hatékony folyamat.",
          },
        },
        {
          "@type": "Question",
          name: "Tényleg 24 óra alatt kész?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Igen. A megrendelés után 24 órán belül megkapod a kész, működő landing oldalt. Naponta korlátozott számú megrendelést fogadunk, így minden projektre teljes figyelmet fordítunk.",
          },
        },
        {
          "@type": "Question",
          name: "Mi kell a megrendeléshez?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cégnév, elérhetőségek, a fő üzenet vagy ajánlat amit kommunikálni szeretnél, és ha van, logó. Ennyi elég az induláshoz.",
          },
        },
        {
          "@type": "Question",
          name: "Van garancia vagy módosítási lehetőség?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Igen. 1 kör ingyenes módosítás jár minden megrendeléshez. Ha alapvetően más irányt szeretnél, beszéljük meg.",
          },
        },
        {
          "@type": "Question",
          name: "Domain és tárhely is jár hozzá?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Az oldalt bármilyen tárhelyre feltöltjük, de a domain és hosting költsége nem része az árnak. Segítünk kiválasztani a megfelelő szolgáltatót.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E5F74" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel (Facebook) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1451370966610168');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1451370966610168&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.className} bg-mesh min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
