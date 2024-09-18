import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Trans, useTranslation } from "react-i18next";
import { AppNavbar, AppSidebar } from "~/components/app-navigation";
import BlogArticle from "~/components/blog-article";
import { BackgroundGradient } from "~/components/ui/background-gradient";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { StackedLayout } from "~/components/ui/stacked-layout";
import i18next from "~/i18next.server";
import { getLang } from "~/utils/i18n";

type LoaderData = {
  lang: ReturnType<typeof getLang>;
  title: string;
  description: string;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = getLang(params);

  const t = await i18next.getFixedT(lang, "blog");

  const data: LoaderData = {
    lang,
    title: t("index.title"),
    description: t("description"),
  };

  return json(data);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.title,
      description: data?.description,
    },
  ];
};

export default function BlogIndex() {
  const { t } = useTranslation("blog");

  return (
    <StackedLayout sidebar={<AppSidebar />} navbar={<AppNavbar />}>
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
                  description={
                    <Trans ns="blog" i18nKey="posts.trongate.summary" />
                  }
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
    </StackedLayout>
  );
}
