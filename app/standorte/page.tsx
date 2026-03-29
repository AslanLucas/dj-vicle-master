import Link from "next/link";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import { locationsList } from "@/utils/location-pages";

export default function LocationsOverviewPage() {
  return (
    <main className="min-h-screen bg-white text-[#2A2A2A]">
      <Header />
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
