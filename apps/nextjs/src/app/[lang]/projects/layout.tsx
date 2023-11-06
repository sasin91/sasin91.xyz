import type { PropsWithChildren } from "react";

import AppFooter from "~/app/_components/app-footer";
import AppHeader from "~/app/_components/app-header";
import type { Props } from "~/app/types/Props";

export default function ProjectsLayout({
  params,
  children,
}: PropsWithChildren<Props>) {
  return (
    <main className="bg-gradient-to-r from-gray-100 via-slate-50 to-gray-200">
      <AppHeader lang={params.lang} />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div
          className="bg-luminary absolute inset-y-0 right-1/2 -mr-72 w-[100%] origin-bottom-right skew-x-[-20deg] bg-cover shadow-xl shadow-indigo-400/50 ring-1 ring-teal-500 sm:-mr-48"
          aria-hidden="true"
        ></div>
        {children}
      </section>
      <AppFooter />
    </main>
  );
}
