"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="bg-gray-50 w-full pt-28 flex-1">
        <div className="max-w-6xl mx-auto px-6 py-10">

          <h1 className="text-5xl font-bold text-center text-darkblue mb-12">
            ExpressAir Cargo System
          </h1>

          <div className="py-16 flex justify-center">

            <div className="bg-yellow-100 px-10 py-8 rounded-2xl shadow text-center flex flex-col items-center max-w-2xl">

              <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                !
              </div>

              <h2 className="text-3xl font-bold text-yellow-900 mb-3">
                404 - Page Not Found
              </h2>

              <p className="text-gray-700 mb-6">
                The page you are looking for does not exist or may have been moved.
              </p>

              <Link
                href="/"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
              >
                Back to Landing Page
              </Link>

            </div>

          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
}