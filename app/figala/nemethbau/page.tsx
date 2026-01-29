"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Németh Bau 2000 – V2 Radically different
   Industrial construction aesthetic
   Colors: #111 / #fff / #8B1A1A / #D4A017
   Zero inheritance from BrillCode main site
   ───────────────────────────────────────────── */

// ── Intersection Observer ──

function useReveal(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return { ref, visible };
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Data ──

const stats = [
  { value: "20+", label: "év tapasztalat" },
  { value: "500+", label: "befejezett projekt" },
  { value: "100%", label: "saját géppark" },
];

/* Developer note: all stats are assumptions - confirm with client */

const earthworkItems = [
  "Tereprendezés, planírozás",
  "Alapásás, pinceásás",
  "Medenceásás",
  "Közműárok készítés",
  "Feltöltés, szintezés",
  "Bontási munkák",
];

const buildItems = [
  "Családi házak építése",
  "Gazdasági, ipari épületek",
  "Tetőfedés, tetőcsere",
  "Komplex felújítások",
  "Burkolás, festés, vakolás",
  "Víz-, villanyszerelés koordináció",
];

const processSteps = [
  {
    num: "01",
    title: "Felhív minket",
    text: "Mondja el mit szeretne – pár perc alatt képet kapunk a projektről.",
  },
  {
    num: "02",
    title: "Kiszállunk, felmérünk",
    text: "Helyszíni felmérés díjmentesen. Felmérjük a terepet, megértjük az igényeket.",
  },
  {
    num: "03",
    title: "Tételes árajánlat",
    text: "Írásban, részletezve, rejtett költségek nélkül. Ön dönt, nyomás nincs.",
  },
  {
    num: "04",
    title: "Dolgozunk",
    text: "Megkezdjük és határidőre befejezzük. Folyamatos egyeztetéssel.",
  },
];

const faqs = [
  {
    q: "Milyen munkákat vállalnak?",
    a: "Gépi földmunkát (tereprendezés, alapásás, medenceásás, közműárok) és teljes generálkivitelezést (családi házak, gazdasági épületek, felújítások).",
  },
  {
    q: "Hogyan kérhetek árajánlatot?",
    a: "Telefonon vagy e-mailben. Helyszíni felmérés után részletes, tételes árajánlatot kap – díjmentesen, kötelezettség nélkül.",
  },
  {
    q: "Mekkora területen dolgoznak?",
    a: "Elsősorban a régióban, de nagyobb projektek esetén távolabb is vállalunk. Egyeztessünk, és megbeszéljük.",
  },
  {
    q: "Mennyi idő egy átlagos projekt?",
    a: "Alapásás: 1-2 nap. Családi ház: néhány hónap. Az árajánlatban pontos ütemtervet is kap.",
  },
  {
    q: "Vállalnak kisebb munkákat is?",
    a: "Igen. Kisebb földmunkák, felújítások, javítások – mindennel szívesen segítünk.",
  },
];

// ── Page ──

export default function NemethBauPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: "#fff",
        color: "#111",
      }}
    >
      {/* Override inherited bg-mesh and BrillCode styles */}
      <style>{`
        body { background: #fff !important; }
        .nb-stripe {
          background: repeating-linear-gradient(
            -45deg,
            #D4A017,
            #D4A017 10px,
            #111 10px,
            #111 20px
          );
        }
      `}</style>

      <TopBar />
      <Hero />
      <StatsBar />
      <Earthwork />
      <Building />
      <WhyUs />
      <Process />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

// ── Top Bar ──

function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? "rgba(17,17,17,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center font-black text-white text-sm"
            style={{ background: "#8B1A1A" }}
          >
            NB
          </div>
          <span className="text-white font-bold text-sm tracking-wide hidden sm:block">
            NÉMETH BAU 2000
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <button onClick={() => scrollTo("szolgaltatasok")} className="hover:text-white transition-colors">Szolgáltatások</button>
          <button onClick={() => scrollTo("miert-mi")} className="hover:text-white transition-colors">Miért minket</button>
          <button onClick={() => scrollTo("gyik")} className="hover:text-white transition-colors">GYIK</button>
        </nav>

        {/* CTA */}
        <a
          href="tel:+36000000000" /* Developer note: replace with real phone */
          className="flex items-center gap-2 text-sm font-bold text-white px-4 py-2 transition-colors"
          style={{ background: "#8B1A1A" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span className="hidden sm:inline">Hívjon most</span>
        </a>
      </div>
    </header>
  );
}

