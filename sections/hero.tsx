'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {Flame, Headphones, Music, Sparkles, Star} from "lucide-react";
import React from "react";

export default function Hero() {
    return (
        <>
            <section
                id="hero"
                className="relative w-full overflow-hidden"
                style={{ paddingTop: '110px', height: 'calc(100vh - 110px)' }}
            >
                {/* Hintergrundbild */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/vadimhero.JPG"
                        alt="DJ VICLE Background"
                        fill
                        priority
                        quality={90}
                        className="object-cover object-[center_20%]"
                    />
                </div>

                {/* Dunkles Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10" />

                {/* Inhalt */}
                <div className="relative z-20 flex h-full items-center justify-center px-6 text-center">
                    <motion.div
                        className="max-w-4xl"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.2 } },
                        }}
                    >
                        <motion.h1
                            className="text-4xl sm:text-6xl font-extrabold tracking-wide text-white uppercase
                            drop-shadow-[0_0_10px_white] drop-shadow-[0_0_20px_white]"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            DJ VICLE
                        </motion.h1>

                        <motion.h3
                            className="text-xl sm:text-2xl font-medium tracking-normal text-gray-300 mt-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        >
                            Deutscher & Russischer DJ
                        </motion.h3>

                        <motion.h3
                            className="text-xl font-medium tracking-normal text-gray-300 mt-2"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        >
                            Clubs · Hochzeiten · Events
                        </motion.h3>

                        <motion.h3
                            className="text-xl font-medium tracking-normal text-gray-300 mt-2"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
                        >
                            Professioneller Sound · Modernes Equipment
                        </motion.h3>

                        {/* Buttons */}
                        <motion.div
                            className="mt-8 flex flex-col items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                        >
                            <Link
                                href="/booking"
                                className="inline-block bg-white text-black text-lg font-semibold py-3 px-6 rounded-lg
                                transition-transform hover:scale-105 heartbeat"
                            >
                                Anfrage senden
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <NextAppointments />


            {/* --------- NEUER TEXTBEREICH --------- */}
            <section className="px-6 py-16 max-w-4xl mx-auto text-center leading-relaxed text-lg text-gray-800">
                <h2 className="text-3xl font-bold mb-6">DJ VICLE – Dein DJ für deutsch russische Hochzeiten, Clubnächte und unvergessliche Events</h2>

                <p>Schön, dass du hier bist!</p>

                <p className="mt-4">
                    Ich bin DJ VICLE, 28 Jahre alt, DJ seit 2017 und spezialisiert auf deutsch russische Hochzeiten
                    sowie energiegeladene Events in ganz Deutschland. Mit russischen Wurzeln und deutschem Background
                    verbinde ich die beiden Kulturen authentisch, musikalisch und persönlich.
                </p>

                <p className="mt-4">
                    Als DJ begleite ich euch nicht nur am Hochzeitstag, sondern unterstütze euch bereits im Vorfeld
                    bei der Planung, Ablaufgestaltung und Vorbereitung eurer Feier. Vom ersten Kennenlerngespräch bis
                    zum persönlichen Treffen gehe ich auf eure Wünsche ein und integriere auf Wunsch russische Traditionen.
                </p>

                <p className="mt-4">
                    Zudem bin ich Resident DJ im Joker Lingen (Black Area) und bringe regelmäßig frische Cluberfahrung,
                    moderne Sounds und aktuelle Trends mit.
                </p>


                {/* Schwerpunkt – Deutsch-Russische Hochzeiten */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-28 text-center px-6"
                >
                    <h3
                        className="
            text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-black
            drop-shadow-[0_0_10px_white] drop-shadow-[0_0_20px_white]
            mb-10
        "
                    >
                        Mein Schwerpunkt
                    </h3>

                    <div
                        className="
            max-w-3xl mx-auto
            bg-black text-white
            py-12 px-8 rounded-2xl
            border border-white/20
            shadow-[0_0_25px_rgba(255,255,255,0.15)]
            backdrop-blur-md
            relative overflow-hidden
            transition-all duration-500
            hover:shadow-[0_0_35px_rgba(255,255,255,0.35)]
        "
                    >
                        {/* Soft White Glow Overlay */}
                        <div
                            className="
                absolute inset-0
                bg-gradient-to-br from-white/20 via-white/5 to-transparent
                opacity-30
                pointer-events-none
            "
                        />

                        {/* Titel */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="
                text-2xl font-semibold mb-6
                drop-shadow-[0_0_8px_white] drop-shadow-[0_0_15px_white]
            "
                        >
                            Deutsch–russische Hochzeiten
                        </motion.p>

                        {/* Erklärung */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="
                text-lg font-light leading-relaxed mb-10
                drop-shadow-[0_0_6px_white]
            "
                        >
                            Durch meinen eigenen kulturellen Hintergrund kenne ich beide Welten,
                            sowohl musikalisch als auch traditionell. Genau deshalb bin ich auf
                            deutsch-russische Hochzeiten spezialisiert.
                        </motion.p>

                        {/* Punkte mit Icons */}
                        <div className="flex flex-col items-center gap-6 text-lg">

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex items-center gap-3 drop-shadow-[0_0_8px_white]"
                            >
                                <Star className="w-6 h-6 text-white" />
                                Ablauf & Tagesplanung
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.25 }}
                                className="flex items-center gap-3 drop-shadow-[0_0_8px_white]"
                            >
                                <Music className="w-6 h-6 text-white" />
                                Musikauswahl
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex items-center gap-3 drop-shadow-[0_0_8px_white]"
                            >
                                <Sparkles className="w-6 h-6 text-white" />
                                Russische Traditionen
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.35 }}
                                className="flex items-center gap-3 drop-shadow-[0_0_8px_white]"
                            >
                                <Headphones className="w-6 h-6 text-white" />
                                Persönliches Vorgespräch
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex items-center gap-3 drop-shadow-[0_0_8px_white]"
                            >
                                <Flame className="w-6 h-6 text-white" />
                                Technische Umsetzung & Effekte
                            </motion.div>

                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}


