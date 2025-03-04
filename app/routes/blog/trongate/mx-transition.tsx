import { useTranslation } from "react-i18next";
import type { MetaFunction } from "react-router";
import { TrongateLogo } from "../trongate";
import { Heading } from "~/components/ui/heading";

export const meta: MetaFunction = () => {
  return [
    { title: 'Blog :: Trongate mx-transition' },
    { name: "description", content: "Documentation for my mx-transition attribute" }
  ];
}

export default function BlogTrongateMxTransition() {
  const { t } = useTranslation('blog');

  return (
    <div className="px-6 lg:px-8 text-center">
      <article className="mx-auto max-w-3xl text-base leading-7 text-primary">
        <TrongateLogo />

        <Heading level={1} className="mt-2">
          {t("posts.trongate.mx-transition.intro")}
        </Heading>


        <section className="mt-10">
          <video>
            <source src="/videos/blog/trongate/view_transitions.webm" />
          </video>
        </section>
      </article>
    </div>
  );
}