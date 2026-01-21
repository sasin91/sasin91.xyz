import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import type { ForwardedRef } from "react";
import { forwardRef } from "react";

import { Underline } from "@/components/ui/underline";
import { cn } from "@/lib/utils";

export default forwardRef(function BlogLink(
  {
    children,
    className = "",
    ...rest
  }: InertiaLinkProps & {
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
