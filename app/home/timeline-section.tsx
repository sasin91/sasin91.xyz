import type { HTMLProps } from "react";
import { useTranslation } from "react-i18next";
import Underline from "~/components/ui/underline";

type TimelineItemType = {
    name: string;
    description: string;
    date: Date;
    href?: string;
};

function TimelineItem(item: TimelineItemType) {
    return (
        <a
            className={`group transition-all duration-300 ease-in-out text-secondary-foreground`}
            target="_blank"
            href={item.href || "#"}
            rel="noreferrer"
        >
            <time
                dateTime={item.date.toISOString()}
                className="flex items-center text-sm font-semibold leading-6 text-primary"
            >
                <svg
                    viewBox="0 0 4 4"
                    className="flex-none w-1 h-1 mr-4"
                    aria-hidden="true"
                >
                    <circle cx="2" cy="2" r="2" fill="currentColor" />
                </svg>
                {item.date.toLocaleDateString()}
                <div
                    className="absolute w-screen h-px -ml-2 -translate-x-full bg-primary/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                    aria-hidden="true"
                />
            </time>
            <p className="mt-6 text-lg font-semibold leading-8 tracking-tight group text-primary">
                {item.href ? <Underline>{item.name}</Underline> : item.name}
            </p>
            <p className="mt-1 text-base leading-7 text-secondary-foreground">
                {item.description}
            </p>
        </a>
    );
}

export default function TimelineSection(props: HTMLProps<HTMLDivElement>) {
    const { t } = useTranslation();

    return (
        <div {...props} className="px-6 mx-auto -mt-8 max-w-7xl lg:px-8">
            <div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <TimelineItem
                    key="education"
                    name={t("timeline.webintegrator.name")}
                    description={t("timeline.webintegrator.description")}
                    date={new Date("2015-08")}
                />
                <TimelineItem
                    key="ghc_travel"
                    name={t("timeline.ghc.name")}
                    description={t("timeline.ghc.description")}
                    date={new Date("2017-02")}
                />
                <TimelineItem
                    key="syncronet"
                    name={t("timeline.syncronet.name")}
                    description={t("timeline.syncronet.description")}
                    date={new Date("2020-02")}
                />
                <TimelineItem
                    key="juice"
                    name={t("timeline.juice.name")}
                    description={t("timeline.juice.description")}
                    date={new Date("2023-01")}
                />
                <TimelineItem
                    key="supeo"
                    name={t("timeline.supeo.name")}
                    description={t("timeline.supeo.description")}
                    date={new Date("2023-09")}
                />
                <TimelineItem
                    key="juice_2"
                    name={t("timeline.juice.name")}
                    description={t("timeline.juice.description_2")}
                    date={new Date("2024-09")}
                />
            </div>
        </div>
    );
}
