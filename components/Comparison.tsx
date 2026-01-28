"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  { name: "Ár", template: "0 - 5 000 Ft", agency: "200 000+ Ft", brillcode: "9 400 Ft", highlight: true },
  { name: "Átfutási idő", template: "1-2 óra", agency: "2-4 hét", brillcode: "24 óra", highlight: true },
  { name: "Egyedi dizájn", template: false, agency: true, brillcode: true },
  { name: "Konverzió fókusz", template: false, agency: "Változó", brillcode: true },
  { name: "Forráskód", template: "Korlátozott", agency: true, brillcode: true },
  { name: "Módosítási lehetőség", template: "Korlátozott", agency: "Drága", brillcode: "1 kör ingyen" },
  { name: "Személyes támogatás", template: false, agency: true, brillcode: true },
  { name: "SEO alapok", template: "Változó", agency: true, brillcode: true },
];

const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Villámgyors",
    description: "24 óra alatt kész az oldalad. Nincs hónapokig tartó várakozás.",
    color: "from-lime-400 to-lime-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Megfizethető",
    description: "Ügynökségi minőség, de az ár töredéke. Nincs rejtett költség.",
    color: "from-teal-400 to-teal-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Egyedi megoldás",
    description: "Nem sablon, hanem a te igényeid szerint készül. 100% egyedi.",
    color: "from-petrol-400 to-petrol-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Kockázatmentes",
    description: "Csak akkor fizetsz, ha tetszik. Nincs előleg, nincs rejtett költség.",
    color: "from-lime-400 to-teal-500",
  },
];

function CellValue({ value, isBrillcode = false }: { value: boolean | string; isBrillcode?: boolean }) {
  if (value === true) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
          isBrillcode ? "bg-gradient-to-br from-lime-400 to-teal-400" : "bg-teal-100"
        }`}
      >
        <svg className={`w-5 h-5 ${isBrillcode ? "text-white" : "text-teal-600"}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </motion.div>
    );
  }
  if (value === false) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-8 h-8 mx-auto rounded-full bg-red-50 flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </motion.div>
    );
  }
  return (
    <span className={`text-sm font-medium ${isBrillcode ? "text-petrol-800" : "text-petrol-600"}`}>
      {value}
    </span>
  );
}

export default function Comparison() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-petrol-50/30 to-cream-50" />

      {/* Animated background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-petrol-500/3 rounded-full blur-3xl" />
      </motion.div>

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-petrol-400" />
            <span className="text-petrol-600 text-sm font-medium tracking-widest uppercase">
              Összehasonlítás
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-petrol-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-petrol-900 mb-6 leading-tight"
          >
            Miért pont a
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-petrol-500 to-lime-500">
              BrillCode?
            </span>
          </motion.h2>
        </div>

        {/* Reasons cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative group"
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-[1px] bg-gradient-to-r ${reason.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />

              <div className="relative bg-white rounded-3xl p-8 h-full border border-petrol-100 shadow-lg shadow-petrol-900/5 overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {reason.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-petrol-800 mb-3">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-petrol-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative group">
            {/* Table glow on hover */}
            <motion.div
              className="absolute -inset-[2px] bg-gradient-to-r from-teal-500/20 via-lime-400/20 to-petrol-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-petrol-900/10 border border-petrol-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-petrol-100">
                      <th className="text-left p-5 font-bold text-petrol-800 w-1/4"></th>
                      <motion.th
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ delay: 0.7 }}
                        className="p-5 text-center w-1/4"
                      >
                        <div className="text-petrol-400 font-normal text-xs mb-1 uppercase tracking-wider">Sablon építők</div>
                        <div className="text-petrol-600 font-bold">Wix, Squarespace</div>
                      </motion.th>
                      <motion.th
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ delay: 0.8 }}
                        className="p-5 text-center w-1/4"
                      >
                        <div className="text-petrol-400 font-normal text-xs mb-1 uppercase tracking-wider">Ügynökség</div>
                        <div className="text-petrol-600 font-bold">Hagyományos</div>
                      </motion.th>
                      <motion.th
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ delay: 0.9 }}
                        className="p-5 text-center w-1/4 relative"
                      >
                        {/* Winner badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
                          transition={{ type: "spring", delay: 1 }}
                          className="absolute -top-3 left-1/2 -translate-x-1/2"
                        >
                          <div className="bg-gradient-to-r from-lime-400 to-teal-400 text-petrol-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            AJÁNLOTT
                          </div>
                        </motion.div>
                        <div className="bg-gradient-to-br from-lime-50 to-teal-50 -mx-5 -mt-5 px-5 pt-8 pb-5 rounded-t-2xl">
                          <div className="text-teal-600 font-normal text-xs mb-1 uppercase tracking-wider">Legjobb választás</div>
                          <div className="text-petrol-800 font-black text-xl">BrillCode</div>
                        </div>
                      </motion.th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.5, delay: 1.1 + index * 0.08 }}
                        className="border-b border-petrol-100/50 hover:bg-petrol-50/50 transition-colors"
                      >
                        <td className="p-5 font-semibold text-petrol-700">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              feature.highlight ? "bg-gradient-to-r from-lime-400 to-teal-400" : "bg-petrol-300"
                            }`} />
                            {feature.name}
                          </div>
                        </td>
                        <td className="p-5 text-center">
                          <CellValue value={feature.template} />
                        </td>
                        <td className="p-5 text-center">
                          <CellValue value={feature.agency} />
                        </td>
                        <td className="p-5 text-center relative">
                          {/* Highlight glow for BrillCode column */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-lime-400/5 via-lime-400/10 to-lime-400/5"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <div className="relative z-10">
                            <CellValue value={feature.brillcode} isBrillcode />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom highlight bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="h-1 bg-gradient-to-r from-teal-500 via-lime-400 to-teal-500 origin-left"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-petrol-100 shadow-lg">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-br from-lime-400 to-teal-500 rounded-xl flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </motion.div>
            <p className="text-petrol-700 font-medium">
              A legjobb ár-érték arány. <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-lime-500 font-bold">Egyedi minőség</span>, ügynökségi ár töredékéért.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
