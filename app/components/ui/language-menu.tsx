import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "./dropdown";
import { LanguagesIcon } from "lucide-react";
import { NavbarItem } from "./navbar";

export const LanguageMenu = () => {
  const { t, i18n } = useTranslation();

  return (
    <Dropdown>
      <DropdownButton as={NavbarItem} aria-label={t("languages.select")}>
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
