import { Trans, useTranslation } from "react-i18next";
import type { MetaFunction } from "react-router";
import BlogArticle from "~/components/blog-article";
import { BackgroundGradient } from "~/components/ui/background-gradient";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";

export const meta: MetaFunction = () => {
  return [
    { title: 'Blog' },
    { name: "description", content: 'My thoughts and observations about everything and anything' },
  ];
};

export default function BlogIndex() {
  const { t } = useTranslation<"blog">("blog");

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Heading className="text-center" level={1}>
            {t("blog.recent")}
          </Heading>
          <div className="mt-10 space-y-16 border-t border-primary pt-10 sm:mt-16 sm:pt-16  flex items-center justify-center">
            <BackgroundGradient>
              <BlogArticle
                title={
                  <Link href="/blog/trongate">
                    <span className="absolute inset-0" />
                    Trongate PHP
                  </Link>
                }
                date="2024-09-14"
                description={t("posts.trongate.summary")}
              >
                <div className="relative mt-8 flex items-center">
                  <img
                    alt="Trongate: The framework they don't want you to know about"
                    src="/images/blog/trongate/the_framework.webp"
                    className="object-fill rounded-xl shadow py-1.5 px-1.5"
                  />
                </div>
              </BlogArticle>
            </BackgroundGradient>
          </div>
        </div>
      </div>
    </div>
  );
}
