import { SectionIntro } from "@/components/SectionIntro";
import type { StepItem } from "@/types/landing";

type HowItWorksSectionProps = {
  items: StepItem[];
};

export function HowItWorksSection({ items }: HowItWorksSectionProps) {
  return (
    <section id="nasil-calisir" className="section-space">
      <div className="container-shell space-y-10">
        <SectionIntro
          eyebrow="Nasıl çalışır"
          title="Kurulumdan günlük kullanıma üç adım"
          description="Tek sayfalık bu lansman akışında, ürünün pratik kullanım mantığını kısa ve net adımlarla anlatıyoruz."
        />

        <ol className="grid gap-5 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="panel p-6 reveal"
              style={{ animationDelay: `${100 + index * 90}ms` }}
            >
              <span className="step-number">{index + 1}</span>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-[var(--ink-muted)] sm:text-base">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
