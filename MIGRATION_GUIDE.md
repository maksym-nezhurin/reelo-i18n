# 🔄 Migration Guide: Використання Shared i18n Package

## 📋 Як використовувати в admin app

### ✅ Вже налаштовано!

Admin app вже підключений до shared пакету. Просто використовуйте:

```tsx
// ❌ Старий спосіб (не використовуйте)
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
t('username') // ❌ Немає типізації

// ✅ Новий спосіб (використовуйте це)
import { useTypedTranslation } from '../i18n';
const { t } = useTypedTranslation();
t('auth.username') // ✅ TypeScript знає всі ключі!
```

### 🔧 Приклад оновлення компонента

**Було:**
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('username')}</p>
      <p>{t('password_min_length', { count: 4 })}</p>
    </div>
  );
}
```

**Стало:**
```tsx
import { useTypedTranslation } from '../i18n';

function MyComponent() {
  const { t } = useTypedTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('auth.username')}</p>
      <p>{t('auth.password_min_length', { count: 4 })}</p>
    </div>
  );
}
```

## 🎯 Структура ключів перекладів

Всі ключі тепер мають префікс namespace:

| Старий ключ | Новий ключ |
|------------|-----------|
| `welcome` | `common.welcome` |
| `username` | `auth.username` |
| `password` | `auth.password` |
| `login` | `auth.login` |
| `menu.dashboard` | `menu.sections.main.items.dashboard.label` |
| `scrapper.title` | `scrapper.title` |
| `users.header` | `users.header` |

## 📦 Namespaces

- `common.*` - Загальні елементи (loading, success, error, save, cancel)
- `auth.*` - Аутентифікація (login, register, username, password)
- `profile.*` - Профіль користувача
- `menu.*` - Навігація
- `users.*` - Управління користувачами
- `cars.*` - Автомобілі
- `scrapper.*` - Скреппер
- `api.*` - API клієнт
- `time.*` - Час
- `errors.*` - Помилки

## 🚀 Як додати в client app (Next.js)

### 1. Додати залежність

```json
// apps/client/package.json
{
  "dependencies": {
    "@reelo/i18n": "workspace:*"
  }
}
```

### 2. Створити i18n.ts

```ts
// apps/client/src/i18n.ts (або де завгодно)
export { default, useTypedTranslation } from '@reelo/i18n';
export type { TranslationKey, TranslationOptions } from '@reelo/i18n';
```

### 3. Скопіювати переклади

```bash
cp -r packages/i18n/locales/* apps/client/public/locales/
```

### 4. Ініціалізувати в Next.js

```tsx
// apps/client/app/layout.tsx або _app.tsx
import '../i18n'; // Ініціалізує i18next
```

### 5. Використовувати в компонентах

```tsx
'use client';

import { useTypedTranslation } from '../i18n';

export default function Page() {
  const { t } = useTypedTranslation();
  
  return <h1>{t('common.welcome')}</h1>;
}
```

## 💡 Бенефіти

### 1. **TypeScript автодоповнення**
```tsx
t('auth.') // ← TypeScript покаже всі доступні ключі!
```

### 2. **Перевірка помилок**
```tsx
t('auth.invalid_key') // ❌ TypeScript помилка!
```

### 3. **Перевірка опцій**
```tsx
t('auth.password_min_length', { count: 4 }) // ✅
t('auth.password_min_length', { invalid: 4 }) // ❌ Помилка!
```

### 4. **Один набір перекладів**
- Зміни в `packages/i18n` автоматично доступні в усіх додатках
- Немає дублювання
- Консистентність

## 🔍 Як знайти всі місця для оновлення

```bash
# Знайти всі використання старого useTranslation
grep -r "useTranslation" apps/admin/src

# Знайти всі використання t(' без namespace
grep -r "t('" apps/admin/src | grep -v "t('common\|t('auth\|t('menu"
```

## ✅ Чеклист міграції

- [ ] Замінити `useTranslation` на `useTypedTranslation`
- [ ] Додати namespace до всіх ключів (`common.*`, `auth.*`, тощо)
- [ ] Перевірити, що всі переклади працюють
- [ ] Оновити тести (якщо є)
- [ ] Перевірити TypeScript помилки

## 🎉 Готово!

Після міграції ви отримаєте:
- ✅ TypeScript типізацію
- ✅ Автодоповнення
- ✅ Перевірку помилок
- ✅ Спільні переклади між додатками
