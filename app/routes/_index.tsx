import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@netlify/remix-runtime";
import {
  AppWindowIcon,
  AtSignIcon,
  ClipboardCheckIcon,
  CogIcon,
  DatabaseIcon,
  HistoryIcon,
  HomeIcon,
  LockIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  UploadCloudIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";

import { useLocation } from "@remix-run/react";
import { AnchorHTMLAttributes, PropsWithChildren, type HTMLProps } from "react";
import { FacebookIcon } from "~/components/svgs/facebook-icon";
import { GithubIcon } from "~/components/svgs/github-icon";
import { InstagramIcon } from "~/components/svgs/instagram-icon";
import { LinkedinIcon } from "~/components/svgs/linkedin-icon";
import { MeshPattern } from "~/components/svgs/mesh-pattern";
import { TwitterIcon } from "~/components/svgs/twitter-icon";
import { YoutubeIcon } from "~/components/svgs/youtube-icon";
import { Heading } from "~/components/ui/heading";
import { LanguageMenu } from "~/components/ui/language-menu";
import { Link } from "~/components/ui/link";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "~/components/ui/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
} from "~/components/ui/sidebar";
import { StackedLayout } from "~/components/ui/stacked-layout";
import ThemeSwitch from "~/components/ui/theme-switch";
import Underline from "~/components/ui/underline";

type LoaderData = {
  title: string;
  description: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18next.getFixedT(request);

  const data: LoaderData = {
    title: t("app.title"),
    description: t("app.description"),
  };

  return json(data);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data!.title,
      description: data!.description,
    },
  ];
};

type SocialItem = { name: string };

function SocialLink({
  name,
  children,
  ...props
}: PropsWithChildren<SocialItem & AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a
      {...props}
      className="text-lg font-semibold leading-8 tracking-tight transition-all duration-300 ease-in-out group"
    >
      <span className="sr-only">{name}</span>
      {children}
    </a>
  );
}

function HeroSection(props: HTMLProps<HTMLDivElement>) {
  const { t } = useTranslation();

  const iconClasses =
    "h-6 w-6 bg-gradient-to-r from-secondary-200 via-violet-400 to-primary-200 bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-primary transition-all duration-500 ease-out group-hover:bg-[length:100%_2px] group-hover:text-secondary-foreground";

  return (
    <div {...props}>
      <div
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-background shadow-xl shadow-primary/10 ring-1 ring-background/50 sm:-mr-80 lg:-mr-96"
        aria-hidden="true"
      />
      <div className="px-6 pb-32 mx-auto max-w-7xl sm:pb-40 lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <div className="max-w-xl mt-6 lg:mt-0 xl:col-end-1 xl:row-start-1">
            <Heading className="max-w-2xl lg:col-span-2 xl:col-auto">
              {t("app.title")}
              <br />
              {t("app.description")}
            </Heading>
            <p className="text-lg leading-6 text-secondary-foreground">
              <br />
            </p>
            <p className="text-lg leading-6 text-secondary-foreground">
              {t("hero.headline1")}
            </p>
            <p className="text-lg leading-6 text-secondary-foreground">
              {t("hero.headline2")}
            </p>
            <div className="flex mt-6 space-x-6 md:order-2">
              <SocialLink
                key="facebook"
                name="Facebook"
                href="https://www.facebook.com/jonaz.k.hansen"
              >
                <FacebookIcon className={iconClasses} />
              </SocialLink>
              <SocialLink
                key="instagram"
                name="Instagram"
                href="https://www.instagram.com/jonaz.k.hansen"
              >
                <InstagramIcon className={iconClasses} />
              </SocialLink>
              <SocialLink
                key="twitter"
                name="Twitter"
                href="https://twitter.com/sasin91"
              >
                <TwitterIcon className={iconClasses} />
              </SocialLink>
              <SocialLink
                key="github"
                name="GitHub"
                href="https://github.com/sasin91"
              >
                <GithubIcon className={iconClasses} />
              </SocialLink>
              <SocialLink
                key="linkedin"
                name="LinkedIn"
                href="https://www.linkedin.com/in/jonas-hansen-2b6828110"
              >
                <LinkedinIcon className={iconClasses} />
              </SocialLink>
              <SocialLink
                key="youtube"
                name="YouTube"
                href="https://www.youtube.com/channel/UCxkb83un4xXdCYXPucs_ceA"
              >
                <YoutubeIcon className={iconClasses} />
              </SocialLink>
              <SocialLink
                key="email"
                name="E-Mail"
                href="mailto:jonas.kerwin.hansen@gmail.com"
              >
                <AtSignIcon className={iconClasses} />
              </SocialLink>
            </div>
          </div>
          <img
            src="/images/hero.png"
            alt={t("app.title")}
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-t from-background sm:h-32" />
    </div>
  );
}

