"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Németh Bau 2000 – Landing page
   Gépi földmunka & Generálkivitelezés
   Colors: white / black / dark red (#8B1A1A)
   ───────────────────────────────────────────── */

// ── Data ──

const services = [
  {
    title: "Gépi földmunka",
    description:
      "Tereprendezés, alapásás, medenceásás, közműárok készítés, feltöltés és szintezés – saját gépparkkal, gyorsan és precízen.",
    items: [
      "Tereprendezés, planírozás",
      "Alapásás, pinceásás",
      "Medenceásás",
      "Közműárok készítés",
      "Feltöltés, szintezés",
      "Bontási munkák",
    ],
    icon: "excavator",
  },
  {
    title: "Generálkivitelezés",
    description:
      "A tervezéstől a kulcsátadásig. Családi házak, gazdasági épületek és felújítások komplex kivitelezése, egyetlen felelős kivitelezővel.",
    items: [
      "Családi házak építése",
      "Gazdasági épületek",
      "Tetőfedés, tetőcsere",
      "Komplex felújítások",
      "Burkolás, festés",
      "Víz-, villanyszerelés koordináció",
    ],
    icon: "building",
  },
];

const benefits = [
  {
    title: "Saját gépparkkal dolgozunk",
    description: "Nem kell alvállalkozóra várni – a gépek és a csapat a miénk.",
  },
  {
    title: "Pontos határidők",
    description:
      "Amit megbeszélünk, azt tartjuk. Nem kell hónapokat csúszni.",
  },
  {
    title: "Átlátható árazás",
    description:
      "Részletes árajánlat előre, rejtett költségek nélkül.",
  },
  {
    title: "Tapasztalat és megbízhatóság",
    description:
      "Több évtizedes szakmai tapasztalat az építőiparban.",
  },
];

const faqs = [
  {
    q: "Milyen munkákat vállalnak?",
    a: "Gépi földmunkát (tereprendezés, alapásás, medenceásás, közműárok) és generálkivitelezést (családi házak, gazdasági épületek, felújítások) egyaránt vállalunk.",
  },
  {
    q: "Hogyan kérhetek árajánlatot?",
    a: "Hívjon minket telefonon vagy küldjön üzenetet az alábbi elérhetőségeken. Helyszíni felmérés után részletes, tételes árajánlatot adunk – díjmentesen.",
  },
  {
    q: "Mekkora területen dolgoznak?",
    a: "Elsősorban a régióban vállalunk munkát, de nagyobb projektek esetén távolabb is szívesen egyeztetünk. Kérjen ajánlatot, és megbeszéljük a részleteket.",
  },
  {
    q: "Mennyi idő egy átlagos projekt?",
    a: "Ez nagyban függ a munka jellegétől. Egy alapásás akár 1-2 nap, egy családi ház generálkivitelezése néhány hónap. Az árajánlatban pontos időtervet is adunk.",
  },
  {
    q: "Vállalnak kisebb munkákat is?",
    a: "Igen. Nem csak nagy projekteknél, kisebb földmunkáknál és felújításoknál is szívesen segítünk.",
  },
];

// ── Scroll helper ──

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Intersection Observer hook ──

function useInView(margin = "-60px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, visible };
}

// ── SVG Icons ──

function ExcavatorIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
    </svg>
  );
}

function BuildingIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#8B1A1A] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

// ── Main Page ──

export default function NemethBauPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <Navbar />
      <Hero />
      <Services />
      <Benefits />
      <Process />
      <FAQ />
      <ContactCTA />
      <Footer />
    </div>
  );
}

// ── Navbar ──

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            NÉMETH BAU <span className="text-[#8B1A1A]">2000</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <button onClick={() => scrollTo("szolgaltatasok")} className="hover:text-gray-900 transition-colors">
            Szolgáltatások
          </button>
          <button onClick={() => scrollTo("rolunk")} className="hover:text-gray-900 transition-colors">
            Miért minket
          </button>
          <button onClick={() => scrollTo("gyik")} className="hover:text-gray-900 transition-colors">
            GYIK
          </button>
        </div>
        <a
          href="tel:+36000000000" /* Developer note: replace with real phone number */
          className="bg-[#8B1A1A] hover:bg-[#6B1414] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <span className="hidden sm:inline">Ajánlatot kérek</span>
          <span className="sm:hidden flex items-center gap-1.5">
            <PhoneIcon className="w-4 h-4" />
            Hívás
          </span>
        </a>
      </div>
    </nav>
  );
}

// ── Hero ──

