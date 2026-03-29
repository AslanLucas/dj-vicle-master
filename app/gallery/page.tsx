"use client";

import Header from "@/sections/header";
import Footer from "@/sections/footer";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EquipmentPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ✅ Bilderliste
    const images = [
        "/1.JPG",
        "/2.JPG",
        "/4.JPG",
        "/6.JPG",
        "/7.JPG",
        "/8.JPG",
        "/10.JPEG",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3500); // alle 3.5 Sekunden

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Header />

            <section className="bg-white py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">

                    <h2 className="text-4xl font-extrabold uppercase text-black mb-6">
                        Technik Galerie
                        <span className="block h-[4px] w-20 bg-black mt-3 mx-auto rounded-full shadow-[0_0_10px_black]" />
                    </h2>

                    <p className="text-gray-600 mb-12 text-lg">
                        Einblicke in mein professionelles Equipment für Hochzeiten, Clubs und Events.
                    </p>

                    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl border border-black/10">

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={images[index]}
                                src={images[index]}
                                alt="Eventtechnik Galerie"
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>

                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={`h-3 w-3 rounded-full transition-all ${
                                    i === index ? "bg-black scale-110" : "bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
