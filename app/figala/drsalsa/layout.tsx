import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Salsa | Kezdő Salsa, Bachata & Kizomba Kurzusok",
  description:
    "Táncolj velünk! Ingyenes bemutatóóra salsa, bachata és kizomba kezdő kurzusokon. 10+ év tapasztalat, párban oktatás, 100% elégedettségi garancia.",
  robots: { index: true, follow: true },
};

export default function DrSalsaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
