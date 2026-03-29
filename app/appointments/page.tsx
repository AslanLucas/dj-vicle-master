"use client";

import Header from "@/sections/header";
import Footer from "@/sections/footer";
import React, {useEffect} from "react";
import AvailableAppointments from "@/sections/availableAppointments";

export default function AppointmentsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <AvailableAppointments />
            <Footer />
        </>
    );
}