function NextAppointments() {
    const [events, setEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const res = await fetch("/api/calendar");
                const data = await res.json();

                const raw = (data.events || []) as any[];

                const normalized = raw
                    .map((e) => {
                        const startRaw = e.start?.date || e.start?.dateTime;
                        if (!startRaw) return null;

                        return {
                            ...e,
                            _start: new Date(startRaw),
                        };
                    })
                    .filter(Boolean)
                    .sort((a: any, b: any) => a._start.getTime() - b._start.getTime());

                if (!cancelled) setEvents(normalized as any[]);
            } catch {
                if (!cancelled) setEvents([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const nextThree = events.slice(0, 3);
    const hasMoreThanThree = events.length > 3;

    const count = nextThree.length;

    const gridColsDesktop =
        count === 1 ? "sm:grid-cols-1" : count === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

    const gridMaxWidth =
        count === 1 ? "sm:max-w-md" : count === 2 ? "sm:max-w-3xl" : "sm:max-w-5xl";


    return (
        <section className="bg-white py-14 px-6">
            <div className="max-w-5xl mx-auto">

                {/* Titel */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-black">
                        Next Dates
                    </h2>
                </motion.div>

                <div className="mt-10">
                    {loading ? (
                        <div className="bg-[#F5F5F5] border border-black/10 rounded-2xl p-8 text-center shadow-md">
                            <p className="text-lg font-semibold text-black">Lade Termine…</p>
                        </div>
                    ) : nextThree.length === 0 ? (
                        <div className="bg-[#F5F5F5] border border-black/10 rounded-2xl p-8 text-center shadow-md">
                            <p className="text-lg font-semibold text-black">
                                Aktuell keine Termine angezeigt.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className={`grid grid-cols-1 ${gridColsDesktop} gap-6 mx-auto ${gridMaxWidth}`}>
                                {nextThree.map((event, index) => {
                                    const date = event.start?.date || event.start?.dateTime;
                                    const start = new Date(date);

                                    const formattedDate = start.toLocaleDateString("de-DE", {
                                        weekday: "short",
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    });

                                    const title = event.summary || "Termin";
                                    const isBooked = event.colorId === "11"; // 🔴 Rot

                                    return (
                                        <motion.div
                                            key={event.id ?? `${title}-${date}-${index}`}
                                            initial={{opacity: 0, y: 18}}
                                            whileInView={{opacity: 1, y: 0}}
                                            transition={{duration: 0.45, delay: index * 0.06}}
                                            viewport={{once: true}}
                                            className="
                                                bg-[#F5F5F5] rounded-2xl shadow-md
                                                border border-black/10 p-6
                                                hover:shadow-[0_0_18px_rgba(0,0,0,0.35)]
                                                hover:border-black/30 transition-all
                                            "
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <p className="text-sm font-semibold text-black/70">
                                                    {formattedDate}
                                                </p>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                        isBooked
                                                            ? "bg-red-500 text-white"
                                                            : "bg-yellow-400 text-black"
                                                    }`}
                                                >
                                                    {isBooked ? "Gebucht" : "Angefragt"}
                                                </span>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-lg font-extrabold text-black leading-snug">
                                                    {title}
                                                </p>

                                                {/* Adresse nur anzeigen wenn vorhanden */}
                                                {event.location && (
                                                    <p className="text-sm text-black/60 mt-2">
                                                        📍 {event.location}
                                                    </p>
                                                )}
                                            </div>

                                        </motion.div>
                                    );
                                })}
                            </div>

                            {hasMoreThanThree && (
                                <div className="mt-10 text-center">
                                    <Link
                                        href="/appointments"
                                        className="
                                            inline-block bg-black text-white
                                            text-lg font-semibold py-3 px-7 rounded-xl
                                            transition-transform hover:scale-105
                                            shadow-[0_0_18px_rgba(0,0,0,0.25)]
                                        "
                                    >
                                        Termine anzeigen
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

