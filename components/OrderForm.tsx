"use client";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const goals = [
  "Szolgáltatás értékesítése",
  "Termék bemutatása",
  "Lead generálás",
  "Eseményre regisztráció",
  "Portfólió / bemutatkozás",
  "Egyéb",
];

const styles = [
  "Letisztult üzleti",
  "Modern tech",
  "Konverziófókusz",
  "Mindegy, ti döntsétek",
];

export default function OrderForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    goal: "",
    style: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Hiba történt a küldés során');
      }

      setIsSubmitted(true);
      // Meta Pixel: Purchase konverzió
      const w = typeof window !== "undefined" ? (window as unknown as { fbq?: (a: string, b: string, c?: object) => void }) : null;
      if (w?.fbq) w.fbq("track", "Purchase", { value: 9400, currency: "HUF" });
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Hiba történt a megrendelés küldése során. Kérlek próbáld újra vagy írj nekünk: talk@brillcode.hu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="megrendeles" className="py-20 bg-petrol-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className={`text-center mb-12 fade-in ${isInView ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Jöhet a sajátod?
          </h2>
          <p className="text-lg text-petrol-200 max-w-2xl mx-auto">
            Amennyiben azt látod, hogy van még szabad kapacitásunk, töltsd ki az űrlapot és 24 órán belül megkapod a kész oldalad.
            <br />
            <span className="text-lime-400 font-semibold">9 400 Ft</span> – egyszeri díj, nincs rejtett költség.
          </p>
        </div>

        <div className={`max-w-2xl mx-auto fade-in fade-in-delay-1 ${isInView ? 'visible' : ''}`}>
          {isSubmitted ? (
            <div className="bg-white rounded-2xl p-8 md:p-12 text-center fade-in-scale">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-petrol-800 mb-4">
                  Köszönjük a megrendelést!
                </h3>
                <p className="text-petrol-600 mb-6">
                  Megkaptuk az adataidat. Hamarosan felvesszük veled a kapcsolatot e-mailben,
                  és 24 órán belül elkészül a landing oldalad.
                </p>
                <div className="bg-petrol-50 rounded-lg p-4">
                  <p className="text-sm text-petrol-600">
                    <strong>Mi történik most?</strong>
                    <br />
                    1. Átnézzük az igényeidet
                    <br />
                    2. Elkészítjük az oldalad
                    <br />
                    3. E-mailben küldjük a linket és a fizetési infót
                  </p>
                </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl fade-in-scale"
            >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="fade-in fade-in-stagger-0">
                    <label htmlFor="name" className="block text-sm font-medium text-petrol-700 mb-2">
                      Név *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Kovács János"
                      className="w-full"
                    />
                  </div>

                  {/* Email */}
                  <div className="fade-in fade-in-stagger-1">
                    <label htmlFor="email" className="block text-sm font-medium text-petrol-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="pelda@email.hu"
                      className="w-full"
                    />
                  </div>

                  {/* Phone */}
                  <div className="fade-in fade-in-stagger-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-petrol-700 mb-2">
                      Telefonszám
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+36 30 123 4567"
                      className="w-full"
                    />
                  </div>

                  {/* Business name */}
                  <div className="fade-in fade-in-stagger-3">
                    <label htmlFor="business" className="block text-sm font-medium text-petrol-700 mb-2">
                      Cégnév / Márkanév *
                    </label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      required
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Példa Kft."
                      className="w-full"
                    />
                  </div>

                  {/* Goal */}
                  <div className="fade-in fade-in-stagger-4">
                    <label htmlFor="goal" className="block text-sm font-medium text-petrol-700 mb-2">
                      Mi a cél? *
                    </label>
                    <select
                      id="goal"
                      name="goal"
                      required
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full"
                    >
                      <option value="">Válassz...</option>
                      {goals.map((goal) => (
                        <option key={goal} value={goal}>
                          {goal}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Style */}
                  <div className="fade-in fade-in-stagger-5">
                    <label htmlFor="style" className="block text-sm font-medium text-petrol-700 mb-2">
                      Stílus preferencia
                    </label>
                    <select
                      id="style"
                      name="style"
                      value={formData.style}
                      onChange={handleChange}
                      className="w-full"
                    >
                      <option value="">Válassz...</option>
                      {styles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-6 fade-in fade-in-delay-3">
                  <label htmlFor="notes" className="block text-sm font-medium text-petrol-700 mb-2">
                    Bármi amit még tudnunk kell
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Ide írhatsz bármit: milyen ajánlatot szeretnél kommunikálni, van-e logód, mire szeretnéd használni az oldalt, stb."
                    className="w-full resize-none"
                  />
                </div>

                {/* Privacy note */}
                <p className="text-xs text-petrol-500 mt-4">
                  A megrendeléssel elfogadod, hogy a megadott adatokat a megrendelés teljesítéséhez
                  felhasználjuk. Adataidat nem adjuk ki harmadik félnek.
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full mt-6 text-lg py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-petrol-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Küldés...
                    </>
                  ) : (
                    <>
                      Megrendelem – 9 400 Ft
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </>
                  )}
                </button>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-petrol-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Biztonságos
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ingyenes módosítás
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24 órán belül kész
                  </div>
                </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
