import { useLocation } from "react-router";
import { HomeIcon, ScrollTextIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageMenu } from "./ui/language-menu";
import { Link } from "./ui/link";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "./ui/navbar";
import ThemeSwitch from "./ui/theme-switch";

import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "~/components/ui/sidebar";

export function AppNavbar() {
  const { pathname } = useLocation();
  const { t } = useTranslation('common');

  return (
    <Navbar>
      <Link href="/">
        <img
          src="/favicon.png"
          alt={t("app.title")}
          className="w-8 h-8 rounded-full"
        />
      </Link>
      <NavbarDivider />
      <NavbarSection>
        <NavbarItem href="/" current={pathname === "/"}>
          {t("navigation.global.about_me")}
        </NavbarItem>
        <NavbarItem href="/blog" current={pathname.startsWith("/blog")}>
          {t("navigation.global.blog")}
        </NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection>
        <LanguageMenu as={NavbarItem} />
        <ThemeSwitch />
      </NavbarSection>
    </Navbar>
  );
}

export function AppSidebar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarItem className="flex items-center gap-2">
          <LanguageMenu as={NavbarItem} />
          <ThemeSwitch />
        </SidebarItem>
      </SidebarHeader>
      <SidebarBody>
        <SidebarItem href="/" current={pathname === "/"}>
          <HomeIcon />
          <SidebarLabel>{t("navigation.global.about_me")}</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="/blog" current={pathname.startsWith("/blog")}>
          <ScrollTextIcon />
          <SidebarLabel>{t("navigation.global.blog")}</SidebarLabel>
        </SidebarItem>
      </SidebarBody>
    </Sidebar>
  );
}
