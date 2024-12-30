import { useTranslation } from "react-i18next";
import { AppNavbar, AppSidebar } from "~/components/app-navigation";
import { StackedLayout } from "~/components/ui/stacked-layout";
import ContactSection from "~/home/contact-section";
import { FeatureSection } from "~/home/feature-section";
import HeroSection from "~/home/hero-section";
import TimelineSection from "~/home/timeline-section";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  const { t } = useTranslation();

  return [
    { title: t('app.title') },
    { name: "description", content: t('app.description') },
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
