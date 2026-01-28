"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById("megrendeles")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      style={{ opacity }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-petrol-100 shadow-sm"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-black text-xl sm:text-2xl tracking-tight font-mono">
              <span className="text-lime-400">&lt;</span>
              <span className="text-lime-400">BRILL</span>
              <span className="text-teal-400">CODE</span>
              <span className="text-teal-400">&gt;</span>
            </span>
          </motion.div>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="btn-primary text-sm px-4 py-2 sm:px-5 sm:py-2.5"
          >
            <span className="hidden sm:inline">Megrendelem</span>
            <span className="sm:hidden">Rendelés</span>
            <span className="ml-1 font-normal opacity-80">– 9 400 Ft</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
