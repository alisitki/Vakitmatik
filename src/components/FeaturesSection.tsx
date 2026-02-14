import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import type { FeatureItem } from "@/types/landing";

type FeaturesSectionProps = {
  items: FeatureItem[];
};

export function FeaturesSection({ items }: FeaturesSectionProps) {
  return (
    <section id="ozellikler" className="section-space">
      <div className="container-shell space-y-10">
        <SectionIntro
          eyebrow="Öne çıkan özellikler"
          title="Motion-first tasarım içinde sade ama güçlü ürün anlatımı"
          description="Vakitmatik, görsel sadelik ve operasyonel netliği aynı akışta birleştirir."
        />

        <div className="feature-grid">
          {items.map((item, index) => (
            <Reveal key={item.title} className="feature-card" delay={0.08 + index * 0.04}>
              <span className="feature-index">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
