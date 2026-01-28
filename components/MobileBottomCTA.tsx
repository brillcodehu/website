"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRandomCapacity } from "@/lib/countdown";

export default function MobileBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [capacity, setCapacity] = useState(2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCapacity(getRandomCapacity());

    const handleScroll = () => {
      // Show after scrolling past hero, hide near the order form
      const orderForm = document.getElementById("megrendeles");
      const orderFormTop = orderForm?.getBoundingClientRect().top || Infinity;

      setIsVisible(window.scrollY > 600 && orderFormTop > 500);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("megrendeles")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-petrol-100 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Price and capacity */}
          <div>
            <div className="font-bold text-petrol-800">9 400 Ft</div>
            {mounted && capacity > 0 && (
              <div className="text-xs text-petrol-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                Ma még {capacity} hely
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button onClick={scrollToForm} className="btn-primary flex-1 max-w-[200px]">
            Megrendelem
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Safe area padding for notched phones */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </motion.div>
  );
}
