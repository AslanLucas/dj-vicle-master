import { google } from "googleapis";

const BOOKED_COLOR_ID = "11"; // 🔴 Rot = gebucht

export async function GET() {
    try {
        const credentials = JSON.parse(
            Buffer.from(
                process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64!,
                "base64"
            ).toString("utf-8")
        );

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
        });

        const calendar = google.calendar({ version: "v3", auth });

        const res = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID!,
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        // 🔎 DEBUG: erste 10 Events ausgeben
        (res.data.items || []).slice(0, 10).forEach((event, index) => {
            console.log(`DEBUG EVENT ${index + 1}`, {
                summary: event.summary,
                start: event.start,
                status: event.status,
                colorId: event.colorId,
                organizer: event.organizer?.email,
                calendarId: event.organizer?.email === process.env.GOOGLE_CALENDAR_ID ? "MATCH" : "DIFF",
            });
        });

        // ✅ NUR gebuchte (rote) Termine zurückgeben
        const bookedEvents = (res.data.items || []).filter(
            (event) => event.colorId === BOOKED_COLOR_ID
        );

        return Response.json({ events: bookedEvents });
    } catch (error) {
        console.error("Calendar API Error:", error);
        return new Response("Error loading calendar events", { status: 500 });
    }
}
