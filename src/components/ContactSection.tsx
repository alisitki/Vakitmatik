import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/SectionIntro";
import type { ContactItem } from "@/types/landing";

type ContactSectionProps = {
  items: ContactItem[];
};

export function ContactSection({ items }: ContactSectionProps) {
  return (
    <section id="iletisim" className="section-space pb-16 sm:pb-24">
      <div className="container-shell space-y-10">
        <SectionIntro
          eyebrow="İletişim"
          title="Teklif ve ürün bilgisi için bize ulaşın"
          description="Bu sürümde iletişim alanı yalnızca bilgi gösterimi amaçlıdır."
        />

        <ul className="contact-grid">
          {items.map((item, index) => (
            <Reveal key={item.label} className="contact-card" delay={0.08 + index * 0.07}>
              <p className="contact-label">{item.label}</p>
              {item.href ? (
                <a className="contact-value" href={item.href}>
                  {item.value}
                </a>
              ) : (
                <p className="contact-value">{item.value}</p>
              )}
              {item.note ? <p className="contact-note">{item.note}</p> : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
