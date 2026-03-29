"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ICONS
import {
    Sparkles,
    Music,
    Disc3,
    Lightbulb,
    Boxes,
    Star,
    Flag,
    Crown,
    Flame,
    Headphones,
} from "lucide-react";

const steps = [
    {
        year: "Kindheit",
        title: "Faszination für Musik und Technik",
        desc: "Schon als Kind interessierten mich Lautsprecher, Sound und Lichtshows. Ich wollte immer verstehen, wie alles funktioniert.",
        icon: Lightbulb,
        type: "small"
    },

    {
        year: "Frühe Jahre",
        title: "Wie alles begann",
        desc: "Mein Bruder brachte PA- und Lautsprechertechnik zu Familienfeiern mit. Ich half beim Aufbau, beobachtete alles und entwickelte eine wachsende Begeisterung für Sound und Eventtechnik.",
        icon: Boxes,
        type: "small"
    },

    {
        year: "2017",
        title: "Meine musikalischen Anfänge",
        desc: "Ich kaufte mir meinen ersten Pioneer DJ Controller und verbrachte unzählige Stunden damit, saubere Übergänge und musikalisches Feingefühl zu entwickeln.",
        icon: Music,
        image: "/vadim2017-2.JPG",
        type: "large"
    },

    {
        year: "2017–2019",
        title: "Die ersten Gigs",
        desc: "Meine ersten Auftritte spielte ich in Shisha Bars, auf Geburtstagen sowie bei Gartenpartys von Freunden und Bekannten. Das direkte Feedback half mir, meinen Sound und meine Mixing-Technik stetig zu verbessern.",
        icon: Music,
        image: "/aufbau1.JPG",
        type: "large"
    },

    {
        year: "2020",
        title: "Der Aufbau meines Club-Setups",
        desc: "Ich investierte in professionelle Clubtechnik wie den Pioneer DJM S9, zwei Rane Twelve MK1 sowie neue Licht- und Lautsprechertechnik. Damit erreichte ich die technische Grundlage, um im Clubbereich professionell arbeiten zu können.",
        icon: Disc3,
        image: "/setup.JPG",
        type: "large"
    },


    {
        year: "2022",
        title: "Einstieg in die Clubszene",
        desc: "Durch meinen Freund Jan Kepling -auch bekannt als DJ Keppo- lernte ich DJ Larry-T kennen, der mich unterstützte, Teil des DJ-Teams im Joker Lingen zu werden. Dort lernte ich, Crowds zu lesen, Energie gezielt zu steuern, professionelle Clubsets aufzubauen und die Abläufe im Nachtleben zu verstehen.",
        icon: Crown,
        image: "/vadimjoker-2.JPG",
        type: "large"
    },

    {
        year: "03.10.2022",
        title: "Erstes offizielles Booking",
        desc: "An diesem Datum spielte ich mein erstes eigenes Booking im Penthaus Meppen.",
        icon: Flag,
        type: "small"
    },

    {
        year: "2022",
        title: "Mein eigenes Techniklager",
        desc: "Da mein Equipment schnell wuchs, mietete ich 2022 mein erstes eigenes Techniklager und begann mein Eventequipment zu professionalisieren.",
        icon: Boxes,
        type: "small"
    },

    {
        year: "2023",
        title: "Hochzeiten und Firmenfeiern",
        desc: "2023 begleitete ich meine ersten offiziellen Hochzeiten und mehrere Firmenfeiern. Beide Bereiche erforderten musikalische Vielfalt und ein hohes Maß an Professionalität.",
        icon: Sparkles,
        type: "small"
    },

    {
        year: "2024",
        title: "Ausbau der Eventtechnik",
        desc: "Ich investierte in eine Bodennebelmaschine, vier Kaltfeuerwerke, eine Electro Voice Anlage für 500 bis 600 Personen, Hochleistungs-Moving-Heads und eine Erweiterung meines Lagers. Damit konnte ich Events, insbesondere Hochzeiten, atmosphärisch auf ein neues Level heben.",
        icon: Lightbulb,
        type: "small"
    },

    {
        year: "2025",
        title: "Großprojekte und Kooperationen",
        desc: "Ich bin Teil des HEAT-Teams und arbeite aktiv an unserer eigenen Partyreihe mit. 2025 umfasste dies unter anderem das HEAT Urban Music Festival sowie die Veranstaltung »Tanz in den Mai« in der Alten Weberei Nordhorn in Zusammenarbeit mit Grafschaft XXL. Unsere Aufgaben reichten von der technischen Planung über den Aufbau von 26 Laufmetern Traverse, der Installation von Licht- und Tontechnik, Soundchecks, Pegel-Einstellungen und Lichtprogrammierung bis hin zu meiner eigenen DJ-Performance. Ergänzend kamen mehrere ONLY Store Events sowie neue Technikanschaffungen wie ein Hazer und zusätzliche Traverse hinzu.",
        icon: Star,
        image: "/aufbau2.JPG",
        type: "large"
    },

    {
        year: "Heute",
        title: "Resident DJ und Event-Spezialist",
        desc: "Heute bin ich Resident DJ im Joker Lingen und begleite professionelle Events, Hochzeiten und Clubs in ganz Deutschland.",
        icon: Sparkles,
        image: "/vadim.JPG",
        type: "large"
    }
];


