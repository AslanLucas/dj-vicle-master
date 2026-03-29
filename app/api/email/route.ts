import { NextResponse } from 'next/server';
import emailjs from '@emailjs/nodejs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phoneNumber, message, company } = body;

        const currentDate = new Date().toLocaleDateString('de-DE', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const templateParams = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
            message,
            company,
            date: currentDate
        };

        // Hier nutzt du die privaten Keys aus der .env
        await emailjs.send(
            process.env.EMAILJS_SERVICE_ID!,
            process.env.EMAILJS_TEMPLATE_ID!,
            templateParams,
            {
                publicKey: process.env.EMAILJS_USER_ID!,
                privateKey: process.env.EMAILJS_PRIVATE_KEY!, // Optional, falls im Dashboard aktiviert
            }
        );

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Fehler beim Senden der E-Mail:", error);
        return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden" }, { status: 500 });
    }
}