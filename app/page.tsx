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

export default function Home() {
  return (
    <>
      <StickyHeader />
      <MobileBottomCTA />

      <main>
        <Hero />
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
