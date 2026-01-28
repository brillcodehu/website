import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Garancia from "@/components/Garancia";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import RiskReversal from "@/components/RiskReversal";
import FAQ from "@/components/FAQ";
import MoreServices from "@/components/MoreServices";
import OrderForm from "@/components/OrderForm";
import StickyHeader from "@/components/StickyHeader";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import Footer from "@/components/Footer";

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
        <Testimonials />
        <RiskReversal />
        <FAQ />
        <MoreServices />
        <OrderForm />
      </main>

      <Footer />
    </>
  );
}
