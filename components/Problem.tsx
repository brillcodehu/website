"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    title: "Végtelen várakozás",
    description: "Hónapokig vársz, hogy elkészüljön az oldal. Addigra a lehetőségek elmúltak, a kampányok leálltak, az ügyfelek máshol találtak megoldást.",
  },
  {
    title: "Ügynökségi árak",
    description: "300-500 ezer forint egy egyszerű landing oldalért? Ez nem opció egy kisvállalkozásnak, még akkor sem, ha a minőség jó lenne.",
  },
  {
    title: "Nem kreatív tartalom",
    description: "Sablonos szövegek, unalmas megfogalmazások. Az oldal nem tükrözi a te egyediségedet, nem épít bizalmat, nem különböztet meg a versenytársaktól.",
  },
  {
    title: "Unalmas design",
    description: "Ugyanazok a sablonok, ugyanazok a megoldások. A látogató nem lát különbséget, nem érez kapcsolatot, nem kattint.",
  },
];

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px", amount: 0.1 });

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-petrol-900 via-petrol-800 to-petrol-900">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)`,
        }} />
      </div>

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <div className={`mb-8 fade-in ${isInView ? 'visible' : ''}`}>
            <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">
              A probléma
            </span>
          </div>

          <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight fade-in fade-in-delay-1 ${isInView ? 'visible' : ''}`}>
            Miért nem működnek
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              a landing oldalak?
            </span>
          </h2>

          <p className={`text-xl text-petrol-300 max-w-2xl mx-auto fade-in fade-in-delay-2 ${isInView ? 'visible' : ''}`}>
            Láttad már azt az oldalt, ahol minden stimmel, mégsem kattintasz?
          </p>
        </div>

        {/* Problems - clean grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`relative fade-in-scale fade-in-stagger-${index} ${isInView ? 'visible' : ''}`}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300">
                {/* Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-black text-lg">
                    {index + 1}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {problem.title}
                </h3>
                <p className="text-lg text-petrol-300 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom hint */}
        <div className={`text-center fade-in fade-in-delay-3 ${isInView ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lime-500/10 border border-lime-500/20">
            <div className="w-2 h-2 rounded-full bg-lime-400" />
            <p className="text-lg text-white font-medium">
              Van egy <span className="text-lime-400 font-bold">jobb megoldás</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
