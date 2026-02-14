"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  distance?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  distance = 22,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const node = ref.current;
    if (!node) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(node, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 86%",
            once,
          },
        },
      );
    }, node);

    return () => {
      ctx.revert();
    };
  }, [delay, distance, once]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
