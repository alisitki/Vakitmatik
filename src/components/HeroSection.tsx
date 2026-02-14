"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ParticleField } from "@/components/motion/ParticleField";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeading";
import { ENTRANCE_CONFIG } from "@/config/heroMotion";
import type { HeroHighlightItem } from "@/types/landing";

type HeroSectionProps = {
  highlights: HeroHighlightItem[];
};

export function HeroSection({ highlights }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || hasAnimated.current) return;
    hasAnimated.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const cfg = ENTRANCE_CONFIG;

    const ctx = gsap.context(() => {
      const eyebrow = node.querySelector(".eyebrow");
      const description = node.querySelector(".hero-description");
      const buttons = node.querySelectorAll(".hero-buttons a");
      const device = node.querySelector(".hero-device");

      // Set initial state
      const targets = [eyebrow, description, device].filter(Boolean);
      gsap.set(targets, { opacity: 0, y: cfg.distance });
      gsap.set(buttons, { opacity: 0, y: cfg.distance * 0.6, scale: cfg.buttonScale });

      // Eyebrow
      if (eyebrow) {
        gsap.to(eyebrow, {
          opacity: 1, y: 0,
          duration: cfg.duration,
          delay: cfg.eyebrow,
          ease: cfg.ease,
        });
      }

      // Description
      if (description) {
        gsap.to(description, {
          opacity: 1, y: 0,
          duration: cfg.duration,
          delay: cfg.description,
          ease: cfg.ease,
        });
      }

      // Buttons
      gsap.to(buttons, {
        opacity: 1, y: 0, scale: 1,
        duration: cfg.duration * 0.85,
        delay: cfg.buttons,
        ease: cfg.ease,
        stagger: 0.08,
      });

      // Device image
      if (device) {
        gsap.to(device, {
          opacity: 1, y: 0,
          duration: cfg.duration * 1.1,
          delay: cfg.device,
          ease: cfg.ease,
        });
      }
    }, node);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section id="urun" className="hero-section" ref={heroRef}>
      <ParticleField className="hero-particle-layer" />

      <div className="container-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Yeni nesil vakit paneli</p>
          <TypedHeading className="hero-typed" />
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
        </div>

        <div className="hero-device">
          <Image
            src="/images/vakitmatik-device.svg"
            alt="Vakitmatik cihazı temsil görseli"
            width={760}
            height={560}
            priority
            className="hero-device-image"
          />
        </div>
      </div>

      <div className="container-shell hero-highlight-grid">
        {highlights.map((item, index) => (
          <Reveal key={item.title} className="hero-highlight-card" delay={ENTRANCE_CONFIG.highlightCards.baseDelay + index * ENTRANCE_CONFIG.highlightCards.stagger}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
