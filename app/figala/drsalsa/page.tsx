"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* =======================================================================
   Dr. Salsa – Kezdő kurzus landing page
   Route: /figala/drsalsa

   Strategic decisions:
   - Goal: Lead gen → free trial class signup for Feb 2 beginner course
   - Persona: 25-40 yr old professionals wanting a fun social hobby
   - Tone: Warm, confident, Latin energy — not cheesy
   - Objections addressed: "no partner needed", "no experience needed",
     "satisfaction guarantee", "real dance studio"
   - Languages: HU + EN (language toggle top-right)
   - Colors: Deep burgundy/wine (#6B1D3A), warm coral (#E85D4A),
     gold accent (#D4A547), cream (#FAF5F0), charcoal text (#1A1A1A)
   - Design: Organic, flowing curves — reflects dance movement
   ======================================================================= */

// ── i18n content ──────────────────────────────────────────────────────
type Lang = "hu" | "en";

const t = {
  hu: {
    nav: { cta: "Jelentkezem" },
    hero: {
      badge: "Kezdő kurzus indul: 2025. február 2.",
      h1_1: "Táncolni bárki",
      h1_2: "megtanulhat.",
      sub: "Salsa · Bachata · Kizomba — páros táncok, amelyek mosolyt csempésznek a hétköznapokba. Gyere el az ingyenes bemutatóórára, és döntsd el magad!",
      cta: "Ingyenes bemutatóóra",
      trust: "Nem kell partner. Nem kell tapasztalat.",
    },
    problem: {
      label: "Ismerős?",
      h2: "A hétköznapokból hiányzik valami.",
      items: [
        {
          icon: "couch",
          title: "Unalmas esték",
          text: "Munka után Netflix, aztán alvás. Hétről hétre ugyanaz a rutin.",
        },
        {
          icon: "people",
          title: "Kevés új élmény",
          text: "Szeretnél új embereket megismerni egy jó közösségben, de nem tudod, hol kezdd.",
        },
        {
          icon: "body",
          title: "Mozgás kellene",
          text: "Az edzőterem nem a te világod, de valami aktívabbra vágysz.",
        },
      ],
    },
    solution: {
      label: "A válasz",
      h2: "A tánc nem cél — hanem út.",
      text: "A Dr. Salsa-nál nem táncos akarsz lenni. Hanem valaki, aki jól érzi magát, mozog, nevet, és olyan emberekkel van körülvéve, akik ugyanezt keresik. A tánctudás csak ráadás.",
      highlight: "Két oktatóval dolgozunk, akik a pár mindkét felét értik.",
    },
    benefits: {
      label: "Miért mi?",
      h2: "Ami minket megkülönböztet.",
      items: [
        {
          icon: "duo",
          title: "Párban oktatunk",
          text: "Minden órán két oktató van jelen — egyikük vezet, másikuk követ. Így mindkét fél kap figyelmet.",
        },
        {
          icon: "guarantee",
          title: "100% elégedettségi garancia",
          text: "Ha az első óra után úgy érzed, ez nem neked való, visszaadjuk az árát. Kérdés nélkül.",
        },
        {
          icon: "studio",
          title: "Valódi táncterem",
          text: "Nem egy pince, nem egy tornaterem. Professzionális tánctér, tükrökkel és hangrendszerrel.",
        },
        {
          icon: "experience",
          title: "10+ év tapasztalat",
          text: "Több ezer táncos indult el nálunk a nulláról. Tudjuk, mi működik kezdőknek.",
        },
        {
          icon: "party",
          title: "Heti rendszeres bulik",
          text: "Nemcsak tanulsz — gyakorolsz is. Heti social dance esteken próbálhatod ki, amit tanultál.",
        },
      ],
    },
    social: {
      label: "Tapasztalatok",
      h2: "Ők is nulláról indultak.",
      items: [
        {
          name: "Petra",
          text: "Egyedül jöttem, partner nélkül. Fél év múlva már a heti buli a hét fénypontja. A legjobb döntésem volt!",
        },
        {
          name: "Gábor",
          text: "Mindig azt hittem, nincs ritmusérzékem. A srácok bebizonyították, hogy tényleg bárki megtanulhat táncolni.",
        },
        {
          name: "Anna & Dávid",
          text: "Párként kerestünk közös hobbi-t. Most már a barátainkat is magunkkal hozzuk a social-okra.",
        },
      ],
    },
    offer: {
      label: "Az ajánlat",
      h2: "Ingyenes bemutatóóra.",
      text: "Gyere el február 2-án, és próbáld ki kötelezettség nélkül. Nem kell hoznod partnert, nem kell táncos múlt — csak nyitottság.",
      cta: "Jelentkezem az ingyenes órára",
      details: [
        "Következő indulás: február 2.",
        "Partner nélkül is jöhetsz",
        "Kényelmes ruha + zárt cipő elég",
      ],
    },
    faq: {
      label: "Kérdések",
      h2: "Gyakori kérdések",
      items: [
        {
          q: "Tényleg nem kell partner?",
          a: "Nem. A csoportban mindenki cserélődik, így egyedül is könnyedén beilleszkedsz. Sok páros épp az órákon talált egymásra.",
        },
        {
          q: "Soha nem táncoltam — megoldom?",
          a: "Épp ezért van a kezdő kurzus. Nulláról indulunk, lépésről lépésre. Nincs előfeltétel.",
        },
        {
          q: "Mi a különbség a salsa, bachata és kizomba között?",
          a: "A salsa energikus és játékos, a bachata érzéki és dallamos, a kizomba lassú és kapcsolódó. A bemutatóórán mindháromba belekóstolhatsz.",
        },
        {
          q: "Mit vegyek fel?",
          a: "Kényelmes, mozgásra alkalmas ruhát és zárt, sima talpú cipőt. Semmi extra nem kell.",
        },
        {
          q: "Mennyibe kerül a kurzus?",
          a: "A bemutatóóra ingyenes. A kurzus áráról az első órán adunk részletes tájékoztatást.",
        },
      ],
    },
    finalCta: {
      h2: "Február 2-án kezdődik a következő fejezet.",
      sub: "Egy ingyenes óra. Semmi kockázat. Csak tánc, zene és jó energia.",
      cta: "Jelentkezem",
    },
    footer: {
      copy: "Dr. Salsa Tánciskola",
      made: "B R I L L C O D E  web productions.",
    },
  },
  en: {
    nav: { cta: "Sign up" },
    hero: {
      badge: "Beginner course starts: February 2, 2025",
      h1_1: "Anyone can learn",
      h1_2: "to dance.",
      sub: "Salsa · Bachata · Kizomba — partner dances that bring joy to everyday life. Come to a free trial class and see for yourself!",
      cta: "Free trial class",
      trust: "No partner needed. No experience required.",
    },
    problem: {
      label: "Sound familiar?",
      h2: "Something's missing from your routine.",
      items: [
        {
          icon: "couch",
          title: "Boring evenings",
          text: "After work it's Netflix, then sleep. Same routine every single week.",
        },
        {
          icon: "people",
          title: "Few new experiences",
          text: "You'd love to meet new people in a great community, but don't know where to start.",
        },
        {
          icon: "body",
          title: "Need to move",
          text: "The gym isn't your thing, but you want something more active.",
        },
      ],
    },
    solution: {
      label: "The answer",
      h2: "Dance isn't the destination — it's the journey.",
      text: "At Dr. Salsa, you're not trying to become a dancer. You're becoming someone who feels good, moves, laughs, and is surrounded by people who want the same. The dance skills are just a bonus.",
      highlight:
        "We teach in pairs — one instructor leads, one follows. Both sides get real attention.",
    },
    benefits: {
      label: "Why us?",
      h2: "What sets us apart.",
      items: [
        {
          icon: "duo",
          title: "Pair teaching",
          text: "Every class has two instructors — one leads, one follows. Both sides get proper attention.",
        },
        {
          icon: "guarantee",
          title: "100% satisfaction guarantee",
          text: "If you feel it's not for you after the first class, we refund you. No questions asked.",
        },
        {
          icon: "studio",
          title: "Real dance studio",
          text: "Not a basement, not a gym. A professional dance floor with mirrors and sound system.",
        },
        {
          icon: "experience",
          title: "10+ years of experience",
          text: "Thousands of dancers started from zero with us. We know what works for beginners.",
        },
        {
          icon: "party",
          title: "Weekly social dances",
          text: "You don't just learn — you practice. Weekly social dance nights to try what you've learned.",
        },
      ],
    },
    social: {
      label: "Experiences",
      h2: "They all started from zero.",
      items: [
        {
          name: "Petra",
          text: "I came alone, without a partner. Six months later, the weekly social is the highlight of my week!",
        },
        {
          name: "Gábor",
          text: "I always thought I had no rhythm. The guys proved that anyone really can learn to dance.",
        },
        {
          name: "Anna & Dávid",
          text: "We were looking for a shared hobby as a couple. Now we bring our friends to the socials too.",
        },
      ],
    },
    offer: {
      label: "The offer",
      h2: "Free trial class.",
      text: "Come on February 2nd and try it with zero commitment. No partner needed, no dance background — just openness.",
      cta: "Sign up for the free class",
      details: [
        "Next start: February 2",
        "Come with or without a partner",
        "Comfortable clothes + closed shoes is enough",
      ],
    },
    faq: {
      label: "Questions",
      h2: "Frequently asked questions",
      items: [
        {
          q: "Do I really not need a partner?",
          a: "No. Everyone rotates in the group, so you'll easily fit in alone. Many couples actually met during classes.",
        },
        {
          q: "I've never danced — can I handle it?",
          a: "That's exactly what the beginner course is for. We start from scratch, step by step. No prerequisites.",
        },
        {
          q: "What's the difference between salsa, bachata and kizomba?",
          a: "Salsa is energetic and playful, bachata is sensual and melodic, kizomba is slow and connected. You can try all three at the trial class.",
        },
        {
          q: "What should I wear?",
          a: "Comfortable clothes suitable for movement and closed, smooth-soled shoes. Nothing fancy needed.",
        },
        {
          q: "How much does the course cost?",
          a: "The trial class is free. We'll give you detailed pricing info at the first session.",
        },
      ],
    },
    finalCta: {
      h2: "The next chapter starts February 2nd.",
      sub: "One free class. No risk. Just dance, music and good energy.",
      cta: "Sign up",
    },
    footer: {
      copy: "Dr. Salsa Dance School",
      made: "B R I L L C O D E  web productions.",
    },
  },
};

// ── Scroll-reveal hook ────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Icons (inline SVG) ───────────────────────────────────────────────
function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const s = { width: size, height: size };
  switch (name) {
    case "couch":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11V7a2 2 0 012-2h12a2 2 0 012 2v4" />
          <path d="M2 11v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-4 0H6a2 2 0 00-4 0z" />
          <path d="M6 19v2M18 19v2" />
        </svg>
      );
    case "people":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "body":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V6a2 2 0 00-2-2H8a2 2 0 00-2 2v14" />
          <path d="M2 20h20" />
          <path d="M14 12l-4-4M10 12l4-4" />
        </svg>
      );
    case "duo":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="7" r="3" />
          <circle cx="15" cy="7" r="3" />
          <path d="M5 21v-2a4 4 0 014-4h0" />
          <path d="M19 21v-2a4 4 0 00-4-4h0" />
          <path d="M12 15v6" />
        </svg>
      );
    case "guarantee":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "studio":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      );
    case "experience":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "party":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "check":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    default:
      return null;
  }
}

