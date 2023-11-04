import type { Lng } from '~/app/i18n/settings';
import AppFooter from '~/app/_components/app-footer';

import AppHeader from '~/app/_components/app-header';
import ContactSection from '~/app/_components/landing-page/contact-section';
import FeatureSection from '~/app/_components/landing-page/feature-section';
import HeroSection from '~/app/_components/landing-page/hero-section';
import TimelineSection from '~/app/_components/landing-page/timeline-section';

export default function Welcome({ params }: { params: { lang: Lng } }) {
  return (
    <>
      <AppHeader lang={params.lang} />

      <HeroSection lang={params.lang} />

      <TimelineSection lang={params.lang} />

      <FeatureSection lang={params.lang} />

      <ContactSection lang={params.lang} />

      <AppFooter />
    </>
  )
}