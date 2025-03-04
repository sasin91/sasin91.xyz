import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "~/contexts/theme-context";

export default function ThemeSwitch() {
  const { t } = useTranslation();

  const { theme, setTheme, dark } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="relative p-1 text-gray-400 bg-transparent rounded-full"
      onClick={() => {
        setTheme(dark ? "light" : "dark");
      }}
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">{t("menu.color_theme")}</span>
      {dark ? (
        <MoonIcon className="w-6 h-6" aria-hidden="true" />
      ) : (
        <SunIcon className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
}
