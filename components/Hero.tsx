"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { getCountdownEnd, formatCountdown, getRandomCapacity } from "@/lib/countdown";

// Animated background shapes
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(20,184,118,0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(30,95,116,0.12) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-[15%] w-4 h-4 bg-petrol-400/20 rounded-full"
        animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-[20%] w-3 h-3 bg-teal-400/30 rounded-full"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-[10%] w-5 h-5 bg-lime-400/20 rounded-full"
        animate={{ y: [0, -35, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-60 right-[10%] w-2 h-2 bg-petrol-500/30 rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-60 right-[25%] w-6 h-6 border border-teal-400/20 rounded-lg rotate-45"
        animate={{ y: [0, -25, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-[5%] w-8 h-8 border border-petrol-300/15 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,95,116,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,95,116,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// Animated counter for the price
function AnimatedPrice() {
  const count = useMotionValue(49900);
  const rounded = useTransform(count, (v) => `${Math.round(v).toLocaleString("hu-HU")}`);
  const [displayValue, setDisplayValue] = useState("49 900");

  useEffect(() => {
    const controls = animate(count, 9400, {
      duration: 1.5,
      delay: 0.8,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="relative inline-flex items-center gap-3 bg-gradient-to-r from-petrol-800 via-petrol-700 to-petrol-800 px-6 py-4 rounded-2xl shadow-2xl shadow-petrol-900/30 border border-petrol-600/50"
    >
      <div className="text-petrol-400 line-through text-lg font-medium">
        49 900 Ft
      </div>
      <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl sm:text-5xl font-black text-white">{displayValue}</span>
        <span className="text-xl font-bold text-lime-400">Ft</span>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.3, type: "spring", stiffness: 200 }}
        className="absolute -top-3 -right-3 bg-lime-400 text-petrol-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg"
      >
        -81%
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [countdown, setCountdown] = useState({ hours: "23", minutes: "59", seconds: "59", expired: false });
  const [capacity, setCapacity] = useState(2);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setCapacity(getRandomCapacity());

    const updateCountdown = () => {
      const endTime = getCountdownEnd();
      setCountdown(formatCountdown(endTime));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    document.getElementById("megrendeles")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-8 pb-16 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200">
      <FloatingShapes />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Capacity indicator - new style */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-petrol-600 font-medium">
                Ma még <span className="text-teal-600 font-bold">{mounted ? capacity : 2}</span> megrendelést tudunk fogadni
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-petrol-900 mb-6 leading-[1.1] tracking-tight"
          >
            Egyedi landing oldal
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-petrol-600 via-teal-500 to-petrol-600 bg-clip-text text-transparent">
                24 óra alatt
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 bg-lime-400/30 -skew-x-12 rounded"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-petrol-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Professzionális, konverziófókuszú weboldal – nem sablon, hanem{" "}
            <span className="text-petrol-800 font-semibold">egyedi fejlesztés</span>.
            Holnapra már hozza az ügyfeleket.
          </motion.p>

          {/* Price display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10 relative inline-block"
          >
            <AnimatedPrice />
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {[
              { icon: "⚡", text: "24 órán belül kész" },
              { icon: "✨", text: "100% egyedi dizájn" },
              { icon: "📈", text: "Konverzióra optimalizált" },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-2 text-petrol-700"
              >
                <span className="text-xl">{benefit.icon}</span>
                <span className="font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              onClick={scrollToForm}
              className="btn-primary text-lg px-8 py-4 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Megrendelem most
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
            <motion.button
              onClick={scrollToDemo}
              className="btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Megnézem a mintákat
            </motion.button>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="inline-flex flex-col items-center"
          >
            <span className="text-sm text-petrol-500 mb-2">Mai akciós ár lejár:</span>
            <div className="flex items-center gap-1 font-mono">
              <div className="bg-petrol-800 text-white px-3 py-2 rounded-lg min-w-[52px] text-center">
                <span className="text-2xl font-bold">{mounted ? countdown.hours : "23"}</span>
                <span className="block text-[10px] text-petrol-300 uppercase tracking-wider">óra</span>
              </div>
              <span className="text-2xl font-bold text-petrol-400">:</span>
              <div className="bg-petrol-800 text-white px-3 py-2 rounded-lg min-w-[52px] text-center">
                <span className="text-2xl font-bold">{mounted ? countdown.minutes : "59"}</span>
                <span className="block text-[10px] text-petrol-300 uppercase tracking-wider">perc</span>
              </div>
              <span className="text-2xl font-bold text-petrol-400">:</span>
              <div className="bg-petrol-800 text-white px-3 py-2 rounded-lg min-w-[52px] text-center">
                <span className="text-2xl font-bold">{mounted ? countdown.seconds : "59"}</span>
                <span className="block text-[10px] text-petrol-300 uppercase tracking-wider">mp</span>
              </div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-petrol-500"
          >
            {[
              "Ingyenes módosítás",
              "Pénzvisszafizetési garancia",
              "Magyar támogatás",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
