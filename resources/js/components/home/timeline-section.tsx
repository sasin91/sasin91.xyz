import type { HTMLProps } from "react";

type TimelineItemType = {
    name: string;
    description: string;
    date: Date;
    href?: string;
};

function TimelineItem(item: TimelineItemType) {
    return (
        <a
            className={`group flex flex-col items-start`}
            target="_blank"
            href={item.href || "#"}
            rel="noreferrer"
        >
            <time
                dateTime={item.date.toISOString()}
                className="flex items-center text-sm font-bold leading-6 text-cyan-500"
            >
                <div className="mr-4 h-2 w-2 rounded-full ring-2 ring-cyan-500/50 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                {item.date.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long'
                })}
            </time>
            <div className="ml-1 mt-4 border-l-2 border-primary/10 pl-6 pb-8 group-last:pb-0 group-last:border-transparent group-hover:border-cyan-500/30 transition-colors duration-300">
                <p className="text-lg font-bold leading-8 tracking-tight text-primary group-hover:text-cyan-600 transition-colors duration-200">
                    {item.name}
                </p>
                <p className="mt-1 text-base leading-7 text-secondary-foreground">
                    {item.description}
                </p>
            </div>
        </a>
    );
}

export default function TimelineSection(props: HTMLProps<HTMLDivElement>) {
    return (
        <section {...props} className="px-6 mx-auto mt-24 max-w-7xl lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-base font-semibold leading-7 text-pink-500 uppercase tracking-wide">
                    My Journey
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Experience & Education
                </p>
            </div>

            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <div className="space-y-2">
                    <TimelineItem
                        name="Web developer at JUICE 👊"
                        description="Like a boomerang, I'm back at Juice again. :)"
                        date={new Date("2024-09")}
                    />
                    <TimelineItem
                        name="Developer at Supeo"
                        description="At Supeo, I have been given an exciting opportunity to work with primarily Laravel and React, we work with several different domains in a changeable everyday life."
                        date={new Date("2023-09")}
                    />
                    <TimelineItem
                        name="Web developer at JUICE 👊"
                        description="In 2023, I got the opportunity to be part of something new and exciting. I got a job at JUICE, where I have helped develop a platform that turns the job market upside down."
                        date={new Date("2023-01")}
                    />
                    <TimelineItem
                        name="Developer at Syncronet 📺"
                        description="I got a job at Syncronet where I help developed their video streaming platform. In broad strokes, I took most of it."
                        date={new Date("2020-02")}
                    />
                    <TimelineItem
                        name="Web developer at GHC Travel ✈️"
                        description="I was responsible for migrating and modernizing their existing website from pure PHP to Laravel 6"
                        date={new Date("2017-02")}
                    />
                    <TimelineItem
                        name="Trained WebIntegrator 🎉"
                        description="I passed my training as a WebIntegrator with a 12. I have learned how to make websites, webshops and much more."
                        date={new Date("2015-08")}
                    />
                </div>
            </div>
        </section>
    );
}
