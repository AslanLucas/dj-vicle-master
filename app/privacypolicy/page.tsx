import type { Metadata } from "next";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import Sectionprivacypolicy from "@/sections/sectionprivacpolicy";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | DJ VICLE",
  description: "Datenschutzerklärung von DJ VICLE inklusive Informationen zur Datenverarbeitung.",
  alternates: {
    canonical: "https://www.djvicle.de/privacypolicy",
  },
};

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  name: "Datenschutzerklärung",
  url: "https://www.djvicle.de/privacypolicy",
  publisher: {
    "@type": "Organization",
    name: "DJ VICLE",
    url: "https://www.djvicle.de",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <Header />
      <Sectionprivacypolicy />
      <Footer />
    </>
  );
}