type TimelineItemType = {
  name: string;
  description: string;
  date: Date;
  href?: string;
};

function TimelineItem(item: TimelineItemType) {
  return (
    <a
      className={`group transition-all duration-300 ease-in-out text-secondary-foreground`}
      target="_blank"
      href={item.href || "#"}
    >
      <time
        dateTime={item.date.toISOString()}
        className="flex items-center text-sm font-semibold leading-6 text-primary"
      >
        <svg
          viewBox="0 0 4 4"
          className="flex-none w-1 h-1 mr-4"
          aria-hidden="true"
        >
          <circle cx="2" cy="2" r="2" fill="currentColor" />
        </svg>
        {item.date.toLocaleDateString()}
        <div
          className="absolute w-screen h-px -ml-2 -translate-x-full bg-primary/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
          aria-hidden="true"
        />
      </time>
      <p className="mt-6 text-lg font-semibold leading-8 tracking-tight group text-primary">
        {item.href ? <Underline>{item.name}</Underline> : item.name}
      </p>
      <p className="mt-1 text-base leading-7 text-secondary-foreground">
        {item.description}
      </p>
    </a>
  );
}

function TimelineSection(props: HTMLProps<HTMLDivElement>) {
  const { t } = useTranslation();

  return (
    <div {...props} className="px-6 mx-auto -mt-8 max-w-7xl lg:px-8">
      <div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <TimelineItem
          key="education"
          name={t("timeline.webintegrator.name")}
          description={t("timeline.webintegrator.description")}
          date={new Date("2015-08")}
        />
        <TimelineItem
          key="ghc_travel"
          name={t("timeline.ghc.name")}
          description={t("timeline.ghc.description")}
          date={new Date("2017-02")}
        />
        <TimelineItem
          key="syncronet"
          name={t("timeline.syncronet.name")}
          description={t("timeline.syncronet.description")}
          date={new Date("2020-02")}
        />
        <TimelineItem
          key="juice"
          name={t("timeline.juice.name")}
          description={t("timeline.juice.description")}
          date={new Date("2023-01")}
        />
        <TimelineItem
          key="supeo"
          name={t("timeline.supeo.name")}
          description={t("timeline.supeo.description")}
          date={new Date("2023-09")}
        />
        <TimelineItem
          key="juice_2"
          name={t("timeline.juice.name")}
          description={t("timeline.juice.description_2")}
          date={new Date("2024-09")}
        />
      </div>
    </div>
  );
}

type Feature = { name: string; description: string; icon: React.ReactNode };

