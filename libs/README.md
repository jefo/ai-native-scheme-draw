# SysDiag UI Kit

Тёмный UI Kit для схем системного дизайна в стиле **ByteByteGo**: контейнеры,
контурные иконки, статус-бейджи, коннекторы и акторы. Svelte 5 (runes mode).

Позиционирование: это не семантическая грамматика («что это и как связано»),
а **набор готовых визуальных элементов** — из ~20 базовых штук собирается любая
архитектурная схема за 15 минут.

## Запуск (dev-сервер с демо-галереей)

```bash
npm install
npm run dev      # http://localhost:5174
```

Демо — hash-переключаемые страницы:
- **Галерея** (`#gallery`) — полный инвентарь + сцена «Data Lakehouse»,
  собранная из кита (слои storage, потоковые стрелки, статусы,
  заблокированный доступ, акторы, сравнение архитектур).
- **Раскадровка** (`#storyboard`) — 6 сцен `Stage` на тему «Router vs
  Controller»: постановка вопроса → боль монолита → Router (ГДЕ?) →
  Controller (ЧТО ДЕЛАТЬ?) → метафора больницы → трейд-оффы.

## Установка в другой проект

```bash
npm i <путь-к-libs>        # или npm publish + npm i sysdiag-ui-kit
```

```ts
import 'sysdiag-ui-kit/styles/tokens.css';   // один раз в корне приложения
import { Panel, Icon, StatusBadge, Arrow, Actor } from 'sysdiag-ui-kit';
```

```svelte
<Panel label="Lakehouse Storage" icon="data-lakehouse" tone="blue" badge="S3">
  <Panel label="Object Storage" icon="object-storage" variant="inset" tone="blue">
    <StatusBadge tone="success" label="Committed" />
    <StatusBadge tone="error" label="Write failed" />
  </Panel>
  <Arrow animated tone="blue" label="streaming logs" />
</Panel>
```

## Инвентарь

| Категория | Компоненты | Назначение |
|---|---|---|
| Контейнеры | `Panel` (tone: default/blue/green/amber/red, variant: card/inset, badge), `Comparison` (равные колонки), `Divider` (hor/ver, с label) | границы системы, слои абстракции, сравнение |
| Сцены | `Stage` (index, title, timecode, goal) | рамка сцены раскадровки: одна законченная макро-композиция на экране |
| Иконки | `Icon` + 37 контурных line-art иконок (`ICON_NAMES`, `IconName`) | метафоры систем, форматы данных, инструменты, статусы |
| Индикаторы | `StatusBadge` (success/error/warning/info/running/neutral, pulse), `Spinner` | боль и успех: ✓ ✗ ⚠ 🔒 ⏱ |
| Коннекторы | `Arrow` (direction 4, dashed, animated, blocked, label, tone) | статичные связи, метаданные, живые потоки, запреты |
| Акторы | `Actor` (role: engineer/analyst/user, mood: neutral/happy/sad, dim) | «кто страдает, кто пользуется» |
| Утилиты | `.bbg-dim` (opacity 0.35) | внимание: неактивное уходит в тень |

Цветовая система — токены в `src/lib/styles/tokens.css` (также публикуются как
`sysdiag-ui-kit/styles/tokens.css`): фон `#121212`, hairline-бордеры, четыре
акцента (amber = внимание, blue = хранилища, green = успех, red = ошибки).
Без теней, скругления 10px/6px.

## Сборка и проверка

```bash
npm run build        # svelte-package: src/lib → dist (svelte + .d.ts + css)
npm run demo:build   # статическая сборка демо-галереи
npm run check        # svelte-check (типы)
```

Экспорт пакета: `dist/index.js` + `dist/index.d.ts` + `dist/styles/tokens.css`.
Для потребителей настроены условия `types` / `svelte` / `default`.

## Структура

```
src/
  lib/                        ← библиотека (то, что публикуется)
    index.ts                  barrel: компоненты, типы, XxxProps
    styles/tokens.css         дизайн-токены (импортируется потребителем)
    components/
      containers/  Panel, Comparison, Divider
      icons/        Icon.svelte + icons.ts (реестр иконок, данные)
      indicators/   StatusBadge, Spinner
      connectors/   Arrow
      actors/       Actor
  App.svelte                  ← демо-галерея (не публикуется)
  main.ts, app.css
```
