"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { TYPEWRITER_CONFIG } from "@/config/heroMotion";

type TypewriterState = "IDLE" | "TYPING" | "PAUSING" | "DELETING" | "PAUSE_BEFORE_NEXT";

/**
 * Custom useTypewriter hook — SSR-safe cycling typewriter.
 * Returns the current visible text for the cycling phrase slot.
 */
function useTypewriter() {
  const cfg = TYPEWRITER_CONFIG;
  const [displayText, setDisplayText] = useState("");
  const stateRef = useRef<TypewriterState>("IDLE");
  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    const state = stateRef.current;
    const phrases = cfg.phrases;
    const currentPhrase = phrases[phraseIndexRef.current];

    switch (state) {
      case "IDLE":
        stateRef.current = "TYPING";
        timerRef.current = setTimeout(tick, cfg.startDelay);
        break;

      case "TYPING":
        if (charIndexRef.current < currentPhrase.length) {
          charIndexRef.current++;
          setDisplayText(currentPhrase.slice(0, charIndexRef.current));
          timerRef.current = setTimeout(tick, cfg.typeSpeed);
        } else {
          stateRef.current = "PAUSING";
          timerRef.current = setTimeout(tick, cfg.pauseAfterType);
        }
        break;

      case "PAUSING":
        stateRef.current = "DELETING";
        timerRef.current = setTimeout(tick, cfg.backSpeed);
        break;

      case "DELETING":
        if (charIndexRef.current > 0) {
          charIndexRef.current--;
          setDisplayText(currentPhrase.slice(0, charIndexRef.current));
          timerRef.current = setTimeout(tick, cfg.backSpeed);
        } else {
          stateRef.current = "PAUSE_BEFORE_NEXT";
          timerRef.current = setTimeout(tick, cfg.pauseAfterDelete);
        }
        break;

      case "PAUSE_BEFORE_NEXT":
        if (cfg.loop || phraseIndexRef.current < phrases.length - 1) {
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          charIndexRef.current = 0;
          stateRef.current = "TYPING";
          timerRef.current = setTimeout(tick, cfg.typeSpeed);
        }
        break;
    }
  }, [cfg]);

  useEffect(() => {
    stateRef.current = "IDLE";
    phraseIndexRef.current = 0;
    charIndexRef.current = 0;
    tick();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tick]);

  return displayText;
}

/**
 * TypedHeading — Antigravity-style hero headline with cycling typewriter.
 * 
 * Layout:
 *   Static prefix  ("Vakitmatik ile")
 *   Cycling accent  ("vakit bilgisini" | "namaz vakitlerini" | ...)  ← typed
 *   Static suffix  ("tek bakışta yönetin.")
 */
export function TypedHeading({ className }: { className?: string }) {
  const cyclingText = useTypewriter();
  const cfg = TYPEWRITER_CONFIG;

  return (
    <h1 className={className} aria-label={`${cfg.staticPrefix} ${cfg.phrases[0]} ${cfg.staticSuffix}`}>
      {/* Screen reader gets the full text */}
      <span className="sr-only">
        {cfg.staticPrefix} {cfg.phrases[0]} {cfg.staticSuffix}
      </span>

      <span aria-hidden="true" className="typed-lines-wrap">
        {/* Line 1: static prefix */}
        <span className="typed-line typed-line--static line-strong">
          {cfg.staticPrefix}
        </span>

        {/* Line 2: cycling typewriter phrase */}
        <span className="typed-line typed-line--accent line-accent">
          <span className="typed-cycling-text">{cyclingText}</span>
          <span className="typed-cursor" aria-hidden="true">|</span>
        </span>

        {/* Line 3: static suffix */}
        <span className="typed-line typed-line--static">
          {cfg.staticSuffix}
        </span>
      </span>
    </h1>
  );
}
