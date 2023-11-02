import { Lng } from '~/app/i18n/settings';
import AppFooter from '~/components/app-footer';

import AppHeader from '~/components/app-header';
import ContactSection from '~/components/landing-page/contact-section';
import FeatureSection from '~/components/landing-page/feature-section';
import HeroSection from '~/components/landing-page/hero-section';
import TimelineSection from '~/components/landing-page/timeline-section';

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