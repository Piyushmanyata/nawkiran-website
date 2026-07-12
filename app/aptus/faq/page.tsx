import type { Metadata } from "next";
import { FaqPage } from "@/components/FaqList";
import { aptusFaqs } from "@/lib/faq";
import { APTUS_SITE_PATH } from "@/lib/aptus";
import { SITE_URL } from "@/lib/site";

const URL = `${SITE_URL}${APTUS_SITE_PATH}/faq`;

export const metadata: Metadata = {
  title: "Aptus Packaging FAQ",
  description: "Answers about Aptus cosmetic PET bottles, pharma bottles, plastic closures, ASB bottle lines, SACMI technology, and box-based enquiries.",
  alternates: { canonical: URL },
};

export default function AptusFaqPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${URL}#faq`,
    mainEntity: aptusFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <FaqPage
        title="Aptus packaging questions, answered."
        description="A quick guide to Aptus bottles, closures, machinery, box quantities, and WhatsApp enquiries."
        items={aptusFaqs}
        backHref={APTUS_SITE_PATH}
        backLabel="Back to Aptus"
      />
    </>
  );
}
