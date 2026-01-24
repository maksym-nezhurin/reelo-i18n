import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import type { SupportedLanguage } from './types';

export const defaultLanguage: SupportedLanguage = 'en';
export const supportedLanguages: SupportedLanguage[] = ['en', 'uk', 'pl'];

// Initialize i18next
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      allowMultiLoading: false,
      crossDomain: false,
    },
    debug: process.env.NODE_ENV === 'development', // Enable debug in development
    ns: ['common', 'auth', 'profile', 'menu', 'users', 'cars', 'scrapper', 'api', 'time', 'errors', 'system'],
    defaultNS: 'common',
    // Preload common namespace on init
    load: 'languageOnly',
    // Дозволити використання ключів з namespace в форматі 'namespace:key'
    nsSeparator: ':',
    keySeparator: '.',
    // Автоматично шукати в усіх namespaces, якщо ключ не знайдено в defaultNS
    fallbackNS: ['common', 'auth', 'profile', 'menu', 'users', 'cars', 'scrapper', 'api', 'time', 'errors', 'system'],
    react: {
      useSuspense: false, // Disable suspense to avoid issues
    },
  }, (err) => {
    if (err) {
      console.error('i18n initialization error:', err);
    }
  });

export default i18n;
