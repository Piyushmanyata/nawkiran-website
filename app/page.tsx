import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Products } from "@/components/Products";
import { Capabilities } from "@/components/Capabilities";
import { WhyNawkiran } from "@/components/WhyNawkiran";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reach } from "@/components/Reach";
import { Contact } from "@/components/Contact";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SectionDivider } from "@/components/SunArc";

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
        <Reach />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
