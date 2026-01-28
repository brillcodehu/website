"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Garancia() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-lime-50 via-cream-50 to-teal-50">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 70% 50%, rgba(20, 184, 118, 0.08) 0%, transparent 50%)`,
        }} />
      </div>

      <div ref={ref} className="section-container relative z-10">
        {/* Main message - huge and bold */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-lime-600 text-sm font-semibold tracking-widest uppercase">
              Garancia
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-petrol-900 mb-12 leading-[1.1]"
          >
            Csak akkor fizetsz,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-teal-500 to-lime-500">
              ha tetszik
            </span>
          </motion.h2>
        </div>

        {/* Central statement box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-lime-400/20 via-teal-400/20 to-lime-400/20 rounded-3xl blur-2xl" />

            <div className="relative bg-white rounded-3xl p-12 md:p-16 border-2 border-lime-200 shadow-2xl">
              {/* Large checkmark icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 0.5
                }}
                className="w-24 h-24 bg-gradient-to-br from-lime-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg"
              >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              {/* Main statement */}
              <h3 className="text-4xl sm:text-5xl font-black text-petrol-900 text-center mb-8 leading-tight">
                Nincs előleg.
                <br />
                Nincs kockázat.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-teal-600">
                  Csak akkor fizetsz, ha elégedett vagy.
                </span>
              </h3>

              {/* Description */}
              <p className="text-xl text-petrol-600 text-center leading-relaxed max-w-2xl mx-auto">
                Elkészítjük az oldalad. Megnézed. Ha tetszik, kifizeted. Ha nem, akkor nem. 
                <span className="font-semibold text-petrol-800"> Ennyi.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Simple points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { text: "24 óra alatt kész" },
              { text: "1x ingyenes módosítás" },
              { text: "Fizetés csak ha tetszik" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-100 to-teal-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-petrol-800">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl text-petrol-700 font-bold">
            Nincs rejtett költség. 
            <span className="text-lime-600"> Csak akkor fizetsz, ha elégedett vagy.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
