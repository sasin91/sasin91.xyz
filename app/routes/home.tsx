import { useTranslation } from "react-i18next";
import { AppNavbar, AppSidebar } from "~/components/app-navigation";
import { StackedLayout } from "~/components/ui/stacked-layout";
import ContactSection from "~/home/contact-section";
import { FeatureSection } from "~/home/feature-section";
import HeroSection from "~/home/hero-section";
import TimelineSection from "~/home/timeline-section";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Jonas Hansen' },
    { name: "description", content: 'Experienced developer with expertise across the full stack' },
  ];
}

export default function Home() {
  return (
    <StackedLayout navbar={<AppNavbar />} sidebar={<AppSidebar />}>
      <article className="isolate">
        <HeroSection />
        <TimelineSection />
        <FeatureSection />
        <ContactSection />
      </article>
    </StackedLayout>
  )
}
