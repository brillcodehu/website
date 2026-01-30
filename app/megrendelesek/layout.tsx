import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Megrendelések | BrillCode",
  description: "Főoldali megrendelések listája.",
  robots: { index: false, follow: false },
};

export default function MegrendelesekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
