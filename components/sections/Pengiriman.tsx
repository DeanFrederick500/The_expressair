"use client";
import {motion} from "framer-motion";
import Image from "next/image";

export default function PengirimanUdara() {
  const cargos = [
    {
      title: "Small Cargo",
      size: "30 x 30 x 30 cm",
      weight: "1 - 5 kg",
      desc: "Perfect for documents, small accessories, and lightweight items.",
    },
    {
      title: "Medium Cargo",
      size: "80 x 80 x 80 cm",
      weight: "5 - 50 kg",
      desc: "Ideal for electronics, retail, and business needs.",
    },
    {
      title: "Large Cargo",
      size: "150 x 150 x 150 cm",
      weight: "50 - 200 kg",
      desc: "For small machinery, lightweight building materials, business stock.",
    },
    {
      title: "Heavy Cargo",
      size: "Custom (adjustable by item type)",
      weight: "> 200 kg",
      desc: "For large shipments and industrial needs.",
    }
  ];

  return (
    <section className="px-8 py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto">

        {/* 🔥 MAIN TITLE (CENTER) */}
        <h2 className="text-3xl md:text-4xl font-bold text-darkblue text-center mb-12">
          Air Shipping
        </h2>
        <p className="text-black mb-8 text-center">
          We provide various shipping categories that can be customized
          according to your item size and weight needs.
        </p>

        {/* 🔥 GRID */}
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT - TEXT */}
          <div className="ml-10">
            {/* SUB TITLE */}
            <h3 className="text-xl font-semibold text-darkblue mb-6">
              Shipping Types
            </h3>

            {/* CARDS */}
            <div className="space-y-6">
              {cargos.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl shadow-xl p-5 hover:shadow-lg hover:-translate-y-1 transition duration-300 bg-white"
                >
                  <h4 className="text-lg font-semibold text-darkblue mb-2">
                    {item.title}
                  </h4>

                  <p className="flex items-center gap-2 text-sm text-black mb-1">
                    <Image
                      src="/size.png"
                      alt="size"
                      width={20}
                      height={20}
                    />
                    Size: {item.size}
                  </p>

                  <p className="flex items-center gap-2 text-sm text-black mb-1">
                    <Image
                      src="/weight.png"
                      alt="size"
                      width={20}
                      height={20}
                    />
                    Weight: {item.weight}
                  </p>

                  <p className="text-sm text-black">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - IMAGE */}
          <motion.div className="flex justify-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
            <Image
              src="/service 2.jpg"
              alt="Pengiriman Udara"
              width={400}
              height={500}
              className="rounded-xl shadow-xl object-cover hover:scale-105 transition duration-300"
            />
          </motion.div>

        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-darkblue text-center mt-14">
          Everything You Need Is in Your Hands
        </h2>
      </div>
    </section>
  );
}