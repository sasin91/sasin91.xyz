import { Head } from '@inertiajs/react';
import HeroSection from '@/components/home/hero-section';
import TimelineSection from '@/components/home/timeline-section';
import { FeatureSection } from '@/components/home/feature-section';
import ContactSection from '@/components/home/contact-section';
import AppLayout from '@/layouts/app-layout';

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Jonas Hansen - Fullstack Developer" />

            <div className="space-y-32 sm:space-y-40">
                <HeroSection id="hero" />
                <TimelineSection id="timeline" />
                <FeatureSection id="features" />
                <ContactSection id="contact" />
            </div>
        </AppLayout>
    );
}
