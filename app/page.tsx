import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Products } from "@/components/Products";
import { Capabilities } from "@/components/Capabilities";
import { WhyNawkiran } from "@/components/WhyNawkiran";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SectionDivider } from "@/components/SunArc";
import { nawkiranStructuredData } from "@/lib/nawkiran-structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(nawkiranStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main id="main-content">
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
