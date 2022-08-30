import i18n from 'i18next';
import XHR from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'en-CA', 'fr', 'fr-CA'],
    ns: ['common'],
    load: 'languageOnly',
    defaultNS: 'common',
    loadPath: 'locales/{{lng}}/{{ns}}.json',
    addPath: 'locales/{{lng}}/{{ns}}',
    allowMultiloading: false,
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false
    },
    updateMissing: true
});

export default i18n;
