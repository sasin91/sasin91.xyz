import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import type { LinkProps } from "react-router";
import Underline from "~/components/ui/underline";
import { cn } from "~/utils/tailwind";
import { Link } from "./link";

export default forwardRef(function BlogLink(
  {
    children,
    className = "",
    ...rest
  }: Omit<LinkProps, "to"> & {
    href: string | LinkProps["to"];
    active?: boolean;
  },
  ref?: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Link ref={ref} className={cn("group", className)} {...rest}>
      <Underline className="text-blue-100 hover:text-[#6767d1]">
        {children}
      </Underline>
    </Link>
  );
});
