import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    zh,
  },
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    zh: {
      currency: {
        style: "currency",
        currency: "CNY",
      },
    },
  },
});
