"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Egyedi rendszerek",
    description: "Bármilyen komplexitású egyedi rendszereket építünk. CRM, ERP, adminisztrációs rendszerek – amire szükséged van.",
    color: "from-petrol-400 to-petrol-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "Webshopok",
    description: "Teljes körű webshop megoldások, fizetési rendszerek integrációval, készletkezeléssel és adminisztrációval.",
    color: "from-teal-400 to-teal-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Teljes üzemeltetés",
    description: "Rendszergazda szintű üzemeltetés bármilyen cégnek. 24/7 monitoring, biztonsági mentések, frissítések.",
    color: "from-lime-400 to-lime-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: "Marketing",
    description: "Marketingben is nagyok vagyunk. SEO, Google Ads, Facebook kampányok, tartalommarketing – minden, amire szükséged van.",
    color: "from-petrol-400 to-teal-500",
  },
];

export default function MoreServices() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  // Removed scroll-based animation for better performance

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-petrol-900 via-petrol-800 to-petrol-900" />

      {/* Static background elements - removed animation for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-petrol-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-3 mb-6 fade-in ${isInView ? 'visible' : ''}`}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-500/50" />
            <span className="text-teal-400/80 text-sm font-medium tracking-widest uppercase">
              További szolgáltatások
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-500/50" />
          </div>

          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight fade-in fade-in-delay-1 ${isInView ? 'visible' : ''}`}>
            Mihez értünk
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-lime-400 to-teal-400">
              még?
            </span>
          </h2>

          <p className={`text-lg text-petrol-300 max-w-2xl mx-auto fade-in fade-in-delay-2 ${isInView ? 'visible' : ''}`}>
            Ez csak a landing page ajánlatunk volt. Igazából egyedi rendszereket is építünk, webshopokat, teljes üzemeltetést végzünk bármilyen cégnek (rendszergazda szint), marketingben is nagyok vagyunk.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative group fade-in-scale fade-in-stagger-${Math.min(index, 4)} ${isInView ? 'visible' : ''}`}
            >
              {/* Enhanced glow effect - smooth with scale */}
              <div className={`absolute -inset-[2px] bg-gradient-to-r ${service.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 scale-95 group-hover:scale-100 transition-all duration-500 ease-out`} />

              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full overflow-hidden transition-all duration-500 ease-out group-hover:border-white/20 group-hover:scale-[1.02] group-hover:-translate-y-1">
                {/* Background gradient - smooth transition */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out`} />

                <div className="relative z-10">
                  {/* Icon with enhanced hover - smooth */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-teal-500/50`}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-100 transition-colors duration-500 ease-out">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-petrol-300 leading-relaxed group-hover:text-petrol-200 transition-colors duration-500 ease-out">
                    {service.description}
                  </p>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
                  <div className={`absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br ${service.color} opacity-30`} />
                  <div className="absolute bottom-4 right-10 w-1 h-1 rounded-full bg-teal-400/20" />
                  <div className="absolute bottom-10 right-4 w-1.5 h-1.5 rounded-full bg-lime-400/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center fade-in fade-in-delay-4 ${isInView ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-teal-500/10 via-lime-500/10 to-teal-500/10 border border-teal-500/20 rounded-2xl backdrop-blur-sm">
            <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div className="text-left">
              <p className="text-white font-semibold text-lg">Beszéljünk a projektedről</p>
              <p className="text-petrol-300 text-sm">Írj nekünk vagy hívj: <a href="tel:+36301794259" className="text-lime-400 hover:text-lime-300 font-semibold">+36 30 179 4259</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
