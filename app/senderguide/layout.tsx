import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Senderguide | BrillCode",
  description: "Weboldal első verziója kész – email küldése az ügyfélnek.",
  robots: { index: false, follow: false },
};

export default function SenderguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
