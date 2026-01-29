"use client";

import { motion, useInView } from "framer-motion";
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">
              A probléma
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight"
          >
            Miért nem működnek
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              a landing oldalak?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl text-petrol-300 max-w-2xl mx-auto"
          >
            Láttad már azt az oldalt, ahol minden stimmel, mégsem kattintasz?
          </motion.p>
        </div>

        {/* Problems - clean grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="relative"
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
            </motion.div>
          ))}
        </div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lime-500/10 border border-lime-500/20">
            <div className="w-2 h-2 rounded-full bg-lime-400" />
            <p className="text-lg text-white font-medium">
              Van egy <span className="text-lime-400 font-bold">jobb megoldás</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
