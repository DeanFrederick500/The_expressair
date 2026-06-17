import Image from "next/image";

export default function TentangKami() {
  return (
    <section id="TentangKami" className="relative h-[600px] flex items-center justify-center text-center text-white">
      
      {/* Background Image */}
      <Image
        src="/about us 1.jpg"
        alt="TENTANG KAMI"
        fill
        className="object-cover "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-blueprimary/75"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6">
        <h2 className="text-3xl md:text-6xl font-bold mb-10">
          About Us
        </h2>

        <p className="text-sm md:text-base">
          ExpressAir is an air logistics company that provides fast, safe, and
          reliable shipping solutions to various domestic and international destinations.
          This is our journey to becoming a leading air cargo logistics integrator in Indonesia.
        </p>
      </div>
    </section>
  );
}