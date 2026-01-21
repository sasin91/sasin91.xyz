import { Head } from '@inertiajs/react';
import HeroSection from '@/components/home/hero-section';
import TimelineSection from '@/components/home/timeline-section';
import { FeatureSection } from '@/components/home/feature-section';
import ContactSection from '@/components/home/contact-section';
import AppLayout from '@/layouts/app-layout';

export default function Welcome() {
    return (
        <AppLayout mainVariant="header">
            <Head title="Jonas Hansen - Fullstack Developer" />

            <div className="w-full">
                <HeroSection id="hero" />
                <TimelineSection id="timeline" />
                <FeatureSection id="features" />
                <ContactSection id="contact" />
            </div>
        </AppLayout>
    );
}
