import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import FloatingSocialSidebar from "@/sections/socialsidebar";
import CookieBanner from "@/sections/CookieBanner";
import React from "react";

const montserratText = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-primary",
    display: "swap",
});

export const metadata: Metadata = {
    title: "DJ VICLE | DJ für Hochzeiten, Clubs & Events",
    description:
        "DJ VICLE – Deutscher & Russischer DJ für Clubs, Hochzeiten, Geburtstage und Events. Professionelle Musik, moderne Licht- und Tontechnik sowie Vermietung von Veranstaltungstechnik.",
    keywords: [
        "DJ",
        "DJ VICLE",
        "Deutscher DJ",
        "Russischer DJ",
        "DJ Lingen",
        "DJ Lingen Ems",
        "DJ Emsland",
        "DJ Deutschland",
        "Event DJ",
        "Club DJ",
        "DJ Club",
        "Hochzeits DJ",
        "DJ Hochzeit",
        "Hochzeit DJ Lingen",
        "Geburtstags DJ",
        "DJ Geburtstag",
        "DJ Party",
        "Event Musik",
        "DJ Technik",
        "Vermietung von Technik",
        "Lichttechnik mieten",
        "Tontechnik mieten",
        "Eventtechnik Verleih",
        "DJ Service",
        "Russische Hochzeit DJ",
        "Deutsch Russische Hochzeit DJ"
    ],
    authors: [{ name: "DJ VICLE" }],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
    alternates: {
        canonical: "https://www.djvicle.de",
    },
    openGraph: {
        title: "DJ VICLE – Deutscher & Russischer DJ",
        description:
            "Professioneller DJ für Clubs, Hochzeiten und Events – inklusive Licht-, Ton- und Technikvermietung.",
        url: "https://www.djvicle.de",
        siteName: "DJ VICLE",
        images: [
            {
                url: "https://www.djvicle.de/logo.png",
                width: 1200,
                height: 630,
                alt: "DJ VICLE – Deutscher & Russischer DJ",
            },
        ],
        locale: "de_DE",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};



export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de">
        <body className={`${montserratText.variable}`}>
        {children}
        <FloatingSocialSidebar />
        <CookieBanner/>
        </body>
        </html>
    );
}
