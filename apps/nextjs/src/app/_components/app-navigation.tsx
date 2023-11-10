import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";

import NavLink from "./ui/nav-link";

export type Link = { key: string; href: string; label: string };

export const DesktopNavigation = ({ links }: { links: Link[] }) => {
  const pathname = usePathname();
  const isActive = (link: Link) => pathname.startsWith(link.href);

  return (
    <>
      {links.map((link) => (
        <NavLink key={link.key} href={link.href} active={isActive(link)}>
          {link.label}
        </NavLink>
      ))}
    </>
  );
};

export const MobileNavigation = ({ links }: { links: Link[] }) => {
  return (
    <>
      {links.map((link) => (
        <Disclosure.Button
          key={link.key}
          as={Link}
          href={link.href}
          className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
        >
          {link.label}
        </Disclosure.Button>
      ))}
    </>
  );
};
