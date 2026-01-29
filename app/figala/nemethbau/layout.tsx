import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Németh Bau 2000 | Gépi földmunka & Generálkivitelezés",
  description:
    "Gépi földmunka és generálkivitelezés megbízhatóan, határidőre. Kérjen ingyenes árajánlatot!",
  robots: { index: true, follow: true },
};

export default function NemethBauLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
