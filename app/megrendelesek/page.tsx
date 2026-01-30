"use client";

import { useState } from "react";

type OrderRecord = {
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  business: string;
  goal: string;
  hasWebsite?: string;
  notes?: string;
};

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("hu-HU", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function MegrendelesekPage() {
  const [secret, setSecret] = useState("");
  const [orders, setOrders] = useState<OrderRecord[] | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    if (!secret.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(
        `/api/orders?secret=${encodeURIComponent(secret.trim())}`
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Hiba a betöltéskor.");
        setOrders(null);
        setStatus("error");
        return;
      }
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setStatus("idle");
    } catch {
      setErrorMsg("Hiba a betöltéskor.");
      setOrders(null);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-petrol-100 p-8">
        <h1 className="text-2xl font-bold text-petrol-800 mb-2">
          Megrendelések listája
        </h1>
        <p className="text-sm text-petrol-600 mb-6">
          Ki és mikor adta le a megrendelést a főoldalon.
        </p>

        {orders === null ? (
          <>
            <div className="space-y-4 mb-6">
              <label
                htmlFor="secret"
                className="block text-sm font-medium text-petrol-700"
              >
                Jelszó (ORDERS_SECRET)
              </label>
              <input
                id="secret"
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && load()}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-petrol-200 rounded-lg text-petrol-800 placeholder:text-petrol-400 focus:border-petrol-500 focus:ring-1 focus:ring-petrol-500 outline-none"
              />
            </div>
            {errorMsg && (
              <div className="mb-4 rounded-lg px-4 py-3 text-sm bg-red-50 text-red-800 border border-red-200">
                {errorMsg}
              </div>
            )}
            <button
              type="button"
              onClick={load}
              disabled={status === "loading" || !secret.trim()}
              className="w-full py-3 px-4 bg-petrol-600 hover:bg-petrol-700 disabled:bg-petrol-400 text-white font-semibold rounded-lg transition-colors"
            >
              {status === "loading" ? "Betöltés..." : "Lista betöltése"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-petrol-600 mb-4">
              Összesen <strong>{orders.length}</strong> megrendelés.
            </p>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {orders.length === 0 ? (
                <p className="text-petrol-600">Még nincs rögzített megrendelés.</p>
              ) : (
                [...orders].reverse().map((o, i) => (
                  <div
                    key={`${o.timestamp}-${o.email}-${i}`}
                    className="border border-petrol-100 rounded-xl p-4 bg-petrol-50/30"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-petrol-500 mb-2">
                      <span>{formatDate(o.timestamp)}</span>
                    </div>
                    <div className="font-semibold text-petrol-800">
                      {o.name} · {o.business}
                    </div>
                    <div className="text-sm text-petrol-600">
                      {o.email}
                      {o.phone ? ` · ${o.phone}` : ""}
                    </div>
                    <div className="text-sm text-petrol-600 mt-1">
                      Cél: {o.goal}
                      {o.hasWebsite ? ` · Web: ${o.hasWebsite}` : ""}
                    </div>
                    {o.notes && (
                      <div className="text-sm text-petrol-600 mt-1 italic">
                        {o.notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <button
              type="button"
              onClick={() => setOrders(null)}
              className="mt-6 w-full py-2 px-4 border border-petrol-200 text-petrol-700 rounded-lg hover:bg-petrol-50 transition-colors"
            >
              Újra betöltés
            </button>
          </>
        )}
      </div>
    </div>
  );
}
