export const fallbackLng = "da" as const;
export const languages = [fallbackLng, "en"] as const;
export type Lng = (typeof languages)[number];
export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(
  lng: Lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    // debug: true,
    supportedLngs: languages,
    preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
