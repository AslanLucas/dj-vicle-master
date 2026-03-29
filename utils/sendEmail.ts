// utils/sendEmail.ts

export const sendEmail = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
    company?: string;
}) => {
    try {
        const response = await fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            // Loggt Fehlerantworten des Servers (z.B. 500)
            const errorData = await response.json();
            console.error("Server Fehler:", errorData.error);
            return false;
        }

        return true;
    } catch (error) {
        // Loggt Netzwerkfehler (z.B. keine Internetverbindung)
        console.error("Netzwerkfehler beim Senden der E-Mail:", error);
        return false;
    }
};