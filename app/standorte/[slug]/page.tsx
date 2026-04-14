import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import { locationPages, locationSlugs } from "@/utils/location-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locationPages[slug];

  if (!location) {
    return {
      title: "Standortseite nicht gefunden | DJ VICLE",
      description: "Die angeforderte Standortseite konnte nicht gefunden werden.",
    };
  }

  return {
    title: location.seoTitle,
    description: location.metaDescription,
    keywords: [
      location.mainKeyword,
      ...location.seoKeywords,
      ...location.secondaryKeywords,
      "deutsch russischer dj",
      "russischer dj",
      "deutscher dj",
    ],
    alternates: {
      canonical: `https://www.djvicle.de/standorte/${location.slug}`,
    },
    openGraph: {
      title: location.seoTitle,
      description: location.metaDescription,
      url: `https://www.djvicle.de/standorte/${location.slug}`,
      siteName: "DJ VICLE",
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = locationPages[slug];

  if (!location) {
    notFound();
  }


  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${location.h1} | DJ VICLE`,
    provider: {
      "@type": "Person",
      name: "DJ VICLE",
      jobTitle: "Russischer & Deutscher DJ",
      url: "https://www.djvicle.de",
    },
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    serviceType: "DJ Service für Hochzeiten, Firmenfeiern und Events",
    keywords: [
      location.mainKeyword,
      ...location.seoKeywords,
      ...location.secondaryKeywords,
      "deutsch russischer dj",
      "russischer dj",
      "deutscher dj",
    ],
    url: `https://www.djvicle.de/standorte/${location.slug}`,
    description: location.metaDescription,
    inLanguage: "de-DE",
  };

  return (
    <main className="min-h-screen bg-white text-[#2A2A2A]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-36">
        <p className="text-sm uppercase tracking-wide text-[#2A2A2A]/70">Standortseite · {location.city}</p>

        <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">{location.h1}</h1>

        <p className="mt-8 text-lg leading-relaxed text-[#2A2A2A]/90">{location.intro}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-2xl">
            <Image
              src="/vadimbooking.jpg"
              alt={`DJ VICLE bei einer Veranstaltung in ${location.city}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-72 overflow-hidden rounded-2xl">
            <Image
              src="/setup.JPG"
              alt={`Licht- und Tontechnik für Events in ${location.city}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold uppercase">{location.sections.services.title}</h2>
          {location.sections.services.paragraphs.map((text) => (
            <p key={text} className="mt-5 leading-relaxed text-[#2A2A2A]/90">
              {text}
            </p>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold uppercase">{location.sections.localFit.title}</h2>
          {location.sections.localFit.paragraphs.map((text) => (
            <p key={text} className="mt-5 leading-relaxed text-[#2A2A2A]/90">
              {text}
            </p>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold uppercase">{location.sections.process.title}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {location.sections.process.steps.map((step) => (
              <article key={step.title} className="rounded-xl border border-[#2A2A2A]/10 p-5">
                <h3 className="text-lg font-bold uppercase">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2A2A2A]/85">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold uppercase">{location.sections.faq.title}</h2>
          <div className="mt-8 space-y-5">
            {location.sections.faq.items.map((item) => (
              <article key={item.question} className="rounded-xl bg-[#F5F5F5] p-6">
                <h3 className="text-lg font-bold">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A2A2A]/85">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold uppercase">{location.sections.eventTypes.title}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {location.sections.eventTypes.items.map((item) => (
              <article key={item.title} className="rounded-xl border border-[#2A2A2A]/10 p-5">
                <h3 className="text-lg font-bold uppercase">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A2A2A]/85">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold uppercase">{location.sections.trust.title}</h2>
          {location.sections.trust.paragraphs.map((text) => (
            <p key={text} className="mt-5 leading-relaxed text-[#2A2A2A]/90">
              {text}
            </p>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-[#2A2A2A]/20 p-8">
          <h2 className="text-2xl font-bold uppercase">{location.cta.title}</h2>
          <p className="mt-4 leading-relaxed text-[#2A2A2A]/90">{location.cta.text}</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="inline-block rounded-lg bg-[#2A2A2A] px-6 py-3 text-center text-sm font-semibold uppercase text-white transition hover:opacity-90"
            >
              Jetzt Anfrage senden
            </Link>
            <Link
              href="/#contact"
              className="inline-block rounded-lg border border-[#2A2A2A] px-6 py-3 text-center text-sm font-semibold uppercase text-[#2A2A2A] transition hover:bg-[#2A2A2A]/5"
            >
              Direkt Kontakt aufnehmen
            </Link>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}
