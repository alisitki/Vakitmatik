/**
 * Central configuration for the Antigravity-style hero experience.
 * Adjust these values to tune particles, typewriter, and entrance animations.
 */

// ─── Particle Ring System ────────────────────────────────────────
export const PARTICLE_CONFIG = {
    /** Number of particles by viewport width */
    count: {
        desktop: 260,   // > 1100px
        tablet: 160,    // 768–1100px
        mobile: 80,     // < 768px
    },

    /** Ring radii as fraction of the smaller canvas dimension */
    ring: {
        innerRadius: 0.22,   // inner edge of the annulus
        outerRadius: 0.48,   // outer edge of the annulus
    },

    /** How fast the ring center chases the cursor (0–1, higher = snappier) */
    followStrength: 0.045,

    /** Idle drift Lissajous orbit amplitude (px) when no mouse */
    idleDriftAmplitude: 60,
    idleDriftSpeed: 0.0004,

    /** Stroke appearance */
    stroke: {
        minLength: 4,
        maxLength: 16,
        minThickness: 0.8,
        maxThickness: 2,
        minOpacity: 0.18,
        maxOpacity: 0.7,
    },

    /** Per-particle slow orbital drift speed range */
    orbitSpeed: {
        min: 0.0003,
        max: 0.0012,
    },

    /** Color palette — order matters for weighting */
    palette: [
        "#4285F4",  // Google Blue (dominant)
        "#4285F4",
        "#4285F4",
        "#4285F4",
        "#EA4335",  // Red
        "#FBBC04",  // Yellow
        "#34A853",  // Green
        "#A142F4",  // Purple (rare)
    ],

    /** Max device-pixel-ratio for canvas resolution */
    maxDpr: 2,
} as const;

// ─── Typewriter ──────────────────────────────────────────────────
export const TYPEWRITER_CONFIG = {
    /** Static prefix line (always visible) */
    staticPrefix: "Vakitmatik ile",

    /** Phrases that cycle in the accent slot */
    phrases: [
        "vakit bilgisini",
        "namaz vakitlerini",
        "duyuruları",
        "ezan saatlerini",
    ],

    /** Static suffix line (always visible) */
    staticSuffix: "tek bakışta yönetin.",

    /** Milliseconds per character when typing */
    typeSpeed: 70,

    /** Milliseconds per character when deleting */
    backSpeed: 40,

    /** Pause after fully typing a phrase (ms) */
    pauseAfterType: 1800,

    /** Pause after fully deleting before next phrase (ms) */
    pauseAfterDelete: 400,

    /** Delay before typing starts initially (ms) */
    startDelay: 600,

    /** Whether to loop through phrases infinitely */
    loop: true,
} as const;

// ─── Entrance Animation ─────────────────────────────────────────
export const ENTRANCE_CONFIG = {
    /** Stagger delays in seconds for each hero element */
    eyebrow: 0.0,
    headlinePrefix: 0.08,
    headlineAccent: 0.18,
    headlineSuffix: 0.28,
    description: 0.36,
    buttons: 0.46,
    device: 0.6,
    highlightCards: {
        baseDelay: 0.7,
        stagger: 0.08,
    },

    /** Entrance animation properties */
    duration: 0.9,
    ease: "power3.out",
    distance: 28,          // translateY distance in px
    buttonScale: 0.92,     // buttons start at this scale
} as const;
