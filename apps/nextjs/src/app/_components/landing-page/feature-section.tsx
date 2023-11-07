import {
  AppWindowIcon,
  ClipboardCheckIcon,
  CogIcon,
  DatabaseIcon,
  HistoryIcon,
  LockIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  UploadCloudIcon,
} from "lucide-react";

import { useTranslation } from "~/app/i18n";
import { Lng } from "~/app/i18n/settings";

export default async function FeatureSection({ lang }: { lang: Lng }) {
  const { t } = await useTranslation(lang);

  const features = [
    {
      name: t("features.servers.name"),
      description: t("features.servers.description"),
      icon: <UploadCloudIcon className="h-8 w-8 text-white" />,
    },
    {
      name: t("features.security.name"),
      description: t("features.security.description"),
      icon: <LockIcon className="h-8 w-8 text-white" />,
    },
    {
      name: t("features.backend_development.name"),
      description: t("features.backend_development.description"),
      icon: <CogIcon className="h-8 w-8 text-white" />,
    },
    {
      name: t("features.automated_testing.name"),
      description: t("features.automated_testing.description"),
      icon: <ShieldCheckIcon className="h-8 w-8 text-white" />,
    },
    {
      name: t("features.databases.name"),
      description: t("features.databases.description"),
      icon: <DatabaseIcon className="h-8 w-8 text-white" />,
    },
    {
      name: t("features.frontend_development.name"),
      description: t("features.frontend_development.description"),
      icon: <RefreshCwIcon className="h-8 w-8 text-white" />,
    },
    {
      name: t("features.app_development.name"),
      description: t("features.app_development.description"),
      icon: <AppWindowIcon className="h-8 w-8 text-white" />,
    },
    {
      name: t("features.vcs.name"),
      description: t("features.vcs.description"),
      icon: <ClipboardCheckIcon className="h-8 w-8 text-white" />,
    },
    {
      name: t("features.backups.name"),
      description: t("features.backups.description"),
      icon: <HistoryIcon className="h-8 w-8 text-white" />,
    },
  ];

  return (
    <div className="mt-32 overflow-hidden pb-8 sm:mt-40">
      <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-sky-400">
          {t("features.headline")}
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {t("features.tagline")}
        </p>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root rounded-lg bg-sky-100/10 px-6 pb-8 shadow-lg">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-xl bg-indigo-500 p-3 shadow-lg">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-gray-600">
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
