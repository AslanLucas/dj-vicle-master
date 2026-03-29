import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import { blogPosts } from "@/utils/blog-posts";

export const metadata: Metadata = {
  title: "Blog | DJ VICLE",
  description:
    "Tipps, Guides und Praxiswissen rund um Hochzeiten, Firmenfeiern und private Events mit DJ VICLE.",
  alternates: {
    canonical: "https://www.djvicle.de/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-[#2A2A2A]">
      <Header />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-36">
        <p className="text-sm uppercase tracking-wide text-[#2A2A2A]/70">Ratgeber & Insights</p>
        <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">Blog</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#2A2A2A]/90">
          Hier findest du praxisnahe Beiträge zu Hochzeit, Eventplanung, Musikdramaturgie und Buchung.
          Alle Inhalte sind auf deutsch-russische Events, Firmenfeiern und private Feiern ausgerichtet.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-[#2A2A2A]/15 bg-white p-6 transition hover:border-[#2A2A2A]/35 hover:bg-[#F5F5F5]"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[#2A2A2A]/60">
                {post.strategicGoal} · {post.mainKeyword}
              </p>
              <h2 className="mt-3 text-xl font-bold uppercase leading-snug">{post.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#2A2A2A]/85">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-block rounded-lg bg-[#2A2A2A] px-4 py-2 text-xs font-semibold uppercase text-white transition hover:opacity-90"
              >
                Beitrag lesen
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
