# BroChat

## Описание

BroChat (BroChatik) — это простое real-time веб-приложение для общения в чате. Сообщения доставляются мгновенно через WebSocket (SignalR), а история чата временно хранится в Redis.

Стек:
- Backend: ASP.NET Core 10, SignalR, Redis
- Frontend: React 19, Vite, TailwindCSS, Chakra UI, SignalR Client

## Как запустить

### Через Docker Compose (рекомендуется)
```docker compose up --build```


После запуска:
- Фронтенд: http://localhost:5173
- Бэкенд: http://localhost:5176
- Redis: localhost:6379
