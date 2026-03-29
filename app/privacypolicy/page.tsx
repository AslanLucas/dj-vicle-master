"use client";

import Header from "@/sections/header";
import Footer from "@/sections/footer";
import {useEffect} from "react";
import Sectionprivacypolicy from "@/sections/sectionprivacpolicy";

export default function PrivacyPolicyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <Sectionprivacypolicy/>
            <Footer />
        </>
    );
}