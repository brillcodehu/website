"use client";

import { useState } from "react";

type EmailType = "first_view" | "product_ready" | "complete";

const INPUT_CLASS =
  "w-full px-4 py-3 border border-petrol-200 rounded-lg text-petrol-800 placeholder:text-petrol-400 focus:border-petrol-500 focus:ring-1 focus:ring-petrol-500 outline-none transition";

export default function SenderguidePage() {
  const [type, setType] = useState<EmailType>("first_view");
  const [url, setUrl] = useState("");
  const [to, setTo] = useState("");
  const [projektneve, setProjektneve] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const buildBody = (): Record<string, string> => {
    const base: Record<string, string> = { type, to: to.trim() };
    if (type === "first_view" || type === "product_ready") {
      base.url = url.trim();
    }
    if (type === "product_ready") {
      base.projektneve = projektneve.trim();
    }
    if (type === "complete") {
      base.downloadLink = downloadLink.trim();
      base.invoiceLink = invoiceLink.trim();
    }
    return base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/senderguide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildBody()),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Hiba történt a küldés során.");
        return;
      }

      setStatus("success");
      setMessage("Email sikeresen elküldve.");
      setUrl("");
      setTo("");
      setProjektneve("");
      setDownloadLink("");
      setInvoiceLink("");
    } catch {
      setStatus("error");
      setMessage("Hiba történt a küldés során.");
    }
  };

  const showUrl = type === "first_view" || type === "product_ready";
  const showProjektneve = type === "product_ready";
  const showCompleteLinks = type === "complete";

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-petrol-100 p-8">
        <h1 className="text-2xl font-bold text-petrol-800 mb-2">Senderguide</h1>
        <p className="text-sm text-petrol-600 mb-6">
          Válaszd ki az email típust, töltsd ki a mezőket, majd küldd el.
        </p>

        <div className="flex gap-2 mb-6">
          {(["first_view", "product_ready", "complete"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                type === t
                  ? "bg-petrol-600 text-white"
                  : "bg-petrol-100 text-petrol-700 hover:bg-petrol-200"
              }`}
            >
              {t === "first_view" ? "First view" : t === "product_ready" ? "Product ready" : "Complete"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {showUrl && (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-petrol-700 mb-2">
                Kész oldal webcíme *
              </label>
              <input
                id="url"
                type="url"
                required={showUrl}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://brillcode.hu/figala/nemethbau"
                className={INPUT_CLASS}
              />
            </div>
          )}

          {showProjektneve && (
            <div>
              <label htmlFor="projektneve" className="block text-sm font-medium text-petrol-700 mb-2">
                Projekt neve *
              </label>
              <input
                id="projektneve"
                type="text"
                required={showProjektneve}
                value={projektneve}
                onChange={(e) => setProjektneve(e.target.value)}
                placeholder="pl. Nemeth Bau"
                className={INPUT_CLASS}
              />
            </div>
          )}

          {showCompleteLinks && (
            <>
              <div>
                <label htmlFor="downloadLink" className="block text-sm font-medium text-petrol-700 mb-2">
                  Weboldal letöltés linkje *
                </label>
                <input
                  id="downloadLink"
                  type="url"
                  required={showCompleteLinks}
                  value={downloadLink}
                  onChange={(e) => setDownloadLink(e.target.value)}
                  placeholder="https://..."
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="invoiceLink" className="block text-sm font-medium text-petrol-700 mb-2">
                  Számla linkje *
                </label>
                <input
                  id="invoiceLink"
                  type="url"
                  required={showCompleteLinks}
                  value={invoiceLink}
                  onChange={(e) => setInvoiceLink(e.target.value)}
                  placeholder="https://..."
                  className={INPUT_CLASS}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="to" className="block text-sm font-medium text-petrol-700 mb-2">
              Címzett email címe *
            </label>
            <input
              id="to"
              type="email"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="ugyfel@example.hu"
              className={INPUT_CLASS}
            />
          </div>

          {message && (
            <div
              className={`rounded-lg px-4 py-3 text-sm ${
                status === "success"
                  ? "bg-teal-50 text-teal-800 border border-teal-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 px-4 bg-petrol-600 hover:bg-petrol-700 disabled:bg-petrol-400 text-white font-semibold rounded-lg transition-colors"
          >
            {status === "sending" ? "Küldés..." : "Email küldése"}
          </button>
        </form>
      </div>
    </div>
  );
}
