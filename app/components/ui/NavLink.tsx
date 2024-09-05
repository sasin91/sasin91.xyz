import { InertiaLinkProps, Link } from "@inertiajs/react";

import { cn } from "@/utils/tailwind";
import Underline from "../Underline";
import type { ClassValue } from "clsx";

export const navLinkClasses = (active: boolean, className: ClassValue = "") =>
    cn(
        "inline-flex",
        "items-center",
        "border-b-2",
        "px-1",
        "pt-1",
        active
            ? "border-indigo-400 text-sm font-medium leading-5 text-primary transition duration-150 ease-in-out focus:border-indigo-700 focus:outline-none dark:border-indigo-600"
            : "group border-transparent text-sm font-medium leading-5 transition-all duration-300 ease-in-out",
        className
    );

export default function NavLink({
    children,
    active = false,
    className = "",
    ...rest
}: InertiaLinkProps & { href: string; active: boolean }) {
    return (
        <Link className={navLinkClasses(active, className)} {...rest}>
            <Underline>{children}</Underline>
        </Link>
    );
}
