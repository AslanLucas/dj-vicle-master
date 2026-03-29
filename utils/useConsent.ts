'use client';

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useConsent() {
    const [consent, setConsent] = useState<boolean | null>(null);

    useEffect(() => {
        const stored = Cookies.get("djvicle_consent");

        if (stored === "true") setConsent(true);
        else if (stored === "false") setConsent(false);
        else setConsent(null);

        const handleConsentChange = () => {
            const newValue = Cookies.get("djvicle_consent");

            if (newValue === "true") setConsent(true);
            else if (newValue === "false") setConsent(false);
            else setConsent(null);
        };

        window.addEventListener("cookieConsentChanged", handleConsentChange);
        return () =>
            window.removeEventListener("cookieConsentChanged", handleConsentChange);
    }, []);

    return consent;
}

