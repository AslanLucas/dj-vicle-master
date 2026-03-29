import { google } from "googleapis";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, date, message } = body;

        if (!name || !email || !date) {
            return new Response("Missing fields", { status: 400 });
        }

        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/calendar"],
        });

        const calendar = google.calendar({ version: "v3", auth });

        await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID!,
            requestBody: {
                summary: `ANFRAGE – ${name}`,
                description: `Name: ${name}\nEmail: ${email}\nNachricht: ${message || ""}`,
                start: { date },
                end: { date },
                status: "tentative",
                colorId: "5",
            },
        });


        return Response.json({ success: true });
    } catch (error) {
        console.error("Request Booking Error:", error);
        return new Response("Error creating booking request", { status: 500 });
    }
}
