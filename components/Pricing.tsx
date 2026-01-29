"use client";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const included = [
  "Egyedi, reszponzív dizájn",
  "Mobilra optimalizált megjelenés",
  "Gyors betöltés (optimalizált kód)",
  "SEO alapbeállítások",
  "Űrlap integráció (e-mail értesítés)",
  "1 kör ingyenes módosítás",
  "Forráskód átadás",
];

const excluded = [
  "Feltöltés a szerverre",
  "Domain regisztráció",
  "Tárhely szolgáltatás",
  "Logó készítés",
  "Többnyelvűség",
  "Szövegírás (de segítünk!)",
  "Több aloldal",
];

const extras = [
  { name: "Feltöltés a tárhelyedre", price: "+4 900 Ft" },
  { name: "Logó készítés", price: "+9 900 Ft" },
  { name: "Többnyelvű verzió", price: "+4 900 Ft/nyelv" },
  { name: "Több oldal", price: "+8 400 Ft/oldal" },
];

export default function Pricing() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px", amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  // Removed scroll-based animation for better performance
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"],
  // });
  // const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollToForm = () => {
    document.getElementById("megrendeles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} id="arak" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200" />

      {/* Static background elements - removed animation for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-lime-400/12 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-300/8 rounded-full blur-3xl" />
      </div>

      {/* Subtle dot pattern - different from other sections */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.4) 1px, transparent 0)`,
        backgroundSize: '50px 50px',
      }} />

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-3 mb-6 fade-in ${isInView ? 'visible' : ''}`}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-lime-500/50" />
            <span className="text-lime-600 text-sm font-medium tracking-widest uppercase">
              Árazás
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-lime-500/50" />
          </div>

          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-petrol-900 mb-6 leading-tight fade-in fade-in-delay-1 ${isInView ? 'visible' : ''}`}>
            Egyszerű, tiszta
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-teal-500 to-lime-500">
              árazás
            </span>
          </h2>

          <p className={`text-lg text-petrol-600 max-w-2xl mx-auto fade-in fade-in-delay-2 ${isInView ? 'visible' : ''}`}>
            Nincs rejtett költség, nincs meglepetés. Tudod előre, mit kapsz.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Main pricing card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="lg:col-span-3 w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative group">
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-[2px] bg-gradient-to-r from-lime-500 via-teal-500 to-lime-500 rounded-3xl blur-xl"
                  animate={{ opacity: isHovered ? 0.5 : 0.3 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="relative bg-gradient-to-br from-white via-white to-lime-50/50 rounded-3xl shadow-2xl overflow-hidden border border-lime-200">
                  {/* Animated background */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-lime-100/50 to-transparent rounded-full animate-spin-slow" />
                  </div>

                  {/* Popular badge */}
                  <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-20 fade-in fade-in-delay-5 ${isInView ? 'visible' : ''}`}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-lime-400 rounded-full blur-lg opacity-50" />
                      <div className="relative bg-gradient-to-r from-lime-400 to-lime-500 text-petrol-900 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                        <span className="hidden sm:inline">Legjobb választás</span>
                        <span className="sm:hidden">Legjobb</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="relative p-6 sm:p-8 md:p-10">
                    {/* Price */}
                    <div className="text-center mb-8 sm:mb-10">
                      <h3 className="text-lg sm:text-xl font-semibold text-petrol-600 mb-4">
                        Egyedi Landing Oldal
                      </h3>
                      <div className="relative inline-block">
                        <div className={`flex items-end justify-center gap-1 sm:gap-2 transition-transform duration-200 ${isHovered ? 'scale-105' : 'scale-100'}`}>
                          <span className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-petrol-800 to-petrol-600">
                            9 400
                          </span>
                          <span className="text-2xl sm:text-3xl font-bold text-lime-600 mb-1 sm:mb-2">Ft</span>
                        </div>
                        <div className={`absolute -top-3 sm:-top-4 -right-6 sm:-right-8 text-petrol-400 line-through text-sm sm:text-lg fade-in fade-in-delay-6 ${isInView ? 'visible' : ''}`}>
                          49 900 Ft
                        </div>
                      </div>
                      <p className="text-petrol-500 mt-3 text-sm sm:text-base">Egyszeri díj, nincs előfizetés</p>
                    </div>

                    {/* What's included */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="font-bold text-petrol-800 mb-4 sm:mb-5 flex items-center gap-2 text-base sm:text-lg">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-teal-500 to-lime-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Mit tartalmaz
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                        {included.map((item, index) => (
                          <li
                            key={index}
                            className={`flex items-start gap-2 sm:gap-3 group/item fade-in fade-in-stagger-${Math.min(index, 4)} ${isInView ? 'visible' : ''}`}
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm sm:text-base text-petrol-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's not included */}
                    <div className="mb-6 sm:mb-10 pt-4 sm:pt-6 border-t border-petrol-100">
                      <h4 className="font-semibold text-petrol-600 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-petrol-100 rounded-md flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-petrol-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Nem tartalmazza
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {excluded.map((item, index) => (
                          <span key={index} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-petrol-50 text-petrol-500 rounded-full text-xs sm:text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={scrollToForm}
                      className="relative w-full overflow-hidden group/btn transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 group-hover/btn:from-lime-400 group-hover/btn:to-lime-500 transition-all duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-lime-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center gap-2 py-4 sm:py-5 text-petrol-900 font-bold text-base sm:text-lg">
                        Megrendelem most
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Extras card */}
            <div className={`lg:col-span-2 w-full fade-in fade-in-delay-3 ${isInView ? 'visible' : ''}`}>
              <div className="relative group h-full">
                {/* Subtle glow */}
                <div className="absolute -inset-[1px] bg-gradient-to-b from-petrol-200 to-petrol-300 rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />

                <div className="relative bg-white rounded-3xl p-6 sm:p-8 h-full border border-petrol-100 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-petrol-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-petrol-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-petrol-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    Opcionális kiegészítők
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {extras.map((extra, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between py-2 sm:py-3 border-b border-petrol-50 last:border-0 group/extra hover:bg-petrol-50/50 -mx-2 px-2 rounded-lg transition-colors"
                      >
                        <span className="text-sm sm:text-base text-petrol-700">{extra.name}</span>
                        <span className="font-bold text-petrol-600 whitespace-nowrap ml-2 sm:ml-4 bg-petrol-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm group-hover/extra:bg-petrol-100 transition-colors">
                          {extra.price}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-br from-petrol-50 to-teal-50 rounded-2xl border border-petrol-100"
                  >
                    <div className="flex gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-petrol-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm text-petrol-600">
                        <strong className="text-petrol-800">Tipp:</strong> Ha nem vagy biztos benne, mire van szükséged, az űrlapon jelezd – segítünk eldönteni.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
