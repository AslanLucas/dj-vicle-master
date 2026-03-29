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


function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // kleine Verzögerung, bis DOM gerendert ist
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
