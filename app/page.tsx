import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import StickyHeader from "@/components/StickyHeader";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import Footer from "@/components/Footer";

// Lazy load components below the fold
const Problem = dynamic(() => import("@/components/Problem"), { ssr: true });
const Solution = dynamic(() => import("@/components/Solution"), { ssr: true });
const Garancia = dynamic(() => import("@/components/Garancia"), { ssr: true });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: true });
const RiskReversal = dynamic(() => import("@/components/RiskReversal"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const MoreServices = dynamic(() => import("@/components/MoreServices"), { ssr: true });
const OrderForm = dynamic(() => import("@/components/OrderForm"), { ssr: true });

// Egy szám mindenhol (Hero + mobil alsó sáv). Determinisztikus, hogy ne legyen hydration mismatch.
function getCapacity() {
  const d = new Date();
  return (d.getDate() + d.getHours()) % 3 + 1;
}

export default function Home() {
  const capacity = getCapacity();
  return (
    <>
      <StickyHeader />
      <MobileBottomCTA capacity={capacity} />

      <main>
        <Hero capacity={capacity} />
        <Problem />
        <Solution />
        <Garancia />
        <Pricing />
        <RiskReversal />
        <FAQ />
        <MoreServices />
        <OrderForm />
      </main>

      <Footer />
    </>
  );
}
