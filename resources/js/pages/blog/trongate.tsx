import { Head } from '@inertiajs/react';
import { ShieldQuestionIcon } from "lucide-react";

import trongateLogoImg from '@/../images/blog/trongate/trongate_logo_trans_bg.png';
import trongateModuleImg from '@/../images/blog/trongate/trongate_lvim_mangos-account.png';
import trongateValidationImg from '@/../images/blog/trongate/trongate_lvim_validation.png';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Heading } from "@/components/ui/heading";
import { Underline } from "@/components/ui/underline";
import AppLayout from '@/layouts/app-layout';

export function TrongateLogo() {
  return (
    <div className="relative flex items-center rounded-full">
      <BackgroundBeams />
      <img
        alt="Trongate: The framework they don't want you to know about"
        src={trongateLogoImg}
        className="object-fill rounded-xl shadow-sm"
      />
    </div>
  );
}

export default function BlogTrongate() {
  const currentYear = new Date().getFullYear();
  const phpExpYears = currentYear - 2014;

  return (
    <AppLayout>
      <Head title="Blog :: Trongate" />

      <div className="px-6 lg:px-8 text-center">
        <article className="mx-auto max-w-3xl text-base leading-7 text-primary">
          <TrongateLogo />

          <Heading level={1} className="mt-2">
            An exciting PHP framework that challenges the established standards and offers a simple yet effective approach to development.
          </Heading>

          <section className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-primary">
              I have worked with PHP for {phpExpYears} years, and one recurring thing is{' '}
              <Underline active={true}>unnecessary</Underline> code that needs maintenance.
              <br />
              Occam's razor is clearly visible when all you want is to tear{' '}
              <Underline active={true}>everything</Underline> out by the roots and start fresh, hoping to build something more simple.
            </h2>

            <figure className="mt-4 border-l border-indigo-600 pl-9">
              <blockquote className="font-semibold text-primary-900">
                <p>
                  This is where Trongate shines; you get a simple starting point with a solid starting architecture due to everything being divided into modules, including media and JavaScript files.
                </p>
              </blockquote>
              <img
                src={trongateModuleImg}
                className="flex-none rounded-lg bg-background"
                alt="Trongate modul struktur"
              />
              <figcaption className="mt-6 flex gap-x-4">
                <div className="text-sm leading-6">
                  <a
                    href="https://trongate.io/docs/basic-concepts/truly-modular-architecture.html"
                    className="font-semibold text-blue-200 hover:text-blue-500 underline"
                  >
                    Read more here
                  </a>
                </div>
              </figcaption>
            </figure>
            <p className="mt-10">
              A criticism that could be made is that internationalization (i18n) hasn't been considered, and there is actually no real language support.
              <br />
              This is true and something I have{' '}
              <a
                href="https://github.com/trongate/trongate-framework/pull/189"
                target="_blank"
                rel="noreferrer"
                className="text-blue-200 hover:text-blue-500 underline"
              >
                previously
              </a>{' '}
              addressed. It's on the roadmap, and I look forward to seeing how it gets resolved. :)
            </p>
          </section>

          <section className="mt-10">
            <img
              alt="Trongate validation"
              src={trongateValidationImg}
              className="aspect-video rounded-xl bg-background object-cover"
            />
            <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-primary">
              <ShieldQuestionIcon
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 flex-none text-primary"
              />
              Another feature that often flies under the radar is <u>callback</u> based validation.
            </figcaption>
          </section>

          <section className="mt-10 max-w-2xl">
            <h3 className="text-xl text-primary">
              Before I go, I just want to shout out
            </h3>
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Trongate MX
            </h2>
            <p className="mt-6">
              A library based on{' '}
              <a
                href="https://htmx.org"
                rel="noreferrer"
                target="_blank"
                className="text-magenta-200 hover:text-purple-500 underline"
              >
                HTMX
              </a>{' '}
              and in many ways has the same features, just using mx- instead of hx-.
            </p>
            <p className="mt-8">
              And yet it offers so much more, with close integration, built-in modal support,{' '}
              <a
                href="https://trongate.io/docs/trongate-mx/managing-ui-during-requests.html"
                rel="noreferrer"
                target="_blank"
                className="text-blue-100 hover:text-[#6767d1] underline"
              >
                "optimistic" UI
              </a>
              , and{' '}
              <a
                href="https://trongate.io/docs/trongate-mx/after-swap-operations.html"
                rel="noreferrer"
                target="_blank"
                className="text-blue-100 hover:text-[#6767d1] underline"
              >
                more.
              </a>
            </p>

            <span>My hope with this article is to spark people's interest and highlight a rough diamond that unfortunately has gained a somewhat bad reputation.</span>
          </section>
        </article>
        <footer>
          <p className="text-left">// sasin91, 18.09.2024</p>
        </footer>
      </div>
    </AppLayout>
  );
}
