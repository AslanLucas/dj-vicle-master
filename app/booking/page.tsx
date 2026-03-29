"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Mail } from "lucide-react";
import React, { useEffect } from "react";
import BookingForm from "@/sections/bookingform";
import Footer from "@/sections/footer";

export default function BookingPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="relative min-h-screen bg-white text-[#2A2A2A] flex flex-col justify-between no-header-padding">
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm md:text-base font-semibold uppercase border border-[#2A2A2A]/40 px-4 py-2 rounded-lg hover:bg-[#2A2A2A]/10 transition"
                >
                    <ChevronLeft className="size-5" />
                    Zur Startseite
                </Link>

            </div>

            {/* 🧾 Booking Form */}
            <div className="flex flex-col items-center justify-start w-full mt-28 px-6 pb-4">
                <div className="w-full max-w-3xl mb-10">
                    <BookingForm />
                </div>

                {/* 💬 Info-Bereich */}
                <div className="mb-16 flex flex-col md:flex-row items-center gap-5 bg-[#2A2A2A] rounded-2xl p-6 max-w-3xl mx-auto text-left shadow-md text-white">

                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden flex-shrink-0 border-4 border-white">
                        <Image
                            src="/vadimcontact.JPG"
                            alt="DJ Vicle"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-1">Hast du Fragen?</h3>

                        <p className="text-white/90 mb-2 leading-snug">
                            Ich helfe dir gerne persönlich weiter. Schreib mir einfach eine Nachricht.
                        </p>

                        <p className="font-semibold text-white">DJ VICLE</p>
                        <p className="text-sm text-white/70 mb-4">Vadim</p>

                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">

                            <a
                                href="mailto:info@djvicle.de"
                                className="inline-flex items-center gap-2 bg-white text-[#2A2A2A] font-semibold px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
                            >
                                <Mail className="size-8" />
                                Nachricht schreiben
                            </a>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
