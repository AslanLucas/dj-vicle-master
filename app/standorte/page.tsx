import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import { locationsList } from "@/utils/location-pages";

export const metadata: Metadata = {
  title: "Standorte | DJ VICLE",
  description:
    "Alle Standortseiten von DJ VICLE für Hochzeiten, Firmenfeiern und Events in Niedersachsen und NRW – inklusive deutsch-russischer Musikkompetenz.",
  keywords: [
    "standorte dj",
    "deutsch russischer dj",
    "dj hochzeit niedersachsen",
    "dj firmenfeier nrw",
    "event dj deutschland",
  ],
  alternates: {
    canonical: "https://www.djvicle.de/standorte",
  },
  openGraph: {
    title: "Standorte | DJ VICLE",
    description:
      "Lokale DJ-Standortseiten für Hochzeiten, Firmenfeiern und Events mit deutsch-russischem Musikfokus.",
    url: "https://www.djvicle.de/standorte",
    siteName: "DJ VICLE",
    locale: "de_DE",
    type: "website",
  },
};

export default function LocationsOverviewPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Standorte | DJ VICLE",
    description:
      "Übersicht aller Standorte für DJ VICLE in Niedersachsen und NRW für Hochzeiten, Firmenfeiern und private Events.",
    url: "https://www.djvicle.de/standorte",
    keywords: [
      "deutsch russischer dj",
      "russischer dj",
      "deutscher dj",
      "hochzeits dj",
      "event dj",
    ],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: locationsList.map((location, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: location.h1,
        url: `https://www.djvicle.de/standorte/${location.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white text-[#2A2A2A]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-36">
        <h1 className="text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">Standorte</h1>
        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]/90">
          DJ VICLE begleitet Hochzeiten, Clubs und Events in vielen Städten in Niedersachsen und NRW.
          Hier findest du alle lokalen Standortseiten mit spezifischen Informationen, Leistungen und Kontaktwegen.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {locationsList.map((location) => (
            <Link
              key={location.slug}
              href={`/standorte/${location.slug}`}
              className="rounded-xl border border-[#2A2A2A]/15 p-5 transition hover:border-[#2A2A2A]/35 hover:bg-[#F5F5F5]"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[#2A2A2A]/60">{location.city}</p>
              <h2 className="mt-2 text-xl font-bold uppercase">{location.h1}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#2A2A2A]/80">{location.metaDescription}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
