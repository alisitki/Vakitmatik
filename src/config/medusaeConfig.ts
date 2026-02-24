export const MEDUSAE_DEFAULTS = {
    cursor: {
        radius: 0.065,
        strength: 3,
        dragFactor: 0.015,
    },
    halo: {
        outerOscFrequency: 2.6,
        outerOscAmplitude: 0.76,
        radiusBase: 2.4,
        radiusAmplitude: 0.5,
        shapeAmplitude: 0.75,
        rimWidth: 1.8,
        outerStartOffset: 0.4,
        outerEndOffset: 2.2,
        scaleX: 1.3,
        scaleY: 1,
    },
    particles: {
        baseSize: 0.016,
        activeSize: 0.044,
        blobScaleX: 1,
        blobScaleY: 0.6,
        rotationSpeed: 0.1,
        rotationJitter: 0.2,
        cursorFollowStrength: 1,
        oscillationFactor: 1,
        colorBase: "#4285F4",
        colorOne: "#4285F4",
        colorTwo: "#EA4335",
        colorThree: "#FBBC04",
    },
    device: {
        // Animation
        enableAnimation: true,
        animationSpeed: 10, // seconds per cycle
        // Labels
        colorLabelTarih: "#E5E7EB",
        colorLabelSaatIsi: "#93C5FD",
        colorLabelImsak: "#ffffff",
        colorLabelGunes: "#ffffff",
        colorLabelOgle: "#ffffff",
        colorLabelIkindi: "#ffffff",
        colorLabelAksam: "#ffffff",
        colorLabelYatsi: "#ffffff",
        colorLabelAllah: "#FBBF24", // Premium Gold
        // Digits
        colorDigitsTarih: "#4D4D4D",
        colorDigitsSaat: "#60A5FA", // Soft Blue
        colorDigitsImsak: "#4D4D4D",
        colorDigitsGunes: "#4D4D4D",
        colorDigitsOgle: "#4D4D4D",
        colorDigitsIkindi: "#4D4D4D",
        colorDigitsAksam: "#4D4D4D",
        colorDigitsYatsi: "#4D4D4D",
    },
};

export type MedusaeConfig = typeof MEDUSAE_DEFAULTS;
