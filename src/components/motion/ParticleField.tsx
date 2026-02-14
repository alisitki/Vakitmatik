"use client";

import { useEffect, useRef } from "react";
import type { MotionConfig } from "@/types/landing";

type ParticleFieldProps = {
  config: MotionConfig;
  className?: string;
};

interface Dash {
  x: number;
  y: number;
  angle: number;
  length: number;
  speed: number;
  drift: number;
  color: string;
  opacity: number;
  thickness: number;
}

function pickDensity(width: number, config: MotionConfig) {
  if (width < 768) return config.density.mobile;
  if (width < 1100) return config.density.tablet;
  return config.density.desktop;
}

/**
 * Antigravity-style particle field using Canvas 2D.
 * Renders thin colorful dashes that gently drift and respond to mouse.
 */
export function ParticleField({ config, className }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.className = "particle-canvas";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      container.removeChild(canvas);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let visible = true;

    // Mouse state
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    // Dashes
    const dashes: Dash[] = [];

    // Palette: heavily weight toward blue to match antigravity.google
    const weightedPalette = [
      ...config.palette.slice(0, 1), // blue
      ...config.palette.slice(0, 1), // blue again
      ...config.palette.slice(0, 1), // blue again
      ...config.palette.slice(0, 1), // blue again
      ...config.palette.slice(0, 1), // blue again
      ...config.palette.slice(1),    // other colors rarely
    ];

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createDashes = () => {
      dashes.length = 0;
      const count = reducedMotion
        ? Math.floor(pickDensity(width, config) * 0.2)
        : pickDengths(width, config);

      for (let i = 0; i < count; i++) {
        dashes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          angle: Math.random() * Math.PI * 2,
          length: 4 + Math.random() * 14,  // 4-18px length (thin dashes)
          speed: 0.08 + Math.random() * 0.18,
          drift: (Math.random() - 0.5) * 0.3,
          color: weightedPalette[Math.floor(Math.random() * weightedPalette.length)],
          opacity: 0.3 + Math.random() * 0.5,  // 0.3-0.8 opacity
          thickness: 1 + Math.random() * 1.2,   // 1-2.2px thin
        });
      }
    };

    resize();
    createDashes();

    // Visibility observer
    const observer = new IntersectionObserver(
      (entries) => { visible = !!entries[0]?.isIntersecting; },
      { threshold: 0.05 },
    );
    observer.observe(container);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!visible) return;

      time += 0.016; // ~60fps timestep

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dashes.length; i++) {
        const d = dashes[i];

        // Base movement: gentle drift
        d.x += Math.cos(d.angle) * d.speed + d.drift * Math.sin(time * 0.5 + i);
        d.y += Math.sin(d.angle) * d.speed + d.drift * Math.cos(time * 0.4 + i * 0.7);

        // Mouse parallax/push effect
        if (mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = 200;

          if (dist < pushRadius && dist > 0) {
            const force = ((pushRadius - dist) / pushRadius) * 1.5;
            d.x += (dx / dist) * force;
            d.y += (dy / dist) * force;
          }
        }

        // Wrap around edges
        if (d.x < -20) d.x = width + 20;
        if (d.x > width + 20) d.x = -20;
        if (d.y < -20) d.y = height + 20;
        if (d.y > height + 20) d.y = -20;

        // Draw the dash
        const halfLen = d.length / 2;
        const cos = Math.cos(d.angle);
        const sin = Math.sin(d.angle);

        ctx.beginPath();
        ctx.moveTo(d.x - cos * halfLen, d.y - sin * halfLen);
        ctx.lineTo(d.x + cos * halfLen, d.y + sin * halfLen);
        ctx.strokeStyle = d.color;
        ctx.globalAlpha = d.opacity;
        ctx.lineWidth = d.thickness;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    animate();

    const handleResize = () => {
      resize();
      createDashes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [config]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <div className="particle-fallback" />
    </div>
  );
}

// Helper — typo-safe alias
function pickDengths(width: number, config: MotionConfig) {
  return pickDensity(width, config);
}
