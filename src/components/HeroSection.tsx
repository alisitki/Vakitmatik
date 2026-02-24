"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ParticleField } from "@/components/motion/ParticleField";
import { Reveal } from "@/components/motion/Reveal";
import { TypedHeading } from "@/components/motion/TypedHeading";
import { ParticleSettings } from "@/components/motion/ParticleSettings";
import { DynamicVakitRGB, type DeviceData } from "@/components/motion/DynamicVakitRGB";
import { ENTRANCE_CONFIG } from "@/config/heroMotion";
import { MEDUSAE_DEFAULTS, type MedusaeConfig } from "@/config/medusaeConfig";
import type { HeroHighlightItem } from "@/types/landing";
import { useMemo } from "react";

const STORAGE_KEY = "vakitmatik-particle-config";

type HeroSectionProps = {
  highlights: HeroHighlightItem[];
};

export function HeroSection({ highlights }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [particleConfig, setParticleConfig] = useEffectState<MedusaeConfig>(MEDUSAE_DEFAULTS, STORAGE_KEY);
  const deviceData = useDeviceData();

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
      <ParticleField className="hero-particle-layer" config={particleConfig} />

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
          <DynamicVakitRGB
            colors={particleConfig.device}
            data={deviceData}
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

      <ParticleSettings config={particleConfig} onChange={setParticleConfig} />
    </section>
  );
}

/** ── Custom hook for state with persistence ── */
function useEffectState<T>(defaultValue: T, key: string): [T, (val: T) => void] {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const savedConfig = localStorage.getItem(key);
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Robust merge to ensure new keys (like device animation) are present
        setState({
          ...defaultValue as any, // Cast to any to allow merging with specific properties like 'device'
          ...parsed,
          device: {
            ...(defaultValue as any).device,
            ...(parsed.device || {})
          }
        });
      } catch (e) {
        console.error("Failed to parse config", e);
      }
    }
  }, [key]);

  const setAndSave = (val: T) => {
    setState(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [state, setAndSave];
}

function useDeviceData(): DeviceData {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return useMemo(() => ({
    times: {
      imsak: "05:24",
      gunes: "06:48",
      ogle: "13:12",
      ikindi: "16:20",
      aksam: "18:55",
      yatsi: "20:15"
    },
    clock: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    year: now.getFullYear().toString(),
    day: now.getDate().toString().padStart(2, '0'),
    month: (now.getMonth() + 1).toString().padStart(2, '0')
  }), [now]);
}
