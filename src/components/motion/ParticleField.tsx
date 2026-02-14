"use client";

import { useEffect, useRef } from "react";
import { PARTICLE_CONFIG } from "@/config/heroMotion";

type ParticleFieldProps = {
  className?: string;
};

/* ── Particle data stored in flat arrays for zero-alloc rendering ── */

interface ParticleArrays {
  /** Current position */
  x: Float32Array;
  y: Float32Array;
  /** Angle on the ring (used for orbital drift) */
  ringAngle: Float32Array;
  /** Distance from ring center */
  ringRadius: Float32Array;
  /** Visual properties */
  strokeAngle: Float32Array;
  strokeLength: Float32Array;
  strokeThickness: Float32Array;
  opacity: Float32Array;
  /** Orbital drift speed */
  orbitSpeed: Float32Array;
  /** Radial oscillation phase */
  oscPhase: Float32Array;
  /** Color index into palette */
  colorIndex: Uint8Array;
}

function pickCount(width: number): number {
  const c = PARTICLE_CONFIG.count;
  if (width < 768) return c.mobile;
  if (width < 1100) return c.tablet;
  return c.desktop;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Antigravity-style ring-particle field.
 * Particles are distributed in an annulus around a center that chases the cursor.
 */
export function ParticleField({ className }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.className = "particle-canvas";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      container.removeChild(canvas);
      return;
    }

    const cfg = PARTICLE_CONFIG;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let visible = true;
    let startTime = performance.now();

    // Debug mode
    const isDebug = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("debug");
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let fps = 0;

    // Mouse / center state
    const mouse = { x: 0, y: 0, active: false };
    const center = { x: 0, y: 0 };

    // Particle arrays
    let particles: ParticleArrays | null = null;
    let count = 0;

    /* ── Resize ─────────────────────────────────────── */
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio, cfg.maxDpr);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Reset center to middle
      center.x = width / 2;
      center.y = height / 2;
    };

    /* ── Create particles in ring distribution ────── */
    const createParticles = () => {
      count = reducedMotion
        ? Math.floor(pickCount(width) * 0.15)
        : pickCount(width);

      const dim = Math.min(width, height);
      const innerR = dim * cfg.ring.innerRadius;
      const outerR = dim * cfg.ring.outerRadius;
      const s = cfg.stroke;
      const o = cfg.orbitSpeed;

      const p: ParticleArrays = {
        x: new Float32Array(count),
        y: new Float32Array(count),
        ringAngle: new Float32Array(count),
        ringRadius: new Float32Array(count),
        strokeAngle: new Float32Array(count),
        strokeLength: new Float32Array(count),
        strokeThickness: new Float32Array(count),
        opacity: new Float32Array(count),
        orbitSpeed: new Float32Array(count),
        oscPhase: new Float32Array(count),
        colorIndex: new Uint8Array(count),
      };

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Use sqrt for uniform area distribution in annulus
        const rNorm = Math.sqrt(Math.random());
        const r = innerR + rNorm * (outerR - innerR);

        p.ringAngle[i] = angle;
        p.ringRadius[i] = r;
        p.x[i] = center.x + Math.cos(angle) * r;
        p.y[i] = center.y + Math.sin(angle) * r;
        p.strokeAngle[i] = Math.random() * Math.PI * 2;
        p.strokeLength[i] = s.minLength + Math.random() * (s.maxLength - s.minLength);
        p.strokeThickness[i] = s.minThickness + Math.random() * (s.maxThickness - s.minThickness);

        // Alpha fades at inner/outer edges of the ring for depth illusion
        const edgeFade =
          rNorm < 0.15 ? rNorm / 0.15 :
            rNorm > 0.85 ? (1 - rNorm) / 0.15 :
              1;
        p.opacity[i] = lerp(s.minOpacity, s.maxOpacity, Math.random()) * edgeFade;

        p.orbitSpeed[i] = (o.min + Math.random() * (o.max - o.min)) * (Math.random() < 0.5 ? 1 : -1);
        p.oscPhase[i] = Math.random() * Math.PI * 2;
        p.colorIndex[i] = Math.floor(Math.random() * cfg.palette.length);
      }

      particles = p;
    };

    resize();
    createParticles();

    /* ── Visibility observer ───────────────────────── */
    const observer = new IntersectionObserver(
      (entries) => { visible = !!entries[0]?.isIntersecting; },
      { threshold: 0.05 },
    );
    observer.observe(container);

    /* ── Mouse tracking ────────────────────────────── */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    /* ── Animation loop ────────────────────────────── */
    let prevTime = performance.now();

    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate);
      if (!visible || !particles) return;

      // Delta time, clamped to avoid spiral of death
      const rawDt = now - prevTime;
      prevTime = now;
      const dt = Math.min(rawDt, 33); // cap at ~30fps equivalent step
      const elapsed = now - startTime;

      // FPS counter (debug)
      if (isDebug) {
        frameCount++;
        if (now - lastFpsTime >= 1000) {
          fps = frameCount;
          frameCount = 0;
          lastFpsTime = now;
        }
      }

      // ── Update center position ──
      if (mouse.active) {
        center.x += (mouse.x - center.x) * cfg.followStrength;
        center.y += (mouse.y - center.y) * cfg.followStrength;
      } else {
        // Idle: gentle Lissajous drift around canvas center
        const amp = cfg.idleDriftAmplitude;
        const spd = cfg.idleDriftSpeed;
        const idleX = width / 2 + Math.sin(elapsed * spd) * amp;
        const idleY = height / 2 + Math.cos(elapsed * spd * 0.7) * amp * 0.6;
        center.x += (idleX - center.x) * 0.02;
        center.y += (idleY - center.y) * 0.02;
      }

      // ── Clear ──
      ctx.clearRect(0, 0, width, height);

      const p = particles;
      const dim = Math.min(width, height);
      const innerR = dim * cfg.ring.innerRadius;
      const outerR = dim * cfg.ring.outerRadius;

      // ── Update & draw particles ──
      for (let i = 0; i < count; i++) {
        // Orbital drift
        p.ringAngle[i] += p.orbitSpeed[i] * dt;

        // Subtle radial oscillation
        const oscAmount = Math.sin(elapsed * 0.001 + p.oscPhase[i]) * 8;
        const r = p.ringRadius[i] + oscAmount;

        // Position relative to moving center
        const angle = p.ringAngle[i];
        p.x[i] = center.x + Math.cos(angle) * r;
        p.y[i] = center.y + Math.sin(angle) * r;

        // Slowly rotate stroke angle
        p.strokeAngle[i] += 0.0002 * dt;

        // Draw stroke
        const halfLen = p.strokeLength[i] / 2;
        const cos = Math.cos(p.strokeAngle[i]);
        const sin = Math.sin(p.strokeAngle[i]);
        const x = p.x[i];
        const y = p.y[i];

        ctx.beginPath();
        ctx.moveTo(x - cos * halfLen, y - sin * halfLen);
        ctx.lineTo(x + cos * halfLen, y + sin * halfLen);
        ctx.strokeStyle = cfg.palette[p.colorIndex[i]];
        ctx.globalAlpha = p.opacity[i];
        ctx.lineWidth = p.strokeThickness[i];
        ctx.lineCap = "round";
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // ── Debug overlay ──
      if (isDebug) {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(8, 8, 220, 90);
        ctx.fillStyle = "#0f0";
        ctx.font = "12px monospace";
        ctx.fillText(`FPS: ${fps}`, 16, 28);
        ctx.fillText(`Particles: ${count}`, 16, 44);
        ctx.fillText(`Center: ${center.x.toFixed(0)}, ${center.y.toFixed(0)}`, 16, 60);
        ctx.fillText(`Follow: ${cfg.followStrength}`, 16, 76);
        ctx.fillText(`Mouse: ${mouse.active ? "active" : "idle"}`, 16, 92);
        ctx.restore();
      }
    };

    frameId = requestAnimationFrame(animate);

    /* ── Resize handler ────────────────────────────── */
    const handleResize = () => {
      resize();
      createParticles();
    };
    window.addEventListener("resize", handleResize);

    /* ── Cleanup ───────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      observer.disconnect();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <div className="particle-fallback" />
    </div>
  );
}
