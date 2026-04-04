# Mesto Backend

Backend API для приложения Mesto.

## Деплой

IP адрес: x.x.x.x
Frontend: https://...
Backend: https://api....

## Локальный запуск

```bash
npm install
npm run dev
```

## Переменные окружения

Создайте `.env` файл:

```
NODE_ENV=production
JWT_SECRET=your_secret_key
MONGODB_URI=mongodb://localhost:27017/mestodb
PORT=3000
```

Для деплоя создайте `.env.deploy`:

```
DEPLOY_USER=username
DEPLOY_HOST=x.x.x.x
DEPLOY_REPO=git@github.com:denden121/nodejs-mesto-backend.git
DEPLOY_PATH=/home/username/mesto-backend
```
