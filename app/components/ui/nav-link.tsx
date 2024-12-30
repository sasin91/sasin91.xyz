import type { ClassValue } from "clsx";
import { forwardRef } from "react";
import type { LinkProps } from "react-router";
import Underline from "~/components/ui/underline";
import { cn } from "~/utils/tailwind";
import { Link } from "./link";

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

export default forwardRef(function NavLink(
  {
    children,
    active = false,
    className = "",
    ...rest
  }: Omit<LinkProps, "to"> & {
    href: string | LinkProps["to"];
    active?: boolean;
  },
  ref?: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Link ref={ref} className={navLinkClasses(active, className)} {...rest}>
      <Underline>{children}</Underline>
    </Link>
  );
});
