import { AppWindowIcon, ClipboardCheckIcon, CogIcon, DatabaseIcon, HistoryIcon, LockIcon, RefreshCwIcon, ShieldCheckIcon, UploadCloudIcon } from "lucide-react";
import type { HTMLProps } from "react";
import { useTranslation } from "react-i18next";

type Feature = { name: string; description: string; icon: React.ReactNode };

function FeatureCard(feature: Feature) {
    return (
        <div className="pt-6">
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
    );
}

export function FeatureSection(props: HTMLProps<HTMLDivElement>) {
    const { t } = useTranslation();

    return (
        <div {...props} className="pb-8 mt-32 overflow-hidden sm:mt-40">
            <div className="max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-semibold text-sky-400">
                    {t("features.headline")}
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    {t("features.tagline")}
                </p>
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            key="servers"
                            name={t("features.servers.name")}
                            description={t("features.servers.description")}
                            icon={<UploadCloudIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            key="security"
                            name={t("features.security.name")}
                            description={t("features.security.description")}
                            icon={<LockIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            key="backend_development"
                            name={t("features.backend_development.name")}
                            description={t("features.backend_development.description")}
                            icon={<CogIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            key="automated_testing"
                            name={t("features.automated_testing.name")}
                            description={t("features.automated_testing.description")}
                            icon={<ShieldCheckIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            key="databases"
                            name={t("features.databases.name")}
                            description={t("features.databases.description")}
                            icon={<DatabaseIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            key="frontend_development"
                            name={t("features.frontend_development.name")}
                            description={t("features.frontend_development.description")}
                            icon={<RefreshCwIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            key="app_development"
                            name={t("features.app_development.name")}
                            description={t("features.app_development.description")}
                            icon={<AppWindowIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            key="vcs"
                            name={t("features.vcs.name")}
                            description={t("features.vcs.description")}
                            icon={<ClipboardCheckIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            key="backups"
                            name={t("features.backups.name")}
                            description={t("features.backups.description")}
                            icon={<HistoryIcon className="w-8 h-8 text-primary" />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}