import { AtSignIcon } from "lucide-react";
import type { AnchorHTMLAttributes, HTMLProps, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { FacebookIcon } from "~/components/svgs/facebook-icon";
import { GithubIcon } from "~/components/svgs/github-icon";
import { InstagramIcon } from "~/components/svgs/instagram-icon";
import { LinkedinIcon } from "~/components/svgs/linkedin-icon";
import { TwitterIcon } from "~/components/svgs/twitter-icon";
import { YoutubeIcon } from "~/components/svgs/youtube-icon";
import { Heading } from "~/components/ui/heading";

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

export default function HeroSection(props: HTMLProps<HTMLDivElement>) {
    const { t } = useTranslation();
  
    const iconClasses =
      "h-6 w-6 bg-linear-to-r from-secondary-200 via-violet-400 to-primary-200 bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-primary transition-all duration-500 ease-out group-hover:bg-[length:100%_2px] group-hover:text-secondary-foreground";
  
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
              className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 -z-10 bg-linear-to-t from-background sm:h-32" />
      </div>
    );
  }