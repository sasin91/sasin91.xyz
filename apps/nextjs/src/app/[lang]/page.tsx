import AppFooter from "~/app/_components/app-footer";
import AppHeader from "~/app/_components/app-header";
import ContactSection from "~/app/_components/landing-page/contact-section";
import FeatureSection from "~/app/_components/landing-page/feature-section";
import HeroSection from "~/app/_components/landing-page/hero-section";
import TimelineSection from "~/app/_components/landing-page/timeline-section";
import type { Props } from "~/app/types/Props";

export default function Welcome({ params }: Props) {
  return (
    <main className="to-magenta-100/20 isolate bg-gradient-to-br from-white via-cyan-100/5 antialiased">
      <AppHeader lang={params.lang} />

      <HeroSection lang={params.lang} />

      <TimelineSection lang={params.lang} />

      <FeatureSection lang={params.lang} />

      <ContactSection lang={params.lang} />

      <AppFooter />
    </main>
  );
}
