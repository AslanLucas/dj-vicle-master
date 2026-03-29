"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DatePicker({
                                       selected,
                                       onSelect,
                                       mode,
                                   }: {
    selected: string | null;
    onSelect: (date: string) => void;
    mode: "event" | "gallery";
})  {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentMonth, setCurrentMonth] = useState(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/calendar");
            const data = await res.json();
            setEvents(data.events || []);
            setLoading(false);
        }
        load();
    }, []);

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const firstWeekday = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const offset = firstWeekday === 0 ? 6 : firstWeekday - 1;

    const getStatusForDay = (day: number) => {
        const yyyy = currentMonth.getFullYear();
        const mm = currentMonth.getMonth() + 1;

        const isoDay = `${yyyy}-${String(mm).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const todaysEvents = events.filter((e) => {
            const start = e.start?.date || e.start?.dateTime;
            if (!start) return false;
            return start.startsWith(isoDay);
        });

        // 🔴 ROT = GEBLOCKT (egal welcher Status)
        const hasRedEvent = todaysEvents.some(
            (ev) => ev.colorId === "11"
        );

        if (mode === "event" && hasRedEvent) return "blocked";

        // 🟡 Termin vorhanden, aber nicht rot
        if (todaysEvents.length > 0) return "requested";

        return "free";
    };


    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-black/10 max-w-md mx-auto">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() =>
                        setCurrentMonth(
                            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                        )
                    }
                    className="text-black hover:scale-110 transition"
                >
                    ←
                </button>

                <h3 className="text-lg font-semibold text-black">
                    {currentMonth.toLocaleString("de-DE", {
                        month: "long",
                        year: "numeric",
                    })}
                </h3>

                <button
                    onClick={() =>
                        setCurrentMonth(
                            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                        )
                    }
                    className="text-black hover:scale-110 transition"
                >
                    →
                </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 text-sm font-semibold text-black mb-2">
                {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
                    <div key={d} className="text-center">
                        {d}
                    </div>
                ))}
            </div>

            {loading ? (
                <p className="text-center text-gray-700">Lade Kalender…</p>
            ) : (
                <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells */}
                    {Array.from({ length: offset }).map((_, i) => (
                        <div key={"empty-" + i} />
                    ))}

                    {/* Days */}
                    {days.map((day) => {
                        const yyyy = currentMonth.getFullYear();
                        const mm = currentMonth.getMonth() + 1;
                        const isoDate = `${yyyy}-${String(mm).padStart(2, "0")}-${String(
                            day
                        ).padStart(2, "0")}`;

                        const dateObj = new Date(isoDate);
                        dateObj.setHours(0, 0, 0, 0);

                        const isPast = dateObj < today;
                        const status = getStatusForDay(day);
                        const isSelected = selected === isoDate;

                        const base =
                            "rounded-xl h-10 flex items-center justify-center transition-all";

                        let styles = "bg-white hover:bg-black/5 border border-black/20 cursor-pointer";

                        if (isPast)
                            styles =
                                "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed";

                        if (mode === "event" && status === "blocked")
                            styles = "bg-red-500 text-white cursor-not-allowed border-red-600";

                        if (mode === "event" && status === "requested" && !isPast)
                            styles =
                                "bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-300 cursor-pointer";

                        if (isSelected)
                            styles =
                                "bg-black text-white border-black shadow-[0_0_10px_rgba(0,0,0,0.4)]";

                        return (
                            <button
                                key={day}
                                disabled={isPast || (mode === "event" && status === "blocked")}
                                onClick={() => {
                                    if (!isPast) onSelect(isoDate);
                                }}
                                className={`${base} ${styles}`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