// ── Hero ──

function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-end overflow-hidden"
      style={{ background: "#111" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal accent block */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full hidden lg:block"
        style={{
          background: "#8B1A1A",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Construction stripe */}
      <div
        className="nb-stripe absolute bottom-0 left-0 right-0 h-2"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-20 pt-32 w-full">
        <div className="max-w-2xl">
          {/* Tag */}
          <div
            className="inline-block mb-6 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ background: "#D4A017", color: "#111" }}
          >
            Építőipari kivitelezés
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6"
            style={{ color: "#fff" }}
          >
            Gépi
            <br />
            földmunka.
            <br />
            <span style={{ color: "#D4A017" }}>Generál-</span>
            <br />
            <span style={{ color: "#D4A017" }}>kivitelezés.</span>
          </h1>

          <p className="text-lg sm:text-xl mb-10 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Saját gépparkkal, saját csapattal. Az alaptól a tetőig
            – egy kivitelező, egy felelős.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("kapcsolat")}
              className="px-8 py-4 text-lg font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#8B1A1A" }}
            >
              Ingyenes árajánlatot kérek →
            </button>
            <button
              onClick={() => scrollTo("szolgaltatasok")}
              className="px-8 py-4 text-lg font-semibold transition-all hover:bg-white/10"
              style={{ color: "#fff", border: "2px solid rgba(255,255,255,0.2)" }}
            >
              Szolgáltatásaink
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats ──

