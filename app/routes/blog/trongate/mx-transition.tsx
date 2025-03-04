import { ChevronDownIcon } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import type { MetaFunction } from "react-router";
import BlogLink from "~/components/ui/blog-link";
import { CodeBlock } from "~/components/ui/code-block";
import { Heading } from "~/components/ui/heading";
import { TrongateLogo } from "../trongate";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { flushSync } from "react-dom";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog :: Trongate mx-transition" },
    {
      name: "description",
      content: "Documentation for my mx-transition attribute",
    },
  ];
};

function MxTransitionTabs() {
  const { t } = useTranslation();

  const transitionOptions = [
    "push",
    "pop",
    "flip",
    "flip-reverse",
    "reload",
    "enter",
    "exit",
  ] as const;

  const [transition, setTransition] =
    useState<(typeof transitionOptions)[number]>("reload");

  type Tab = {
    id: string;
    label: string;
    language: string;
    code: string;
  };

  const tabs: Tab[] = useMemo(
    () => [
      {
        id: "mx-get",
        label: "mx-get.html",
        language: "html",
        code: `<button mx-get="/hello" mx-transition="${transition}">${transition}</button>`,
      },
      {
        id: "anchor",
        label: "anchor.html",
        language: "html",
        code: `<a href="https://trongate-framework.fly.dev/" mx-transition="${transition}">${transition}</a>`,
      },
      {
        id: "page",
        label: "templates/views/public.php",
        language: "php",
        code: `<!DOCTYPE html>
<html lang="en" mx-transition="${transition}">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<base href="<?= BASE_URL ?>">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/trongate.css">
	<link rel="stylesheet" href="css/app.css">
	<link rel="icon" type="image/x-icon" href="/favicon.png">
	<title><?= WEBSITE_NAME ?></title>
</head>
<body>
	<div class="wrapper">
		<header>
			<div id="header-sm">
				<div id="hamburger" onclick="openSlideNav()">&#9776;</div>
				<div class="logo">
					<?= anchor(BASE_URL, WEBSITE_NAME) ?>
				</div>
				<div>
					<?= anchor('account', '<i class="fa fa-user"></i>') ?>
					<?= anchor('logout', '<i class="fa fa-sign-out"></i>') ?>
				</div>
			</div>
			<div id="header-lg">
				<div class="logo">
					<?= anchor(BASE_URL, WEBSITE_NAME) ?>
				</div>
				<div>
					<ul id="top-nav">
						<li><a href="<?= BASE_URL ?>/" mx-transition="reload"><i class="fa fa-home"></i> Home</a></li>
						<li><a href="<?= BASE_URL ?>about" mx-transition><i class="fa fa-lightbulb-o"></i> About Us</a></li>
						<li><a href="<?= BASE_URL ?>our_values" mx-transition="none"><i class="fa fa-street-view"></i> Our Values</a></li>
						<li><a href="<?= BASE_URL ?>"><i class="fa fa-gears"></i> How We Work</a></li>
						<li><a href="<?= BASE_URL ?>"><i class="fa fa-send"></i> Get In Touch</a></li>
					</ul>
				</div>
			</div>
		</header>
		<main class="container"><?= Template::display($data) ?></main>
	</div>
	<footer>
		<div class="container">
			<!-- it's okay to remove the links and content here - everything is cool (DC) -->
			<div>&copy; Copyright <?= date('Y') . ' ' . OUR_NAME ?></div>
			<div><?= anchor('https://trongate.io', 'Powered by Trongate') ?></div>
		</div>
	</footer>
	<div id="slide-nav">
		<div id="close-btn" onclick="closeSlideNav()">&times;</div>
		<ul auto-populate="true"></ul>
	</div>
	<script src="js/app.js"></script>
	<script src="js/trongate-mx.js"></script>
</body>
</html>
`,
      },
    ],
    [transition]
  );

  const [tab, setTab] = useState<Tab>(tabs[0]);

  const viewTransition = (callback: () => void) => {
    // Check if the View Transition API is supported
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(callback);

        return Promise.resolve();
      });
    } else {
      // Fallback for browsers that don't support View Transitions
      callback();
    }
  };

  useEffect(() => {
    setTab(tabs.find((t) => t.id === tab.id) ?? tabs[0]);
  }, [tabs]);

  return (
    <div className="bg-background text-foreground px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <label
          htmlFor="transition"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Transition
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="transition"
            name="transition"
            defaultValue="reload"
            onChange={(changeEvent) => {
              const transition = transitionOptions.find(
                (t) => t === changeEvent.target.value
              )!;
              setTransition(transition);
            }}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            {transitionOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:hidden">
          <select
            onChange={(changeEvent) => {
              viewTransition(() => {
                setTab(tabs.find((t) => t.id === changeEvent.target.value)!);
              });
            }}
            defaultValue={tabs[0].id}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-2 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
          >
            {tabs.map((tab) => (
              <option key={tab.id}>{tab.label}</option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-400"
          />
        </div>
        <div className="hidden sm:block">
          <nav className="flex border-b border-white/10 py-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-8 px-2 text-sm/6 font-semibold text-gray-400"
            >
              {tabs.map((t) => (
                <li
                  key={t.label}
                  onClick={() => {
                    viewTransition(() => {
                      setTab(t);
                    });
                  }}
                  className={t.id === tab.id ? "text-indigo-400" : ""}
                >
                  {t.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <CodeBlock
        style={{
          viewTransitionName: transition,
        }}
        language={tab.language}
        filename={tab.label}
        code={tab.code}
      />
    </div>
  );
}

export default function BlogTrongateMxTransition() {
  const { t, i18n } = useTranslation("blog");

  return (
    <div className="px-6 lg:px-8 text-center">
      <article className="mx-auto max-w-3xl text-base leading-7 text-primary">
        <TrongateLogo />

        <Heading level={1} className="mt-2">
          {t("posts.trongate.mx-transition.intro")}
        </Heading>

        <section className="mt-10">
          <figure>
            <video controls autoPlay>
              <source
                src="/videos/blog/trongate/view_transitions.webm"
                type="video/webm"
              />
            </video>

            <figcaption>
              <BlogLink
                className="group"
                href="https://trongate-framework.fly.dev"
                target="_blank"
              >
                Demo
              </BlogLink>
            </figcaption>
          </figure>

          <Trans
            i18n={i18n}
            i18nKey="posts.trongate.mx-transition.about_view_transitions"
            ns="blog"
            components={{
              "chrome-dev-article": (
                <BlogLink
                  href="https://developer.chrome.com/docs/web-platform/view-transitions"
                  rel="noreferrer"
                  target="_blank"
                />
              ),
            }}
          />

          <MxTransitionTabs />
        </section>
      </article>
    </div>
  );
}
