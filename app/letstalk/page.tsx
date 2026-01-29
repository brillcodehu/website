import type { Metadata } from "next";
import LetstalkWizard from "@/components/LetstalkWizard";

export const metadata: Metadata = {
  title: "Projekt kérdőív | BrillCode",
  description:
    "Töltsd ki a kérdőívet, hogy a lehető legjobb landing oldalt készítsük el neked.",
  robots: { index: false, follow: false },
};

export default function LetstalkPage() {
  return <LetstalkWizard />;
}
