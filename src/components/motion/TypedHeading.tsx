"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroTypedLine } from "@/types/landing";

type TypedHeadingProps = {
  lines: HeroTypedLine[];
  className?: string;
  startDelay?: number;
  once?: boolean;
};

export function TypedHeading({ lines, className, startDelay = 0, once = true }: TypedHeadingProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  const joinedText = useMemo(() => lines.map((line) => line.text).join(" "), [lines]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const node = rootRef.current;
    if (!node) {
      return;
    }

    const chars = Array.from(node.querySelectorAll<HTMLElement>("[data-char]"));
    if (chars.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Ensure initial state is hidden but ready
      gsap.set(chars, { opacity: 0, y: 26 });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.02,
        delay: startDelay,
        // Remove scrollTrigger for Hero or make it very sensitive
        scrollTrigger: {
          trigger: node,
          start: "top bottom", // Trigger as soon as it enters viewport
          once,
        },
        onComplete: () => {
          // Safety ensure visibility
          gsap.set(chars, { opacity: 1, y: 0 });
        }
      });
    }, node);

    return () => {
      ctx.revert();
    };
  }, [lines, once, startDelay]);

  return (
    <h1 ref={rootRef} className={className} aria-label={joinedText}>
      <span className="sr-only">{joinedText}</span>
      <span aria-hidden="true" className="typed-lines-wrap">
        {lines.map((line, lineIndex) => (
          <span key={`${line.text}-${lineIndex}`} className={`typed-line ${line.className ?? ""}`}>
            {line.text.split("").map((char, charIndex) => (
              <span data-char key={`${lineIndex}-${charIndex}`} className="typed-char">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        ))}
        <span className="typed-cursor" aria-hidden="true">|</span>
      </span>
    </h1>
  );
}
