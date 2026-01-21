import { Head, Link } from '@inertiajs/react';

import theFrameworkImg from '@/../images/blog/trongate/the_framework.webp';
import viewTransitionsImg from '@/../images/blog/trongate/view_transitions.png';
import BlogArticle from '@/components/blog-article';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Heading } from '@/components/ui/heading';
import AppLayout from '@/layouts/app-layout';


export default function BlogIndex() {
    return (
        <AppLayout>
            <Head title="Blog - Jonas Hansen" />

            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl">
                        <Heading className="text-center" level={1}>
                            The latest posts
                        </Heading>

                        <div className="mt-10 space-y-16 border-t border-primary pt-10 sm:mt-16 sm:pt-16 flex flex-col items-center">
                            <BackgroundGradient className="p-1">
                                <BlogArticle
                                    title={
                                        <Link href="/blog/trongate" className="hover:text-primary transition-colors">
                                            <span className="absolute inset-0" />
                                            Trongate PHP
                                        </Link>
                                    }
                                    date="2024-09-14"
                                    description="Trongate is often misunderstood and gets a bad reputation because it breaks with common standards and takes a journey back to its roots. In this article, I will explore and highlight this rough diamond that deserves a spot in the limelight."
                                >
                                    <div className="relative mt-8 flex items-center">
                                        <img
                                            alt="Trongate: The framework they don't want you to know about"
                                            src={theFrameworkImg}
                                            className="object-fill rounded-xl shadow-sm py-1.5 px-1.5"
                                        />
                                    </div>
                                </BlogArticle>
                            </BackgroundGradient>

                            <BackgroundGradient className="p-1">
                                <BlogArticle
                                    title={
                                        <Link href="/blog/trongate/mx-transition" className="hover:text-primary transition-colors">
                                            <span className="absolute inset-0" />
                                            Trongate mx-transition attribute
                                        </Link>
                                    }
                                    date="2025-03-03"
                                    description="MX transition provides an easy and intuitive way to add animations to items and the whole page."
                                >
                                    <div className="relative mt-8 flex items-center">
                                        <img
                                            alt="CSS View transitions"
                                            src={viewTransitionsImg}
                                            className="object-fill rounded-xl shadow-sm py-1.5 px-1.5 w-full"
                                        />
                                    </div>
                                </BlogArticle>
                            </BackgroundGradient>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
