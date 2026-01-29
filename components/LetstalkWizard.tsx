"use client";

import { useState } from "react";

const TOTAL_STEPS = 6;

const stepTitles = [
  "Cég",
  "Cél",
  "Tartalom",
  "Design",
  "Technikai",
  "Küldés",
];

type FormData = {
  companyName: string;
  industry: string;
  companyDescription: string;
  websiteUrl: string;
  landingGoal: string;
  ctaAction: string;
  campaignContext: string;
  mainMessage: string;
  keyBenefits: string;
  existingCopy: string;
  pricingHighlight: string;
  imageNotes: string;
  videoUrl: string;
  referenceUrls: string;
  brandColors: string;
  logoInfo: string;
  domain: string;
  hosting: string;
  languages: string;
  preferredContact: string;
  additionalNotes: string;
};

const initialFormData: FormData = {
  companyName: "",
  industry: "",
  companyDescription: "",
  websiteUrl: "",
  landingGoal: "",
  ctaAction: "",
  campaignContext: "",
  mainMessage: "",
  keyBenefits: "",
  existingCopy: "",
  pricingHighlight: "",
  imageNotes: "",
  videoUrl: "",
  referenceUrls: "",
  brandColors: "",
  logoInfo: "",
  domain: "",
  hosting: "",
  languages: "",
  preferredContact: "",
  additionalNotes: "",
};

const requiredByStep: Record<number, (keyof FormData)[]> = {
  1: ["companyName"],
  2: ["landingGoal"],
  3: ["mainMessage"],
  4: [],
  5: [],
  6: [],
};

const requiredLabels: Record<string, string> = {
  companyName: "Cégnév / Márkanév",
  landingGoal: "A landing célja",
  mainMessage: "Fő üzenet / ötlet",
};

