import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import type { UseCaseItem } from "@/types/landing";

type UseCasesSectionProps = {
  items: UseCaseItem[];
};

export function UseCasesSection({ items }: UseCasesSectionProps) {
  return (
    <section id="kullanim-alanlari" className="section-space">
      <div className="container-shell space-y-10">
        <SectionIntro
          eyebrow="Kullanım alanları"
          title="Farklı mekanlarda aynı güvenli bilgi akışı"
          description="Tek panel yaklaşımı ile farklı ölçeklerde tutarlı bir kullanıcı deneyimi sunar."
        />

        <div className="usecase-grid">
          {items.map((item, index) => (
            <Reveal key={item.title} className="usecase-card" delay={0.08 + index * 0.05}>
              <p className="badge-soft">{item.tag}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
