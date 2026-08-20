import { useCallback } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import i18n, { enabledNamespaces } from './i18n';
import type { TranslationKey, TranslationOptions } from './types';

/**
 * Typed version of useTranslation hook
 * Provides type-safe translation keys with autocomplete
 */
export function useTypedTranslation(): {
  t: (key: TranslationKey | string, options?: TranslationOptions) => string;
  i18n: typeof i18n;
  ready: boolean;
} {
  const { t: i18nT, ready } = useI18nTranslation('common', {
    i18n,
    useSuspense: false,
  });

  // useCallback: without this, `t` gets a brand-new function identity on every render.
  // Any consumer doing `useCallback(fn, [t])` + `useEffect(() => void fn(), [fn])` (a very
  // common data-loading pattern in this codebase) then re-fires that effect on every
  // render, not just on mount/dependency change — an unbounded fetch loop. Found via a
  // live GET /v1/admin/overview request loop (apps/admin Dashboard.tsx `load`).
  const t = useCallback(
    (key: TranslationKey | string, options?: TranslationOptions): string => {
      // Якщо ключ починається з namespace (наприклад, 'menu.sections.main.label'),
      // використовуємо синтаксис з двокрапкою для явного вказання namespace
      const parts = key.split('.');
      const possibleNamespace = parts[0];
      if (enabledNamespaces.includes(possibleNamespace)) {
        // Використовуємо синтаксис namespace:key
        const keyWithoutNamespace = parts.slice(1).join('.');
        // Use i18n.t() directly to ensure namespace is properly loaded
        return i18n.t(keyWithoutNamespace, { ns: possibleNamespace, ...options }) as string;
      }

      // For keys without namespace prefix, use default namespace
      return i18nT(key, options) as string;
    },
    [i18nT],
  );

  return {
    t,
    i18n,
    ready,
  };
}

/**
 * Typed translation function (for use outside React components)
 */
export function getTypedT() {
  const t = (key: TranslationKey | string, options?: TranslationOptions): string => {
    return i18n.t(key, options) as string;
  };
  return t;
}
