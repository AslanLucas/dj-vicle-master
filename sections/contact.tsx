'use client';

import React, { useMemo, useState } from 'react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Field, Switch } from '@headlessui/react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { sendEmail } from '@/utils/sendEmail';
import { useConsent } from "@/utils/useConsent";


export default function ContactSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const consented = useConsent(); // true | false | null


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        message: '',
        agreed: false
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: { [key: string]: string } = {};

        // Pflichtfelder prüfen (außer Firma)
        if (!formData.firstName.trim()) newErrors.firstName = 'Vorname ist erforderlich';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nachname ist erforderlich';
        if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich';
        else if (!formData.email.includes('@')) newErrors.email = 'E-Mail muss ein @ enthalten';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Telefonnummer ist erforderlich';
        if (!formData.message.trim()) newErrors.message = 'Nachricht ist erforderlich';

        if (!formData.agreed) {
            alert('Bitte akzeptiere die Datenschutzrichtlinie.');
            return;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const success = await sendEmail({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            company: formData.company,
            message: formData.message
        });

        if (success) {
            setSuccessMessage(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                company: '',
                message: '',
                agreed: false
            });

            setTimeout(() => setSuccessMessage(false), 5000);
        } else {
            alert('Fehler beim Senden der Nachricht. Bitte versuche es erneut.');
        }
    };

    const openMapsApp = () => {
        const address = '48529 Nordhorn, Deutschland';
        const encodedAddress = encodeURIComponent(address);

        if (navigator.userAgent.match(/iPhone|iPad|Mac/i)) {
            window.open(`maps://?q=${encodedAddress}`, '_blank');
        } else if (navigator.userAgent.match(/Android/i)) {
            window.open(`geo:0,0?q=${encodedAddress}`, '_blank');
        } else {
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="bg-white py-16 px-6 lg:px-16">
            <motion.div
                className="max-w-6xl mx-auto px-4 text-center"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: 'easeOut'}}
                viewport={{once: true}}
            >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-6 uppercase">
                    Kontakt
                    <span className="block h-[5px] w-20 bg-black mt-2 mx-auto rounded shadow-[0_0_10px_black]"/>
                </h2>

                <p className="text-gray-700 text-lg mb-12">
                    Hinterlassen Sie uns eine Nachricht und wir melden uns bei Ihnen!
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Map */}
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={isVisible ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    className="overflow-hidden rounded-lg bg-white shadow-sm cursor-pointer h-80 lg:h-full flex items-center justify-center"
                >
                    {/* Wenn Nutzer zugestimmt hat → Karte anzeigen */}
                    {consented === true ? (
                        <iframe
                            loading="lazy"
                            src="https://maps.google.com/maps?q=Nordhorn,%20Deutschland&t=m&z=13&output=embed"
                            title="Nordhorn"
                            aria-label="Nordhorn"
                            className="w-full h-full border-0 pointer-events-none"
                        ></iframe>
                    ) : (
                        // Wenn keine Zustimmung oder abgelehnt → Platzhalter
                        <div className="flex flex-col items-center justify-center text-center p-6">
                            <p className="text-gray-700 mb-3">
                                Google Maps ist deaktiviert. Bitte Cookies akzeptieren, um die Karte zu laden.
                            </p>
                            <button
                                onClick={() => {
                                    document.cookie =
                                        "liberty_homes_consent=true; path=/; max-age=" + 60 * 60 * 24 * 180;
                                    window.dispatchEvent(new Event('cookieConsentChanged'));
                                }}
                                className="inline-block bg-[#2A2A2A] text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                            >
                                Cookies akzeptieren & Karte laden
                            </button>
                        </div>
                    )}
                </motion.div>


                <div>
                    {successMessage && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                             onClick={() => setSuccessMessage(false)}>
                            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full mx-4 relative"
                                 onClick={(e) => e.stopPropagation()}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <CheckCircleIcon className="size-6 text-green-500"/>
                                        <p className="ml-3 text-lg font-medium text-green-800">
                                            Deine Nachricht wurde erfolgreich gesendet!
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSuccessMessage(false)}
                                        className="rounded-md bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 focus:ring-2 focus:ring-green-600 focus:outline-none"
                                    >
                                        <XMarkIcon className="size-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {/* Vorname */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900">
                                    Vorname <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-2.5 block w-full rounded-md px-3.5 py-2 text-gray-900 outline-1 ${
                                        errors.firstName ? 'outline-red-500' : 'outline-gray-300'
                                    } focus:outline-indigo-600`}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>

                            {/* Nachname */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900">
                                    Nachname <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-2.5 block w-full rounded-md px-3.5 py-2 text-gray-900 outline-1 ${
                                        errors.lastName ? 'outline-red-500' : 'outline-gray-300'
                                    } focus:outline-indigo-600`}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>

                            {/* E-Mail */}
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                                    E-Mail <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-2.5 block w-full rounded-md px-3.5 py-2 text-gray-900 outline-1 ${
                                        errors.email ? 'outline-red-500' : 'outline-gray-300'
                                    } focus:outline-indigo-600`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Telefonnummer */}
                            <div className="sm:col-span-2">
                                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900">
                                    Telefonnummer <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+49 ..."
                                    className={`mt-2.5 block w-full rounded-md px-3.5 py-2 text-gray-900 outline-1 ${
                                        errors.phoneNumber ? 'outline-red-500' : 'outline-gray-300'
                                    } focus:outline-indigo-600`}
                                />
                                {errors.phoneNumber &&
                                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                            </div>

                            {/* Firma (optional) */}
                            <div className="sm:col-span-2">
                                <label htmlFor="company" className="block text-sm font-semibold text-gray-900">
                                    Firma (optional)
                                </label>
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="mt-2.5 block w-full rounded-md px-3.5 py-2 text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
                                />
                            </div>

                            {/* Nachricht */}
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                                    Nachricht <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`mt-2.5 block w-full resize-none rounded-md px-3.5 py-2 text-gray-900 outline-1 ${
                                        errors.message ? 'outline-red-500' : 'outline-gray-300'
                                    } focus:outline-indigo-600`}
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>

                            <p className="text-sm text-gray-500 sm:col-span-2 mt-2">* Pflichtfelder</p>

                            {/* Datenschutz */}
                            <Field className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-x-4 sm:col-span-2">
                                <Switch
                                    checked={formData.agreed}
                                    onChange={(value) => setFormData({...formData, agreed: value})}
                                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ${
                                        formData.agreed ? 'bg-[#518C6B]' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                                            formData.agreed ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </Switch>
                                <p className="text-sm text-gray-600">
                                    Ich akzeptiere die{' '}
                                    <a
                                        href="/privacypolicy"
                                        className="font-semibold text-black hover:text-[#518C6B] transition duration-200"
                                    >
                                        Datenschutzrichtlinien
                                    </a>.
                                </p>
                            </Field>
                        </div>

                        <div className="pt-6 flex items-center justify-center gap-x-6">
                            <button
                                type="submit"
                                className="inline-block bg-black text-white text-lg font-semibold py-3 px-8 rounded-lg
        transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(0,0,0,0.6)]
        border border-black"
                            >
                                Nachricht senden
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
