import { useTranslation as useI18nTranslation } from 'react-i18next';
import i18n from './i18n';
import type { TranslationKey, TranslationOptions } from './types';

/**
 * Typed version of useTranslation hook
 * Provides type-safe translation keys with autocomplete
 */
export function useTypedTranslation() {
  const { t: i18nT, ...rest } = useI18nTranslation();

  const t = (key: TranslationKey, options?: TranslationOptions): string => {
    // Якщо ключ починається з namespace (наприклад, 'menu.sections.main.label'),
    // використовуємо синтаксис з двокрапкою для явного вказання namespace
    const parts = key.split('.');
    const possibleNamespace = parts[0];
    const namespaces = ['common', 'auth', 'profile', 'menu', 'users', 'cars', 'scrapper', 'api', 'time', 'errors'];
    
    if (namespaces.includes(possibleNamespace)) {
      // Використовуємо синтаксис namespace:key
      const keyWithoutNamespace = parts.slice(1).join('.');
      return i18nT(`${possibleNamespace}:${keyWithoutNamespace}`, options) as string;
    }
    
    return i18nT(key, options) as string;
  };

  return {
    t,
    ...rest,
  };
}

/**
 * Typed translation function (for use outside React components)
 */
export function getTypedT() {
  const t = (key: TranslationKey, options?: TranslationOptions): string => {
    return i18n.t(key, options) as string;
  };
  return t;
}
