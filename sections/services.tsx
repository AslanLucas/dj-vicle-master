'use client';

import React from 'react';
import {
    Music,
    Disc3,
    Sparkles,
    PartyPopper,
    Building2,
    Radio,
    Lightbulb,
    Mic2,
    Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
    const services = [
        { icon: Music, label: "Deutscher & Russischer DJ" },
        { icon: Disc3, label: "Clubs & Events" },
        { icon: Sparkles, label: "Hochzeiten" },
        { icon: PartyPopper, label: "Geburtstage" },
        { icon: Building2, label: "Firmenevents" },
        { icon: Radio, label: "Technik-Vermietung" },
        { icon: Headphones, label: "Individuelle Musikberatung" }
    ];

    return (
        <section id="services" className="bg-white py-20 text-black">
            <div className="max-w-6xl mx-auto px-4 text-center">

                {/* Titel */}
                <motion.h2
                    className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide mb-12 relative inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Leistungen
                    <span className="block h-[3px] w-16 bg-black mt-3 mx-auto rounded-full shadow-[0_0_6px_black]" />
                </motion.h2>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-10 justify-items-center">
                    {services.map(({ icon: Icon, label }, index) => (
                        <motion.div
                            key={label}
                            className="bg-[#F5F5F5] w-full max-w-[240px] h-56 px-6 py-8
                                       rounded-xl shadow-md text-center flex flex-col items-center justify-center
                                       border border-black/10 transition-all duration-300 hover:scale-105
                                       hover:shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:border-black/40"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-center mb-4">
                                <Icon className="size-14 text-black transition-all duration-300" />
                            </div>

                            {/* Text */}
                            <p className="text-lg font-semibold uppercase tracking-wide">
                                {label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
