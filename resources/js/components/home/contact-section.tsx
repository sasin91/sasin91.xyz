import type { HTMLProps } from "react";
import { MeshPattern } from "@/components/svgs/mesh-pattern";
import { Heading } from "@/components/ui/heading";
import { Underline } from "@/components/ui/underline";

export default function ContactSection(props: HTMLProps<HTMLDivElement>) {
    return (
        <section
            {...props}
            className="relative px-6 py-24 mx-auto mt-32 bg-gradient-conic at-top to-magenta-100/20 isolate max-w-7xl from-background via-primary-100/5 sm:mt-40 sm:py-32 lg:px-8"
        >
            <MeshPattern className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,skyblue,transparent)]" />
            <div className="max-w-xl mx-auto lg:max-w-4xl">
                <Heading level={1} className="text-4xl!">
                    Do I sound exciting?
                </Heading>

                <span className="group mt-2">
                    <a
                        className="text-lg leading-8 text-secondary-foreground"
                        href="mailto:jonas.kerwin.hansen@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Underline>📧 I'm always ready for a chat, so send me an email 🤗</Underline>
                    </a>
                </span>
            </div>
        </section>
    );
}
