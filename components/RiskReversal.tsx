"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export default function RiskReversal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-20">
      <div className="section-container">
        <div className={`max-w-3xl mx-auto fade-in ${isInView ? 'visible' : ''}`}>
          <div className="bg-gradient-to-br from-teal-50 to-petrol-50 rounded-3xl p-8 md:p-12 border border-teal-200 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-petrol-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>

              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-bold text-petrol-800 text-center mb-4">
                Kockázatmentes megrendelés
              </h2>

              {/* Description */}
              <p className="text-lg text-petrol-600 text-center mb-8 max-w-xl mx-auto">
                Tudjuk, hogy online rendelni szolgáltatást mindig jár némi bizonytalansággal. Ezért teszünk érte, hogy ne legyen kockázat.
              </p>

              {/* Guarantees */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-teal-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-petrol-800 mb-1">
                        1 kör ingyenes módosítás
                      </h3>
                      <p className="text-sm text-petrol-600">
                        Ha valami nem tetszik, javítjuk. Nem kérdés, nem vita – megoldjuk.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-teal-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-petrol-800 mb-1">
                        Elégedettségi garancia
                      </h3>
                      <p className="text-sm text-petrol-600">
                        Ha az elkészült oldal alapvetően nem felel meg a megbeszéltnek, el sem kérjük az árát.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-teal-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-petrol-800 mb-1">
                        Transzparens kommunikáció
                      </h3>
                      <p className="text-sm text-petrol-600">
                        Végig látod, hol tart a projekted. Nincs fekete doboz, nincs váratlan költség.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-teal-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-petrol-800 mb-1">
                        Gyors reakció
                      </h3>
                      <p className="text-sm text-petrol-600">
                        Szinte azonnal felvesszük a kapcsolatot a jelentkezés után (munkaidőben).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="mt-8 text-center">
                <p className="text-petrol-500 text-sm">
                  Célunk, hogy elégedett legyél – mert így térsz vissza, és így ajánlasz másoknak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
