# @reelo/i18n

Shared i18n package for Reelo monorepo applications.

## Features

- ✅ **TypeScript types** - Fully typed translation keys with autocomplete
- ✅ **Modular structure** - Translations split into logical modules
- ✅ **Multi-language support** - English, Ukrainian, Polish
- ✅ **Typed hooks** - `useTypedTranslation()` for type-safe translations
- ✅ **Shared across apps** - Use in admin, client, and other apps

## Structure

```
packages/i18n/
├── locales/
│   ├── en/          # English translations
│   ├── uk/          # Ukrainian translations
│   └── pl/          # Polish translations
│       ├── common.json
│       ├── auth.json
│       ├── profile.json
│       ├── menu.json
│       ├── users.json
│       ├── cars.json
│       ├── scrapper.json
│       ├── api.json
│       ├── time.json
│       └── errors.json
└── src/
    ├── i18n.ts              # i18next configuration
    ├── types.ts             # TypeScript types
    ├── useTypedTranslation.ts # Typed hooks
    └── index.ts             # Exports
```

## Usage

### In React Components

```tsx
import { useTypedTranslation } from '@reelo/i18n';

function MyComponent() {
  const { t } = useTypedTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('auth.login_success')}</p>
      <p>{t('auth.username_min_length', { count: 2 })}</p>
    </div>
  );
}
```

### Outside React Components

```ts
import { getTypedT } from '@reelo/i18n';

const t = getTypedT();
const message = t('common.success');
```

### Initialize in Your App

```tsx
// In your app's entry point (e.g., main.tsx)
import '@reelo/i18n'; // This initializes i18next

// Or import and use directly
import i18n from '@reelo/i18n';
```

## Translation Keys Structure

All translation keys follow the pattern: `namespace.key` or `namespace.nested.key`

### Available Namespaces:

- `common.*` - Common UI elements (buttons, labels, etc.)
- `auth.*` - Authentication related
- `profile.*` - User profile
- `menu.*` - Navigation menu
- `users.*` - User management
- `cars.*` - Car-related content
- `scrapper.*` - Scrapper functionality
- `api.*` - API client settings
- `time.*` - Time-related translations
- `errors.*` - Error messages

### Examples:

```tsx
// Common
t('common.loading')
t('common.success')
t('common.error')

// Auth
t('auth.login')
t('auth.username')
t('auth.password_min_length', { count: 4 })

// Menu
t('menu.sections.main.label')
t('menu.sections.main.items.dashboard.label')

// Scrapper
t('scrapper.title')
t('scrapper.redis_queue_status.title')
```

## Adding New Translations

1. Add the translation to all language files:
   - `locales/en/[namespace].json`
   - `locales/uk/[namespace].json`
   - `locales/pl/[namespace].json`

2. TypeScript types will be automatically inferred from the English translations

3. Use the new key in your components:
   ```tsx
   t('namespace.new_key')
   ```

## Supported Languages

- `en` - English (default)
- `uk` - Ukrainian
- `pl` - Polish

## Type Safety

All translation keys are fully typed. TypeScript will:
- ✅ Autocomplete available keys
- ✅ Show errors for invalid keys
- ✅ Type-check interpolation options

```tsx
// ✅ Valid - TypeScript knows this key exists
t('auth.username')

// ❌ Error - TypeScript will show an error
t('auth.invalid_key')

// ✅ Valid - TypeScript knows count is expected
t('auth.password_min_length', { count: 4 })

// ❌ Error - TypeScript will show an error
t('auth.password_min_length', { invalid: 4 })
```
