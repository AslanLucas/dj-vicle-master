'use client';

import { Mail, Phone, Instagram, MessageCircleMore } from 'lucide-react';
import { FaTiktok } from "react-icons/fa";

import React from "react";

export default function Footer() {
    return (
        <footer className="bg-[#2A2A2A]">
            <div className="mx-auto max-w-7xl overflow-hidden px-3 py-10 sm:py-12 lg:px-4">

                {/* Navigation */}
                <nav className="text-white flex flex-wrap justify-center gap-x-12 gap-y-3 text-m font-semibold">
                    <a href="/standorte" className="hover:text-white font-bold">
                        Standorte
                    </a>
                    <a href="/blog" className="hover:text-white font-bold">
                        Blog
                    </a>
                    <a href="/legalnotice" className="hover:text-white font-bold">
                        Impressum
                    </a>
                    <a href="/privacypolicy" className="hover:text-white font-bold">
                        Datenschutz
                    </a>
                </nav>

                {/* Standort */}
                <div className="mt-6 text-center font-bold text-white">
                    <a
                        href="https://www.google.com/maps/place/Lingen+(Ems)"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-m hover:text-white"
                    >
                        Nordhorn, Deutschland
                    </a>
                </div>

                {/* Kontakt Icons */}
                <div className="mt-8 flex justify-center gap-x-6">

                    {/* E-Mail */}
                    <a
                        href="mailto:info@djvicle.de"
                        className="text-white hover:text-white"
                        aria-label="E-Mail senden"
                    >
                        <Mail className="size-8" />
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/dj_vicle/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-white"
                        aria-label="Instagram Profil besuchen"
                    >
                        <Instagram className="size-8" />
                    </a>

                    {/* TikTok */}
                    <a
                        href="https://www.tiktok.com/@dj_vicle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-white"
                        aria-label="TikTok Profil besuchen"
                    >
                        <FaTiktok className="size-8" />
                    </a>
                </div>

                {/* Copyright */}
                <p className="mt-10 text-center text-m font-bold text-white">
                    © {new Date().getFullYear()} DJ VICLE
                </p>
            </div>
        </footer>
    );
}
