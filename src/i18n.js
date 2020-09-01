import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import translationEN from './resources/locales/en/translation.json';
import translationLT from './resources/locales/lt/translation.json';
import translationRU from './resources/locales/ru/translation.json';


// the translations
const resources = {
    en: {
        translation: translationEN
    },
    lt: {
        translation: translationLT
    },
    ru: {
        translation: translationRU
    }
};

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
            resources,
            fallbackLng: 'en',
            debug: true,
            load: 'languageOnly',
            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
            },
        },
    );

export default i18n;
