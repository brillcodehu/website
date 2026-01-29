"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Kitöltöd az űrlapot",
    description: "Minél több információt adsz (cégnév, cél, stílus preferencia, logó ha van), annál gyorsabban tudunk produkálni egy kész oldalt. De ha csak az alapok vannak meg, az is elég az induláshoz.",
  },
  {
    number: "02",
    title: "Elkészítjük az oldalad",
    description: "Bevált, tesztelt komponensekből építjük fel az egyedi oldalad. Nem sablon, de nem is nulláról indulunk.",
  },
  {
    number: "03",
    title: "Megkapod és döntesz",
    description: "24 órán belül megkapod a kész oldalt. Ha tetszik, kifizeted. Ha nem, akkor nem. Nincs fizetési kötelezettség, amíg nem vagy elégedett az eredménnyel.",
  },
];

export default function Solution() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // Removed scroll-based animation for better performance
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"],
  // });
  // const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} id="hogyan" className="relative py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-100" />

      {/* Static background elements - removed animation for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-petrol-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(rgba(30,95,116,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,95,116,1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-500/50" />
            <span className="text-teal-600 text-sm font-medium tracking-widest uppercase">
              A megoldás
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-500/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-petrol-900 mb-6 leading-tight"
          >
            Hogyan készül el
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-petrol-500 to-teal-500">
              24 óra alatt?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-lg text-petrol-600 max-w-2xl mx-auto"
          >
            Nem rohanunk. Rendszerben gondolkodunk. Ezért tudunk gyorsan és minőségben is dolgozni.
          </motion.p>
        </div>

        {/* Process visualization */}
        <div className="max-w-4xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <motion.div
              className="h-full bg-gradient-to-r from-petrol-300 via-teal-400 to-lime-400 rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </div>

          {/* Steps */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                {/* Step point on line */}
                <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-teal-500 rounded-full shadow-lg z-10" />

                {/* Content */}
                <div className="text-center pt-8 lg:pt-12">
                  {/* Number badge */}
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-petrol-600 to-teal-600 text-white font-black text-xl mb-6 shadow-lg shadow-petrol-600/30 mx-auto"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-petrol-800 mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-petrol-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Explanation box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <div className="relative group">
            {/* Glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500/20 via-petrol-500/20 to-lime-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-gradient-to-br from-petrol-800 via-petrol-900 to-petrol-800 rounded-3xl p-8 md:p-10 border border-petrol-700/50 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime-500 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-teal-500 to-lime-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </motion.div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">
                    Hogy lehet egyedi és mégis ilyen gyors?
                  </h4>
                  <p className="text-petrol-200 leading-relaxed text-lg">
                    Produktizált rendszert használunk: <span className="text-teal-400 font-semibold">bevált, konverzió-optimalizált komponensekből</span> építünk, de minden oldal egyedi igények szerint készül. Nincs sablon amit módosítunk – de nincs is nulláról indulás minden projektnél.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    {["Tesztelt elemek", "Egyedi összeállítás", "Gyors iteráció"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-petrol-300">
                        <svg className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
