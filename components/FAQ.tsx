"use client";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "Hogyan lehet egyedi és mégis ilyen olcsó?",
    answer:
      "Ez egy akció, nem pedig olcsó termék. Ha most nem él vele, később nem fogja tudni ennyiért elkészíteni weboldalát. Produktizált rendszert használunk: bevált, konverzió-optimalizált komponensekből építünk, de minden oldal a te igényeid szerint készül. Nincs sablon amit módosítunk – de nincs is nulláról indulás minden projektnél.",
  },
  {
    question: "Tényleg 24 óra alatt kész?",
    answer:
      "Igen. A megrendelés beérkezése után 24 órán belül (munkanapon) elkészül és megkapod a kész oldalt. Hétvégén és ünnepnapokon beérkező megrendelések esetén a következő munkanap számít kezdőnapnak. Naponta korlátozott számú megrendelést fogadunk, így minden projektre teljes figyelmet fordítunk.",
  },
  {
    question: "Mi kell a megrendeléshez?",
    answer:
      "Cégnév és elérhetőségek, a fő üzenet vagy ajánlat amit kommunikálni szeretnél, és ha van, logó. Az űrlapon megadhatod a stílus preferenciádat és a célodat is. Ha nincs logód vagy nem tudod pontosan mit szeretnél, az sem baj – segítünk kitalálni.",
  },
  {
    question: "Van módosítási lehetőség?",
    answer:
      "Igen, 1 kör ingyenes módosítás jár minden megrendeléshez. Ez jelenthet színek, szövegek, elrendezés finomhangolását. Ha teljesen más irányt szeretnél (pl. más stílus, más struktúra), azt egyedileg beszéljük meg.",
  },
  {
    question: "Domain és tárhely is jár hozzá?",
    answer:
      "Az oldalt bármilyen tárhelyre feltöltjük, de a domain és hosting költsége nem része az árnak. Ha nincs még tárhelyed, ajánlunk megbízható és olcsó szolgáltatót, és segítünk a beállításban. A domain regisztrációban is tudunk segíteni.",
  },
  {
    question: "Milyen technológiával készül az oldal?",
    answer:
      "Modern, gyors technológiákat használunk (React/Next.js alapú statikus oldal). Az eredmény egy villámgyors, mobilbarát weboldal, amit bármelyik modern tárhelyen futtathatsz. A forráskód a tiéd marad, később bármikor módosíthatod.",
  },
  {
    question: "Mi van, ha mégsem tetszik az eredmény?",
    answer:
      "Először is: 1 kör ingyenes módosítást adunk, szóval finomíthatunk rajta. Ha az elkészült oldal alapvetően nem felel meg annak, amit megbeszéltünk, visszaadjuk az árát. A célunk az elégedettséged, nem az, hogy pénzt vegyünk el tőled.",
  },
  {
    question: "Készítetek összetettebb weboldalakat is?",
    answer:
      "Ez az ajánlat kifejezetten egyoldalas landing page-ekre vonatkozik. Ha többoldalas weboldalt, webshopot vagy egyéb fejlesztést szeretnél, írj nekünk – egyedi árajánlatot adunk.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-petrol-100 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left"
      >
        <span className="font-semibold text-petrol-800 pr-4">{faq.question}</span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-petrol-100 flex items-center justify-center transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-4 h-4 text-petrol-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="overflow-hidden transition-all duration-200">
          <p className="pb-5 text-petrol-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px", amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} id="gyik" className="py-20 bg-cream-50">
      <div className="section-container">
        <div className={`text-center mb-12 fade-in ${isInView ? 'visible' : ''}`}>
          <span className="section-badge mb-4">GYIK</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-petrol-800 mb-4">
            Gyakran ismételt kérdések
          </h2>
          <p className="text-lg text-petrol-600 max-w-2xl mx-auto">
            Ha itt nem találod a választ, írj nekünk – szívesen segítünk.
          </p>
        </div>

        <div className={`max-w-3xl mx-auto fade-in fade-in-delay-1 ${isInView ? 'visible' : ''}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-petrol-100 px-6 md:px-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Contact prompt */}
        <div className={`text-center mt-10 fade-in fade-in-delay-2 ${isInView ? 'visible' : ''}`}>
          <p className="text-petrol-600">
            Még mindig van kérdésed?{" "}
            <a
              href="mailto:talk@brillcode.hu"
              className="text-petrol-700 font-semibold hover:text-petrol-800 underline decoration-petrol-300 hover:decoration-petrol-500 transition-colors"
            >
              Írj nekünk
            </a>
            {" "}vagy hívj:{" "}
            <a
              href="tel:+36301794259"
              className="text-petrol-700 font-semibold hover:text-petrol-800 underline decoration-petrol-300 hover:decoration-petrol-500 transition-colors"
            >
              +36 30 179 4259
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
