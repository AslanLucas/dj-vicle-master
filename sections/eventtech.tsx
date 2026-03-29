"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Speaker,
    Lightbulb,
    Boxes,
    CloudFog,
    Sparkles,
    Package,
} from "lucide-react";

export default function EventTech() {
    const Technik = [
        { icon: Speaker, text: "Soundanlage für bis zu 600 Personen" },
        { icon: Lightbulb, text: "Professionelle Lichttechnik" },
        { icon: Boxes, text: "Traversen für flexible Aufbauten" },
        { icon: CloudFog, text: "Bodennebelmaschine für einzigartige Momente" },
        { icon: Sparkles, text: "Bis zu 4 Kaltfeuerwerke – ideal für den Hochzeitstanz" },
    ];

    const Vermietung = [
        { icon: Speaker, text: "Lautsprecher, Licht & Effekttechnik" },
        { icon: CloudFog, text: "Bodennebel & Kaltfeuerwerke" },
        { icon: Package, text: "Kaltfeuerwerke" },
    ];

    return (
        <section id="equipment" className="py-20 bg-[#0A0A0A] text-white">
            <div className="max-w-6xl mx-auto px-6">

                {/* Titel ohne Animation */}
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-center tracking-wide mb-12">
                    Eventtechnik & Vermietung
                    <span className="block h-[3px] w-24 bg-white mt-3 mx-auto rounded-full shadow-[0_0_10px_white]" />
                </h2>

                {/* Panels */}
                <div className="grid md:grid-cols-2 gap-12">

                    {/* Technik Panel – einmal von links */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="p-[2px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl shadow-xl"
                    >
                        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 h-full">

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Lightbulb className="size-7 text-yellow-400" />
                                Eventtechnik
                            </h3>

                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Ich arbeite mit eigener, hochwertiger Veranstaltungstechnik –
                                zuverlässig, kraftvoll und für Events jeder Größe geeignet.
                            </p>

                            {/* Items ohne Animation */}
                            <div className="space-y-4">
                                {Technik.map(({ icon: Icon, text }, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                                    >
                                        <Icon className="size-6 text-white" />
                                        <span className="text-gray-200">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Vermietung Panel – einmal von rechts */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="p-[2px] bg-gradient-to-br from-blue-900 via-purple-700 to-indigo-900 rounded-2xl shadow-xl"
                    >
                        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 h-full">

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Package className="size-7 text-purple-300" />
                                Vermietung
                            </h3>

                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Technik flexibel mieten, perfekt für kleinere Events,
                                Geburtstage oder DJ's.
                            </p>

                            {/* Items ohne Animation */}
                            <div className="space-y-4">
                                {Vermietung.map(({ icon: Icon, text }, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                                    >
                                        <Icon className="size-6 text-white" />
                                        <span className="text-gray-200">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Button ohne Animation */}
                <div className="mt-16 text-center">
                    <Link
                        href=""
                        className="inline-block bg-white text-black text-lg font-semibold py-3 px-6 rounded-lg
                       transition-transform hover:scale-105"
                    >
                        Technik anschauen
                    </Link>
                </div>

            </div>
        </section>
    );
}
