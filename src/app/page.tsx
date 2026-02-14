import { ContactSection } from "@/components/ContactSection";
import { ExploreCtaSection } from "@/components/ExploreCtaSection";
import { FaqSection } from "@/components/FaqSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FooterSection } from "@/components/FooterSection";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import {
  contactItems,
  faqItems,
  featureItems,
  heroHighlights,
  navItems,
  showcaseItems,
  useCaseItems,
} from "@/data/landing";

export default function Home() {
  return (
    <>
      <Navbar items={navItems} />
      <main>
        <HeroSection highlights={heroHighlights} />
        <FeaturesSection items={featureItems} />
        <ExploreCtaSection />
        <ProductShowcaseSection items={showcaseItems} />
        <UseCasesSection items={useCaseItems} />
        <FaqSection items={faqItems} />
        <ContactSection items={contactItems} />
      </main>
      <FooterSection items={navItems} />
    </>
  );
}
