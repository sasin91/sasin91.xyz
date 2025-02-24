import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";

import i18n from "i18next";
import BrowserLanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { Loader } from "lucide-react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { BackgroundBeams } from "./components/ui/background-beams";

i18n
  .use(initReactI18next)
  .use(BrowserLanguageDetector)
  .use(HttpBackend)
  .init({
    supportedLngs: ["en", "da"],
    fallbackLng: "en",
    ns: "common",
    defaultNS: "common",
    saveMissing: true,

    backend: {
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    },

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.png", type: "image/png" },
];

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background to-magenta-100/20 bg-linear-to-br from-background via-cyan-100/5">
      <div className="flex flex-col items-center">
        <BackgroundBeams />

        <Loader className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.language} dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Outlet />
    </I18nextProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
