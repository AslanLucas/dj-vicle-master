import type { Metadata } from "next";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import Sectionlegalnotice from "@/sections/sectionlegalnotice";

export const metadata: Metadata = {
  title: "Impressum | DJ VICLE",
  description: "Rechtliche Angaben und Kontaktinformationen im Impressum von DJ VICLE.",
  alternates: {
    canonical: "https://www.djvicle.de/legalnotice",
  },
};

const legalSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Impressum",
  url: "https://www.djvicle.de/legalnotice",
  description: "Rechtliche Informationen gemäß Impressumspflicht für DJ VICLE.",
};

export default function LegalNoticePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalSchema) }}
      />
      <Header />
      <Sectionlegalnotice />
      <Footer />
    </>
  );
}
