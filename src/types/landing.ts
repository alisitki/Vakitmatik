export type NavItem = {
  href: `#${string}`;
  label: string;
};

export type HeroTypedLine = {
  text: string;
  className?: string;
};

export type HeroHighlightItem = {
  title: string;
  description: string;
};

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type StepItem = {
  title: string;
  description: string;
};

export type UseCaseItem = {
  tag: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
  note?: string;
};

export type MediaAsset = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
};

export type ShowcaseItem = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  media: MediaAsset;
};

export type MotionConfig = {
  density: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  speed: number;
  palette: [string, ...string[]];
  qualityMode: "adaptive" | "full";
};
