import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Theme = "light" | "dark";

export default function ThemeSwitch() {
  const { t } = useTranslation();

  const [theme, setTheme] = useState<Theme>("dark");
  const dark = theme !== "light";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    setTheme(savedTheme || "dark");

    return () => {
      localStorage.setItem("theme", theme);
    };
  }, []);

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
