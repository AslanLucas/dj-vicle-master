'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, XCircle } from 'lucide-react';

const BOOKED_COLOR_ID = "11"; // 🔴 Rot = gebucht

export default function AvailableAppointments() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [shownCount, setShownCount] = useState(10);

    // Filter states
    const [selectedMonth, setSelectedMonth] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<string>('all');

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/calendar");
                const data = await res.json();
                setEvents(data.events || []);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Apply filters
    const filteredEvents = events.filter(event => {
        const date = new Date(event.start?.date || event.start?.dateTime);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const monthMatch = selectedMonth === "all" || Number(selectedMonth) === month;
        const yearMatch = selectedYear === "all" || Number(selectedYear) === year;

        return monthMatch && yearMatch;
    });

    // Pagination
    const paginatedEvents = filteredEvents.slice(0, shownCount);
    const loadMore = () => setShownCount(prev => prev + 10);

    // Unique years
    const yearOptions = Array.from(
        new Set(events.map(e =>
            new Date(e.start?.date || e.start?.dateTime).getFullYear()
        ))
    );

    // Reset Filter
    const resetFilters = () => {
        setSelectedMonth("all");
        setSelectedYear("all");
        setShownCount(10);
    };

    return (
        <section id="available-appointments" className="bg-white py-20 text-black">
            <div className="max-w-5xl mx-auto px-4 text-center">

                {/* Titel */}
                <motion.h2
                    className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide mb-10 relative inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Verfügbare Termine
                    <span className="block h-[3px] w-20 bg-black mt-3 mx-auto rounded-full shadow-[0_0_6px_black]" />
                </motion.h2>

                {/* Filter */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">

                    {/* Monat */}
                    <select
                        value={selectedMonth}
                        onChange={e => setSelectedMonth(e.target.value)}
                        className="bg-white border border-black/20 px-4 py-2 rounded-lg text-black shadow-sm cursor-pointer"
                    >
                        <option value="all">Alle Monate</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString("de-DE", { month: "long" })}
                            </option>
                        ))}
                    </select>

                    {/* Jahr */}
                    <select
                        value={selectedYear}
                        onChange={e => setSelectedYear(e.target.value)}
                        className="bg-white border border-black/20 px-4 py-2 rounded-lg text-black shadow-sm cursor-pointer"
                    >
                        <option value="all">Alle Jahre</option>
                        {yearOptions.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>

                    {/* Reset Button */}
                    {(selectedMonth !== "all" || selectedYear !== "all") && (
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-2 bg-white text-black text-sm font-semibold py-2 px-4 rounded-lg
                                       transition-transform hover:scale-105 border border-black/20"
                        >
                            <XCircle className="text-red-500" size={18} />
                            Filter löschen
                        </button>
                    )}
                </div>

                {/* Status-Legende */}
                <div className="flex justify-center gap-6 mb-10 text-sm font-semibold">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        Gebucht
                    </div>
                </div>

                {/* Events */}
                <div className="min-h-[450px]">
                    {loading ? (
                        <p className="text-lg font-semibold">Lade Termine...</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedEvents.map((event, index) => {
                                    const date = event.start?.date || event.start?.dateTime;
                                    const formattedDate = new Date(date).toLocaleDateString("de-DE", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    });

                                    const isBooked = event.colorId === BOOKED_COLOR_ID;

                                    const badgeClasses = isBooked
                                        ? "bg-red-500 text-white"
                                        : "bg-yellow-400 text-black";

                                    const statusText = isBooked ? "Gebucht" : "Angefragt";

                                    return (
                                        <motion.div
                                            key={event.id}
                                            className="bg-[#F5F5F5] rounded-xl shadow-md p-6 border border-black/10
                                                       flex flex-col items-center text-center transition-all duration-300
                                                       hover:scale-105 hover:shadow-[0_0_18px_rgba(0,0,0,0.4)] hover:border-black/40"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                        >
                                            <CalendarDays className="size-12 text-black mb-3" />

                                            <p className="text-xl font-semibold mb-2">
                                                {formattedDate}
                                            </p>

                                            <span
                                                className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${badgeClasses}`}
                                            >
                                                {statusText}
                                            </span>

                                            {event.summary && (
                                                <p className="text-sm mt-3 text-black/70">
                                                    {event.summary}
                                                </p>
                                            )}

                                            {/* Adresse nur anzeigen wenn vorhanden */}
                                            {event.location && (
                                                <p className="text-sm mt-2 text-black/60">
                                                    📍 {event.location}
                                                </p>
                                            )}

                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Load More */}
                            {paginatedEvents.length < filteredEvents.length && (
                                <button
                                    onClick={loadMore}
                                    className="inline-block bg-white text-black text-lg font-semibold py-3 px-6 rounded-lg
                                               transition-transform hover:scale-105 heartbeat mt-10 border border-black/20"
                                >
                                    Weitere Termine laden
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
