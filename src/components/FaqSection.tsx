import { SectionIntro } from "@/components/SectionIntro";
import type { FaqItem } from "@/types/landing";

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section id="sss" className="section-space">
      <div className="container-shell space-y-10">
        <SectionIntro
          eyebrow="SSS"
          title="Karar sürecinde en hızlı cevaplanan başlıklar"
          description="Kısa ve net yanıtlarla ürün değerlendirme sürecini hızlandırır."
        />

        <div className="faq-list">
          {items.map((item, index) => (
            <details key={item.question} className="faq-item" open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