export default function StepsTimeline() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const { top, height } = container.getBoundingClientRect();
            const offset = 150;

            const progressRaw = (window.innerHeight - top - offset) / height;
            const progress = Math.min(1, Math.max(0, progressRaw));

            setScrollHeight(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={containerRef} id="story" className="bg-white py-20 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Titel */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-6 uppercase">
                    Über mich – Meine DJ Reise
                    <span className="block h-[5px] w-20 bg-black mt-2 mx-auto rounded shadow-[0_0_10px_black]" />
                </h2>

                {/* Intro */}
                <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed text-lg">
                    Ich wurde 1997 in Russland geboren und lebe seit 2004 in Deutschland.
                    Schon seit meiner Kindheit faszinieren mich Musik und Technik.
                </p>

                {/* Timeline */}
                <div className="relative">

                    {/* Linie */}
                    <div className="absolute left-1/2 top-0 h-full w-[3px] bg-gray-300 rounded-full -translate-x-1/2" />

                    {/* Scroll Fortschritt */}
                    <motion.div
                        className="absolute left-1/2 top-0 w-[3px] bg-black rounded-full shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                        animate={{ height: `${scrollHeight * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />

                    <div className="flex flex-col gap-20">
                        {steps.map((step, i) => {
                            const isLeft = i % 2 === 0;

                            return (
                                <div key={i} className="relative grid md:grid-cols-2 gap-8 items-center">

                                    {/* Card Animation nur einmal */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        className={`
                      bg-white rounded-xl p-6 border border-black/10 shadow-lg
                      hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]
                      hover:-translate-y-1 transition-all duration-300
                      ${isLeft ? "order-1" : "order-2"}
                    `}
                                    >
                                        <div className="flex items-center gap-2 text-sm font-bold text-black mb-2">
                                            <step.icon size={22} />
                                            <span>{step.year}</span>
                                        </div>

                                        <h3 className="text-xl font-semibold mb-3 text-black">
                                            {step.title}
                                        </h3>

                                        <p className="text-gray-700 mb-4">{step.desc}</p>

                                        {step.type === "large" && (
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full rounded-md object-cover max-h-80 shadow-md"
                                            />
                                        )}
                                    </motion.div>

                                    <div className={`${isLeft ? "order-2" : "order-1"}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Highlight Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-28 text-center px-6"
                >
                    <h3 className="text-3xl sm:text-4xl font-extrabold uppercase text-black mb-10">
                        Warum ich DJ bin
                    </h3>

                    <div className="max-w-3xl mx-auto bg-black text-white py-12 px-8 rounded-2xl shadow-lg">
                        <p className="text-xl mb-6 flex justify-center gap-2">
                            <Headphones /> Weil Musik verbindet
                        </p>
                        <p className="text-xl mb-6 flex justify-center gap-2">
                            <Star /> Weil jeder Moment besonders ist
                        </p>
                        <p className="text-xl mb-6 flex justify-center gap-2">
                            <Sparkles /> Weil ich Emotionen erzeugen möchte
                        </p>
                        <p className="text-xl font-semibold flex justify-center gap-2">
                            <Flame /> DJ VICLE ist meine Leidenschaft
                        </p>
                    </div>
                </motion.div>

                {/* ✅ Warum Paare mich buchen – Firefox Fix */}
                <section className="mt-32 px-6 text-center">
                    <h3 className="text-4xl font-extrabold uppercase text-black tracking-wide mb-14">
                        Warum Paare mich buchen
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {[
                            { icon: Crown, text: "Spezialist für deutsch-russische Hochzeiten" },
                            { icon: Flag, text: "Unterstützung bei Planung & Ablauf" },
                            { icon: Lightbulb, text: "Professionelle Technik" },
                            { icon: Music, text: "Musik für alle Generationen" },
                            { icon: Disc3, text: "Erfahrung aus Clubs & Großevents" },
                            { icon: Sparkles, text: "Persönlich & leidenschaftlich" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="
                  bg-white rounded-2xl p-8 border border-black/10
                  shadow-sm hover:shadow-xl transition
                  will-change-transform
                "
                            >
                                <item.icon className="w-10 h-10 mx-auto mb-4 text-black" />
                                <p className="text-lg font-semibold text-black">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center mt-24 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-black mb-3">
                        Bereit für den perfekten Sound?
                    </h3>

                    <p className="text-gray-700 mb-8">
                        Ob Hochzeit, Club oder Firmenevent – ich mache eure Veranstaltung unvergesslich.
                    </p>

                    <a
                        href="/booking"
                        className="
              inline-block bg-black text-white text-lg font-semibold
              py-3 px-8 rounded-lg border border-black
              transition-all duration-300
              hover:bg-white hover:text-black
              hover:shadow-[0_0_15px_rgba(0,0,0,0.6)]
            "
                    >
                        Jetzt Anfrage senden
                    </a>
                </div>
            </div>
        </section>
    );
}
