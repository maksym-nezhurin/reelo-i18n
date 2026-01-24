import { useTranslation as useI18nTranslation } from 'react-i18next';
import i18n from './i18n';
import type { TranslationKey, TranslationOptions } from './types';

/**
 * Typed version of useTranslation hook
 * Provides type-safe translation keys with autocomplete
 */
export function useTypedTranslation() {
  const { t: i18nT, ...rest } = useI18nTranslation('common', { i18n });

  const t = (key: TranslationKey, options?: TranslationOptions): string => {
    // Якщо ключ починається з namespace (наприклад, 'menu.sections.main.label'),
    // використовуємо синтаксис з двокрапкою для явного вказання namespace
    const parts = key.split('.');
    const possibleNamespace = parts[0];
    const namespaces = ['common', 'auth', 'profile', 'menu', 'users', 'cars', 'scrapper', 'api', 'time', 'errors', 'system'];
    
    if (namespaces.includes(possibleNamespace)) {
      // Використовуємо синтаксис namespace:key
      const keyWithoutNamespace = parts.slice(1).join('.');
      // Ensure namespace is loaded before translation
      if (!i18n.hasResourceBundle(i18n.language, possibleNamespace)) {
        i18n.loadNamespaces(possibleNamespace).catch(console.error);
      }
      // Use the key without namespace prefix and specify namespace in options
      return i18nT(keyWithoutNamespace, { ns: possibleNamespace, ...options }) as string;
    }
    
    return i18nT(key, options) as string;
  };

  return {
    t,
    ...rest,
    i18n, // Ensure i18n is available
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
