import { Head } from '@inertiajs/react';

import { FeatureSection } from '@/components/home/feature-section';
import { Footer } from '@/components/home/footer';
import HeroSection from '@/components/home/hero-section';
import TimelineSection from '@/components/home/timeline-section';
import AppLayout from '@/layouts/app-layout';

export default function Welcome() {
    return (
        <AppLayout mainVariant="header">
            <Head title="Jonas Hansen - Fullstack Developer" />

            <div className="w-full">
                <HeroSection id="hero" />
                <TimelineSection id="timeline" />
                <FeatureSection id="features" />
                <Footer />
            </div>
        </AppLayout>
    );
}
