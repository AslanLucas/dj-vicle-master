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

type BookingFormState = {
    reason: string;
    date: string;
    eventType: string;
    weddingType: string;
    weddingOther: string;
    birthdayAge: string;
    hasLocationPhotos: string;
    locationPhotos: File[];
    equipmentNeeded: string;
    equipmentMulti: string[];
    coldFireDuration: string;
    coldFireCustom: string;
    equipmentDetail: string;
    existingTech: string;
    guests: string;
    music: string[];
    timeFrom: string;
    timeTo: string;
    delivery: string;
    locationName: string;
    locationStreet: string;
    locationZip: string;
    locationCity: string;
    company: string;
    lastName: string;
    firstName: string;
    phone: string;
    email: string;
    message: string;
};

type FormField = keyof BookingFormState;
type FormErrors = Partial<Record<FormField, string>>;

const initialForm: BookingFormState = {
    reason: "",
    date: "",
    eventType: "",
    weddingType: "",
    weddingOther: "",
    birthdayAge: "",
    hasLocationPhotos: "",
    locationPhotos: [],
    equipmentNeeded: "",
    equipmentMulti: [],
    coldFireDuration: "",
    coldFireCustom: "",
    equipmentDetail: "",
    existingTech: "",
    guests: "",
    music: [],
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
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_REGEX = /^\d{7,15}$/;
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß' -]{2,60}$/;
const CITY_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß.' -]{2,80}$/;
const STREET_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß0-9.' /-]{3,120}$/;
const LOCATION_NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß0-9.' &()/,-]{2,120}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

const onlyDigits = (value: string, maxLength?: number) =>
    value.replace(/\D/g, "").slice(0, maxLength);

const normalizeText = (value: string, maxLength: number) =>
    value.replace(/\s{2,}/g, " ").slice(0, maxLength);

const onlyEmailChars = (value: string) =>
    value.replace(/[^A-Za-z0-9.!#$%&'*+/=?^_`{|}~@-]/g, "").toLowerCase().slice(0, 120);

const onlyNameChars = (value: string, maxLength: number) =>
    normalizeText(value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß' -]/g, ""), maxLength);

const onlyCityChars = (value: string, maxLength: number) =>
    normalizeText(value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß.' -]/g, ""), maxLength);

const onlyStreetChars = (value: string, maxLength: number) =>
    normalizeText(value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß0-9.' /-]/g, ""), maxLength);

const onlyLocationNameChars = (value: string, maxLength: number) =>
    normalizeText(value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß0-9.' &()/,-]/g, ""), maxLength);

const onlyCompanyChars = (value: string, maxLength: number) =>
    normalizeText(value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß0-9.' &()/,+-]/g, ""), maxLength);

const normalizeFieldValue = (
    field: FormField,
    value: BookingFormState[FormField]
): BookingFormState[FormField] => {
    if (Array.isArray(value)) return value;

    const stringValue = String(value);

    switch (field) {
        case "email":
            return onlyEmailChars(stringValue) as BookingFormState[FormField];
        case "phone":
            return onlyDigits(stringValue, 15) as BookingFormState[FormField];
        case "locationZip":
            return onlyDigits(stringValue, 5) as BookingFormState[FormField];
        case "birthdayAge":
            return onlyDigits(stringValue, 3) as BookingFormState[FormField];
        case "guests":
            return onlyDigits(stringValue, 6) as BookingFormState[FormField];
        case "coldFireCustom":
            return onlyDigits(stringValue, 2) as BookingFormState[FormField];
        case "firstName":
        case "lastName":
            return onlyNameChars(stringValue, 60) as BookingFormState[FormField];
        case "locationCity":
            return onlyCityChars(stringValue, 80) as BookingFormState[FormField];
        case "locationName":
            return onlyLocationNameChars(stringValue, 120) as BookingFormState[FormField];
        case "locationStreet":
            return onlyStreetChars(stringValue, 120) as BookingFormState[FormField];
        case "company":
            return onlyCompanyChars(stringValue, 100) as BookingFormState[FormField];
        case "weddingOther":
            return onlyLocationNameChars(stringValue, 120) as BookingFormState[FormField];
        case "equipmentDetail":
        case "existingTech":
        case "message":
            return stringValue.slice(0, 1200) as BookingFormState[FormField];
        default:
            return value;
    }
};

const isValidPhone = (value: string) => PHONE_REGEX.test(value);

const validateFiles = (files: File[]) => {
    if (files.length === 0) return "Bitte lade mindestens ein Bild hoch.";
    if (files.length > 10) return "Bitte maximal 10 Bilder hochladen.";

    const invalidType = files.find((file) => !file.type.startsWith("image/"));
    if (invalidType) return "Es sind nur Bilddateien erlaubt.";

    const tooLarge = files.find((file) => file.size > 8 * 1024 * 1024);
    if (tooLarge) return "Ein Bild darf maximal 8 MB groß sein.";

    return "";
};

const validateFieldValue = (
    field: FormField,
    value: BookingFormState[FormField],
    form: BookingFormState
): string => {
    const textValue = typeof value === "string" ? value.trim() : "";

    switch (field) {
        case "reason":
            return textValue ? "" : "Bitte wähle einen Anfragegrund aus.";

        case "date":
            return textValue ? "" : "Bitte wähle ein Datum aus.";

        case "eventType":
            return textValue ? "" : "Bitte wähle eine Veranstaltungsart aus.";

        case "weddingType":
            return textValue ? "" : "Bitte wähle eine Hochzeitsart aus.";

        case "weddingOther":
            if (
                (form.eventType === "other" || form.weddingType === "Sonstiges") &&
                textValue.length < 2
            ) {
                return "Bitte gib mindestens 2 Zeichen ein.";
            }
            return textValue.length > 120 ? "Bitte maximal 120 Zeichen eingeben." : "";

        case "birthdayAge": {
            if (!textValue) return "Bitte gib dein Alter ein.";
            const age = Number(textValue);
            if (!Number.isInteger(age) || age < 1 || age > 120) {
                return "Bitte gib ein gültiges Alter zwischen 1 und 120 ein.";
            }
            return "";
        }

        case "hasLocationPhotos":
            return textValue ? "" : "Bitte wähle Ja oder Nein aus.";

        case "locationPhotos":
            return form.hasLocationPhotos === "yes" ? validateFiles(value as File[]) : "";

        case "equipmentNeeded":
            return form.reason === "event" && !textValue
                ? "Bitte wähle Ja oder Nein aus."
                : "";

        case "equipmentMulti": {
            const selected = value as string[];
            if ((form.reason === "gallery" || form.equipmentNeeded === "yes") && selected.length === 0) {
                return "Bitte wähle mindestens eine Equipment-Kategorie aus.";
            }
            if (selected.includes("Kaltfeuerwerk") && !form.coldFireDuration) {
                return "Bitte wähle die Dauer für das Kaltfeuerwerk aus.";
            }
            if (
                selected.includes("Kaltfeuerwerk") &&
                form.coldFireDuration === "custom" &&
                !form.coldFireCustom.trim()
            ) {
                return "Bitte gib die Dauer in Minuten an.";
            }
            return "";
        }

        case "coldFireDuration":
            return form.equipmentMulti.includes("Kaltfeuerwerk") && !textValue
                ? "Bitte wähle eine Dauer aus."
                : "";

        case "coldFireCustom": {
            if (
                form.equipmentMulti.includes("Kaltfeuerwerk") &&
                form.coldFireDuration === "custom"
            ) {
                if (!textValue) return "Bitte gib die Dauer in Minuten an.";
                const minutes = Number(textValue);
                if (!Number.isInteger(minutes) || minutes < 1 || minutes > 60) {
                    return "Bitte gib eine Dauer zwischen 1 und 60 Minuten ein.";
                }
            }
            return "";
        }

        case "equipmentDetail":
            return textValue.length > 1200 ? "Bitte maximal 1200 Zeichen eingeben." : "";

        case "existingTech":
            return textValue.length > 1200 ? "Bitte maximal 1200 Zeichen eingeben." : "";

        case "guests": {
            if (!textValue) return "Bitte gib die Gästeanzahl ein.";
            const guests = Number(textValue);
            if (!Number.isInteger(guests) || guests < 1 || guests > 200000) {
                return "Bitte gib eine gültige Personenanzahl ein.";
            }
            return "";
        }

        case "timeFrom":
            if (!textValue) return "Bitte gib eine Startzeit ein.";
            return TIME_REGEX.test(textValue) ? "" : "Bitte gib eine gültige Uhrzeit ein.";

        case "timeTo":
            if (!textValue) return "Bitte gib eine Endzeit ein.";
            if (!TIME_REGEX.test(textValue)) return "Bitte gib eine gültige Uhrzeit ein.";
            if (form.timeFrom && textValue === form.timeFrom) {
                return "Start- und Endzeit dürfen nicht gleich sein.";
            }
            return "";

        case "delivery":
            return form.reason === "gallery" && !textValue
                ? "Bitte wähle Ja oder Nein aus."
                : "";

        case "locationName":
            if (!textValue) return "Bitte gib den Namen der Location ein.";
            return LOCATION_NAME_REGEX.test(textValue)
                ? ""
                : "Bitte gib einen gültigen Location-Namen ein.";

        case "locationStreet":
            if (!textValue) return "Bitte gib Straße und Hausnummer ein.";
            if (!STREET_REGEX.test(textValue)) return "Bitte gib eine gültige Straße ein.";
            if (!/\d/.test(textValue)) return "Bitte gib auch die Hausnummer an.";
            return "";

        case "locationZip":
            if (!textValue) return "Bitte gib die PLZ ein.";
            return /^\d{5}$/.test(textValue) ? "" : "Bitte gib eine gültige 5-stellige PLZ ein.";

        case "locationCity":
            if (!textValue) return "Bitte gib den Ort ein.";
            return CITY_REGEX.test(textValue) ? "" : "Bitte gib einen gültigen Ort ein.";

        case "company":
            return textValue.length > 100 ? "Bitte maximal 100 Zeichen eingeben." : "";

        case "firstName":
            if (!textValue) return "Bitte gib deinen Vornamen ein.";
            return NAME_REGEX.test(textValue) ? "" : "Bitte gib einen gültigen Vornamen ein.";

        case "lastName":
            if (!textValue) return "Bitte gib deinen Nachnamen ein.";
            return NAME_REGEX.test(textValue) ? "" : "Bitte gib einen gültigen Nachnamen ein.";

        case "phone":
            if (!textValue) return "Bitte gib deine Telefonnummer ein.";
            return isValidPhone(textValue)
                ? ""
                : "Bitte gib eine gültige Telefonnummer mit 7 bis 15 Ziffern ein.";

        case "email":
            if (!textValue) return "Bitte gib deine E-Mail-Adresse ein.";
            return EMAIL_REGEX.test(textValue)
                ? ""
                : "Bitte gib eine gültige E-Mail-Adresse ein.";

        case "message":
            return textValue.length > 1200 ? "Bitte maximal 1200 Zeichen eingeben." : "";

        default:
            return "";
    }
};


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
    onClick?: () => void | Promise<void> | string;
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
    onClick?: () => void | Promise<void> | string;
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
                        error,
                        maxLength,
                        inputMode,
                        autoComplete,
                        onBlur,
                    }: {
    label: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    error?: string;
    maxLength?: number;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    autoComplete?: string;
    onChange: (v: string) => void;
    onBlur?: () => void;
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
                maxLength={maxLength}
                inputMode={inputMode}
                autoComplete={autoComplete}
                aria-invalid={!!error}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                className={cx(
                    "w-full rounded-lg border px-3 py-2 outline-none transition",
                    error
                        ? "border-red-500 focus:border-red-600"
                        : "border-black/30 focus:border-black"
                )}
            />
            {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
        </div>
    );
}

function InputArea({
                       label,
                       value,
                       onChange,
                       required,
                       placeholder,
                       error,
                       maxLength = 1200,
                       onBlur,
                   }: {
    label: string;
    value: string;
    required?: boolean;
    placeholder?: string;
    error?: string;
    maxLength?: number;
    onChange: (v: string) => void;
    onBlur?: () => void;
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
                maxLength={maxLength}
                aria-invalid={!!error}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                className={cx(
                    "w-full rounded-lg border px-3 py-2 resize-none outline-none transition",
                    error
                        ? "border-red-500 focus:border-red-600"
                        : "border-black/30 focus:border-black"
                )}
            />
            <div className="mt-1 flex justify-between gap-3">
                {error ? (
                    <p className="text-xs font-medium text-red-600">{error}</p>
                ) : (
                    <span />
                )}
                <span className="text-xs text-gray-400">
                    {value.length}/{maxLength}
                </span>
            </div>
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

    const [form, setForm] = useState<BookingFormState>(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});

    const setFieldError = (field: FormField, value: BookingFormState[FormField], nextForm = form) => {
        setErrors((current) => ({
            ...current,
            [field]: validateFieldValue(field, value, nextForm),
        }));
    };

    const update = (field: FormField, value: BookingFormState[FormField]) => {
        const normalizedValue = normalizeFieldValue(field, value);

        setForm((prev) => {
            const next = { ...prev, [field]: normalizedValue };
            setFieldError(field, normalizedValue, next);
            return next;
        });
    };

    const validateFields = (fields: FormField[]) => {
        const nextErrors = fields.reduce<FormErrors>((acc, field) => {
            acc[field] = validateFieldValue(field, form[field], form);
            return acc;
        }, {});

        setErrors((current) => ({ ...current, ...nextErrors }));

        return Object.values(nextErrors).every((error) => !error);
    };

    const fieldsAreValid = (fields: FormField[]) =>
        fields.every((field) => !validateFieldValue(field, form[field], form));

    const validateAndGo = (nextStep: Step, fields: FormField[]) => {
        if (validateFields(fields)) setStep(nextStep);
    };

    const toggleArray = (field: "equipmentMulti" | "music", value: string) => {
        setForm((prev) => {
            const arr = prev[field];

            let next: BookingFormState;

            // ✅ Spezialfall: Kaltfeuerwerk wird ABGEWÄHLT → reset duration
            if (field === "equipmentMulti" && value === "Kaltfeuerwerk" && arr.includes(value)) {
                next = {
                    ...prev,
                    equipmentMulti: arr.filter((i) => i !== value),
                    coldFireDuration: "",
                    coldFireCustom: "",
                };
            } else {
                next = arr.includes(value)
                    ? { ...prev, [field]: arr.filter((i) => i !== value) }
                    : { ...prev, [field]: [...arr, value] };
            }

            setErrors((current) => ({
                ...current,
                [field]: validateFieldValue(field, next[field], next),
                coldFireDuration: validateFieldValue("coldFireDuration", next.coldFireDuration, next),
                coldFireCustom: validateFieldValue("coldFireCustom", next.coldFireCustom, next),
            }));

            return next;
        });
    };

    const contactFields: FormField[] = ["firstName", "lastName", "phone", "email"];
    const locationFields: FormField[] = [
        "locationName",
        "locationStreet",
        "locationZip",
        "locationCity",
    ];

    const needsLocation =
        form.reason === "event" || (form.reason === "gallery" && form.delivery === "yes");

    const handleSubmit = async () => {
        const submitFields: FormField[] = [...contactFields];

        if (needsLocation) submitFields.push(...locationFields);

        if (form.eventType === "birthday") submitFields.push("birthdayAge");
        if (form.hasLocationPhotos === "yes") submitFields.push("locationPhotos");
        if (form.equipmentMulti.includes("Kaltfeuerwerk")) {
            submitFields.push("coldFireDuration");
            if (form.coldFireDuration === "custom") submitFields.push("coldFireCustom");
        }

        if (!validateFields(submitFields)) return;

        await submit();
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
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Grund der Anfrage</div>
    <div style="font-size: 16px;">${form.reason === "event" ? "Veranstaltung" : "Equipment-Verleih"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Datum</div>
    <div style="font-size: 16px;">${form.date || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Event-Typ</div>
    <div style="font-size: 16px;">${form.eventType || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Hochzeitsart</div>
    <div style="font-size: 16px;">${form.weddingType || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Sonstige Angabe</div>
    <div style="font-size: 16px;">${form.weddingOther || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Geburtstagsalter</div>
    <div style="font-size: 16px;">${form.birthdayAge || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Bilder vorhanden</div>
    <div style="font-size: 16px;">${form.hasLocationPhotos === "yes" ? "Ja" : form.hasLocationPhotos === "no" ? "Nein" : "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Location-Name</div>
    <div style="font-size: 16px;">${form.locationName || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Straße</div>
    <div style="font-size: 16px;">${form.locationStreet || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">PLZ / Ort</div>
    <div style="font-size: 16px;">${form.locationZip || "-"} ${form.locationCity || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Equipment benötigt</div>
    <div style="font-size: 16px;">${form.equipmentNeeded === "yes" ? "Ja" : form.equipmentNeeded === "no" ? "Nein" : "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Gewünschtes Equipment</div>
    <div style="font-size: 16px;">${form.equipmentMulti.length ? form.equipmentMulti.join(", ") : "-"}</div>
  </div>

  ${form.equipmentMulti.includes("Kaltfeuerwerk")
    ? `<div style="margin-bottom: 18px;">
         <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Kaltfeuerwerk Dauer</div>
         <div style="font-size: 16px;">${
           form.coldFireDuration === "custom"
             ? `${form.coldFireCustom} Minuten`
             : `${form.coldFireDuration} Sekunden`
         }</div>
       </div>`
    : ""}

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Technik-Details</div>
    <div style="font-size: 16px;">${form.equipmentDetail || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Bereits vorhandene Technik</div>
    <div style="font-size: 16px;">${form.existingTech || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Gästeanzahl</div>
    <div style="font-size: 16px;">${form.guests || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Musikrichtungen</div>
    <div style="font-size: 16px;">${form.music.length ? form.music.join(", ") : "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Zeitraum</div>
    <div style="font-size: 16px;">${form.timeFrom || "-"} bis ${form.timeTo || "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Lieferung gewünscht</div>
    <div style="font-size: 16px;">${form.delivery === "yes" ? "Ja" : form.delivery === "no" ? "Nein" : "-"}</div>
  </div>

  <div style="margin-bottom: 18px;">
    <div style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Nachricht</div>
    <div style="font-size: 16px;">${form.message || "-"}</div>
  </div>

</div>
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
                                        onBlur={() => setFieldError("weddingOther", form.weddingOther)}
                                        error={errors.weddingOther}
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
                                    disabled={!fieldsAreValid(["eventType", "weddingOther"])}
                                    onClick={() => {
                                        if (!validateFields(["eventType", "weddingOther"])) return;

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
                                        onBlur={() => setFieldError("weddingOther", form.weddingOther)}
                                        error={errors.weddingOther}
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
                                    disabled={!fieldsAreValid(["weddingType", "weddingOther"])}
                                    onClick={() => validateAndGo("location-photos", ["weddingType", "weddingOther"])}
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
                                onBlur={() => setFieldError("birthdayAge", form.birthdayAge)}
                                error={errors.birthdayAge}
                                placeholder="z. B. 30"
                                inputMode="numeric"
                                maxLength={3}
                                required
                            />

                            <div className="mt-10 flex justify-center gap-4">
                                <GhostButton onClick={() => setStep("event-type")}>
                                    Zurück
                                </GhostButton>
                                <PrimaryButton
                                    disabled={!fieldsAreValid(["birthdayAge"])}
                                    onClick={() => validateAndGo("location-photos", ["birthdayAge"])}
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
                                                update("locationPhotos", Array.from(e.target.files || []) as File[])
                                            }
                                        />
                                    </label>

                                    {form.locationPhotos.length > 0 && !errors.locationPhotos && (
                                        <p className="text-sm text-green-600 mt-2">
                                            {form.locationPhotos.length} Datei(en) hochgeladen
                                        </p>
                                    )}

                                    {errors.locationPhotos && (
                                        <p className="text-sm font-medium text-red-600 mt-2">
                                            {errors.locationPhotos}
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
                                    disabled={!fieldsAreValid(["hasLocationPhotos", "locationPhotos"])}
                                    onClick={() => validateAndGo("equipment-needed", ["hasLocationPhotos", "locationPhotos"])}
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

                            {errors.equipmentMulti && (
                                <p className="mt-3 text-center text-sm font-medium text-red-600">
                                    {errors.equipmentMulti}
                                </p>
                            )}

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

                                    {errors.coldFireDuration && (
                                        <p className="mt-3 text-center text-sm font-medium text-red-600">
                                            {errors.coldFireDuration}
                                        </p>
                                    )}

                                    {/* Wenn Mehr ausgewählt → Textfeld */}
                                    {form.coldFireDuration === "custom" && (
                                        <div className="mt-5 max-w-md mx-auto">
                                            <InputField
                                                label="Bitte Dauer angeben (in Minuten)"
                                                value={form.coldFireCustom}
                                                onChange={(v) => update("coldFireCustom", v)}
                                                onBlur={() => setFieldError("coldFireCustom", form.coldFireCustom)}
                                                error={errors.coldFireCustom}
                                                placeholder="z. B. 2"
                                                inputMode="numeric"
                                                maxLength={2}
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
                                    disabled={!fieldsAreValid(["equipmentMulti", "coldFireDuration", "coldFireCustom"])}
                                    onClick={() =>
                                        validateAndGo("equipment-detail", [
                                            "equipmentMulti",
                                            "coldFireDuration",
                                            "coldFireCustom",
                                        ])
                                    }
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
                                onBlur={() => setFieldError("equipmentDetail", form.equipmentDetail)}
                                error={errors.equipmentDetail}
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
                                onBlur={() => setFieldError("existingTech", form.existingTech)}
                                error={errors.existingTech}
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
                                onBlur={() => setFieldError("guests", form.guests)}
                                error={errors.guests}
                                placeholder="z. B. 80"
                                inputMode="numeric"
                                maxLength={6}
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
                                    disabled={!fieldsAreValid(["guests"])}
                                    onClick={() => validateAndGo("music", ["guests"])}
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
                                    onBlur={() => setFieldError("timeFrom", form.timeFrom)}
                                    error={errors.timeFrom}
                                    required
                                />
                                <InputField
                                    label="Bis"
                                    type="time"
                                    value={form.timeTo}
                                    onChange={(v) => update("timeTo", v)}
                                    onBlur={() => setFieldError("timeTo", form.timeTo)}
                                    error={errors.timeTo}
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
                                    disabled={!fieldsAreValid(["timeFrom", "timeTo"])}
                                    onClick={() =>
                                        validateAndGo(
                                            form.reason === "gallery" ? "delivery" : "location",
                                            ["timeFrom", "timeTo"]
                                        )
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
                                    disabled={!fieldsAreValid(["delivery"])}
                                    onClick={() => {
                                        if (!validateFields(["delivery"])) return;

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
                                    onBlur={() => setFieldError("locationName", form.locationName)}
                                    error={errors.locationName}
                                    placeholder="z. B. Alter Güterbahnhof"
                                    maxLength={120}
                                />
                                <InputField
                                    label="Straße & Hausnummer"
                                    required
                                    value={form.locationStreet}
                                    onChange={(v) => update("locationStreet", v)}
                                    onBlur={() => setFieldError("locationStreet", form.locationStreet)}
                                    error={errors.locationStreet}
                                    placeholder="Musterstraße 10"
                                    maxLength={120}
                                />
                                <InputField
                                    label="PLZ"
                                    required
                                    value={form.locationZip}
                                    onChange={(v) => update("locationZip", v)}
                                    onBlur={() => setFieldError("locationZip", form.locationZip)}
                                    error={errors.locationZip}
                                    placeholder="49808"
                                    inputMode="numeric"
                                    maxLength={5}
                                />
                                <InputField
                                    label="Ort"
                                    required
                                    value={form.locationCity}
                                    onChange={(v) => update("locationCity", v)}
                                    onBlur={() => setFieldError("locationCity", form.locationCity)}
                                    error={errors.locationCity}
                                    placeholder="Lingen"
                                    maxLength={80}
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
                                    disabled={!fieldsAreValid(locationFields)}
                                    onClick={() => validateAndGo("contact", locationFields)}
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
                                    onBlur={() => setFieldError("company", form.company)}
                                    error={errors.company}
                                    placeholder="Firma"
                                    autoComplete="organization"
                                    maxLength={100}
                                />
                                <InputField
                                    label="Vorname"
                                    required
                                    value={form.firstName}
                                    onChange={(v) => update("firstName", v)}
                                    onBlur={() => setFieldError("firstName", form.firstName)}
                                    error={errors.firstName}
                                    placeholder="Vorname"
                                    autoComplete="given-name"
                                    maxLength={60}
                                />
                                <InputField
                                    label="Nachname"
                                    required
                                    value={form.lastName}
                                    onChange={(v) => update("lastName", v)}
                                    onBlur={() => setFieldError("lastName", form.lastName)}
                                    error={errors.lastName}
                                    placeholder="Nachname"
                                    autoComplete="family-name"
                                    maxLength={60}
                                />
                                <InputField
                                    label="Mobiltelefon"
                                    required
                                    value={form.phone}
                                    onChange={(v) => update("phone", v)}
                                    onBlur={() => setFieldError("phone", form.phone)}
                                    error={errors.phone}
                                    placeholder="01701234567"
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel"
                                    maxLength={15}
                                />
                                <InputField
                                    label="E-Mail"
                                    required
                                    type="email"
                                    value={form.email}
                                    onChange={(v) => update("email", v)}
                                    onBlur={() => setFieldError("email", form.email)}
                                    error={errors.email}
                                    placeholder="mail@example.com"
                                    inputMode="email"
                                    autoComplete="email"
                                    maxLength={120}
                                />

                                <div className="sm:col-span-2">
                                    <InputArea
                                        label="Nachricht (optional)"
                                        value={form.message}
                                        onChange={(v) => update("message", v)}
                                        onBlur={() => setFieldError("message", form.message)}
                                        error={errors.message}
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
                                    disabled={!fieldsAreValid(contactFields)}
                                    onClick={handleSubmit}
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