export default function LetstalkWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]);
  };

  const validateStep = (): boolean => {
    const required = requiredByStep[currentStep] || [];
    const missing = required.filter((field) => !formData[field].trim());
    if (missing.length > 0) {
      setErrors(missing.map((f) => requiredLabels[f] || f));
      return false;
    }
    setErrors([]);
    return true;
  };

  const goNext = () => {
    if (validateStep()) {
      setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const goBack = () => {
    setErrors([]);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/letstalk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Hiba történt a küldés során");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Letstalk form error:", error);
      alert(
        "Hiba történt a küldés során. Kérlek próbáld újra vagy írj nekünk: talk@brillcode.hu"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl">
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
          <h2 className="text-2xl font-bold text-petrol-800 mb-4">
            Köszönjük!
          </h2>
          <p className="text-petrol-600 mb-6">
            Megkaptuk a válaszaidat. Néhány órán belül készen vagyunk és
            jelentkezünk.
          </p>
          <div className="bg-petrol-50 rounded-lg p-4">
            <p className="text-sm text-petrol-600">
              Ha bármi kérdésed van addig is, írj nekünk:{" "}
              <a
                href="mailto:talk@brillcode.hu"
                className="text-teal-600 font-semibold underline"
              >
                talk@brillcode.hu
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh flex flex-col items-center px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-petrol-800">BrillCode</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-petrol-800">
          Projekt kérdőív
        </h1>
        <p className="text-petrol-500 text-sm mt-2">
          Töltsd ki a kérdőívet, hogy a lehető legjobb landing oldalt készítsük
          el neked.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const step = i + 1;
            const isCompleted = step < currentStep;
            const isActive = step === currentStep;
            return (
              <div key={step} className="flex items-center flex-1 last:flex-initial">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isCompleted
                        ? "bg-teal-500 text-white"
                        : isActive
                        ? "bg-petrol-700 text-white ring-4 ring-petrol-200"
                        : "bg-petrol-100 text-petrol-400"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  <span
                    className={`text-xs mt-1 hidden md:block ${
                      isActive ? "text-petrol-700 font-semibold" : "text-petrol-400"
                    }`}
                  >
                    {stepTitles[i]}
                  </span>
                </div>
                {step < TOTAL_STEPS && (
                  <div
                    className={`flex-1 h-0.5 mx-1 md:mx-2 transition-colors duration-300 ${
                      isCompleted ? "bg-teal-500" : "bg-petrol-100"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl p-6 md:p-10 shadow-2xl">
        {/* Error messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm font-medium">
              Kérlek töltsd ki a kötelező mezőket:{" "}
              {errors.join(", ")}
            </p>
          </div>
        )}

        {/* Step content */}
        <div className="min-h-[300px]">
          {currentStep === 1 && (
            <StepOne formData={formData} onChange={handleChange} />
          )}
          {currentStep === 2 && (
            <StepTwo formData={formData} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <StepThree formData={formData} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <StepFour formData={formData} onChange={handleChange} />
          )}
          {currentStep === 5 && (
            <StepFive formData={formData} onChange={handleChange} />
          )}
          {currentStep === 6 && (
            <StepSix formData={formData} onChange={handleChange} />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-petrol-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="btn-secondary text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Vissza
            </button>
          ) : (
            <div />
          )}

          {currentStep < TOTAL_STEPS ? (
            <button type="button" onClick={goNext} className="btn-primary">
              Tovább
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary text-lg py-4 px-8 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-petrol-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Küldés...
                </>
              ) : (
                <>
                  Küldés
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Step counter mobile */}
      <p className="text-petrol-400 text-sm mt-4 md:hidden">
        {currentStep} / {TOTAL_STEPS}
      </p>
    </div>
  );
}

/* ── Step Components ── */

type StepProps = {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

function StepOne({ formData, onChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-petrol-800 mb-1">
        Cég / Megrendelő
      </h2>
      <p className="text-petrol-500 text-sm mb-6">
        Mesélj egy kicsit a cégedről, hogy jobban megértsük a kontextust.
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-petrol-700 mb-2">
            Cégnév / Márkanév *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
            placeholder="Példa Kft."
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-petrol-700 mb-2">
            Tevékenység / Iparág
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={onChange}
            placeholder="pl. Marketing ügynökség, Fodrász szalon, IT tanácsadás..."
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="companyDescription" className="block text-sm font-medium text-petrol-700 mb-2">
            Rövid leírás a cégről
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            rows={3}
            value={formData.companyDescription}
            onChange={onChange}
            placeholder="Mivel foglalkozik a céged? Ki a célközönséged?"
            className="w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-petrol-700 mb-2">
            Weboldal / Social link
          </label>
          <input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={onChange}
            placeholder="https://..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function StepTwo({ formData, onChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-petrol-800 mb-1">
        A landing célja
      </h2>
      <p className="text-petrol-500 text-sm mb-6">
        Mi a fő cél, amit az oldallal el szeretnél érni?
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="landingGoal" className="block text-sm font-medium text-petrol-700 mb-2">
            Cél *
          </label>
          <textarea
            id="landingGoal"
            name="landingGoal"
            rows={3}
            value={formData.landingGoal}
            onChange={onChange}
            placeholder="pl. Szolgáltatás értékesítése, lead generálás, eseményre regisztráció..."
            className="w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="ctaAction" className="block text-sm font-medium text-petrol-700 mb-2">
            Konkrét CTA akció
          </label>
          <input
            type="text"
            id="ctaAction"
            name="ctaAction"
            value={formData.ctaAction}
            onChange={onChange}
            placeholder="pl. Jelentkezem, Kérek árajánlatot, Letöltés..."
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="campaignContext" className="block text-sm font-medium text-petrol-700 mb-2">
            Kampány / esemény kontextus
          </label>
          <textarea
            id="campaignContext"
            name="campaignContext"
            rows={3}
            value={formData.campaignContext}
            onChange={onChange}
            placeholder="Van-e konkrét kampány, esemény vagy határidő amihez kapcsolódik az oldal?"
            className="w-full resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function StepThree({ formData, onChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-petrol-800 mb-1">Tartalom</h2>
      <p className="text-petrol-500 text-sm mb-6">
        Mi legyen az oldalon? Minél többet tudsz, annál jobb lesz az eredmény.
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="mainMessage" className="block text-sm font-medium text-petrol-700 mb-2">
            Fő üzenet / ötlet *
          </label>
          <textarea
            id="mainMessage"
            name="mainMessage"
            rows={3}
            value={formData.mainMessage}
            onChange={onChange}
            placeholder="Mi az a fő gondolat, amit az oldalon át szeretnél adni?"
            className="w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="keyBenefits" className="block text-sm font-medium text-petrol-700 mb-2">
            3-5 fő előny
          </label>
          <textarea
            id="keyBenefits"
            name="keyBenefits"
            rows={3}
            value={formData.keyBenefits}
            onChange={onChange}
            placeholder="Miért válasszák a te szolgáltatásodat / termékedet?"
            className="w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="existingCopy" className="block text-sm font-medium text-petrol-700 mb-2">
            Van-e kész szöveg?
          </label>
          <textarea
            id="existingCopy"
            name="existingCopy"
            rows={3}
            value={formData.existingCopy}
            onChange={onChange}
            placeholder="Ha van kész szöveged, másold ide. Ha nincs, mi megírjuk."
            className="w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="pricingHighlight" className="block text-sm font-medium text-petrol-700 mb-2">
            Ár / ajánlat kiemelés
          </label>
          <textarea
            id="pricingHighlight"
            name="pricingHighlight"
            rows={2}
            value={formData.pricingHighlight}
            onChange={onChange}
            placeholder="Van-e konkrét ár vagy ajánlat, amit ki szeretnél emelni?"
            className="w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="imageNotes" className="block text-sm font-medium text-petrol-700 mb-2">
            Képek
          </label>
          <textarea
            id="imageNotes"
            name="imageNotes"
            rows={2}
            value={formData.imageNotes}
            onChange={onChange}
            placeholder="Vannak saját képeid? Ha igen, küldd el a content@brillcode.hu címre."
            className="w-full resize-none"
          />
          <p className="text-xs text-petrol-400 mt-1">
            Képeket a{" "}
            <a href="mailto:content@brillcode.hu" className="text-teal-600 underline">
              content@brillcode.hu
            </a>{" "}
            címre várjuk.
          </p>
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-petrol-700 mb-2">
            Videó / külső link
          </label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={onChange}
            placeholder="YouTube, Vimeo vagy egyéb link..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function StepFour({ formData, onChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-petrol-800 mb-1">
        Design / Stílus
      </h2>
      <p className="text-petrol-500 text-sm mb-6">
        Milyen legyen az oldal kinézete? Ha nincs elképzelésed, mi kitaláljuk.
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="referenceUrls" className="block text-sm font-medium text-petrol-700 mb-2">
            Referencia oldalak (1-3 URL)
          </label>
          <textarea
            id="referenceUrls"
            name="referenceUrls"
            rows={3}
            value={formData.referenceUrls}
            onChange={onChange}
            placeholder="Linkeld be azokat az oldalakat, amik stílusban tetszenek (soronként egy URL)."
            className="w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="brandColors" className="block text-sm font-medium text-petrol-700 mb-2">
            Színek / Brand
          </label>
          <input
            type="text"
            id="brandColors"
            name="brandColors"
            value={formData.brandColors}
            onChange={onChange}
            placeholder="pl. Kék-fehér, #1e5f74, vagy &quot;meleg tónusok&quot;..."
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="logoInfo" className="block text-sm font-medium text-petrol-700 mb-2">
            Logó
          </label>
          <input
            type="text"
            id="logoInfo"
            name="logoInfo"
            value={formData.logoInfo}
            onChange={onChange}
            placeholder="Van logód? Ha igen, küldd el a content@brillcode.hu címre."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function StepFive({ formData, onChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-petrol-800 mb-1">
        Technikai / Üzleti
      </h2>
      <p className="text-petrol-500 text-sm mb-6">
        Néhány technikai kérdés, hogy gördülékenyen menjen a projekt.
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-petrol-700 mb-2">
            Domain
          </label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={onChange}
            placeholder="pl. peldaceg.hu – ha van már domain"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="hosting" className="block text-sm font-medium text-petrol-700 mb-2">
            Tárhely
          </label>
          <select
            id="hosting"
            name="hosting"
            value={formData.hosting}
            onChange={onChange}
            className="w-full"
          >
            <option value="">Válassz...</option>
            <option value="Van">Van tárhelyem</option>
            <option value="Nincs">Nincs tárhelyem</option>
            <option value="Nem tudom">Nem tudom</option>
          </select>
        </div>

        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-petrol-700 mb-2">
            Nyelvi igények
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={onChange}
            placeholder="pl. Csak magyar, Magyar + Angol..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function StepSix({ formData, onChange }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-petrol-800 mb-1">
        Kommunikáció
      </h2>
      <p className="text-petrol-500 text-sm mb-6">
        Hogyan tartsuk a kapcsolatot a projekt során?
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="preferredContact" className="block text-sm font-medium text-petrol-700 mb-2">
            Preferált kapcsolattartás
          </label>
          <select
            id="preferredContact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={onChange}
            className="w-full"
          >
            <option value="">Válassz...</option>
            <option value="Email">Email</option>
            <option value="Telefon">Telefon</option>
            <option value="Mindkettő">Mindkettő</option>
          </select>
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-petrol-700 mb-2">
            Egyéb megjegyzés
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={4}
            value={formData.additionalNotes}
            onChange={onChange}
            placeholder="Bármi, amit még fontosnak tartasz..."
            className="w-full resize-none"
          />
        </div>
      </div>
    </div>
  );
}
