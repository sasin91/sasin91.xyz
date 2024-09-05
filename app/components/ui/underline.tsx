import { cn } from "@/utils/tailwind";
import { PropsWithChildren } from "react";

type Trigger = "group-hover" | "hover";

export default function Underline({
    children,
    trigger = undefined,
    active = false,
}: PropsWithChildren<{ trigger?: Trigger; active?: boolean }>) {
    if (!trigger) {
        trigger = "group-hover";
    }
    return (
        <span
            className={cn(
                "bg-gradient-to-r",
                "from-purple-500",
                "via-violet-400",
                "to-pink-300",
                "bg-[length:0%_2px]",
                "bg-left-bottom",
                "bg-no-repeat",
                "text-primary",
                "transition-all",
                "duration-500",
                "ease-out",
                active
                    ? "bg-[length:100%_2px]"
                    : `${trigger}:bg-[length:100%_2px]`
            )}
        >
            {children}
        </span>
    );
}
