export default {
  supportedLngs: ["en", "da"],
    fallbackLng: "en",
    ns: "common",
    defaultNS: "common",
    saveMissing: true,
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
}