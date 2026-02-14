"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { ShowcaseItem } from "@/types/landing";

type ProductShowcaseSectionProps = {
  items: ShowcaseItem[];
};

export function ProductShowcaseSection({ items }: ProductShowcaseSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});

  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const node = cardRefs.current[index];
    node?.scrollIntoView({ behavior, inline: "center", block: "nearest" });
  }, []);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const bounded = Math.min(items.length - 1, Math.max(0, nextIndex));
      setActiveIndex(bounded);
      scrollToIndex(bounded);
    },
    [items.length, scrollToIndex],
  );

  const goNext = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex]);

  const goPrev = useCallback(() => {
    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);



  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    let timeoutId = 0;

    const handleScroll = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const center = viewport.scrollLeft + viewport.clientWidth / 2;

        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cardRefs.current.forEach((card, index) => {
          if (!card) {
            return;
          }

          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const distance = Math.abs(cardCenter - center);

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setActiveIndex((current) => (current === nearestIndex ? current : nearestIndex));
      }, 50);
    };

    viewport.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="urun-deneyimi" className="section-space">
      <div className="container-shell">
        <Reveal className="section-intro" delay={0.05}>
          <p className="eyebrow">Ürün deneyimi</p>
          <h2>Vakitmatik kullanım akışını adım adım keşfedin</h2>
          <p>Kartları kaydırarak ürünün günlük kullanıma nasıl uyumlandığını inceleyin.</p>
        </Reveal>

        <div
          className="showcase-shell"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goNext();
            }

            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goPrev();
            }
          }}
          tabIndex={0}
          role="region"
          aria-label="Ürün deneyim kartları"
        >
          <div
            ref={viewportRef}
            className="showcase-viewport"
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) {
                return;
              }

              const endX = event.changedTouches[0]?.clientX ?? 0;
              const diff = endX - touchStartX.current;
              touchStartX.current = null;

              if (Math.abs(diff) < 50) {
                return;
              }

              if (diff < 0) {
                goNext();
              } else {
                goPrev();
              }
            }}
          >
            <div className="showcase-track">
              {items.map((item, index) => {
                const active = index === activeIndex;
                const failed = videoErrors[index];
                const showVideo = item.media.type === "video" && !failed;

                return (
                  <article
                    key={item.id}
                    className={`showcase-slide ${active ? "is-active" : ""}`}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    aria-label={`${index + 1}. kart: ${item.title}`}
                  >
                    <div className="showcase-media">
                      {showVideo ? (
                        <video
                          className="showcase-video"
                          autoPlay={active}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          poster={item.media.poster}
                          onError={() => {
                            setVideoErrors((prev) => ({ ...prev, [index]: true }));
                          }}
                        >
                          <source src={item.media.src} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={item.media.poster ?? item.media.src}
                          alt={item.media.alt}
                          fill
                          sizes="(max-width: 768px) 86vw, (max-width: 1200px) 72vw, 64vw"
                          className="showcase-image"
                        />
                      )}
                    </div>

                    <div className="showcase-content">
                      <p className="badge-soft">0{index + 1}</p>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="showcase-controls">
            <button
              type="button"
              className="showcase-nav-btn"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Önceki kart"
            >
              Geri
            </button>

            <p className="showcase-indicator" aria-live="polite">
              {activeIndex + 1} / {items.length}
            </p>

            <button
              type="button"
              className="showcase-nav-btn"
              onClick={goNext}
              disabled={activeIndex === items.length - 1}
              aria-label="Sonraki kart"
            >
              İleri
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
