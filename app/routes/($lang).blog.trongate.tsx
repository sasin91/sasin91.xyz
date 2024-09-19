import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { MetaFunction } from "@remix-run/node";
import { ComponentIcon } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { AppNavbar, AppSidebar } from "~/components/app-navigation";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { BackgroundGradient } from "~/components/ui/background-gradient";
import { Heading, Subheading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { StackedLayout } from "~/components/ui/stacked-layout";
import Underline from "~/components/ui/underline";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Trongate",
    },
  ];
};

function TrongateLogo() {
  return (
    <div className="relative flex items-center rounded-full">
      <BackgroundBeams />
      <img
        alt="Trongate: The framework they don't want you to know about"
        src="/images/blog/trongate/trongate_logo_trans_bg.png"
        className="object-fill rounded-xl shadow"
      />
    </div>
  );
}

export default function BlogTrongate() {
  const { t } = useTranslation("blog");

  return (
    <StackedLayout sidebar={<AppSidebar />} navbar={<AppNavbar />}>
      <div className="px-6 lg:px-8 text-center">
        <article className="mx-auto max-w-3xl text-base leading-7 text-primary">
          <TrongateLogo />

          <Heading level={1} className="mt-2">
            {t("posts.trongate.intro")}
          </Heading>

          <section className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-primary">
              <Trans
                i18nKey="posts.trongate.tagline"
                ns="blog"
                tOptions={{
                  phpExpYears: new Date().getFullYear() - 2014,
                }}
                components={{ underline: <Underline active={true} /> }}
              />
            </h2>

            <figure className="mt-4 border-l border-indigo-600 pl-9">
              <blockquote className="font-semibold text-primary-900">
                <p>{t("posts.trongate.mhavc")}</p>
              </blockquote>
              <img
                src="/images/blog/trongate/trongate_lvim_mangos-account.png"
                className="flex-none rounded-lg bg-background"
                alt="Trongate modul struktur"
              />
              <figcaption className="mt-6 flex gap-x-4">
                <div className="text-sm leading-6">
                  <a
                    href="https://trongate.io/docs/basic-concepts/truly-modular-architecture.html"
                    className="font-semibold text-blue-200 hover:text-blue-500 underline"
                  >
                    {t("common:read_more_here")}
                  </a>
                </div>
              </figcaption>
            </figure>
            <p className="mt-10">
              <Trans
                i18nKey="posts.trongate.missing_i18n"
                ns="blog"
                components={{
                  "pr-link": (
                    <Link
                      href="https://github.com/trongate/trongate-framework/pull/189"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-200 hover:text-blue-500 underline"
                    />
                  ),
                }}
              />
            </p>
          </section>

          <section className="mt-10">
            <img
              alt="Trongate validation"
              src="/images/blog/trongate/trongate_lvim_validation.png"
              className="aspect-video rounded-xl bg-background object-cover"
            />
            <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-primary">
              <InformationCircleIcon
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 flex-none text-primary"
              />
              {t("posts.trongate.callback_validation")}
            </figcaption>
          </section>
          <section className="mt-10 max-w-2xl">
            <h3 className="text-xl text-primary">
              {t("posts.trongate.before_i_go")}
            </h3>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Trongate MX
            </h2>
            <p className="mt-6">
              <Trans
                i18nKey="posts.trongate.mx"
                ns="blog"
                components={{
                  "htmx-link": (
                    <Link
                      href="https://htmx.org"
                      rel="noreferrer"
                      target="_blank"
                      className="text-magenta-200 hover:text-purple-500 underline"
                    />
                  ),
                }}
              />
            </p>
            <p className="mt-8">
              <Trans
                i18nKey="posts.trongate.mx_more"
                ns="blog"
                components={{
                  "mx-during-request": (
                    <Link
                      href="https://trongate.io/docs/trongate-mx/managing-ui-during-requests.html"
                      rel="noreferrer"
                      target="_blank"
                      className="text-blue-100 hover:text-[#6767d1] underline"
                    />
                  ),
                  "mx-after-swap": (
                    <Link
                      href="https://trongate.io/docs/trongate-mx/after-swap-operations.html"
                      rel="noreferrer"
                      target="_blank"
                      className="text-blue-100 hover:text-[#6767d1] underline"
                    />
                  ),
                }}
              />
            </p>

            <span>{t("posts.trongate.hope")}</span>
          </section>
        </article>
        <footer>
          <p className="text-left">// sasin91, 18.09.2024</p>
        </footer>
      </div>
    </StackedLayout>
  );
}
