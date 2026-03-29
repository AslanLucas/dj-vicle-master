import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import { blogPostBySlug, blogPosts } from "@/utils/blog-posts";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug[slug];

  if (!post) {
    return {
      title: "Blogbeitrag nicht gefunden | DJ VICLE",
      description: "Der angeforderte Blogbeitrag konnte nicht gefunden werden.",
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://www.djvicle.de/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://www.djvicle.de/blog/${post.slug}`,
      siteName: "DJ VICLE",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPostBySlug[slug];

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    author: {
      "@type": "Person",
      name: "DJ VICLE",
    },
    publisher: {
      "@type": "Organization",
      name: "DJ VICLE",
      url: "https://www.djvicle.de",
    },
    mainEntityOfPage: `https://www.djvicle.de/blog/${post.slug}`,
  };

  return (
    <main className="min-h-screen bg-white text-[#2A2A2A]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="mx-auto max-w-4xl px-6 pb-16 pt-36">
        <Link
          href="/blog"
          className="inline-block rounded-lg border border-[#2A2A2A]/30 px-4 py-2 text-xs font-semibold uppercase transition hover:bg-[#F5F5F5]"
        >
          Zurück zum Blog
        </Link>

        <p className="mt-8 text-sm uppercase tracking-wide text-[#2A2A2A]/70">
          {post.strategicGoal} · Hauptkeyword: {post.mainKeyword}
        </p>

        <h1 className="mt-3 text-4xl font-extrabold uppercase leading-tight tracking-wide sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]/90">{post.excerpt}</p>

        <div className="mt-12 space-y-12">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold uppercase">{section.heading}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-[#2A2A2A]/90">
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-5 list-disc space-y-2 pl-5 text-[#2A2A2A]/90">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-[#2A2A2A]/20 p-7">
          <h2 className="text-xl font-bold uppercase">Nächster Schritt</h2>
          <p className="mt-3 leading-relaxed text-[#2A2A2A]/90">{post.cta}</p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="inline-block rounded-lg bg-[#2A2A2A] px-6 py-3 text-center text-sm font-semibold uppercase text-white transition hover:opacity-90"
            >
              Jetzt Anfrage senden
            </Link>
            <Link
              href="/standorte"
              className="inline-block rounded-lg border border-[#2A2A2A] px-6 py-3 text-center text-sm font-semibold uppercase text-[#2A2A2A] transition hover:bg-[#2A2A2A]/5"
            >
              Standort wählen
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
