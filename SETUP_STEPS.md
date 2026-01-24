# ✅ Кроки для запуску i18n в admin app

## 🔧 Що було виправлено:

1. ✅ Додано `extends` в `tsconfig.app.json` для використання paths з `tsconfig.base.json`
2. ✅ Виправлено експорт `default` в `packages/i18n/src/index.ts`
3. ✅ Встановлено залежності через `pnpm install`

## 📋 Наступні кроки:

### 1. Перезапустити TypeScript Server (якщо використовуєте VS Code)
- Натисніть `Cmd+Shift+P` (Mac) або `Ctrl+Shift+P` (Windows/Linux)
- Введіть: `TypeScript: Restart TS Server`
- Натисніть Enter

### 2. Перезапустити dev server
```bash
# Зупиніть поточний dev server (Ctrl+C)
# Запустіть знову:
cd apps/admin
pnpm dev
```

### 3. Перевірити, що все працює

Відкрийте `apps/admin/src/pages/Login.tsx` - там вже оновлено для використання typed translations.

Якщо все працює, ви побачите:
- ✅ Немає помилок TypeScript
- ✅ Автодоповнення при введенні `t('auth.`
- ✅ Переклади працюють в браузері

## 🐛 Якщо все ще є помилки:

### Помилка: "Cannot find module '@reelo/i18n'"

**Рішення:**
```bash
# Перевірте, чи встановлено залежності
cd /Users/mac/Desktop/projects/may\ 2025/monorepo
pnpm install

# Перевірте, чи пакет є в node_modules
ls -la apps/admin/node_modules/@reelo/
```

### Помилка: "Module not found" в runtime

**Рішення:**
Перевірте, чи переклади скопійовані:
```bash
ls apps/admin/public/locales/en/
# Має бути: common.json, auth.json, menu.json, тощо
```

Якщо файлів немає:
```bash
cp -r packages/i18n/locales/* apps/admin/public/locales/
```

### Помилка TypeScript в IDE

**Рішення:**
1. Перезапустіть TypeScript Server (див. вище)
2. Перевірте, чи `tsconfig.app.json` має `extends: "../../tsconfig.base.json"`
3. Перезапустіть IDE

## ✅ Перевірка:

Відкрийте `apps/admin/src/pages/Login.tsx`:

```tsx
import { useTypedTranslation } from '../i18n';

// Має працювати без помилок:
const { t } = useTypedTranslation();
t('auth.username'); // ✅ TypeScript знає цей ключ!
```

Якщо все працює - готово! 🎉
