import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@netlify/remix-runtime";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import {
  AppWindowIcon,
  ClipboardCheckIcon,
  CogIcon,
  DatabaseIcon,
  HistoryIcon,
  Loader,
  LockIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  UploadCloudIcon,
} from "lucide-react";

import Underline from "~/components/ui/underline";
import Heading from "~/components/ui/heading";
import { Fragment, useState, type HTMLProps } from "react";
import { cn } from "~/utils/tailwind";

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

function HeroSection(props: HTMLProps<HTMLDivElement>) {
  const { t } = useTranslation();

  const social = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/jonaz.k.hansen",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/jonaz.k.hansen/",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 01-1.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/sasin91",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/sasin91",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UCxkb83un4xXdCYXPucs_ceA",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      {...props}
      className="relative overflow-hidden isolate -z-10 dark:bg-none bg-gradient-to-b from-secondary-100/20 via-violet-100/40 to-primary-100/20"
    >
      <div
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-background shadow-xl shadow-primary/10 ring-1 ring-background/50 sm:-mr-80 lg:-mr-96"
        aria-hidden="true"
      />
      <div className="px-6 py-32 mx-auto max-w-7xl sm:py-40 lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <div className="max-w-xl mt-6 lg:mt-0 xl:col-end-1 xl:row-start-1">
            <heading className="max-w-2xl lg:col-span-2 xl:col-auto">
              {t("app.title")}
              <br />
              {t("app.description")}
            </heading>
            <p className="text-lg leading-6 text-secondary-foreground">
              <br />
            </p>
            <p className="text-lg leading-6 text-secondary-foreground">
              {t("hero.heading1")}
            </p>
            <p className="text-lg leading-6 text-secondary-foreground">
              {t("hero.heading2")}
            </p>
            <div className="flex mt-6 space-x-6 md:order-2">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-semibold leading-8 tracking-tight transition-all duration-300 ease-in-out group"
                >
                  <span className="sr-only">{item.name}</span>
                  <i
                    className={`h-6 w-6 bg-gradient-to-r from-secondary-200 via-violet-400 to-primary-200 bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-primary transition-all duration-500 ease-out group-hover:bg-[length:100%_2px] group-hover:text-secondary-foreground`}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
          <Logo
            width={1280}
            height={1024}
            radius={20}
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-t from-background sm:h-32" />
    </div>
  );
}

