import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { SectionDivider } from "@/components/SunArc";

// Below-fold sections — code-split into separate JS chunks, SSR preserved
const Products = dynamic(() => import("@/components/Products").then((m) => ({ default: m.Products })));
const Capabilities = dynamic(() => import("@/components/Capabilities").then((m) => ({ default: m.Capabilities })));
const WhyNawkiran = dynamic(() => import("@/components/WhyNawkiran").then((m) => ({ default: m.WhyNawkiran })));
const ProcessTimeline = dynamic(() => import("@/components/ProcessTimeline").then((m) => ({ default: m.ProcessTimeline })));
const Contact = dynamic(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));
const FAQ = dynamic(() => import("@/components/FAQ").then((m) => ({ default: m.FAQ })));
const FinalCTA = dynamic(() => import("@/components/FinalCTA").then((m) => ({ default: m.FinalCTA })));
const Footer = dynamic(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const FloatingCTA = dynamic(() => import("@/components/FloatingCTA").then((m) => ({ default: m.FloatingCTA })));

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <SectionDivider />
        <Products />
        <Capabilities />
        <SectionDivider />
        <WhyNawkiran />
        <ProcessTimeline />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
