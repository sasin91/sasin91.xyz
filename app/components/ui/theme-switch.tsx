import { useTranslation } from "@/i18n/client";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

type Theme = "light" | "dark";

export default function ThemeSwitch() {
    const { t } = useTranslation();

    const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");
    const dark = theme !== "light";

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
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
