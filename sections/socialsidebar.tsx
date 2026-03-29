'use client';
import { useEffect, useState } from 'react';
import {Mail, Phone} from 'lucide-react';
import {FaWhatsapp, FaInstagram, FaTiktok} from 'react-icons/fa';

export default function FloatingSocialSidebar() {
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => {
        const handleInteraction = () => {
            setShowLabel(true);

            clearTimeout((handleInteraction as any).timeout);
            (handleInteraction as any).timeout = setTimeout(() => {
                setShowLabel(false);
            }, 1000);
        };

        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            clearTimeout((handleInteraction as any).timeout);
        };
    }, []);

    return (
        <div className="fixed right-4 top-1/3 z-50 flex flex-col items-center gap-3">

            {/* Telefon */}
            <a
                href="https://www.tiktok.com/@dj_vicle"
                className="bg-[#2A2A2A] p-3 rounded-full text-white shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:bg-[#404040] transition-colors duration-300"
                aria-label="Telefon"
            >
                <FaTiktok className="size-5" />
            </a>

            {/* Instagram */}
            <a
                href="https://www.instagram.com/dj_vicle/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2A2A2A] p-3 rounded-full text-white shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:bg-[#404040] transition-colors duration-300"
                aria-label="Instagram"
            >
                <FaInstagram className="size-5" />
            </a>

            {/* WhatsApp */}
            <a
                href="mailto:info@djvicle.de"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2A2A2A] p-3 rounded-full text-white shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:bg-[#404040] transition-colors duration-300"
                aria-label="WhatsApp"
            >
                <Mail className="size-5" />
            </a>

        </div>
    );
}
