'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Flame,
    Globe2,
    Sparkles,
    Radio,
    Music4,
    Waves
} from 'lucide-react';

export default function Genres() {

    const genres = [
        {
            title: "Urban / Black Music",
            icon: Flame,
            gradient: "from-black via-purple-800 to-purple-600",
            sub: ["Hip-Hop", "Oldschool", "R&B", "Trap / Drill", "Afrobeat"]
        },
        {
            title: "Latin & Karibisch",
            icon: Sparkles,
            gradient: "from-orange-600 via-red-500 to-yellow-400",
            sub: ["Reggaeton", "Latin Urban", "Dancehall", "Moombahton"]
        },
        {
            title: "International",
            icon: Globe2,
            gradient: "from-blue-900 via-blue-600 to-cyan-400",
            sub: ["Russische Charts", "Oldies", "2000er / 2010er"]
        },
        {
            title: "Charts & Pop",
            icon: Radio,
            gradient: "from-pink-600 via-purple-500 to-violet-400",
            sub: ["Pop / Charts", "Deutscher Pop", "Schlager", "80er / 90er", "2000er / 2010er"]
        },
        {
            title: "Electronic / Club",
            icon: Waves,
            gradient: "from-blue-700 via-indigo-700 to-purple-700",
            sub: ["House", "EDM", "Techno"]
        },
        {
            title: "Flexibel für jede Feier",
            icon: Music4,
            gradient: "from-gray-700 via-gray-500 to-gray-300",
            sub: ["Bunter Mix", "Wunschplaylist möglich"]
        }
    ];

    return (
        <section id="genres" className="py-20 bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* Titel */}
                <motion.h2
                    className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Musik, die verbindet
                    <span className="block h-[3px] w-20 bg-white mt-3 mx-auto rounded-full shadow-[0_0_10px_white]" />
                </motion.h2>

                {/* Genres Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {genres.map(({ title, icon: Icon, gradient, sub }, idx) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl p-[2px] bg-gradient-to-r ${gradient} shadow-xl hover:scale-[1.04] transition-all`}
                        >
                            <div className="bg-black/80 rounded-2xl p-6 h-full">

                                {/* Icon + Titel */}
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Icon className="size-10 text-white drop-shadow-lg" />
                                    <h3 className="text-xl font-bold uppercase tracking-wide">
                                        {title}
                                    </h3>
                                </div>

                                {/* Untergenres als Badges */}
                                <div className="flex flex-wrap justify-center gap-2 mt-3">
                                    {sub.map((entry) => (
                                        <span
                                            key={entry}
                                            className="text-sm bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm"
                                        >
                                            {entry}
                                        </span>
                                    ))}
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

