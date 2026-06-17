"use client";
import Image from "next/image";
import {motion} from "framer-motion";

export default function Mengenal() {
  return (
    <section className="px-8 py-20 bg-darkblue">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT - IMAGE */}
        <motion.div className="flex justify-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        >
          <Image
            src="/about us 3.jpg"
            alt="Mengenal ExpressAir"
            width={500}
            height={400}
            className="rounded-xl shadow-lg object-cover hover:scale-105 transition duration-300"
          />
        </motion.div>

        {/* RIGHT - TEXT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get to Know ExpressAir Better
          </h2>

          <p className="text-white mb-4">
            ExpressAir is here as an air logistics solution that prioritizes
            speed, security, and efficiency in every delivery.
          </p>

          <p className="text-white mb-6">
            With support from modern technology and a wide distribution network,
            we are able to reach various domestic and international regions optimally.
          </p>

          {/* CTA Button */}
          <button className="bg-white text-darkblue px-6 py-3 rounded-md hover:bg-white hover:scale-105 active:scale-95 transition duration-200">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}