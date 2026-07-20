# Backend — mock GraphQL server

Этап 1 (schema-first): SDL-схема как контракт + мок-сервер, отдающий
правдоподобные фейковые данные нужной формы. Реальные резолверы (NestJS +
Prisma + PostgreSQL) заменят моки на следующем этапе — контракт при этом
не меняется.

## Запуск

```bash
npm install
npm run dev
```

Сервер поднимется на `http://localhost:4000/` — открой в браузере, там
Apollo Sandbox (песочница для запросов).

Порт меняется через переменную окружения: `PORT=4001 npm run dev`.

## Структура

```
src/
  schema/          SDL-контракт — источник истины для API
    common.graphql   скаляры, enum'ы, PageInfo, корневые Query/Mutation
    user.graphql     аккаунт (identity)
    profile.graphql  анкета, фото, интересы, preference, лента (курсорная)
    match.graphql    Like, Match, мутация лайка
  mocks/           faker-моки по типам схемы
  server.ts        склейка SDL + моки + Apollo standalone
```

## Что важно знать про моки

- Мутации отрабатывают **по форме, но без состояния**: `likeUser` вернёт
  `LikeResult` (в ~30% случаев с матчем — чтобы фронт мог отрисовать оба
  сценария), но ничего не сохраняется между запросами.
- Query подходят для полноценной вёрстки: лента отдаёт 10 профилей с фото
  (picsum.photos), матчи, интересы.
- Stateful-фичи (auth, реальный матчинг) появятся на этапе резолверов.

## Проверочный запрос

```graphql
query Feed {
  feed(first: 5) {
    edges {
      cursor
      node {
        id
        displayName
        age
        bio
        photos { url type }
        interests { name }
      }
    }
    pageInfo { hasNextPage endCursor }
  }
}
```

## Следующие этапы

1. Фронт: codegen смотрит на `http://localhost:4000/` (интроспекция),
   генерит типы и хуки.
2. Замена моков реальными резолверами в порядке важности состояния:
   auth → матчинг → остальное. Тогда же появляются NestJS, Prisma,
   PostgreSQL и codegen серверных типов.
