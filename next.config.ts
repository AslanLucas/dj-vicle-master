import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        qualities: [70, 75, 90], // 90 hier ergänzen!
    },
};

module.exports = nextConfig;
