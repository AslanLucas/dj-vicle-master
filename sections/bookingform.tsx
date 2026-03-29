"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail } from "@/utils/sendEmail";
import DatePicker from "@/sections/DatePicker";


type Step =
    | "date"
    | "reason"
    | "event-type"
    | "wedding-type"
    | "birthday-age"
    | "location-photos"
    | "location-photos-upload"
    | "equipment-needed"
    | "equipment-multi"
    | "equipment-detail"
    | "existing-tech"
    | "guests"
    | "music"
    | "time"
    | "delivery"
    | "location"
    | "contact"
    | "done";

const cx = (...classes: (string | false | undefined | null)[]) =>
    classes.filter(Boolean).join(" ");

function PrimaryButton({
                           children,
                           disabled,
                           onClick,
                           type = "button",
                       }: {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit";
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cx(
                "px-5 py-3 rounded-xl font-semibold uppercase transition-all",
                "bg-black text-white hover:bg-black/80",
                disabled && "opacity-40 cursor-not-allowed"
            )}
        >
            {children}
        </button>
    );
}

function GhostButton({
                         children,
                         onClick,
                     }: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="px-5 py-3 rounded-xl font-semibold uppercase transition-all border border-black text-black hover:bg-black/5"
        >
            {children}
        </button>
    );
}

function OptionCard({
                        label,
                        selected,
                        onClick,
                    }: {
    label: string;
    selected?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            type="button"
            className={cx(
                "bg-white border rounded-xl p-5 text-center transition-all shadow-sm",
                "hover:shadow-[0_0_15px_rgba(0,0,0,0.25)]",
                "min-h-[90px] flex items-center justify-center text-sm font-semibold",
                selected && "border-black shadow-[0_0_15px_rgba(0,0,0,0.25)]",
                !selected && "border-black/20"
            )}
        >
            {label}
        </button>
    );
}

function InputField({
                        label,
                        value,
                        onChange,
                        placeholder,
                        required,
                        type = "text",
                    }: {
    label: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="text-left w-full">
            <label className="block text-sm font-semibold mb-1 text-black">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-black/30 px-3 py-2 focus:border-black outline-none"
            />
        </div>
    );
}

function InputArea({
                       label,
                       value,
                       onChange,
                       required,
                       placeholder,
                   }: {
    label: string;
    value: string;
    required?: boolean;
    placeholder?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="text-left w-full">
            <label className="block text-sm font-semibold mb-1 text-black">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                rows={4}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-black/30 px-3 py-2 resize-none focus:border-black outline-none"
            />
        </div>
    );
}

function StepTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-2xl md:text-3xl font-extrabold text-black text-center mb-8">
            {children}
        </h2>
    );
}

export default function BookingForm() {
    const [step, setStep] = useState<Step>("reason");
    const [showSuccess, setShowSuccess] = useState(false);

    const [form, setForm] = useState({
        reason: "",
        date: "",
        eventType: "",
        weddingType: "",
        weddingOther: "",
        birthdayAge: "",
        hasLocationPhotos: "",
        locationPhotos: [] as File[],
        equipmentNeeded: "",
        equipmentMulti: [] as string[],
        coldFireDuration: "",
        coldFireCustom: "",
        equipmentDetail: "",
        existingTech: "",
        guests: "",
        music: [] as string[],
        timeFrom: "",
        timeTo: "",
        delivery: "",
        locationName: "",
        locationStreet: "",
        locationZip: "",
        locationCity: "",
        company: "",
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        message: "",
    });

    const update = (field: keyof typeof form, value: any) =>
        setForm((f) => ({ ...f, [field]: value }));

    const toggleArray = (field: keyof typeof form, value: string) => {
        setForm((prev) => {
            // @ts-ignore
            const arr: string[] = prev[field];

            // ✅ Spezialfall: Kaltfeuerwerk wird ABGEWÄHLT → reset duration
            if (value === "Kaltfeuerwerk" && arr.includes(value)) {
                return {
                    ...prev,
                    equipmentMulti: arr.filter((i) => i !== value),
                    coldFireDuration: "",
                    coldFireCustom: "",
                };
            }

            // Normal toggle
            return arr.includes(value)
                ? { ...prev, [field]: arr.filter((i) => i !== value) }
                : { ...prev, [field]: [...arr, value] };
        });
    };


    const submit = async () => {
        // 1) Anfrage in Google Calendar eintragen
        await fetch("/api/request-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
                message: form.message,
                date: form.date
            }),
        });

        const mailMessage = `
GRUND DER ANFRAGE
${form.reason === "event" ? "Veranstaltung" : "Equipment-Verleih"}

DATUM
${form.date || "-"}


Event-Typ:
${form.eventType || "-"}

Hochzeitsart:
${form.weddingType || "-"}

Sonstige Angabe:
${form.weddingOther || "-"}

Geburtstagsalter:
${form.birthdayAge || "-"}

Bilder vorhanden:
${form.hasLocationPhotos === "yes" ? "Ja" : form.hasLocationPhotos === "no" ? "Nein" : "-"}

Location-Name:
${form.locationName || "-"}

Straße:
${form.locationStreet || "-"}

PLZ / Ort:
${form.locationZip || "-"} ${form.locationCity || "-"}


Equipment benötigt:
${form.equipmentNeeded === "yes" ? "Ja" : form.equipmentNeeded === "no" ? "Nein" : "-"}

Gewünschtes Equipment:
${form.equipmentMulti.length ? form.equipmentMulti.join(", ") : "-"}

Kaltfeuerwerk Dauer:
${form.equipmentMulti.includes("Kaltfeuerwerk")
            ? `
