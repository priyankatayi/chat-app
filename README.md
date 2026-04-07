# Real-Time Chat Application

A full-stack real-time chat application that allows users to connect, add friends, and exchange messages instantly.

The application uses **Socket.io** for real-time communication, **Redis** for fast message handling and session storage, and **PostgreSQL** for persistent user data. Messages are delivered instantly across active sessions, providing a seamless chat experience similar to modern messaging platforms.

---

## Features

- User authentication (session-based)
- Adding friends
- Real-time messaging using Socket.io
- Browser notifications for new messages (Web Notifications API)
- Notifications only trigger when user is inactive (tab not in focus)
- Persistent chat using PostgreSQL
- Redis session management
- Cross-origin deployment support (Frontend + Backend)

---

## Notification Feature

The application includes real-time browser notifications to enhance user experience:

- Triggers notification on new incoming messages
- Uses Web Notifications API
- Only shows when the user is not actively viewing the chat tab
- Displays sender name and message preview
- Includes click-to-focus behavior (brings user back to chat window)
- Requires user permission approval in browser

---

## Live Demo

- Frontend: [https://chat-app-iota-green-13.vercel.app/](https://chat-app-iota-green-13.vercel.app/)
- Backend: [https://whatsapp-clone-server-1rbm.onrender.com/](https://whatsapp-clone-server-1rbm.onrender.com/)

### ⚠️ Note

The backend is hosted on Render (free tier), which becomes inactive after a period of no usage.

To restart the server:

- Open the backend URL once
- Wait a few seconds for it to wake up
- Then open the frontend link for a smoother experience

---

## Demo Instructions

1. Open the frontend link in two browser sessions:
   - One normal window
   - One incognito window (or another browser)

2. Register two separate user accounts.

3. Log in with each account in different sessions.

4. Add each other as friends.

5. Start chatting

You should see:

- Messages appear instantly in both windows
- Browser notifications appear when a message is received in an inactive tab
- Real-time updates without refreshing

This demonstrates the real-time chat functionality powered by Socket.io.

---

## Tech Stack

### Frontend

- React.js
- Context API
- Fetch
- Web Notifications API

### Backend

- Node.js
- Express.js
- Socket.io

### Database

- PostgreSQL (Neon or local)

### Cache / Session Store

- Redis (Upstash or local)

### Deployment

- Frontend: Vercel
- Backend: Render

---

## Environment Variables

You have two separate .env files in this project:

### Backend (.env)

```
PORT=4000
DATABASE_URL=your_postgres_connection_string
REDIS_URL=your_redis_connection_string
COOKIE_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### Redis (choose one)

#### Option 1: Local Redis

```
REDIS_URL=redis://localhost:6379
```

#### Option 2: Cloud Redis (Upstash)

```
REDIS_URL=your_upstash_redis_url
```

### PostgreSQL (choose one)

#### Option 1: Local Postgres

```
DATABASE_NAME=your_db_name
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_PORT=5432
```

#### Option 2: Cloud Postgres (Neon)

```
DATABASE_URL=your_neon_postgres_connection_string
```

---

### Frontend (.env)

```
REACT_APP_SERVER_URL=http://localhost:4000
```

---

## Running Locally

### 1. Clone repository

```bash
git clone https://github.com/priyankatayi/whatsapp-clone.git
cd chat

```

### 2. Install dependencies

```bash
npm install
```

### 3. Start backend

```bash
cd packages/server
npm run dev
```

### 4. Start frontend

```bash
cd packages/client
npm start
```

## Authentication Flow

1. User logs in
2. Server validates credentials
3. Session stored in Redis
4. Cookie is set in browser
5. Subsequent requests use session

---

## Known Issues

- Incognito mode may block cross-site cookies
- Requires proper cookie config:
  - `sameSite: "none"`
  - `secure: true`
- Notifications require browser permission and HTTPS/localhost
- Works best over HTTPS

---

## Future Improvements

- JWT authentication
- Add typing indicators
- Improve UI/UX
- Optimize message storage

---

## Learning Note

Built by following a tutorial and extended with real-world improvements:

- Deployment (Vercel + Render)
- Redis + PostgreSQL integration
- Browser Notifications API integration
- Debugging CORS, cookies, WebSockets
- Understanding production full-stack architecture

---
