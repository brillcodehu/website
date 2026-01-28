"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-petrol-900 text-petrol-300 py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-petrol-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <div className="font-bold text-white">BrillCode</div>
              <div className="text-sm text-petrol-400">Egyedi landing oldal, 24 óra alatt</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="mailto:hello@brillcode.hu"
              className="hover:text-white transition-colors"
            >
              hello@brillcode.hu
            </a>
            <a
              href="tel:+36301794259"
              className="hover:text-white transition-colors"
            >
              +36 30 179 4259
            </a>
            <a
              href="#gyik"
              className="hover:text-white transition-colors"
            >
              GYIK
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-petrol-700 my-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-petrol-400">
          <p>© {currentYear} BrillCode. Minden jog fenntartva.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-petrol-200 transition-colors">
              Adatvédelmi tájékoztató
            </a>
            <a href="#" className="hover:text-petrol-200 transition-colors">
              ÁSZF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