Kaltfeuerwerk Dauer:
${
                form.coldFireDuration === "custom"
                    ? `${form.coldFireCustom} Minuten`
                    : `${form.coldFireDuration} Sekunden`
            }
`
            : ""}



Technik-Details:
${form.equipmentDetail || "-"}

Bereits vorhandene Technik:
${form.existingTech || "-"}


Gästeanzahl:
${form.guests || "-"}

Musikrichtungen:
${form.music.length ? form.music.join(", ") : "-"}

Zeitraum:
${form.timeFrom || "-"} bis ${form.timeTo || "-"}


Lieferung gewünscht:
${form.delivery === "yes" ? "Ja" : form.delivery === "no" ? "Nein" : "-"}


${form.message || "-"}
`;


        // 2) E-Mail senden
        await sendEmail({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phoneNumber: form.phone,
            company: form.company,
            message: mailMessage,
        });

        // 3) Success UI
        setShowSuccess(true);

        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    };



    return (
        <section className="bg-white py-16 px-6 md:px-10">
            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === "reason" && (
                        <motion.div
                            key="reason"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Was ist der Grund für deine Anfrage?</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <OptionCard
                                    label="Veranstaltung"
                                    selected={form.reason === "event"}
                                    onClick={() => update("reason", "event")}
                                />
                                <OptionCard
                                    label="Equipment-Verleih"
                                    selected={form.reason === "gallery"}
                                    onClick={() => update("reason", "gallery")}
                                />
                            </div>

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton onClick={() => setStep("date")}>Zurück</GhostButton>
                                <PrimaryButton
                                    disabled={!form.reason}
                                    onClick={() => setStep("date")}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "date" && (
                        <motion.div
                            key="date"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Wann findet das Event statt?</StepTitle>

                            <DatePicker
                                selected={form.date}
                                onSelect={(d) => update("date", d)}
                                mode={form.reason === "gallery" ? "gallery" : "event"}
                            />


                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton onClick={() => setStep("reason")}>
                                    Zurück
                                </GhostButton>

                                <PrimaryButton
                                    disabled={!form.date}
                                    onClick={() => {
                                        if (form.reason === "event") {
                                            setStep("event-type");
                                        } else {
                                            setStep("equipment-multi");
                                        }
                                    }}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}


                    {step === "event-type" && form.reason === "event" && (
                        <motion.div
                            key="event-type"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Um welche Veranstaltung handelt es sich?</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <OptionCard
                                    label="Hochzeit"
                                    selected={form.eventType === "wedding"}
                                    onClick={() => update("eventType", "wedding")}
                                />
                                <OptionCard
                                    label="Geburtstag"
                                    selected={form.eventType === "birthday"}
                                    onClick={() => update("eventType", "birthday")}
                                />
                                <OptionCard
                                    label="Club / Event / Festival"
                                    selected={form.eventType === "club"}
                                    onClick={() => update("eventType", "club")}
                                />
                                <OptionCard
                                    label="Sonstiges"
                                    selected={form.eventType === "other"}
                                    onClick={() => update("eventType", "other")}
                                />
                            </div>

                            {form.eventType === "other" && (
                                <div className="mt-6">
                                    <InputField
                                        label="Bitte angeben"
                                        value={form.weddingOther}
                                        onChange={(v) => update("weddingOther", v)}
                                        placeholder="Art der Veranstaltung"
                                        required
                                    />
                                </div>
                            )}

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton onClick={() => setStep("date")}>
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={
                                        !form.eventType ||
                                        (form.eventType === "other" && !form.weddingOther.trim())
                                    }
                                    onClick={() => {
                                        if (form.eventType === "wedding") setStep("wedding-type");
                                        else if (form.eventType === "birthday") setStep("birthday-age");
                                        else if (form.eventType === "club") setStep("time");
                                        else if (form.eventType === "other") setStep("equipment-needed");
                                    }}
                                >
                                    Weiter
                                </PrimaryButton>

                            </div>
                        </motion.div>
                    )}


                    {step === "wedding-type" && form.eventType === "wedding" && (
                        <motion.div
                            key="wedding-type"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Welche Art von Hochzeit?</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Ersthochzeit",
                                    "Standesamtlich",
                                    "Kirchlich",
                                    "Freie Trauung",
                                    "Gartenhochzeit",
                                    "Silberhochzeit",
                                    "Goldhochzeit",
                                    "Sonstiges",
                                ].map((item) => (
                                    <OptionCard
                                        key={item}
                                        label={item}
                                        onClick={() => update("weddingType", item)}
                                        selected={form.weddingType === item}
                                    />
                                ))}
                            </div>

                            {form.weddingType === "Sonstiges" && (
                                <div className="mt-6">
                                    <InputField
                                        label="Bitte angeben"
                                        value={form.weddingOther}
                                        onChange={(v) => update("weddingOther", v)}
                                        placeholder="Hochzeitsart"
                                        required
                                    />
                                </div>
                            )}

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton onClick={() => setStep("event-type")}>
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={!form.weddingType ||
                                        (form.weddingType === "Sonstiges" && !form.weddingOther.trim())}
                                    onClick={() => setStep("location-photos")}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "birthday-age" && form.eventType === "birthday" && (
                        <motion.div
                            key="birthday-age"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Wie alt wirst du?</StepTitle>

                            <InputField
                                label="Alter"
                                value={form.birthdayAge}
                                onChange={(v) => update("birthdayAge", v)}
                                placeholder="z. B. 30"
                                required
                            />

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton onClick={() => setStep("event-type")}>
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={!form.birthdayAge}
                                    onClick={() => setStep("location-photos")}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {/* LOCATION PHOTOS – JA/NEIN */}
                    {step === "location-photos" && (
                        <motion.div
                            key="location-photos"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Hast du Bilder von der Location?</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <OptionCard
                                    label="Ja"
                                    selected={form.hasLocationPhotos === "yes"}
                                    onClick={() => update("hasLocationPhotos", "yes")}
                                />
                                <OptionCard
                                    label="Nein"
                                    selected={form.hasLocationPhotos === "no"}
                                    onClick={() => {
                                        update("hasLocationPhotos", "no");
                                        update("locationPhotos", []);
                                    }}
                                />
                            </div>

                            {form.hasLocationPhotos === "yes" && (
                                <div className="mt-6">
                                    <label className="block text-sm font-semibold mb-1">Bilder hochladen *</label>

                                    <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-black/30 rounded-xl py-6 cursor-pointer hover:bg-black/5 transition">
                                        <span className="text-black font-semibold mb-2">Dateien auswählen</span>
                                        <span className="text-xs text-gray-500">Bilder der Location</span>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            required
                                            className="hidden"
                                            onChange={(e) =>
                                                update("locationPhotos", Array.from(e.target.files || []))
                                            }
                                        />
                                    </label>

                                    {form.locationPhotos.length > 0 && (
                                        <p className="text-sm text-green-600 mt-2">
                                            {form.locationPhotos.length} Datei(en) hochgeladen
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        if (form.eventType === "birthday") setStep("birthday-age");
                                        else if (form.eventType === "wedding") setStep("wedding-type");
                                        else setStep("event-type");
                                    }}
                                >
                                    Zurück
                                </GhostButton>

                                <PrimaryButton
                                    disabled={
                                        !form.hasLocationPhotos ||
                                        (form.hasLocationPhotos === "yes" && form.locationPhotos.length === 0)
                                    }
                                    onClick={() => setStep("equipment-needed")}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "equipment-needed" && form.reason === "event" && (
                        <motion.div
                            key="equipment-needed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Wird Equipment benötigt?</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <OptionCard
                                    label="Ja"
                                    selected={form.equipmentNeeded === "yes"}
                                    onClick={() => update("equipmentNeeded", "yes")}
                                />
                                <OptionCard
                                    label="Nein"
                                    selected={form.equipmentNeeded === "no"}
                                    onClick={() => update("equipmentNeeded", "no")}
                                />
                            </div>

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        if (form.eventType === "wedding") setStep("location-photos");
                                        else if (form.eventType === "birthday") setStep("location-photos");
                                        else setStep("event-type"); // other, club, fallback
                                    }}
                                >
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={!form.equipmentNeeded}
                                    onClick={() => {
                                        if (form.equipmentNeeded === "yes")
                                            setStep("equipment-multi");
                                        else setStep("existing-tech");
                                    }}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}
                    {step === "equipment-multi" && (
                        <motion.div
                            key="equipment-multi"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                        >
                            <StepTitle>Hast du besondere Wünsche zur Technik? (Mehrfachauswahl)</StepTitle>
                            <label className="block text-center text-sm font-medium mb-1">
                                Die Equipment-Website befindet sich noch im Aufbau 🚀
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Ton / Lautsprechertechnik",
                                    "Lichttechnik",
                                    "Spezialeffekte",
                                    "Stative & Rigging",
                                    "DJ-Booths & Möbel",
                                    "DJ-Technik",
                                    "Fotobox",
                                    "Mikrofontechnik",
                                    "Zubehör / Tools",
                                    "Bodennebelmaschine",
                                    "Kaltfeuerwerk",
                                ].map((item) => (
                                    <OptionCard
                                        key={item}
                                        label={item}
                                        selected={form.equipmentMulti.includes(item)}
                                        onClick={() => toggleArray("equipmentMulti", item)}
                                    />
                                ))}
                            </div>

                            {/* 🔥 Zusatzfrage nur wenn Kaltfeuerwerk ausgewählt */}
                            {form.equipmentMulti.includes("Kaltfeuerwerk") && (
                                <div className="mt-8">

                                    <h3 className="text-lg font-bold text-center mb-4">
                                        Wie lange soll das Kaltfeuerwerk dauern?
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <OptionCard
                                            label="30 Sekunden"
                                            selected={form.coldFireDuration === "30"}
                                            onClick={() => {
                                                update("coldFireDuration", "30");
                                                update("coldFireCustom", "");
                                            }}
                                        />

                                        <OptionCard
                                            label="45 Sekunden"
                                            selected={form.coldFireDuration === "45"}
                                            onClick={() => {
                                                update("coldFireDuration", "45");
                                                update("coldFireCustom", "");
                                            }}
                                        />

                                        <OptionCard
                                            label="Mehr"
                                            selected={form.coldFireDuration === "custom"}
                                            onClick={() => update("coldFireDuration", "custom")}
                                        />
                                    </div>

                                    {/* Wenn Mehr ausgewählt → Textfeld */}
                                    {form.coldFireDuration === "custom" && (
                                        <div className="mt-5 max-w-md mx-auto">
                                            <InputField
                                                label="Bitte Dauer angeben (in Minuten)"
                                                value={form.coldFireCustom}
                                                onChange={(v) => update("coldFireCustom", v)}
                                                placeholder="z. B. 2 Minuten"
                                                required
                                            />
                                        </div>
                                    )}
                                </div>
                            )}


                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        if (form.reason === "event") setStep("equipment-needed");
                                        else setStep("date");
                                    }}
                                >
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={
                                        form.equipmentMulti.includes("Kaltfeuerwerk") &&
                                        (
                                            !form.coldFireDuration ||
                                            (form.coldFireDuration === "custom" && !form.coldFireCustom.trim())
                                        )
                                    }
                                    onClick={() => setStep("equipment-detail")}
                                >
                                    Weiter
                                </PrimaryButton>

                            </div>
                        </motion.div>
                    )}

                    {step === "equipment-detail" && (
                        <motion.div
                            key="equipment-detail"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Technikwünsche</StepTitle>

                            <InputArea
                                label="Details"
                                value={form.equipmentDetail}
                                onChange={(v) => update("equipmentDetail", v)}
                                placeholder="Falls dir ein Aufbau gefällt oder du spezielle Wünsche hast, trag sie hier ein. Wenn nicht passe ich die Anlage automatisch an die Location an. Oder siehe Seite Equipment."
                            />


                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        setStep("equipment-multi");
                                    }}
                                >
                                    Zurück
                                </GhostButton>

                                <PrimaryButton
                                    onClick={() => {
                                        if (form.reason === "gallery") setStep("delivery");
                                        else setStep("guests");
                                    }}
                                >
                                    Weiter
                                </PrimaryButton>

                            </div>
                        </motion.div>
                    )}

                    {step === "existing-tech" && form.reason === "event" && (
                        <motion.div
                            key="existing-tech"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Welche Technik steht bereits zur Verfügung?</StepTitle>

                            <InputArea
                                label="Beschreibe die vorhandene Technik"
                                value={form.existingTech}
                                onChange={(v) => update("existingTech", v)}
                                placeholder="Bitte beschreiben..."
                            />

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton onClick={() => setStep("equipment-needed")}>
                                    Zurück
                                </GhostButton>
                                <PrimaryButton onClick={() => setStep("guests")}>
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "guests" && (
                        <motion.div
                            key="guests"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Wie viele Besucher werden erwartet?</StepTitle>

                            <InputField
                                label="Anzahl der Personen"
                                value={form.guests}
                                onChange={(v) => update("guests", v)}
                                placeholder="z. B. 80"
                                required
                            />

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        if (form.reason === "event") {
                                            if (form.equipmentNeeded === "no") setStep("existing-tech");
                                            else setStep("equipment-detail");
                                        } else {
                                            setStep("equipment-detail");
                                        }
                                    }}
                                >
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={!form.guests}
                                    onClick={() => setStep("music")}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "music" && (
                        <motion.div
                            key="music"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Welche Musik soll gespielt werden?</StepTitle>

                            <p className="text-gray-700 text-center mb-4">
                                Mehrfachauswahl möglich
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Pop / Charts",
                                    "Deutscher Pop",
                                    "Schlager",
                                    "80er / 90er",
                                    "2000er / 2010er",
                                    "Hip Hop",
                                    "Oldschool Hip Hop",
                                    "RnB",
                                    "Trap / Drill",
                                    "Afrobeat",
                                    "Reggaeton",
                                    "Latin Urban",
                                    "Dancehall",
                                    "Moombahton",
                                    "House",
                                    "EDM",
                                    "Techno",
                                    "Russische Charts",
                                    "Russische Oldies",
                                    "Russische 2000er / 2010er",
                                    "Bunter Mix",
                                    "Wunschplaylist",
                                    "Urbaner Sound",
                                    "Oldschool RnB",
                                ].map((genre) => (
                                    <OptionCard
                                        key={genre}
                                        label={genre}
                                        selected={form.music.includes(genre)}
                                        onClick={() => toggleArray("music", genre)}
                                    />
                                ))}
                            </div>

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        if (form.eventType === "club") setStep("event-type");
                                        else if (form.reason === "event") setStep("guests");
                                        else setStep("equipment-detail");
                                    }}
                                >
                                    Zurück
                                </GhostButton>
                                <PrimaryButton onClick={() => setStep("time")}>
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "time" && (
                        <motion.div
                            key="time"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Wie lange soll ich euch begleiten?</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
                                <InputField
                                    label="Von"
                                    type="time"
                                    value={form.timeFrom}
                                    onChange={(v) => update("timeFrom", v)}
                                    required
                                />
                                <InputField
                                    label="Bis"
                                    type="time"
                                    value={form.timeTo}
                                    onChange={(v) => update("timeTo", v)}
                                    required
                                />
                            </div>

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        if (form.eventType === "club") setStep("event-type");
                                        else setStep("music");
                                    }}
                                >
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={!form.timeFrom || !form.timeTo}
                                    onClick={() =>
                                        form.reason === "gallery"
                                            ? setStep("delivery")
                                            : setStep("location")
                                    }
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "delivery" && form.reason === "gallery" && (
                        <motion.div
                            key="delivery"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Sollen die Artikel geliefert werden?</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <OptionCard
                                    label="Ja"
                                    selected={form.delivery === "yes"}
                                    onClick={() => update("delivery", "yes")}
                                />
                                <OptionCard
                                    label="Nein"
                                    selected={form.delivery === "no"}
                                    onClick={() => update("delivery", "no")}
                                />
                            </div>

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton onClick={() => setStep("equipment-detail")}>
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={!form.delivery}
                                    onClick={() => {
                                        if (form.delivery === "yes") setStep("location");
                                        else setStep("contact");
                                    }}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "location" && (
                        <motion.div
                            key="location"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Wo findet die Veranstaltung statt?</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                                <InputField
                                    label="Name der Location"
                                    required
                                    value={form.locationName}
                                    onChange={(v) => update("locationName", v)}
                                    placeholder="z. B. Alter Güterbahnhof"
                                />
                                <InputField
                                    label="Straße & Hausnummer"
                                    required
                                    value={form.locationStreet}
                                    onChange={(v) => update("locationStreet", v)}
                                    placeholder="Musterstraße 10"
                                />
                                <InputField
                                    label="PLZ"
                                    required
                                    value={form.locationZip}
                                    onChange={(v) => {
                                        if (/^\d*$/.test(v)) update("locationZip", v);
                                    }}
                                    placeholder="49808"
                                />
                                <InputField
                                    label="Ort"
                                    required
                                    value={form.locationCity}
                                    onChange={(v) => {
                                        if (/^[A-Za-zÄÖÜäöüß\s-]*$/.test(v)) update("locationCity", v);
                                    }}
                                    placeholder="Lingen"
                                />
                            </div>

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        if (form.reason === "gallery") setStep("delivery");
                                        else setStep("time");
                                    }}
                                >
                                    Zurück
                                </GhostButton>

                                <PrimaryButton
                                    disabled={
                                        !form.locationName ||
                                        !form.locationStreet ||
                                        !form.locationZip ||
                                        !form.locationCity
                                    }
                                    onClick={() => setStep("contact")}
                                >
                                    Weiter
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}

                    {step === "contact" && (
                        <motion.div
                            key="contact"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StepTitle>Kontaktdaten</StepTitle>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                <InputField
                                    label="Firma (optional)"
                                    value={form.company}
                                    onChange={(v) => update("company", v)}
                                    placeholder="Firma"
                                />
                                <InputField
                                    label="Vorname"
                                    required
                                    value={form.firstName}
                                    onChange={(v) => update("firstName", v)}
                                    placeholder="Vorname"
                                />
                                <InputField
                                    label="Nachname"
                                    required
                                    value={form.lastName}
                                    onChange={(v) => update("lastName", v)}
                                    placeholder="Nachname"
                                />
                                <InputField
                                    label="Mobiltelefon"
                                    required
                                    value={form.phone}
                                    onChange={(v) => update("phone", v)}
                                    placeholder="+49 ..."
                                />
                                <InputField
                                    label="E-Mail"
                                    required
                                    type="email"
                                    value={form.email}
                                    onChange={(v) => update("email", v)}
                                    placeholder="mail@example.com"
                                />

                                <div className="sm:col-span-2">
                                    <InputArea
                                        label="Nachricht (optional)"
                                        value={form.message}
                                        onChange={(v) => update("message", v)}
                                        placeholder="Zusätzliche Informationen..."
                                    />
                                </div>
                            </div>

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton
                                    onClick={() => {
                                        if (form.reason === "gallery") {
                                            if (form.delivery === "no") setStep("delivery");
                                            else setStep("location");
                                        } else {
                                            setStep("location");
                                        }
                                    }}
                                >
                                    Zurück
                                </GhostButton>

                                <PrimaryButton
                                    disabled={!form.firstName || !form.lastName || !form.email}
                                    onClick={submit}
                                >
                                    Anfrage senden
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >

                        <motion.div
                            className="bg-white rounded-xl shadow-xl p-8 text-center max-w-sm mx-4"
                            initial={{scale: 0.85, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.85, opacity: 0}}
                        >
                            <img
                                src="/vadimbooking.jpg"
                                className="w-full max-w-xs mx-auto rounded-xl shadow mb-4"
                                alt="DJ Vicle"
                            />

                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Vielen Dank für Ihre Anfrage!
                            </h3>

                            <p className="text-gray-600 mb-4">
                                Ich melde mich schnellstmöglich mit einem individuellen Angebot zurück.
                            </p>

                            <p className="text-sm text-gray-400 mb-4">
                                Automatische Weiterleitung zur Startseite…
                            </p>

                            <PrimaryButton onClick={() => (window.location.href = "/")}>
                                Zur Homepage
                            </PrimaryButton>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
