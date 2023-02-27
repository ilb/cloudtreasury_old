# cloudtreasury
АРМ Казначейства

## Установка проекта для разработки 

1. `npm i`
2. `cp .env.example .env`
2. `./sql/schema.pg.sh`
3. `npx prisma generate`
4. `npm run dev`

## Выкладка проекта

1. Создать БД (postgres) используя sql/schema.pg.sql
2. Выложить https://github.com/ilb/cloudtreasurytemplates (в отдельную папку проекта склонировать)
3. Выложить https://github.com/ilb/stockvaluation (в отдельную папку проекта склонировать)
4. Настроить переменные по web.xml
5. Деплой