import type { Metadata } from "next";
import Header from "@/sections/header";
import Footer from "@/sections/footer";
import AvailableAppointments from "@/sections/availableAppointments";

export const metadata: Metadata = {
  title: "Verfügbare Termine | DJ VICLE",
  description:
    "Prüfe verfügbare Termine von DJ VICLE für Hochzeiten, Geburtstage, Clubs und Firmenfeiern.",
  alternates: {
    canonical: "https://www.djvicle.de/appointments",
  },
};

const appointmentsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Verfügbare DJ Termine",
  url: "https://www.djvicle.de/appointments",
  description:
    "Terminübersicht für Buchungsanfragen bei DJ VICLE für Events und Feiern.",
  about: {
    "@type": "Service",
    name: "DJ Booking",
    provider: {
      "@type": "Person",
      name: "DJ VICLE",
      url: "https://www.djvicle.de",
    },
  },
};

export default function AppointmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appointmentsSchema) }}
      />
      <Header />
      <AvailableAppointments />
      <Footer />
    </>
  );
}
