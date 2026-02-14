import { Reveal } from "@/components/motion/Reveal";

export function ExploreCtaSection() {
  return (
    <section className="section-space section-tight">
      <div className="container-shell">
        <Reveal className="cta-panel" delay={0.05}>
          <p className="eyebrow">Keşif akışı</p>
          <h2>Ürün akışını kart bazlı deneyimle inceleyin</h2>
          <p>Vakitmatik&apos;in sahadaki kullanım mantığını bir sonraki bölümde adım adım gezin.</p>
          <a className="cta-button" href="#urun-deneyimi">
            Ürünü Keşfet →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
