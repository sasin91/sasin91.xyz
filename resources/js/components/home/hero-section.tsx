import { AtSignIcon } from "lucide-react";
import type { AnchorHTMLAttributes, HTMLProps, PropsWithChildren } from "react";

import { GithubIcon } from "@/components/svgs/github-icon";
import { LinkedinIcon } from "@/components/svgs/linkedin-icon";
import { Heading } from "@/components/ui/heading";

type SocialItem = { name: string };

function SocialLink({
    name,
    children,
    ...props
}: PropsWithChildren<SocialItem & AnchorHTMLAttributes<HTMLAnchorElement>>) {
    return (
        <a
            {...props}
            className="text-lg font-semibold leading-8 tracking-tight transition-all duration-300 ease-in-out group"
        >
            <span className="sr-only">{name}</span>
            {children}
        </a>
    );
}

export default function HeroSection(props: HTMLProps<HTMLDivElement>) {
    const iconClasses =
        "h-6 w-6 bg-linear-to-r from-purple-500 via-pink-400 to-cyan-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-primary transition-all duration-500 ease-out group-hover:bg-[length:100%_2px] group-hover:text-secondary-foreground";

    return (
        <section {...props}>
            <div className="px-6 pt-16 mx-auto max-w-7xl lg:pt-24 flex flex-col items-center text-center space-y-6 lg:space-y-8">
                <Heading className="text-4xl sm:text-5xl lg:text-6xl">
                    Jonas Hansen
                </Heading>

                <div className="space-y-6 lg:space-y-8">
                    <p className="text-lg font-medium lg:text-xl text-secondary-foreground">
                        Full-Stack Developer
                    </p>

                    <p className="text-base text-secondary-foreground/80 lg:text-lg">
                        PHP · Laravel · React · TypeScript · MySQL · Docker
                    </p>

                    <p className="text-base text-secondary-foreground/80 lg:text-lg">
                        10+ years of experience (since 2015)
                    </p>

                    <div className="flex justify-center space-x-6">
                        <SocialLink
                            key="github"
                            name="GitHub"
                            href="https://github.com/sasin91"
                        >
                            <GithubIcon className={iconClasses} />
                        </SocialLink>
                        <SocialLink
                            key="linkedin"
                            name="LinkedIn"
                            href="https://www.linkedin.com/in/jonas-hansen-2b6828110"
                        >
                            <LinkedinIcon className={iconClasses} />
                        </SocialLink>
                        <SocialLink
                            key="email"
                            name="E-Mail"
                            href="mailto:jonas.kerwin.hansen@gmail.com"
                        >
                            <AtSignIcon className={iconClasses} />
                        </SocialLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