function TimelineSection(props: HTMLProps<HTMLDivElement>) {
  const { t } = useTranslation();

  const timeline = [
    {
      name: t("timeline.webintegrator.name"),
      description: t("timeline.webintegrator.description"),
      date: "Aug 2015",
      dateTime: "2015-08",
    },
    {
      name: t("timeline.ghc.name"),
      description: t("timeline.ghc.description"),
      date: "Feb 2017",
      dateTime: "2017-02",
    },
    {
      name: t("timeline.syncronet.name"),
      href: "https://zometv.com",
      description: t("timeline.syncronet.description"),
      date: "Feb 2020",
      dateTime: "2020-02",
    },
    {
      name: t("timeline.juice.name"),
      href: "https://morejuice.io",
      description: t("timeline.juice.description"),
      date: "Jan 2023",
      dateTime: "2023-01",
    },
    {
      name: t("timeline.supeo.name"),
      href: "https://supeo.dk",
      description: t("timeline.supeo.description"),
      date: "Sept 2023",
      dateTime: "2023-09",
    },
  ];

  return (
    <div {...props} className="px-6 mx-auto -mt-8 max-w-7xl lg:px-8">
      <div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {timeline.map((item) => (
          <a
            key={item.name}
            className={`group transition-all duration-300 ease-in-out text-secondary-foreground`}
            target="_blank"
            href={item.href || "#"}
          >
            <time className="flex items-center text-sm font-semibold leading-6 text-primary">
              <svg
                viewBox="0 0 4 4"
                className="flex-none w-1 h-1 mr-4"
                aria-hidden="true"
              >
                <circle cx="2" cy="2" r="2" fill="currentColor" />
              </svg>
              {item.date}
              <div
                className="absolute w-screen h-px -ml-2 -translate-x-full bg-primary/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                aria-hidden="true"
              />
            </time>
            <p
              className={`mt-6 text-lg font-semibold leading-8 tracking-tight group text-primary`}
            >
              {item.href ? <Underline>{item.name}</Underline> : item.name}
            </p>
            <p className="mt-1 text-base leading-7 text-secondary-foreground">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

function FeatureSection(props: HTMLProps<HTMLDivElement>) {
  const { t } = useTranslation();

  const features = [
    {
      name: t("features.servers.name"),
      description: t("features.servers.description"),
      icon: <UploadCloudIcon className="w-8 h-8 text-primary" />,
    },
    {
      name: t("features.security.name"),
      description: t("features.security.description"),
      icon: <LockIcon className="w-8 h-8 text-primary" />,
    },
    {
      name: t("features.backend_development.name"),
      description: t("features.backend_development.description"),
      icon: <CogIcon className="w-8 h-8 text-primary" />,
    },
    {
      name: t("features.automated_testing.name"),
      description: t("features.automated_testing.description"),
      icon: <ShieldCheckIcon className="w-8 h-8 text-primary" />,
    },
    {
      name: t("features.databases.name"),
      description: t("features.databases.description"),
      icon: <DatabaseIcon className="w-8 h-8 text-primary" />,
    },
    {
      name: t("features.frontend_development.name"),
      description: t("features.frontend_development.description"),
      icon: <RefreshCwIcon className="w-8 h-8 text-primary" />,
    },
    {
      name: t("features.app_development.name"),
      description: t("features.app_development.description"),
      icon: <AppWindowIcon className="w-8 h-8 text-primary" />,
    },
    {
      name: t("features.vcs.name"),
      description: t("features.vcs.description"),
      icon: <ClipboardCheckIcon className="w-8 h-8 text-primary" />,
    },
    {
      name: t("features.backups.name"),
      description: t("features.backups.description"),
      icon: <HistoryIcon className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div {...props} className="pb-8 mt-32 overflow-hidden sm:mt-40">
      <div className="max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-sky-400">
          {t("features.heading")}
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          {t("features.tagline")}
        </p>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSection(props: HTMLProps<HTMLDivElement>) {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  const contactForm = useForm("post", route("contact-request.store"), {
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
  });

  return (
    <div
      {...props}
      className="relative px-6 py-24 mx-auto mt-32 bg-gradient-conic at-top to-magenta-100/20 isolate max-w-7xl from-background via-primary-100/5 sm:mt-40 sm:py-32 lg:px-8"
    >
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,skyblue,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width="200"
            height="200"
            x="50%"
            y="-64"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-64" className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div className="max-w-xl mx-auto lg:max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight text-primary">
          {t("contactForm.heading")}
        </h2>
        <p className="mt-2 text-lg leading-8 text-secondary-foreground">
          {t("contactForm.tagline")}
        </p>
        <div className="flex flex-col gap-16 mt-16 sm:gap-y-20 lg:flex-row">
          <form
            onSubmit={(e) => {
              return contactForm.submit({
                preserveScroll: true,
                onSuccess: () => {
                  contactForm.reset();
                  setModalOpen(true);
                },
              });
            }}
            method="POST"
            className="lg:flex-auto"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <FormField
                form={contactForm}
                attribute="companyName"
                label={t("contactForm.companyName")}
                required
                autoComplete="organization"
              />
              <FormField
                form={contactForm}
                attribute="contactPerson"
                label={t("contactForm.contactPerson")}
                required
                autoComplete="fullname"
              />
              <FormField
                form={contactForm}
                attribute="email"
                label={t("contactForm.email")}
                required
                autoComplete="email"
              />
              <FormField
                form={contactForm}
                attribute="phone"
                label={t("contactForm.phone")}
                required
                autoComplete="tel"
                type="tel"
              />
              <FormField
                form={contactForm}
                attribute="message"
                label={t("contactForm.message")}
              >
                <textarea
                  value={contactForm.message}
                  onChange={(e) =>
                    contactForm.setData("message", e.target.value)
                  }
                  onBlur={() => contactForm.validate("message")}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-foreground sm:text-sm sm:leading-6"
                />
              </FormField>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                disabled={contactForm.submitting}
                className={cn(
                  "block",
                  "w-full",
                  "rounded-md",
                  "px-3.5",
                  "py-2.5",
                  "text-center",
                  "text-sm",
                  "font-semibold",
                  "text-primary",
                  "shadow-lg",
                  "shadow-purple-600",
                  "focus-visible:outline",
                  "focus-visible:outline-2",
                  "focus-visible:outline-offset-2",
                  "focus-visible:outline-secondary-foreground",
                  "bg-gradient-to-r",
                  "from-purple-500",
                  "via-violet-400",
                  "to-pink-300",
                  "bg-no-repeat",
                  "text-primary",
                  "bg-[length:0%]",
                  "transition-all",
                  "duration-500",
                  "ease-out",
                  "hover:bg-[length:100%]",
                  "hover:text-white"
                )}
              >
                {contactForm.submitting ? <Loader /> : t("contactForm.submit")}
              </button>
            </div>
          </form>
        </div>

        <Transition appear show={modalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setModalOpen(false)}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </TransitionChild>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-primary rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-primary"
                    >
                      {t("contactFormSuccessModal.heading")}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-primary">
                        {t("contactFormSuccessModal.thanks")}
                      </p>
                      <p className="text-sm text-primary">
                        {t("contactFormSuccessModal.i_be_back")}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold rounded-lg shadow-2xl text-primary bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-purple-400"
                        onClick={() => setModalOpen(false)}
                      >
                        {t("contactFormSuccessModal.close")}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default function Index() {
  const { t } = useTranslation("common");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
