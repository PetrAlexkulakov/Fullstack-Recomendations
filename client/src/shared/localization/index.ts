import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './en';
import ru from './ru';
import { loadLanguageFromLocalStorage } from "./languageDetector";

const languages = { en, ru };

i18n
  .use(initReactI18next) 
  .init({
    resources: languages,
    fallbackLng: loadLanguageFromLocalStorage() || 'en',
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;