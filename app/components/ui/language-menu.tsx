import type { MenuProps } from "@headlessui/react";
import { LanguagesIcon } from "lucide-react";
import type { ExoticComponent, ForwardRefExoticComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "./dropdown";

export const LanguageMenu = ({
  as,
  ...props
}: MenuProps<ForwardRefExoticComponent<any> | ExoticComponent>) => {
  const { t, i18n } = useTranslation();

  return (
    <Dropdown {...props}>
      <DropdownButton as={as} aria-label={t("languages.select")}>
        <LanguagesIcon />
      </DropdownButton>
      <DropdownMenu className="min-w-64" anchor="bottom end">
        <DropdownItem
          onClick={() => i18n.changeLanguage("da")}
          disabled={i18n.language === "da"}
        >
          <DropdownLabel>{t("languages.da")}</DropdownLabel>
        </DropdownItem>
        <DropdownItem
          onClick={() => i18n.changeLanguage("en")}
          disabled={i18n.language === "en"}
        >
          <DropdownLabel>{t("languages.en")}</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