// ── Main page component ──────────────────────────────────────────────
export default function DrSalsaPage() {
  const [lang, setLang] = useState<Lang>("hu");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const c = t[lang];

  // Color palette
  const burgundy = "#6B1D3A";
  const coral = "#E85D4A";
  const gold = "#D4A547";
  const cream = "#FAF5F0";
  const charcoal = "#1A1A1A";
  const warmGray = "#8A7E76";

  const scrollToCta = useCallback(() => {
    document.getElementById("ds-offer")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ── Reveal refs ──
  const heroReveal = useReveal(0.1);
  const problemReveal = useReveal();
  const solutionReveal = useReveal();
  const benefitsReveal = useReveal();
  const socialReveal = useReveal();
  const offerReveal = useReveal();
  const faqReveal = useReveal();
  const finalReveal = useReveal();

  const fadeUp = (visible: boolean, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      {/* Global style overrides — isolated from BrillCode main */}
      <style>{`
        body { background: ${cream} !important; }

        .ds-page * { box-sizing: border-box; }
        .ds-page { font-family: 'Inter', system-ui, -apple-system, sans-serif; color: ${charcoal}; }

        /* Organic wave divider */
        .ds-wave {
          position: relative;
          overflow: hidden;
        }
        .ds-wave::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 80px;
          background: ${cream};
          clip-path: ellipse(55% 100% at 50% 100%);
        }

        /* Smooth button hover */
        .ds-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          letter-spacing: 0.02em;
        }
        .ds-btn-primary {
          background: ${coral};
          color: #fff;
        }
        .ds-btn-primary:hover {
          background: #D14E3D;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(232,93,74,0.35);
        }
        .ds-btn-outline {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.4);
        }
        .ds-btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.1);
        }

        /* FAQ accordion */
        .ds-faq-item { border-bottom: 1px solid rgba(26,26,26,0.08); }
        .ds-faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          background: none;
          border: none;
          font-size: 17px;
          font-weight: 500;
          color: ${charcoal};
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          line-height: 1.4;
        }
        .ds-faq-a {
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
        }

        /* Testimonial card */
        .ds-testimonial {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          position: relative;
          border: 1px solid rgba(26,26,26,0.05);
        }
        .ds-testimonial::before {
          content: '"';
          position: absolute;
          top: 16px;
          left: 24px;
          font-size: 64px;
          line-height: 1;
          color: ${coral};
          opacity: 0.15;
          font-family: Georgia, serif;
        }

        /* Lang toggle */
        .ds-lang-btn {
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          letter-spacing: 0.04em;
        }

        /* Section label badge */
        .ds-label {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .ds-btn { padding: 14px 28px; font-size: 15px; }
          .ds-faq-q { font-size: 15px; padding: 20px 0; }
        }
      `}</style>

      <div className="ds-page">
        {/* ───── NAV ───── */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(250,245,240,0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(26,26,26,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: burgundy,
              letterSpacing: "-0.02em",
            }}
          >
            Dr. Salsa
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Language toggle */}
            <div
              style={{
                display: "flex",
                background: "rgba(26,26,26,0.05)",
                borderRadius: 100,
                padding: 3,
              }}
            >
              <button
                className="ds-lang-btn"
                onClick={() => setLang("hu")}
                style={{
                  background: lang === "hu" ? "#fff" : "transparent",
                  color: lang === "hu" ? charcoal : warmGray,
                  boxShadow:
                    lang === "hu" ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                HU
              </button>
              <button
                className="ds-lang-btn"
                onClick={() => setLang("en")}
                style={{
                  background: lang === "en" ? "#fff" : "transparent",
                  color: lang === "en" ? charcoal : warmGray,
                  boxShadow:
                    lang === "en" ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                EN
              </button>
            </div>

            <button className="ds-btn ds-btn-primary" onClick={scrollToCta} style={{ padding: "10px 24px", fontSize: 14 }}>
              {c.nav.cta}
            </button>
          </div>
        </nav>

        {/* ───── HERO ───── */}
        <section
          ref={heroReveal.ref}
          className="ds-wave"
          style={{
            background: `linear-gradient(135deg, ${burgundy} 0%, #4A1229 60%, #2D0B19 100%)`,
            paddingTop: 140,
            paddingBottom: 140,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${coral}15 0%, transparent 70%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-15%",
              left: "-8%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${gold}10 0%, transparent 70%)`,
            }}
          />

          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "0 24px",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Badge */}
            <div style={fadeUp(heroReveal.visible, 0)}>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: 100,
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  letterSpacing: "0.02em",
                }}
              >
                {c.hero.badge}
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                ...fadeUp(heroReveal.visible, 0.15),
                color: "#fff",
                fontSize: "clamp(36px, 7vw, 68px)",
                fontWeight: 800,
                lineHeight: 1.08,
                marginTop: 32,
                marginBottom: 24,
                letterSpacing: "-0.03em",
              }}
            >
              {c.hero.h1_1}
              <br />
              <span style={{ color: coral }}>{c.hero.h1_2}</span>
            </h1>

            {/* Subheading */}
            <p
              style={{
                ...fadeUp(heroReveal.visible, 0.3),
                color: "rgba(255,255,255,0.75)",
                fontSize: "clamp(16px, 2.2vw, 20px)",
                lineHeight: 1.6,
                maxWidth: 580,
                margin: "0 auto 40px",
              }}
            >
              {c.hero.sub}
            </p>

            {/* CTA */}
            <div style={fadeUp(heroReveal.visible, 0.45)}>
              <button className="ds-btn ds-btn-primary" onClick={scrollToCta} style={{ fontSize: 17, padding: "18px 44px" }}>
                {c.hero.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Trust line */}
            <p
              style={{
                ...fadeUp(heroReveal.visible, 0.6),
                color: "rgba(255,255,255,0.45)",
                fontSize: 14,
                marginTop: 24,
                letterSpacing: "0.02em",
              }}
            >
              {c.hero.trust}
            </p>
          </div>
        </section>

        {/* ───── PROBLEM ───── */}
        <section
          ref={problemReveal.ref}
          style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={fadeUp(problemReveal.visible, 0)}>
              <span className="ds-label" style={{ background: `${coral}12`, color: coral }}>
                {c.problem.label}
              </span>
            </div>
            <h2
              style={{
                ...fadeUp(problemReveal.visible, 0.1),
                fontSize: "clamp(28px, 4.5vw, 42px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {c.problem.h2}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {c.problem.items.map((item, i) => (
              <div
                key={i}
                style={{
                  ...fadeUp(problemReveal.visible, 0.2 + i * 0.1),
                  background: "#fff",
                  borderRadius: 20,
                  padding: "36px 32px",
                  border: "1px solid rgba(26,26,26,0.05)",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${burgundy}08`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: burgundy,
                    marginBottom: 20,
                  }}
                >
                  <Icon name={item.icon} />
                </div>
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: warmGray, fontSize: 15, lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── SOLUTION ───── */}
        <section
          ref={solutionReveal.ref}
          style={{
            padding: "80px 24px 100px",
            maxWidth: 780,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div style={fadeUp(solutionReveal.visible, 0)}>
            <span className="ds-label" style={{ background: `${gold}15`, color: "#9A7B2F" }}>
              {c.solution.label}
            </span>
          </div>
          <h2
            style={{
              ...fadeUp(solutionReveal.visible, 0.1),
              fontSize: "clamp(28px, 4.5vw, 42px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 28,
            }}
          >
            {c.solution.h2}
          </h2>
          <p
            style={{
              ...fadeUp(solutionReveal.visible, 0.2),
              fontSize: 18,
              lineHeight: 1.7,
              color: warmGray,
              marginBottom: 36,
            }}
          >
            {c.solution.text}
          </p>
          <div
            style={{
              ...fadeUp(solutionReveal.visible, 0.3),
              background: `linear-gradient(135deg, ${burgundy}06, ${coral}08)`,
              borderRadius: 16,
              padding: "28px 32px",
              borderLeft: `4px solid ${coral}`,
              textAlign: "left",
              fontSize: 16,
              lineHeight: 1.6,
              fontWeight: 500,
              color: charcoal,
            }}
          >
            {c.solution.highlight}
          </div>
        </section>

        {/* ───── BENEFITS ───── */}
        <section
          ref={benefitsReveal.ref}
          style={{
            padding: "80px 24px 100px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={fadeUp(benefitsReveal.visible, 0)}>
              <span className="ds-label" style={{ background: `${burgundy}08`, color: burgundy }}>
                {c.benefits.label}
              </span>
            </div>
            <h2
              style={{
                ...fadeUp(benefitsReveal.visible, 0.1),
                fontSize: "clamp(28px, 4.5vw, 42px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {c.benefits.h2}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {c.benefits.items.map((item, i) => (
              <div
                key={i}
                style={{
                  ...fadeUp(benefitsReveal.visible, 0.15 + i * 0.08),
                  background: "#fff",
                  borderRadius: 20,
                  padding: "32px 28px",
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  border: "1px solid rgba(26,26,26,0.05)",
                }}
              >
                <div
                  style={{
                    minWidth: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${coral}12, ${burgundy}08)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: coral,
                  }}
                >
                  <Icon name={item.icon} size={24} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 6,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: warmGray,
                      fontSize: 15,
                      lineHeight: 1.55,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───── SOCIAL PROOF ───── */}
        <section
          ref={socialReveal.ref}
          style={{
            padding: "80px 24px 100px",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={fadeUp(socialReveal.visible, 0)}>
              <span className="ds-label" style={{ background: `${gold}15`, color: "#9A7B2F" }}>
                {c.social.label}
              </span>
            </div>
            <h2
              style={{
                ...fadeUp(socialReveal.visible, 0.1),
                fontSize: "clamp(28px, 4.5vw, 42px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {c.social.h2}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {c.social.items.map((item, i) => (
              <div
                key={i}
                className="ds-testimonial"
                style={fadeUp(socialReveal.visible, 0.2 + i * 0.1)}
              >
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: charcoal,
                    marginBottom: 20,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item.text}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Avatar placeholder — initials */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${burgundy}, ${coral})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {item.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───── OFFER ───── */}
        <section
          id="ds-offer"
          ref={offerReveal.ref}
          style={{
            padding: "100px 24px",
            background: `linear-gradient(135deg, ${burgundy} 0%, #4A1229 100%)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${coral}10 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 680,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div style={fadeUp(offerReveal.visible, 0)}>
              <span
                className="ds-label"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {c.offer.label}
              </span>
            </div>
            <h2
              style={{
                ...fadeUp(offerReveal.visible, 0.1),
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              {c.offer.h2}
            </h2>
            <p
              style={{
                ...fadeUp(offerReveal.visible, 0.2),
                color: "rgba(255,255,255,0.7)",
                fontSize: 18,
                lineHeight: 1.6,
                marginBottom: 36,
              }}
            >
              {c.offer.text}
            </p>

            {/* Details */}
            <div
              style={{
                ...fadeUp(offerReveal.visible, 0.3),
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 16,
                marginBottom: 44,
              }}
            >
              {c.offer.details.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  <span style={{ color: gold }}>
                    <Icon name="check" size={18} />
                  </span>
                  {d}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={fadeUp(offerReveal.visible, 0.4)}>
              {/* Dev note: Replace href with actual signup link / form */}
              <a
                href="https://drsalsa.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn ds-btn-primary"
                style={{
                  fontSize: 17,
                  padding: "18px 44px",
                  background: coral,
                }}
              >
                {c.offer.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section
          ref={faqReveal.ref}
          style={{ padding: "100px 24px", maxWidth: 720, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div style={fadeUp(faqReveal.visible, 0)}>
              <span className="ds-label" style={{ background: `${burgundy}08`, color: burgundy }}>
                {c.faq.label}
              </span>
            </div>
            <h2
              style={{
                ...fadeUp(faqReveal.visible, 0.1),
                fontSize: "clamp(28px, 4.5vw, 38px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {c.faq.h2}
            </h2>
          </div>

          <div style={fadeUp(faqReveal.visible, 0.2)}>
            {c.faq.items.map((item, i) => (
              <div key={i} className="ds-faq-item">
                <button
                  className="ds-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background:
                        openFaq === i ? `${coral}12` : "rgba(26,26,26,0.04)",
                      color: openFaq === i ? coral : warmGray,
                      transition: "all 0.3s",
                      flexShrink: 0,
                      marginLeft: 16,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      style={{
                        transform:
                          openFaq === i ? "rotate(45deg)" : "rotate(0)",
                        transition: "transform 0.3s",
                      }}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="ds-faq-a"
                  style={{
                    maxHeight: openFaq === i ? 200 : 0,
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <p
                    style={{
                      color: warmGray,
                      fontSize: 15,
                      lineHeight: 1.65,
                      paddingBottom: 24,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section
          ref={finalReveal.ref}
          style={{
            padding: "100px 24px",
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              ...fadeUp(finalReveal.visible, 0),
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            {c.finalCta.h2}
          </h2>
          <p
            style={{
              ...fadeUp(finalReveal.visible, 0.1),
              color: warmGray,
              fontSize: 18,
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            {c.finalCta.sub}
          </p>
          <div style={fadeUp(finalReveal.visible, 0.2)}>
            <button
              className="ds-btn ds-btn-primary"
              onClick={scrollToCta}
              style={{ fontSize: 17, padding: "18px 44px" }}
            >
              {c.finalCta.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* ───── FOOTER ───── */}
        <footer
          style={{
            padding: "40px 24px",
            borderTop: "1px solid rgba(26,26,26,0.06)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: warmGray,
              marginBottom: 12,
            }}
          >
            {c.footer.copy}
          </p>
          <a
            href="https://brillcode.hu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              color: "rgba(138,126,118,0.5)",
              textDecoration: "none",
              letterSpacing: "0.18em",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(138,126,118,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(138,126,118,0.5)")
            }
          >
            {c.footer.made}
          </a>
        </footer>
      </div>
    </>
  );
}
