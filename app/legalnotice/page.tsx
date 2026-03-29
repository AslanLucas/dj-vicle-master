"use client";

import Header from "@/sections/header";
import Footer from "@/sections/footer";
import {useEffect} from "react";
import Sectionlegalnotice from "@/sections/sectionlegalnotice";

export default function PrivacyPolicyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <Sectionlegalnotice/>
            <Footer />
        </>
    );
}