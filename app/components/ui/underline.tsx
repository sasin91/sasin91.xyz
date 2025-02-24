import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "~/utils/tailwind";

type Trigger = "group-hover" | "hover";

export default function Underline({
  children,
  trigger = undefined,
  active = false,
  ...props
}: PropsWithChildren<
  { trigger?: Trigger; active?: boolean } & HTMLAttributes<HTMLSpanElement>
>) {
  if (!trigger) {
    trigger = "group-hover";
  }

  return (
    <span
      {...props}
      className={cn(
        "bg-linear-to-r",
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
        active ? "bg-[length:100%_2px]" : `${trigger}:bg-[length:100%_2px]`,
        props.className
      )}
    >
      {children}
    </span>
  );
}
