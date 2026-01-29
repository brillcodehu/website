"use client";

import { useState } from "react";

export default function SenderguidePage() {
  const [url, setUrl] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/senderguide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), to: to.trim() }),
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
    } catch {
      setStatus("error");
      setMessage("Hiba történt a küldés során.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-petrol-100 p-8">
        <h1 className="text-2xl font-bold text-petrol-800 mb-2">Senderguide</h1>
        <p className="text-sm text-petrol-600 mb-6">
          Add meg a kész oldal linkjét és az ügyfél emailjét – az ügyfél megkapja a „Weboldalad első verziója kész” emailt.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-petrol-700 mb-2">
              Kész oldal webcíme *
            </label>
            <input
              id="url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://brillcode.hu/figala/nemethbau"
              className="w-full px-4 py-3 border border-petrol-200 rounded-lg text-petrol-800 placeholder:text-petrol-400 focus:border-petrol-500 focus:ring-1 focus:ring-petrol-500 outline-none transition"
            />
          </div>

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
              className="w-full px-4 py-3 border border-petrol-200 rounded-lg text-petrol-800 placeholder:text-petrol-400 focus:border-petrol-500 focus:ring-1 focus:ring-petrol-500 outline-none transition"
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
