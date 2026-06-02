import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import AboutUs from "@/components/sections/AboutUs";
import VisiMisi from "@/components/sections/VisiMisi";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami - ExpressAir Cargo System",
    description:
        "Tentang perusahaan ExpressAir dan perjalanan perusahaan dalam menyediakan layanan logistik udara.",
};

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <main className="pt-20">
                <AboutUs />
                <VisiMisi />
            </main>

            <Footer />
        </>
    );
}