import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Service from "@/components/sections/Service";
import Pengiriman from "@/components/sections/Pengiriman";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan - ExpressAir Cargo System",
  description:
    "Layanan yang tersedia di perusahaan ExpressAir dan perjalanan perusahaan dalam menyediakan layanan logistik udara.",
};

export default function ServicePage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Service />
        <Pengiriman />
      </main>

      <Footer />
    </>
  );
}