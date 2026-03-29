'use client';

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookieBanner() {
    const handleAccept = () => {
        document.cookie =
            "djvicle_consent=true; path=/; max-age=" + 60 * 60 * 24 * 180;
        window.dispatchEvent(new Event("cookieConsentChanged"));
    };

    const handleDecline = () => {
        document.cookie =
            "djvicle_consent=false; path=/; max-age=" + 60 * 60 * 24 * 180;
        window.dispatchEvent(new Event("cookieConsentChanged"));
    };

    return (
        <CookieConsent
            location="bottom"
            cookieName="djvicle_consent"
            buttonText="Akzeptieren"
            declineButtonText="Ablehnen"
            enableDeclineButton
            expires={180}
            onAccept={handleAccept}
            onDecline={handleDecline}
            overlay={false}
            style={{
                background: "#2A2A2A",
                color: "white",
                fontSize: "15px",
                textAlign: "center",
                padding: "1rem",
                zIndex: 9999,
            }}
            buttonStyle={{
                background: "white",
                color: "black",
                fontWeight: 600,
                borderRadius: "10px",
                padding: "10px 20px",
                marginLeft: "12px",
                fontSize: "14px",
            }}
            declineButtonStyle={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "10px",
                padding: "10px 20px",
                marginLeft: "12px",
                fontSize: "14px",
            }}
        >
            Diese Website verwendet Cookies für grundlegende Funktionen.
            Weitere Informationen findest du in der{" "}
            <Link
                href="/privacypolicy"
                className="underline"
                style={{ color: "white", fontWeight: 600 }}
            >
                Datenschutzerklärung
            </Link>.
        </CookieConsent>
    );
}
