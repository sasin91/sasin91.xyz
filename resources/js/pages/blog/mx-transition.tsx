import { Head, Link } from '@inertiajs/react';
import { ChevronDownIcon } from "lucide-react";
import { useState, useMemo } from "react";

import viewTransitionsVideo from '@/../videos/blog/trongate/view_transitions.webm';
import BlogLink from "@/components/ui/blog-link";
import { CodeBlock } from "@/components/ui/code-block";
import { Heading } from "@/components/ui/heading";
import { Underline } from "@/components/ui/underline";
import { useViewTransition } from "@/hooks/use-view-transition";
import AppLayout from '@/layouts/app-layout';

import { TrongateLogo } from "./trongate";

const transitionOptions = [
  "push",
  "pop",
  "flip",
  "flipreverse",
  "reload",
] as const;

type TransitionType = (typeof transitionOptions)[number];

function MxTransitionTabs() {
  const withTransition = useViewTransition();
  const [transition, setTransition] = useState<TransitionType>("reload");

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

  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const tab = useMemo(() => tabs.find((t) => t.id === activeTabId) ?? tabs[0], [tabs, activeTabId]);

  return (
    <div className="px-4 py-6 bg-background text-foreground sm:px-6 lg:px-8">
      <dl>
        <dt>
          <p className="text-sm italic underline decoration-wavy text-primary">
            Tip: Select a transition and click a code example
          </p>
        </dt>
        <dd>
          <Link className="group" href="https://trongate-framework.fly.dev">
            <Underline>Demo Trongate App</Underline>
          </Link>
        </dd>
      </dl>

      <div>
        <label
          htmlFor="transition"
          className="block font-medium text-gray-900 text-sm/6"
        >
          Transition
        </label>
        <div className="grid grid-cols-1 mt-2">
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
            className="self-center col-start-1 row-start-1 mr-2 text-gray-500 pointer-events-none size-5 justify-self-end sm:size-4"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:hidden">
          <select
            onChange={(changeEvent) => {
              const newTab = tabs.find((t) => t.id === changeEvent.target.value)!;
              withTransition(() => setActiveTabId(newTab.id));
            }}
            defaultValue={tabs[0].id}
            aria-label="Select a tab"
            className="w-full col-start-1 row-start-1 py-2 pl-3 pr-8 text-base text-white rounded-md appearance-none bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
          >
            {tabs.map((tab) => (
              <option key={tab.id}>{tab.label}</option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="self-center col-start-1 row-start-1 mr-2 pointer-events-none size-5 justify-self-end fill-gray-400"
          />
        </div>
        <div className="hidden sm:block">
          <nav className="flex py-4 border-b border-white/10">
            <ul
              role="list"
              className="flex flex-none min-w-full px-2 font-semibold text-gray-400 gap-x-8 text-sm/6"
            >
              {tabs.map((t) => (
                <li
                  key={t.label}
                  onClick={() => withTransition(() => setActiveTabId(t.id))}
                  className={t.id === activeTabId ? "text-indigo-400" : ""}
                >
                  {t.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <CodeBlock
        language={tab.language}
        filename={tab.label}
        code={tab.code}
        viewTransitionName={transition}
      />
    </div>
  );
}

export default function BlogTrongateMxTransition() {
  return (
    <AppLayout>
      <Head title="Blog :: Trongate mx-transition" />

      <div className="px-6 text-center lg:px-8">
        <article className="max-w-3xl mx-auto text-base leading-7 text-primary">
          <TrongateLogo />

          <Heading level={1} className="mt-2">
            MX transition provides an easy and intuitive way to add animations to items and the whole page
          </Heading>

          <section className="mt-10">
            <figure>
              <video controls autoPlay>
                <source
                  src={viewTransitionsVideo}
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

            <p className="mt-6">
              View Transitions is a{' '}
              <BlogLink
                href="https://developer.chrome.com/docs/web-platform/view-transitions"
                rel="noreferrer"
                target="_blank"
              >
                Relatively New Browser API
              </BlogLink>
              , it offers smooth and granular transitions between elements and pages through CSS animations
            </p>

            <MxTransitionTabs />
          </section>
        </article>
      </div>
    </AppLayout>
  );
}
