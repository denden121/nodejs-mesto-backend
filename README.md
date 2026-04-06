# Mesto Backend

Backend API для приложения Mesto.

IP адрес: 178.154.228.62
Frontend: https://mesto.nomorepartiessite.ru
Backend: https://api.mesto.nomorepartiessite.ru

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
DEPLOY_USER=danila
DEPLOY_HOST=178.154.228.62
DEPLOY_REPO=git@github.com:denden121/nodejs-mesto-backend.git
DEPLOY_PATH=/home/danila/mesto-backend
```
