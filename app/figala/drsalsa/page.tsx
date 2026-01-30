"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* =======================================================================
   Dr. Salsa – Kezdő kurzus landing V2
   Route: /figala/drsalsa

   Design: Dark, cinematic, Latin nightlife energy.
   Full-screen hero, gradient text, glassmorphism cards, bento grid,
   animated number counters, bold asymmetric layouts.
   ======================================================================= */

type Lang = "hu" | "en";

const t = {
  hu: {
    nav: { cta: "Jelentkezem" },
    hero: {
      dateLabel: "KURZUSINDULÁS",
      dateDay: "FEB 02",
      dateYear: "2025",
      h1_1: "Érezd a",
      h1_2: "ritmust.",
      sub: "Salsa · Bachata · Kizomba",
      desc: "Páros táncok, amelyek mosolyt csempésznek a hétköznapokba. Próbáld ki ingyen — partner és tapasztalat nélkül.",
      cta: "Ingyenes bemutatóóra",
      scroll: "Görgess tovább",
    },
    urgency: {
      pre: "A kezdő kurzus",
      date: "február 2-án",
      post: "indul.",
      spots: "Korlátozott létszám — ne maradj le.",
      cta: "Foglald le a helyed",
    },
    styles: {
      label: "Három tánc. Egy hely.",
      items: [
        {
          name: "Salsa",
          vibe: "Energikus · Játékos · Szabad",
          desc: "A salsa a tánc legéletvidámabb formája. Gyors fordulatok, improvizáció és végtelen jókedv.",
        },
        {
          name: "Bachata",
          vibe: "Érzéki · Dallamos · Intim",
          desc: "Lassabb, közelibb, érzelmesebb. A bachata megtanít vezetni és követni — és közben elengedni.",
        },
        {
          name: "Kizomba",
          vibe: "Lassú · Kapcsolódó · Mély",
          desc: "A legszorosabb páros tánc. Minimális lépések, maximális kapcsolódás. Meditáció mozgásban.",
        },
      ],
    },
    problem: {
      h2: "Ismerős ez?",
      items: [
        "Munka után Netflix, aztán alvás. Hétről hétre.",
        "Szeretnél új embereket, de nem tudod, hol kezdd.",
        "Az edzőterem nem a te világod.",
        "Érzed, hogy valami hiányzik a hétköznapokból.",
      ],
      answer: "A tánc nem hobbi. Hanem egy életérzés.",
    },
    stats: [
      { value: 10, suffix: "+", label: "év tapasztalat" },
      { value: 2000, suffix: "+", label: "táncos indult nálunk" },
      { value: 100, suffix: "%", label: "elégedettségi garancia" },
      { value: 52, suffix: "", label: "buli évente" },
    ],
    benefits: {
      label: "Miért a Dr. Salsa?",
      items: [
        {
          title: "Párban oktatunk",
          text: "Két oktató — egyikük vezet, másikuk követ. Mindkét fél kap figyelmet.",
          size: "large",
        },
        {
          title: "Valódi táncterem",
          text: "Profi tánctér, tükrök, hangrendszer. Nem pince, nem tornaterem.",
          size: "small",
        },
        {
          title: "Heti bulik",
          text: "Amit tanulsz, rögtön gyakorlod. Social dance estek minden héten.",
          size: "small",
        },
        {
          title: "100% garancia",
          text: "Ha az első óra után nem tetszett? Visszaadjuk az árát. Kérdés nélkül.",
          size: "large",
        },
      ],
    },
    offer: {
      h2: "Gyere el. Ingyen.",
      sub: "Február 2-án indul a következő kezdő kurzus. Az első óra a miénk — neked csak nyitottnak kell lenned.",
      details: [
        "Partner nélkül is jöhetsz",
        "Kényelmes ruha + zárt cipő elég",
        "Mindenkit szívesen látunk",
      ],
      cta: "Jelentkezem az ingyenes órára",
    },
    faq: {
      h2: "Kérdések & válaszok",
      items: [
        {
          q: "Tényleg nem kell partner?",
          a: "Nem. Mindenki cserélődik a csoportban, így egyedül is könnyedén beilleszkedsz.",
        },
        {
          q: "Soha nem táncoltam — megoldom?",
          a: "Épp ezért van a kezdő kurzus. Nulláról indulunk, lépésről lépésre.",
        },
        {
          q: "Mi a különbség a három tánc között?",
          a: "A salsa energikus, a bachata érzéki, a kizomba lassú és mély. A bemutatóórán mindháromba belekóstolsz.",
        },
        {
          q: "Mit vegyek fel?",
          a: "Kényelmes ruhát és zárt, sima talpú cipőt. Semmi extra nem kell.",
        },
        {
          q: "Mennyibe kerül?",
          a: "A bemutatóóra ingyenes. A kurzus áráról az első órán kapsz részletes tájékoztatást.",
        },
      ],
    },
    finalCta: {
      h2: "A következő fejezeted február 2-án kezdődik.",
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
      dateLabel: "COURSE STARTS",
      dateDay: "FEB 02",
      dateYear: "2025",
      h1_1: "Feel the",
      h1_2: "rhythm.",
      sub: "Salsa · Bachata · Kizomba",
      desc: "Partner dances that bring joy to everyday life. Try it for free — no partner or experience needed.",
      cta: "Free trial class",
      scroll: "Scroll down",
    },
    urgency: {
      pre: "The beginner course",
      date: "starts February 2nd.",
      post: "",
      spots: "Limited spots — don't miss out.",
      cta: "Reserve your spot",
    },
    styles: {
      label: "Three dances. One place.",
      items: [
        {
          name: "Salsa",
          vibe: "Energetic · Playful · Free",
          desc: "The most joyful form of dance. Quick turns, improvisation and endless fun.",
        },
        {
          name: "Bachata",
          vibe: "Sensual · Melodic · Intimate",
          desc: "Slower, closer, more emotional. Bachata teaches you to lead, follow — and let go.",
        },
        {
          name: "Kizomba",
          vibe: "Slow · Connected · Deep",
          desc: "The closest partner dance. Minimal steps, maximum connection. Meditation in motion.",
        },
      ],
    },
    problem: {
      h2: "Sound familiar?",
      items: [
        "After work it's Netflix, then sleep. Every single week.",
        "You'd love to meet new people, but don't know where to start.",
        "The gym isn't your thing.",
        "You feel like something's missing from your days.",
      ],
      answer: "Dance isn't a hobby. It's a way of life.",
    },
    stats: [
      { value: 10, suffix: "+", label: "years of experience" },
      { value: 2000, suffix: "+", label: "dancers started with us" },
      { value: 100, suffix: "%", label: "satisfaction guarantee" },
      { value: 52, suffix: "", label: "parties per year" },
    ],
    benefits: {
      label: "Why Dr. Salsa?",
      items: [
        {
          title: "Pair teaching",
          text: "Two instructors — one leads, one follows. Both sides get real attention.",
          size: "large",
        },
        {
          title: "Real dance studio",
          text: "Professional dance floor, mirrors, sound system. Not a basement.",
          size: "small",
        },
        {
          title: "Weekly socials",
          text: "Practice what you learn. Social dance nights every single week.",
          size: "small",
        },
        {
          title: "100% guarantee",
          text: "If you didn't enjoy the first class? Full refund. No questions asked.",
          size: "large",
        },
      ],
    },
    offer: {
      h2: "Come. It's free.",
      sub: "The next beginner course starts February 2nd. The first class is on us — you just need to show up.",
      details: [
        "Come with or without a partner",
        "Comfortable clothes + closed shoes",
        "Everyone is welcome",
      ],
      cta: "Sign up for the free class",
    },
    faq: {
      h2: "Questions & answers",
      items: [
        {
          q: "Do I really not need a partner?",
          a: "No. Everyone rotates in the group, so you'll easily fit in alone.",
        },
        {
          q: "I've never danced — can I handle it?",
          a: "That's exactly what the beginner course is for. We start from scratch.",
        },
        {
          q: "What's the difference between the three dances?",
          a: "Salsa is energetic, bachata is sensual, kizomba is slow and deep. You can try all three at the trial.",
        },
        {
          q: "What should I wear?",
          a: "Comfortable clothes and closed, smooth-soled shoes. Nothing fancy.",
        },
        {
          q: "How much does it cost?",
          a: "The trial class is free. We'll share pricing details at the first session.",
        },
      ],
    },
    finalCta: {
      h2: "Your next chapter starts February 2nd.",
      sub: "One free class. No risk. Just dance, music and good energy.",
      cta: "Sign up",
    },
    footer: {
      copy: "Dr. Salsa Dance School",
      made: "B R I L L C O D E  web productions.",
    },
  },
};

