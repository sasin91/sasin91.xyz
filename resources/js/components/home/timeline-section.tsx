import type { HTMLProps } from "react";
import { Underline } from "@/components/ui/underline";

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
    return (
        <div {...props} className="px-6 mx-auto -mt-8 max-w-7xl lg:px-8">
            <div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <TimelineItem
                    name="Trained WebIntegrator 🎉"
                    description="I passed my training as a WebIntegrator with a 12. I have learned how to make websites, webshops and much more."
                    date={new Date("2015-08")}
                />
                <TimelineItem
                    name="Web developer at GHC Travel ✈️"
                    description="After some internships elsewhere, in 2017 I got my first job as a web developer at GHC Travel. I was responsible for migrating and modernizing their existing website from pure PHP to Laravel 6"
                    date={new Date("2017-02")}
                />
                <TimelineItem
                    name="Developer at Syncronet 📺"
                    description="After COVID-19 hit Denmark, I unfortunately had to change jobs. I got a job at Syncronet where I have been around to help develop their video streaming platform. In broad strokes, I took most of it."
                    date={new Date("2020-02")}
                />
                <TimelineItem
                    name="Web developer at JUICE 👊"
                    description="In 2023, I got the opportunity to be part of something new and exciting. I got a job at JUICE, where I have helped develop a platform that turns the job market upside down."
                    date={new Date("2023-01")}
                />
                <TimelineItem
                    name="Developer at Supeo"
                    description="At Supeo, I have been given an exciting opportunity to work with primarily Laravel and React, we work with several different domains in a changeable everyday life. In short, no two days are alike and there are plenty of opportunities to learn new things."
                    date={new Date("2023-09")}
                />
                <TimelineItem
                    name="Web developer at JUICE 👊"
                    description="Like a boomerang, I'm back at Juice again. :)"
                    date={new Date("2024-09")}
                />
            </div>
        </div>
    );
}