function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B1A1A]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#8B1A1A]/10 text-[#8B1A1A] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#8B1A1A] rounded-full" />
            Építőipari kivitelezés
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
            Gépi földmunka és
            <br />
            generálkivitelezés
            <span className="text-[#8B1A1A]">.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
            Saját gépparkkal, tapasztalt csapattal dolgozunk. Az alaptól a
            tetőig – egy kivitelező, egy felelős, átlátható árak.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("kapcsolat")}
              className="bg-[#8B1A1A] hover:bg-[#6B1414] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#8B1A1A]/20"
            >
              Ingyenes árajánlatot kérek
            </button>
            <button
              onClick={() => scrollTo("szolgaltatasok")}
              className="border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:bg-gray-50"
            >
              Szolgáltatásaink
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>Ingyenes helyszíni felmérés</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>Saját géppark</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>Tételes árajánlat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──

function Services() {
  const { ref, visible } = useInView();

  return (
    <section id="szolgaltatasok" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-[#8B1A1A] text-sm font-bold uppercase tracking-widest">Szolgáltatásaink</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
            Amiben segíthetünk
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 transition-all duration-700 delay-${i * 150} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="w-14 h-14 bg-[#8B1A1A]/10 rounded-xl flex items-center justify-center mb-6">
                {service.icon === "excavator" ? (
                  <ExcavatorIcon className="w-7 h-7 text-[#8B1A1A]" />
                ) : (
                  <BuildingIcon className="w-7 h-7 text-[#8B1A1A]" />
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Benefits ──

function Benefits() {
  const { ref, visible } = useInView();

  return (
    <section id="rolunk" ref={ref} className="py-20 md:py-28 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-[#D4A0A0] text-sm font-bold uppercase tracking-widest">Miért minket</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Nem ígérgetünk – dolgozunk
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Az építőiparban a szavak keveset érnek. Nálunk a munka beszél.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="w-10 h-10 bg-[#8B1A1A] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
              <p className="text-gray-400 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process ──

function Process() {
  const { ref, visible } = useInView();

  const steps = [
    { step: "01", title: "Kapcsolatfelvétel", desc: "Hívjon vagy írjon – megbeszéljük az igényeit." },
    { step: "02", title: "Helyszíni felmérés", desc: "Kiszállunk, felmérjük a terepet – díjmentesen." },
    { step: "03", title: "Árajánlat", desc: "Részletes, tételes ajánlatot kap, rejtett költségek nélkül." },
    { step: "04", title: "Kivitelezés", desc: "Megkezdjük és határidőre befejezzük a munkát." },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-[#8B1A1A] text-sm font-bold uppercase tracking-widest">Hogyan dolgozunk</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
            4 lépés a megvalósulásig
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`text-center transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="text-5xl font-black text-[#8B1A1A]/15 mb-3">{s.step}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──

function FAQ() {
  const { ref, visible } = useInView();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="gyik" ref={ref} className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-[#8B1A1A] text-sm font-bold uppercase tracking-widest">GYIK</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
            Gyakran ismételt kérdések
          </h2>
        </div>

        <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex items-center justify-between w-full px-6 md:px-8 py-5 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 md:px-8 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact CTA ──

function ContactCTA() {
  const { ref, visible } = useInView();

  return (
    <section id="kapcsolat" ref={ref} className="py-20 md:py-28 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Kérjen ingyenes árajánlatot
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Hívjon minket vagy írjon – díjmentes helyszíni felméréssel és
            részletes árajánlattal várjuk.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {/* Developer note: replace href with client's real phone number */}
            <a
              href="tel:+36000000000"
              className="flex items-center justify-center gap-3 bg-[#8B1A1A] hover:bg-[#6B1414] text-white px-8 py-5 rounded-xl text-lg font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#8B1A1A]/30"
            >
              <PhoneIcon className="w-6 h-6" />
              Telefonon hívom
            </a>
            {/* Developer note: replace href with client's real email */}
            <a
              href="mailto:info@nemethbau2000.hu"
              className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-5 rounded-xl text-lg font-semibold transition-all hover:-translate-y-0.5"
            >
              <MailIcon className="w-6 h-6" />
              E-mailt küldök
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#D4A0A0]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Ingyenes felmérés
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#D4A0A0]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Kötelezettségmentes ajánlat
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#D4A0A0]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Gyors válasz
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-500 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <span className="font-bold text-gray-400">
              NÉMETH BAU <span className="text-[#8B1A1A]">2000</span>
            </span>
          </div>
          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} Németh Bau 2000. Minden jog fenntartva.
          </div>
        </div>
      </div>
    </footer>
  );
}
