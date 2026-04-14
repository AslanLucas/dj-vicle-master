"use client";

import React, { useEffect } from "react";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import Hero from "@/sections/hero";
import Services from "@/sections/services";
import StepsTimeline from "@/sections/steps";
import ContactSection from "@/sections/contact";
import Genres from "@/sections/genres";
import EventTech from "@/sections/eventtech";

const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.djvicle.de/#business",
      name: "DJ VICLE",
      url: "https://www.djvicle.de",
      image: "https://www.djvicle.de/logo.png",
      description:
        "Professioneller DJ für Hochzeiten, Clubs und Events inklusive Licht- und Tontechnik.",
      areaServed: ["Lingen", "Emsland", "Niedersachsen", "NRW", "Deutschland"],
      sameAs: [
        "https://www.instagram.com/djvicle",
        "https://www.tiktok.com/@djvicle"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@djvicle.de",
        contactType: "customer support",
        availableLanguage: ["de", "ru"]
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.djvicle.de/#webpage",
      url: "https://www.djvicle.de",
      name: "DJ VICLE | DJ für Hochzeiten, Clubs & Events",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.djvicle.de/#website"
      },
      about: {
        "@id": "https://www.djvicle.de/#business"
      },
      hasPart: [
        { "@type": "WebPageElement", name: "Hero", url: "https://www.djvicle.de/#hero" },
        { "@type": "WebPageElement", name: "Genres", url: "https://www.djvicle.de/#genres" },
        { "@type": "WebPageElement", name: "Services", url: "https://www.djvicle.de/#services" },
        { "@type": "WebPageElement", name: "Eventtechnik", url: "https://www.djvicle.de/#eventtech" },
        { "@type": "WebPageElement", name: "Ablauf", url: "https://www.djvicle.de/#steps" },
        { "@type": "WebPageElement", name: "Kontakt", url: "https://www.djvicle.de/#contact" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.djvicle.de/#website",
      url: "https://www.djvicle.de",
      name: "DJ VICLE"
    },
    {
      "@type": "Service",
      "@id": "https://www.djvicle.de/#service",
      name: "DJ Service für Hochzeiten, Clubs und Firmenfeiern",
      provider: {
        "@id": "https://www.djvicle.de/#business"
      },
      serviceType: "DJ & Eventtechnik",
      areaServed: "Deutschland"
    }
  ]
};

function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, []);

  return null;
}

export default function HomePage() {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <ScrollToHash />
      <Header />
      <Hero />
      <Genres />
      <Services />
      <EventTech />
      <StepsTimeline />
      <ContactSection />
      <Footer />
    </>
  );
}
