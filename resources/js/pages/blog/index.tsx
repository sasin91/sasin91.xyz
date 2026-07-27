import { Head, Link } from '@inertiajs/react';

import BlogArticle from '@/components/blog-article';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Heading } from '@/components/ui/heading';
import AppLayout from '@/layouts/app-layout';
import { blogPosts } from '@/lib/blog-posts';
import { toUrl } from '@/lib/utils';

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
                            {blogPosts.map((post) => (
                                <BackgroundGradient key={toUrl(post.href)} className="p-1">
                                    <BlogArticle
                                        title={
                                            <Link href={post.href} className="hover:text-primary transition-colors">
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </Link>
                                        }
                                        date={post.publishedAt}
                                        description={post.description}
                                    >
                                        <div className="relative mt-8 flex items-center">
                                            <img
                                                alt={post.image.alt}
                                                src={post.image.src}
                                                className="object-fill rounded-xl shadow-sm py-1.5 px-1.5 w-full"
                                            />
                                        </div>
                                    </BlogArticle>
                                </BackgroundGradient>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
