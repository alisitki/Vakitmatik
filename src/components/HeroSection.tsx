import Image from "next/image";
import { ParticleField } from "@/components/motion/ParticleField";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeading";
import type { HeroHighlightItem, HeroTypedLine, MotionConfig } from "@/types/landing";

type HeroSectionProps = {
  lines: HeroTypedLine[];
  highlights: HeroHighlightItem[];
  motionConfig: MotionConfig;
};

export function HeroSection({ lines, highlights, motionConfig }: HeroSectionProps) {
  return (
    <section id="urun" className="hero-section">
      <ParticleField className="hero-particle-layer" config={motionConfig} />

      <div className="container-shell hero-grid">
        <Reveal className="hero-copy" delay={0.05}>
          <p className="eyebrow">Yeni nesil vakit paneli</p>
          <TypedHeading lines={lines} className="hero-typed" startDelay={0.05} />
          <p className="hero-description">
            Vakitmatik, ibadet alanlarında vakit bilgisini yüksek görünürlükle sunan, görevli kullanımını
            kolaylaştıran ve modern sunum standardı oluşturan tek sayfa deneyim yaklaşımıyla hazırlanmıştır.
          </p>
          <div className="hero-buttons">
            <a className="btn-primary" href="#urun-deneyimi">
              Ürünü Keşfet
            </a>
            <a className="btn-secondary" href="#ozellikler">
              Özellikleri İncele
            </a>
          </div>
        </Reveal>

        <Reveal className="hero-device" delay={0.18}>
          <Image
            src="/images/vakitmatik-device.svg"
            alt="Vakitmatik cihazı temsil görseli"
            width={760}
            height={560}
            priority
            className="hero-device-image"
          />
        </Reveal>
      </div>

      <div className="container-shell hero-highlight-grid">
        {highlights.map((item, index) => (
          <Reveal key={item.title} className="hero-highlight-card" delay={0.16 + index * 0.07}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