function StatsBar() {
  return (
    <section style={{ background: "#8B1A1A" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-3 gap-6 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-5xl font-black">{s.value}</div>
              <div className="text-sm sm:text-base mt-1 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Earthwork section ──

function Earthwork() {
  const { ref, visible } = useReveal();

  return (
    <section id="szolgaltatasok" ref={ref} className="py-20 md:py-28" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div
              className="w-12 h-1 mb-6"
              style={{ background: "#D4A017" }}
            />
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#111" }}>
              Gépi földmunka
            </h2>
            <p className="text-lg mb-8" style={{ color: "#555" }}>
              Tereprendezés, alapásás, medenceásás, közműárok – saját
              gépparkkal, gyorsan és precízen. Nem kell alvállalkozóra
              várni, a gépek és az ember a miénk.
            </p>
            <ul className="space-y-3">
              {earthworkItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 flex-shrink-0" style={{ background: "#8B1A1A" }} />
                  <span className="font-medium" style={{ color: "#333" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: visual placeholder */}
          <div
            className={`relative transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="aspect-[4/3] relative" style={{ background: "#f3f3f3" }}>
              {/* Placeholder for client photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24" style={{ color: "#ddd" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                </svg>
              </div>
              {/* Corner accent */}
              <div className="absolute -bottom-3 -left-3 w-20 h-20" style={{ border: "3px solid #D4A017", borderRight: "none", borderTop: "none" }} />
            </div>
            {/* Developer note: replace placeholder with real project photo */}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Building section ──

function Building() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ background: "#f7f7f7" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: visual placeholder */}
          <div
            className={`relative order-2 lg:order-1 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="aspect-[4/3] relative" style={{ background: "#e8e8e8" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24" style={{ color: "#ccc" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
                </svg>
              </div>
              {/* Corner accent */}
              <div className="absolute -top-3 -right-3 w-20 h-20" style={{ border: "3px solid #8B1A1A", borderLeft: "none", borderBottom: "none" }} />
            </div>
            {/* Developer note: replace placeholder with real project photo */}
          </div>

          {/* Right: content */}
          <div
            className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div
              className="w-12 h-1 mb-6"
              style={{ background: "#8B1A1A" }}
            />
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#111" }}>
              Generálkivitelezés
            </h2>
            <p className="text-lg mb-8" style={{ color: "#555" }}>
              A tervezéstől a kulcsátadásig. Családi házak, gazdasági épületek
              és felújítások – egyetlen felelős kivitelezővel, végig.
            </p>
            <ul className="space-y-3">
              {buildItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 flex-shrink-0" style={{ background: "#D4A017" }} />
                  <span className="font-medium" style={{ color: "#333" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Why Us ──

function WhyUs() {
  const { ref, visible } = useReveal();

  const items = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      title: "Saját géppark",
      text: "Nem bérelünk, nem várakozunk. A gépek a mieink – azonnal indulunk.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Pontos határidők",
      text: "Amit mondunk, azt tartjuk. Nincs hónapokig tartó csúszás.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      title: "Átlátható árazás",
      text: "Tételes árajánlat előre. Nincs rejtett költség, nincs meglepetés.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Több évtizedes tapasztalat",
      text: "Régóta csináljuk. Tudjuk mit, hogyan, és mire kell figyelni.",
    },
  ];

  return (
    <section id="miert-mi" ref={ref} className="py-20 md:py-28" style={{ background: "#111" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left heading */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="w-12 h-1 mb-6" style={{ background: "#D4A017" }} />
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#fff" }}>
              Nem ígérgetünk.
              <br />
              <span style={{ color: "#D4A017" }}>Dolgozunk.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Az építőiparban a szavak keveset érnek. Nálunk a munka beszél
              – és az eredmény magáért szól.
            </p>
          </div>

          {/* Right grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div
                key={item.title}
                className={`p-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${200 + i * 100}ms`,
                  background: "rgba(255,255,255,0.04)",
                  borderLeft: "3px solid #8B1A1A",
                }}
              >
                <div className="mb-4" style={{ color: "#D4A017" }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#fff" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Process ──

function Process() {
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="w-12 h-1 mb-6" style={{ background: "#8B1A1A" }} />
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#111" }}>
            Hogyan dolgozunk
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {processSteps.map((s, i) => (
            <div
              key={s.num}
              className={`relative p-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${300 + i * 120}ms`,
                borderLeft: i > 0 ? "1px solid #e5e5e5" : "none",
              }}
            >
              <div
                className="text-6xl font-black mb-4 leading-none"
                style={{ color: "rgba(212,160,23,0.15)" }}
              >
                {s.num}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#111" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#777" }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──

function FAQ() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="gyik" ref={ref} className="py-20 md:py-28" style={{ background: "#f7f7f7" }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="w-12 h-1 mb-6" style={{ background: "#D4A017" }} />
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#111" }}>
            Gyakran ismételt kérdések
          </h2>
        </div>

        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "200ms" }}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex items-center justify-between w-full py-6 text-left"
              >
                <span className="font-bold pr-4" style={{ color: "#111" }}>
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 text-2xl font-light transition-transform duration-200"
                  style={{
                    color: "#8B1A1A",
                    transform: open === i ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="pb-6">
                  <p className="leading-relaxed" style={{ color: "#666" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──

function FinalCTA() {
  const { ref, visible } = useReveal();

  return (
    <section id="kapcsolat" ref={ref} className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#111" }}>
      {/* Yellow construction stripe top */}
      <div className="nb-stripe absolute top-0 left-0 right-0 h-2" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6" style={{ color: "#fff" }}>
            Kérjen ingyenes
            <br />
            <span style={{ color: "#D4A017" }}>árajánlatot</span>
          </h2>
          <p className="text-lg mb-12 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Hívjon vagy írjon – díjmentes helyszíni felméréssel és
            részletes, tételes árajánlattal várjuk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Developer note: replace with real phone number */}
            <a
              href="tel:+36000000000"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#8B1A1A" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Telefonon hívom
            </a>
            {/* Developer note: replace with real email */}
            <a
              href="mailto:info@nemethbau2000.hu"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold transition-all hover:bg-white/10"
              style={{ color: "#fff", border: "2px solid rgba(255,255,255,0.2)" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              E-mailt küldök
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>✓ Ingyenes felmérés</span>
            <span>✓ Kötelezettségmentes</span>
            <span>✓ Gyors válasz</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──

function Footer() {
  return (
    <footer className="py-8" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 flex items-center justify-center font-black text-white text-[10px]"
            style={{ background: "#8B1A1A" }}
          >
            NB
          </div>
          <span>Németh Bau 2000</span>
        </div>
        <span>© {new Date().getFullYear()} Minden jog fenntartva.</span>
      </div>
    </footer>
  );
}
