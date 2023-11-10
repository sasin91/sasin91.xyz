import { PropsWithChildren } from "react";
import Link from "next/link";

import { cn } from "~/utils/tailwind";

export default function NavLink({
  children,
  href,
  active = false,
  ...rest
}: PropsWithChildren<{ href: string; active: boolean }>) {
  return (
    <Link
      className={cn(
        "inline-flex items-center border-b-2 px-1 pt-1",
        active
          ? "border-indigo-400 text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out focus:border-indigo-700 focus:outline-none dark:border-indigo-600 dark:text-gray-100"
          : "group border-transparent text-sm font-medium leading-5 transition-all duration-300 ease-in-out",
      )}
      href={href}
      {...rest}
    >
      <span className="bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-cyan-500 transition-all duration-500 ease-out group-hover:bg-[length:100%_2px] group-hover:text-indigo-600">
        {children}
      </span>
    </Link>
  );
}
