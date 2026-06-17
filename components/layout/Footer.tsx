import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-blueprimary text-white px-8 py-10">
      <div className="grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className='flex gap-3 items-center pb-3'>
          <Image
          src="/logo siweb.png"
          alt="beranda"
          width={40}
          height={40}
          />
          <h2 className="font-bold mb-2 text-xl">ExpressAir</h2>
          </div>
          <p> Leading air cargo integrator <br />in Southeast Asia.</p>
        </div>

        <div>
          <h2 className="font-bold mb-2">Quick Links</h2>
          <p>Home</p>
          <p>About Us</p>
          <p>Services</p>
          <p>Login</p>
        </div>

        <div>
          <h2 className="font-bold mb-2">Services</h2>
          <p>Small Cargo</p>
          <p>Medium Cargo</p>
          <p>Large Cargo</p>
          <p>Heavy Cargo</p>
        </div>

        <div>
          <h2 className="font-bold mb-2">Versi</h2>
          <p>v1.0</p>
        </div>
      </div>

      <p className="text-center mt-6 text-xs">
        © 2026 ExpressAir. All rights reserved.
      </p>
    </footer>
  );
}