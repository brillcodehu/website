"use client";

import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    name: "Kovács Petra",
    role: "Személyi edző",
    content: "Szkeptikus voltam, hogy 24 óra alatt tényleg kész lesz valami használható. Másnap reggel ott volt a postaládámban a link – és az oldal szebb lett, mint amit vártam. A héten már 3 új ügyfél jelentkezett rajta.",
  },
  {
    name: "Hadnagy Ákos",
    role: "Webshop üzemeltető",
    content: "Nem csak landing oldalt készítettek nekem, hanem webshopot és saját rendszert. Profi munka, gyorsan kész, és minden működik tökéletesen. Csak ajánlani tudom.",
  },
  {
    name: "Kalapos Eszter",
    role: "Fotós",
    content: "Nem értek a technikai dolgokhoz, de végig segítettek. Elmondtam mit szeretnék, és megcsinálták. A módosítást is gyorsan megoldották. Végre van egy oldalam, amit nem szégyenlek megmutatni. A marketingben is profik voltak.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000); // 10 másodperc

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-200 via-cream-100 to-cream-50" />

      {/* Animated background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute top-40 left-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-petrol-400" />
            <span className="text-petrol-600 text-sm font-medium tracking-widest uppercase">
              Vélemények
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-petrol-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-petrol-900 mb-6 leading-tight"
          >
            Mit mondanak
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-petrol-500 to-lime-500">
              az ügyfelek?
            </span>
          </motion.h2>
        </div>

        {/* Testimonial display - single rotating */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center"
              >
                {/* Quote mark */}
                <motion.div
                  className="text-8xl font-serif text-petrol-100 mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  &ldquo;
                </motion.div>

                {/* Content */}
                <p className="text-2xl sm:text-3xl text-petrol-800 leading-relaxed mb-8 font-medium">
                  {testimonials[currentIndex].content}
                </p>

                {/* Author */}
                <div className="mt-8">
                  <p className="text-xl font-bold text-petrol-900">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-petrol-600 mt-1">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative"
              >
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-teal-500" : "bg-petrol-300"
                  }`}
                  animate={{
                    scale: index === currentIndex ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-teal-500"
                    layoutId="activeDot"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
