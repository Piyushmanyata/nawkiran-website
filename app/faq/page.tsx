import type { Metadata } from "next";
import { FaqPage } from "@/components/FaqList";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { nawkiranFaqs } from "@/lib/faq";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "PET Preform FAQ",
  description: "Answers about Nawkiran PET preform families, rPET-ready options, capacity, locations, and quote requests.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function NawkiranFaqPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faq`,
    mainEntity: nawkiranFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Nav />
      <FaqPage
        title="PET preform questions, answered."
        description="A quick guide to Nawkiran product families, rPET-ready packaging conversations, capacity, locations, and WhatsApp enquiries."
        items={nawkiranFaqs}
        backHref="/"
        backLabel="Back to Nawkiran"
      />
      <Footer />
    </>
  );
}
