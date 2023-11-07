import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "~/app/i18n";
import type { Props } from "~/app/types/Props";
import MoonImage from "~/assets/tyler-van-der-hoeven-_ok8uVzL2gI-unsplash.jpg";

export default async function ProjectsPage({ params }: Props) {
  const { t } = await useTranslation(params.lang);

  return (
    <article className="container mx-auto">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {t("projects.title")}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {t("projects.description")}
        </p>
      </div>
      <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <li>
          <Link href={`/${params.lang}/game`}>
            <Image
              className="relative z-10 aspect-[3/2] w-full rounded-2xl object-cover"
              src={MoonImage}
              width={400}
              height={400}
              priority={true}
              alt="random image"
            />
            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
              {t("projects.game.title")}
            </h3>
            <picture className="text-base leading-7 text-gray-600">✨</picture>
          </Link>
        </li>
      </ul>
    </article>
  );
}
