import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft off-white background
        cream: {
          50: "#FEFDFB",
          100: "#FAF9F7",
          200: "#F5F3F0",
        },
        // Deep blue / indigo / petrol primary
        petrol: {
          50: "#EEF4F7",
          100: "#D5E4EB",
          200: "#A8C9D6",
          300: "#7AADC0",
          400: "#4D92AA",
          500: "#1E5F74",
          600: "#184D5E",
          700: "#133B48",
          800: "#0D2932",
          900: "#08171C",
        },
        // Subtle teal/green accent for confirmations
        teal: {
          50: "#EFFCF6",
          100: "#D1F7E7",
          200: "#A7EFD1",
          300: "#6CE4B3",
          400: "#3DD196",
          500: "#14B876",
          600: "#0D9460",
          700: "#0B7049",
          800: "#094C32",
          900: "#05281A",
        },
        // Warm yellow/lime accent for CTA emphasis
        lime: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
