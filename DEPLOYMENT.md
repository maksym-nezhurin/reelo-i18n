# 🚀 Deployment Guide для @reelo/i18n

## 📦 Варіанти деплою

### Варіант 1: GitHub Repository (як @reelo/ui) ✅ Рекомендовано

Використовуйте той самий підхід, що й `@reelo/ui` - окремий GitHub репозиторій.

#### Крок 1: Створити репозиторій на GitHub

```bash
# Створити новий репозиторій на GitHub
# Наприклад: https://github.com/maksym-nezhurin/reelo-i18n
```

#### Крок 2: Підготувати пакет для публікації

```bash
cd packages/i18n

# Збілдити пакет
pnpm build

# Перевірити, що dist/ містить збілджені файли
ls -la dist/
```

#### Крок 3: Ініціалізувати git (якщо ще не зроблено)

```bash
cd packages/i18n
git init
git add .
git commit -m "Initial commit: @reelo/i18n package"
git remote add origin https://github.com/maksym-nezhurin/reelo-i18n.git
git push -u origin main
```

#### Крок 4: Використовувати в додатках

**В admin app (локально):**
```json
{
  "dependencies": {
    "@reelo/i18n": "workspace:*"
  }
}
```

**В client app (через GitHub):**
```json
{
  "dependencies": {
    "@reelo/i18n": "git+https://github.com/maksym-nezhurin/reelo-i18n.git"
  }
}
```

### Варіант 2: NPM Registry

Якщо хочете публікувати в npm:

```bash
# Збілдити
pnpm build

# Публікувати (потрібен npm account)
npm publish --access public
```

Потім використовувати:
```json
{
  "dependencies": {
    "@reelo/i18n": "^1.0.0"
  }
}
```

### Варіант 3: GitHub Packages

Публікація в GitHub Packages:

```bash
# Додати в package.json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
}

# Публікувати
npm publish
```

## 🔧 Налаштування для різних додатків

### Admin App (Vite) - локальна розробка

```json
// apps/admin/package.json
{
  "dependencies": {
    "@reelo/i18n": "workspace:*"
  }
}
```

**Переваги:**
- ✅ Швидкі зміни (hot reload)
- ✅ Не потрібно пушити на GitHub для тестування
- ✅ TypeScript paths працюють автоматично

### Client App (Next.js) - production

```json
// apps/client/package.json
{
  "dependencies": {
    "@reelo/i18n": "git+https://github.com/maksym-nezhurin/reelo-i18n.git"
  }
}
```

**Переваги:**
- ✅ Стабільна версія
- ✅ Не залежить від локального monorepo
- ✅ Можна використовувати в інших проектах

## 📋 Чеклист перед публікацією

- [ ] Збілдити пакет: `pnpm build`
- [ ] Перевірити, що `dist/` містить всі файли
- [ ] Перевірити, що `locales/` включені в `files` в package.json
- [ ] Оновити версію в package.json (якщо потрібно)
- [ ] Зробити commit та push на GitHub
- [ ] Перевірити, що пакет працює в client app

## 🔄 Оновлення пакету

### Коли оновлюєте переклади:

1. **В monorepo (admin app):**
   ```bash
   # Оновити переклади в packages/i18n/locales/
   # Збілдити
   cd packages/i18n
   pnpm build
   
   # Commit та push
   git add .
   git commit -m "Update translations"
   git push
   ```

2. **В client app:**
   ```bash
   # Оновити залежність
   cd apps/client
   pnpm update @reelo/i18n
   ```

## 🎯 Рекомендації

1. **Для локальної розробки:** використовуйте `workspace:*`
2. **Для production:** використовуйте GitHub репозиторій
3. **Для версіонування:** використовуйте git tags:
   ```bash
   git tag v1.0.0
   git push --tags
   ```
   Потім використовуйте:
   ```json
   "@reelo/i18n": "git+https://github.com/maksym-nezhurin/reelo-i18n.git#v1.0.0"
   ```

## 📝 Структура після збілду

```
packages/i18n/
├── dist/              ← Збілджені файли (для публікації)
│   ├── index.js
│   ├── index.d.ts
│   ├── i18n.js
│   └── ...
├── locales/          ← Переклади (включені в пакет)
│   ├── en/
│   ├── uk/
│   └── pl/
├── src/              ← Source файли (не потрібні в пакеті)
├── package.json
└── tsconfig.build.json
```

## ✅ Готово!

Після налаштування ви зможете:
- ✅ Використовувати `workspace:*` для локальної розробки
- ✅ Публікувати на GitHub для production
- ✅ Використовувати в будь-якому проекті