function FeatureCard(feature: Feature) {
  return (
    <div className="pt-6">
      <div className="flow-root h-full px-6 pb-8 rounded-lg shadow-lg shadow-sky-200 dark:shadow-purple-500 dark:bg-purple-50/10 bg-sky-100/10">
        <div className="-mt-6">
          <div>
            <span className="inline-flex items-center justify-center p-3 shadow-lg bg-secondary rounded-xl">
              {feature.icon}
            </span>
          </div>
          <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-primary">
            {feature.name}
          </h3>
          <p className="mt-5 text-base leading-7 text-secondary-foreground">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureSection(props: HTMLProps<HTMLDivElement>) {
  const { t } = useTranslation();

  return (
    <div {...props} className="pb-8 mt-32 overflow-hidden sm:mt-40">
      <div className="max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-sky-400">
          {t("features.headline")}
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          {t("features.tagline")}
        </p>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              key="servers"
              name={t("features.servers.name")}
              description={t("features.servers.description")}
              icon={<UploadCloudIcon className="w-8 h-8 text-primary" />}
            />
            <FeatureCard
              key="security"
              name={t("features.security.name")}
              description={t("features.security.description")}
              icon={<LockIcon className="w-8 h-8 text-primary" />}
            />
            <FeatureCard
              key="backend_development"
              name={t("features.backend_development.name")}
              description={t("features.backend_development.description")}
              icon={<CogIcon className="w-8 h-8 text-primary" />}
            />
            <FeatureCard
              key="automated_testing"
              name={t("features.automated_testing.name")}
              description={t("features.automated_testing.description")}
              icon={<ShieldCheckIcon className="w-8 h-8 text-primary" />}
            />
            <FeatureCard
              key="databases"
              name={t("features.databases.name")}
              description={t("features.databases.description")}
              icon={<DatabaseIcon className="w-8 h-8 text-primary" />}
            />
            <FeatureCard
              key="frontend_development"
              name={t("features.frontend_development.name")}
              description={t("features.frontend_development.description")}
              icon={<RefreshCwIcon className="w-8 h-8 text-primary" />}
            />
            <FeatureCard
              key="app_development"
              name={t("features.app_development.name")}
              description={t("features.app_development.description")}
              icon={<AppWindowIcon className="w-8 h-8 text-primary" />}
            />
            <FeatureCard
              key="vcs"
              name={t("features.vcs.name")}
              description={t("features.vcs.description")}
              icon={<ClipboardCheckIcon className="w-8 h-8 text-primary" />}
            />
            <FeatureCard
              key="backups"
              name={t("features.backups.name")}
              description={t("features.backups.description")}
              icon={<HistoryIcon className="w-8 h-8 text-primary" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSection(props: HTMLProps<HTMLDivElement>) {
  const { t } = useTranslation();

  return (
    <div
      {...props}
      className="relative px-6 py-24 mx-auto mt-32 bg-gradient-conic at-top to-magenta-100/20 isolate max-w-7xl from-background via-primary-100/5 sm:mt-40 sm:py-32 lg:px-8"
    >
      <MeshPattern className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,skyblue,transparent)]" />
      <div className="max-w-xl mx-auto lg:max-w-4xl">
        <Heading level={1} className="!text-4xl">
          {t("contactForm.headline")}
        </Heading>

        <span className="group mt-2">
          <a
            className="text-lg leading-8 text-secondary-foreground"
            href="mailto:jonas.kerwin.hansen@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Underline>📧 {t("contactForm.tagline")}</Underline>
          </a>
        </span>
      </div>
    </div>
  );
}

export default function Index() {
  const { t } = useTranslation("common");
  const { pathname } = useLocation();

  return (
    <StackedLayout
      navbar={
        <Navbar>
          <Link href="/">
            <img
              src="/favicon.png"
              alt={t("app.title")}
              className="w-8 h-8 rounded-full"
            />
          </Link>
          <NavbarDivider />
          <NavbarSection>
            <NavbarItem href="/" current={pathname === "/"}>
              {t("navigation.global.about_me")}
            </NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <LanguageMenu />
            <ThemeSwitch />
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarItem href="/" current={pathname === "/"}>
              <HomeIcon />
              <SidebarLabel>{t("navigation.global.about_me")}</SidebarLabel>
            </SidebarItem>
          </SidebarBody>
        </Sidebar>
      }
    >
      <article className="isolate">
        <HeroSection />

        <TimelineSection />

        <FeatureSection />

        <ContactSection />
      </article>
    </StackedLayout>
  );
}