// ── Hooks ─────────────────────────────────────────────────────────────
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

function useCounter(end: number, visible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return count;
}

// ── Main ──────────────────────────────────────────────────────────────
export default function DrSalsaPage() {
  const [lang, setLang] = useState<Lang>("hu");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navSolid, setNavSolid] = useState(false);
  const c = t[lang];

  useEffect(() => {
    const handler = () => setNavSolid(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToCta = useCallback(() => {
    document.getElementById("ds-offer")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const heroR = useReveal(0.05);
  const stylesR = useReveal(0.1);
  const problemR = useReveal(0.1);
  const statsR = useReveal(0.15);
  const benefitsR = useReveal(0.1);
  const offerR = useReveal(0.1);
  const faqR = useReveal(0.1);
  const finalR = useReveal(0.1);

  const fade = (v: boolean, d = 0) => ({
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(40px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  return (
    <>
      <style>{`
        body{background:#0A0A0A !important;margin:0}
        *,*::before,*::after{box-sizing:border-box}
        .ds{font-family:'Inter',system-ui,-apple-system,sans-serif;color:#fff;overflow-x:hidden}
        .ds a{color:inherit}

        /* Animated gradient orb */
        @keyframes ds-float{
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(30px,-20px) scale(1.05)}
          66%{transform:translate(-20px,15px) scale(0.95)}
        }
        @keyframes ds-pulse{
          0%,100%{opacity:0.4}
          50%{opacity:0.7}
        }
        @keyframes ds-gradient{
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @keyframes ds-shimmer{
          0%{transform:translateX(-100%)}
          100%{transform:translateX(100%)}
        }

        .ds-orb{
          position:absolute;border-radius:50%;
          filter:blur(80px);pointer-events:none;
          animation:ds-float 8s ease-in-out infinite;
        }

        /* Glass card */
        .ds-glass{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          backdrop-filter:blur(20px);
          -webkit-backdrop-filter:blur(20px);
          border-radius:24px;
          transition:all 0.4s ease;
        }
        .ds-glass:hover{
          background:rgba(255,255,255,0.07);
          border-color:rgba(255,255,255,0.15);
          transform:translateY(-4px);
        }

        /* Gradient text */
        .ds-grad-text{
          background:linear-gradient(135deg,#E85D4A 0%,#FF8A6B 30%,#D4A547 60%,#E85D4A 100%);
          background-size:200% 200%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:ds-gradient 4s ease infinite;
        }

        /* CTA button */
        .ds-cta{
          display:inline-flex;align-items:center;gap:10px;
          padding:18px 44px;font-size:17px;font-weight:700;
          border:none;border-radius:100px;cursor:pointer;
          background:linear-gradient(135deg,#E85D4A,#D14030);
          color:#fff;text-decoration:none;
          transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
          position:relative;overflow:hidden;
          font-family:inherit;letter-spacing:0.01em;
        }
        .ds-cta::after{
          content:'';position:absolute;top:0;left:0;
          width:100%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
          animation:ds-shimmer 3s ease-in-out infinite;
        }
        .ds-cta:hover{
          transform:translateY(-3px);
          box-shadow:0 12px 40px rgba(232,93,74,0.4);
        }

        /* FAQ */
        .ds-faq-btn{
          width:100%;display:flex;align-items:center;justify-content:space-between;
          padding:28px 0;background:none;border:none;
          font-size:18px;font-weight:600;color:#fff;
          cursor:pointer;text-align:left;font-family:inherit;
          border-bottom:1px solid rgba(255,255,255,0.06);
          transition:color 0.3s;
        }
        .ds-faq-btn:hover{color:#E85D4A}

        /* Lang toggle */
        .ds-lang{
          padding:6px 14px;font-size:12px;font-weight:700;
          border:none;border-radius:100px;cursor:pointer;
          font-family:inherit;letter-spacing:0.06em;
          transition:all 0.2s;
        }

        /* Number counter glow */
        .ds-stat-num{
          font-size:clamp(36px,6vw,56px);
          font-weight:900;letter-spacing:-0.03em;
          line-height:1;
        }

        /* Dance style card hover gradient border */
        .ds-dance-card{
          position:relative;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:28px;
          padding:44px 36px;
          transition:all 0.5s cubic-bezier(0.16,1,0.3,1);
          overflow:hidden;
        }
        .ds-dance-card::before{
          content:'';position:absolute;inset:-1px;
          border-radius:28px;padding:1px;
          background:linear-gradient(135deg,transparent,rgba(232,93,74,0.3),transparent);
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;
          opacity:0;transition:opacity 0.5s;
        }
        .ds-dance-card:hover::before{opacity:1}
        .ds-dance-card:hover{
          background:rgba(255,255,255,0.06);
          transform:translateY(-8px);
        }

        @media(max-width:768px){
          .ds-cta{padding:16px 32px;font-size:15px}
          .ds-faq-btn{font-size:16px;padding:22px 0}
          .ds-dance-card{padding:32px 24px}
        }
      `}</style>

      <div className="ds">
        {/* ─── NAV ─── */}
        <nav style={{
          position:"fixed",top:0,left:0,right:0,zIndex:100,
          padding:"14px 24px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          background:navSolid?"rgba(10,10,10,0.9)":"transparent",
          backdropFilter:navSolid?"blur(16px)":"none",
          borderBottom:navSolid?"1px solid rgba(255,255,255,0.06)":"none",
          transition:"all 0.4s ease",
        }}>
          <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em"}}>
            <span style={{color:"#E85D4A"}}>Dr.</span>{" "}Salsa
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{display:"flex",background:"rgba(255,255,255,0.06)",borderRadius:100,padding:3}}>
              <button className="ds-lang" onClick={()=>setLang("hu")}
                style={{background:lang==="hu"?"rgba(255,255,255,0.12)":"transparent",color:lang==="hu"?"#fff":"rgba(255,255,255,0.4)"}}>
                HU
              </button>
              <button className="ds-lang" onClick={()=>setLang("en")}
                style={{background:lang==="en"?"rgba(255,255,255,0.12)":"transparent",color:lang==="en"?"#fff":"rgba(255,255,255,0.4)"}}>
                EN
              </button>
            </div>
            <button className="ds-cta" onClick={scrollToCta}
              style={{padding:"10px 24px",fontSize:13}}>{c.nav.cta}</button>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <section ref={heroR.ref} style={{
          minHeight:"100vh",display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",
          position:"relative",overflow:"hidden",
          padding:"120px 24px 80px",
        }}>
          {/* Orbs */}
          <div className="ds-orb" style={{width:600,height:600,top:"-15%",right:"-10%",background:"radial-gradient(circle,rgba(232,93,74,0.2),transparent 70%)"}} />
          <div className="ds-orb" style={{width:500,height:500,bottom:"-10%",left:"-12%",background:"radial-gradient(circle,rgba(212,165,71,0.12),transparent 70%)",animationDelay:"-3s"}} />
          <div className="ds-orb" style={{width:300,height:300,top:"40%",left:"50%",background:"radial-gradient(circle,rgba(232,93,74,0.08),transparent 70%)",animationDelay:"-5s"}} />

          {/* Subtle grid pattern */}
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:"linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize:"80px 80px",
            pointerEvents:"none",
          }}/>

          <div style={{position:"relative",zIndex:2,textAlign:"center",maxWidth:900}}>
            {/* Date display — prominent */}
            <div style={fade(heroR.visible,0)}>
              <div style={{
                display:"inline-flex",alignItems:"center",gap:0,
                background:"rgba(232,93,74,0.06)",
                border:"1px solid rgba(232,93,74,0.15)",
                borderRadius:20,overflow:"hidden",
              }}>
                <div style={{
                  background:"linear-gradient(135deg,#E85D4A,#D14030)",
                  padding:"14px 24px",
                  display:"flex",flexDirection:"column",alignItems:"center",
                  lineHeight:1,
                }}>
                  <span style={{fontSize:10,fontWeight:800,letterSpacing:"0.15em",opacity:0.7}}>
                    {c.hero.dateLabel}
                  </span>
                  <span style={{fontSize:28,fontWeight:900,letterSpacing:"-0.02em",marginTop:4}}>
                    {c.hero.dateDay}
                  </span>
                </div>
                <div style={{padding:"12px 24px"}}>
                  <span style={{
                    fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.7)",
                    letterSpacing:"0.03em",
                  }}>
                    {c.hero.dateYear}
                  </span>
                  <span style={{
                    width:6,height:6,borderRadius:"50%",background:"#E85D4A",
                    display:"inline-block",marginLeft:10,
                    animation:"ds-pulse 2s infinite",
                    verticalAlign:"middle",
                  }}/>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 style={{
              ...fade(heroR.visible,0.15),
              fontSize:"clamp(48px,10vw,110px)",
              fontWeight:900,lineHeight:0.95,
              marginTop:40,marginBottom:32,
              letterSpacing:"-0.04em",
            }}>
              {c.hero.h1_1}<br/>
              <span className="ds-grad-text">{c.hero.h1_2}</span>
            </h1>

            {/* Dance styles */}
            <p style={{
              ...fade(heroR.visible,0.3),
              fontSize:"clamp(14px,2vw,18px)",
              fontWeight:600,letterSpacing:"0.25em",
              textTransform:"uppercase",
              color:"rgba(255,255,255,0.35)",
              marginBottom:24,
            }}>
              {c.hero.sub}
            </p>

            {/* Desc */}
            <p style={{
              ...fade(heroR.visible,0.4),
              fontSize:"clamp(16px,2vw,20px)",
              color:"rgba(255,255,255,0.55)",
              lineHeight:1.6,maxWidth:560,
              margin:"0 auto 48px",
            }}>
              {c.hero.desc}
            </p>

            {/* CTA */}
            <div style={fade(heroR.visible,0.55)}>
              <button className="ds-cta" onClick={scrollToCta}>
                {c.hero.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            ...fade(heroR.visible,0.8),
            position:"absolute",bottom:40,
            display:"flex",flexDirection:"column",alignItems:"center",gap:12,
          }}>
            <span style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)"}}>
              {c.hero.scroll}
            </span>
            <div style={{
              width:1,height:40,
              background:"linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
            }}/>
          </div>
        </section>

        {/* ─── DANCE STYLES ─── */}
        <section ref={stylesR.ref} style={{padding:"120px 24px",maxWidth:1200,margin:"0 auto"}}>
          <p style={{
            ...fade(stylesR.visible,0),
            textAlign:"center",fontSize:13,fontWeight:700,
            letterSpacing:"0.2em",textTransform:"uppercase",
            color:"rgba(255,255,255,0.3)",marginBottom:64,
          }}>
            {c.styles.label}
          </p>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",
            gap:20,
          }}>
            {c.styles.items.map((s, i) => (
              <div key={i} className="ds-dance-card" style={fade(stylesR.visible, 0.1 + i * 0.12)}>
                {/* Number accent */}
                <div style={{
                  position:"absolute",top:24,right:28,
                  fontSize:80,fontWeight:900,lineHeight:1,
                  color:"rgba(255,255,255,0.02)",
                  letterSpacing:"-0.04em",
                }}>
                  0{i+1}
                </div>

                <div style={{
                  fontSize:11,fontWeight:700,letterSpacing:"0.15em",
                  textTransform:"uppercase",color:"#E85D4A",
                  marginBottom:16,
                }}>
                  {s.vibe}
                </div>
                <h3 style={{
                  fontSize:"clamp(28px,4vw,40px)",fontWeight:900,
                  letterSpacing:"-0.03em",marginBottom:16,lineHeight:1.1,
                }}>
                  {s.name}
                </h3>
                <p style={{
                  fontSize:15,lineHeight:1.65,
                  color:"rgba(255,255,255,0.5)",
                }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── URGENCY DATE ─── */}
        <section style={{
          padding:"100px 24px",
          position:"relative",overflow:"hidden",
          textAlign:"center",
        }}>
          <div style={{
            position:"absolute",inset:0,
            background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,93,74,0.06), transparent)",
            pointerEvents:"none",
          }}/>
          <div style={{position:"relative",zIndex:2,maxWidth:700,margin:"0 auto"}}>
            <p style={{
              fontSize:"clamp(28px,5vw,48px)",
              fontWeight:900,letterSpacing:"-0.03em",
              lineHeight:1.15,marginBottom:20,
            }}>
              {c.urgency.pre}{" "}
              <span className="ds-grad-text" style={{
                fontSize:"clamp(36px,7vw,72px)",
                display:"block",
                lineHeight:1,
                margin:"16px 0",
              }}>
                {c.urgency.date}
              </span>
              {c.urgency.post}
            </p>
            <p style={{
              fontSize:16,color:"rgba(255,255,255,0.4)",
              marginBottom:36,letterSpacing:"0.02em",
            }}>
              {c.urgency.spots}
            </p>
            <button className="ds-cta" onClick={scrollToCta}>
              {c.urgency.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </section>

        {/* ─── PROBLEM ─── */}
        <section ref={problemR.ref} style={{padding:"100px 24px",maxWidth:800,margin:"0 auto"}}>
          <h2 style={{
            ...fade(problemR.visible,0),
            fontSize:"clamp(32px,5vw,48px)",fontWeight:900,
            letterSpacing:"-0.03em",marginBottom:48,
            textAlign:"center",
          }}>
            {c.problem.h2}
          </h2>

          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {c.problem.items.map((item, i) => (
              <div key={i} style={{
                ...fade(problemR.visible, 0.1 + i * 0.08),
                padding:"28px 0",
                borderBottom:"1px solid rgba(255,255,255,0.06)",
                display:"flex",alignItems:"center",gap:20,
              }}>
                <span style={{
                  fontSize:14,fontWeight:800,color:"rgba(255,255,255,0.12)",
                  minWidth:28,
                }}>
                  0{i+1}
                </span>
                <p style={{fontSize:17,lineHeight:1.5,color:"rgba(255,255,255,0.55)",fontWeight:500}}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Answer */}
          <div style={{
            ...fade(problemR.visible,0.5),
            marginTop:56,textAlign:"center",
          }}>
            <p style={{
              fontSize:"clamp(22px,3.5vw,32px)",
              fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.3,
            }}>
              <span className="ds-grad-text">{c.problem.answer}</span>
            </p>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section ref={statsR.ref} style={{
          padding:"80px 24px",maxWidth:1100,margin:"0 auto",
        }}>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
            gap:0,
          }}>
            {c.stats.map((stat, i) => {
              const count = useCounter(stat.value, statsR.visible);
              return (
                <div key={i} style={{
                  ...fade(statsR.visible, 0.1 + i * 0.1),
                  textAlign:"center",
                  padding:"40px 20px",
                  borderRight:i < c.stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div className="ds-stat-num">
                    <span className="ds-grad-text">
                      {count.toLocaleString()}{stat.suffix}
                    </span>
                  </div>
                  <p style={{
                    fontSize:14,color:"rgba(255,255,255,0.35)",
                    marginTop:12,fontWeight:500,letterSpacing:"0.02em",
                  }}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── BENEFITS (BENTO) ─── */}
        <section ref={benefitsR.ref} style={{padding:"100px 24px",maxWidth:1000,margin:"0 auto"}}>
          <p style={{
            ...fade(benefitsR.visible,0),
            textAlign:"center",fontSize:13,fontWeight:700,
            letterSpacing:"0.2em",textTransform:"uppercase",
            color:"rgba(255,255,255,0.3)",marginBottom:56,
          }}>
            {c.benefits.label}
          </p>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(2, 1fr)",
            gap:16,
          }}>
            {c.benefits.items.map((b, i) => (
              <div key={i} className="ds-glass" style={{
                ...fade(benefitsR.visible, 0.1 + i * 0.1),
                padding:b.size==="large"?"48px 40px":"36px 32px",
                gridColumn:b.size==="large"?"span 2":"span 1",
              }}>
                <h3 style={{
                  fontSize:b.size==="large"?24:19,
                  fontWeight:800,letterSpacing:"-0.02em",
                  marginBottom:12,
                }}>
                  {b.title}
                </h3>
                <p style={{
                  fontSize:b.size==="large"?17:15,
                  color:"rgba(255,255,255,0.5)",lineHeight:1.6,
                  maxWidth:b.size==="large"?600:undefined,
                }}>
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── OFFER ─── */}
        <section id="ds-offer" ref={offerR.ref} style={{
          padding:"120px 24px",position:"relative",overflow:"hidden",
        }}>
          {/* Background glow */}
          <div style={{
            position:"absolute",inset:0,
            background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,93,74,0.08), transparent)",
            pointerEvents:"none",
          }}/>

          <div style={{maxWidth:700,margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}>
            <h2 style={{
              ...fade(offerR.visible,0),
              fontSize:"clamp(40px,7vw,72px)",
              fontWeight:900,letterSpacing:"-0.04em",
              lineHeight:1,marginBottom:28,
            }}>
              <span className="ds-grad-text">{c.offer.h2}</span>
            </h2>
            <p style={{
              ...fade(offerR.visible,0.1),
              fontSize:18,lineHeight:1.65,
              color:"rgba(255,255,255,0.5)",
              marginBottom:48,maxWidth:560,margin:"0 auto 48px",
            }}>
              {c.offer.sub}
            </p>

            {/* Details */}
            <div style={{
              ...fade(offerR.visible,0.2),
              display:"flex",flexWrap:"wrap",justifyContent:"center",
              gap:24,marginBottom:52,
            }}>
              {c.offer.details.map((d,i) => (
                <div key={i} style={{
                  display:"flex",alignItems:"center",gap:10,
                  fontSize:14,fontWeight:500,color:"rgba(255,255,255,0.6)",
                }}>
                  <div style={{
                    width:20,height:20,borderRadius:"50%",
                    background:"rgba(232,93,74,0.15)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E85D4A" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  {d}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={fade(offerR.visible,0.3)}>
              {/* Dev note: Replace href with actual signup link */}
              <a href="https://drsalsa.hu" target="_blank" rel="noopener noreferrer" className="ds-cta">
                {c.offer.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section ref={faqR.ref} style={{padding:"100px 24px",maxWidth:700,margin:"0 auto"}}>
          <h2 style={{
            ...fade(faqR.visible,0),
            fontSize:"clamp(28px,4vw,40px)",fontWeight:900,
            letterSpacing:"-0.03em",marginBottom:48,
          }}>
            {c.faq.h2}
          </h2>

          <div style={fade(faqR.visible,0.1)}>
            {c.faq.items.map((item,i) => (
              <div key={i}>
                <button className="ds-faq-btn"
                  onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  aria-expanded={openFaq===i}>
                  <span>{item.q}</span>
                  <span style={{
                    width:28,height:28,borderRadius:"50%",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    background:openFaq===i?"rgba(232,93,74,0.15)":"rgba(255,255,255,0.04)",
                    color:openFaq===i?"#E85D4A":"rgba(255,255,255,0.3)",
                    transition:"all 0.3s",flexShrink:0,marginLeft:16,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
                      style={{transform:openFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.3s"}}>
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight:openFaq===i?200:0,
                  opacity:openFaq===i?1:0,
                  overflow:"hidden",
                  transition:"max-height 0.4s ease, opacity 0.3s ease",
                }}>
                  <p style={{
                    fontSize:15,lineHeight:1.65,
                    color:"rgba(255,255,255,0.4)",
                    paddingBottom:24,
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section ref={finalR.ref} style={{
          padding:"120px 24px",textAlign:"center",
          position:"relative",overflow:"hidden",
        }}>
          <div className="ds-orb" style={{
            width:400,height:400,top:"50%",left:"50%",
            marginTop:-200,marginLeft:-200,
            background:"radial-gradient(circle,rgba(232,93,74,0.1),transparent 70%)",
          }}/>

          <div style={{position:"relative",zIndex:2,maxWidth:650,margin:"0 auto"}}>
            <h2 style={{
              ...fade(finalR.visible,0),
              fontSize:"clamp(28px,5vw,48px)",fontWeight:900,
              letterSpacing:"-0.03em",lineHeight:1.1,
              marginBottom:20,
            }}>
              {c.finalCta.h2}
            </h2>
            <p style={{
              ...fade(finalR.visible,0.1),
              color:"rgba(255,255,255,0.4)",fontSize:18,
              lineHeight:1.6,marginBottom:44,
            }}>
              {c.finalCta.sub}
            </p>
            <div style={fade(finalR.visible,0.2)}>
              <button className="ds-cta" onClick={scrollToCta}>
                {c.finalCta.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{
          padding:"48px 24px",
          borderTop:"1px solid rgba(255,255,255,0.04)",
          textAlign:"center",
        }}>
          <p style={{fontSize:14,color:"rgba(255,255,255,0.25)",marginBottom:16}}>
            {c.footer.copy}
          </p>
          <a href="https://brillcode.hu" target="_blank" rel="noopener noreferrer"
            style={{
              fontSize:11,color:"rgba(255,255,255,0.12)",
              textDecoration:"none",letterSpacing:"0.2em",
              transition:"color 0.3s",
            }}
            onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.12)"}>
            {c.footer.made}
          </a>
        </footer>
      </div>
    </>
  );
}
