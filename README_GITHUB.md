# @reelo/i18n

Shared i18n package for Reelo platform with TypeScript support.

## Installation

```bash
pnpm add git+https://github.com/maksym-nezhurin/reelo-i18n.git
# or
npm install git+https://github.com/maksym-nezhurin/reelo-i18n.git
```

## Usage

```tsx
import { useTypedTranslation } from '@reelo/i18n';
import '@reelo/i18n'; // Initialize i18next

function MyComponent() {
  const { t } = useTypedTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('auth.login_success')}</p>
    </div>
  );
}
```

## Setup

1. Copy translation files to your `public/locales/` directory:
   ```bash
   cp -r node_modules/@reelo/i18n/locales/* public/locales/
   ```

2. Initialize i18n in your app entry point:
   ```tsx
   import '@reelo/i18n';
   ```

## Features

- ✅ TypeScript types with autocomplete
- ✅ Modular structure (common, auth, menu, etc.)
- ✅ Multi-language support (en, uk, pl)
- ✅ Typed translation hooks

## Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.
