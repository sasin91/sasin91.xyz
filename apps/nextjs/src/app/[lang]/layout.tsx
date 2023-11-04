import "./globals.css";

import type { Metadata } from "next";
import { GeistSans } from "geist/font";

import type { Lng } from "~/app/i18n/settings";
import { cn } from "~/utils/tailwind";

import "~/styles/globals.css";

import { headers } from "next/headers";
import { t } from "i18next";

import { useTranslation } from "../i18n";
import { TRPCReactProvider } from "./providers";

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await useTranslation(params.lang);

  const title = t("app.title");
  const description = t("app.description");

  return {
    title,
    description,
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title,
      description,
      url: "https://sasin91.xyz",
      siteName: title,
    },
    twitter: {
      card: "summary_large_image",
      site: "@sasin91",
      creator: "@sasin91",
    },
  };
}

interface Props {
  children: React.ReactNode;
  params: { lang: Lng };
}

export default function layout({ children, params: { lang } }: Props) {
  return (
    <html lang={lang}>
      <body
        className={cn(
          GeistSans.className,
          GeistSans.variable,
          "to-magenta-100/20 bg-gradient-to-br from-white via-cyan-100/5 font-sans antialiased",
        )}
      >
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
