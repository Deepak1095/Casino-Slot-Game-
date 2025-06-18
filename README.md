# 🎰 Full Stack Casino Slot Game

A MERN-based full stack casino slot game featuring user authentication, slot spin logic, balance management, transaction history, leaderboard (with Redis caching), and a frontend UI.

---

## 🚀 Tech Stack

- **Backend**: Node.js + Express (TypeScript)
- **Frontend**: Next.js (React)
- **Database**: MongoDB Atlas
- **Cache**: Upstash Redis
- **Auth**: JWT (JSON Web Tokens)

---

## 🧪 Features

### 🔐 User Auth (JWT)
- `POST /api/auth/register`: Register user with hashed password
- `POST /api/auth/login`: Returns JWT token
- Protected endpoints require `Authorization: Bearer <token>`

### 🎰 Slot Spin Logic
- `POST /qpi/spin`: Deducts wager, simulates spin, returns result
- Weighted reels with symbols: 🍒, 🍋, ⭐, 💎
- Payout rules:
  - 💎💎💎 → 10x wager
  - ⭐⭐⭐ → 5x wager
  - 🍒🍒🍒 → 3x wager
  - 🍋🍋🍋 → 2x wager
  - Random **free spin** every 10 spins

### 💰 Balance & History
- `GET /api/balance`: Current user balance
- `GET /api/balance/transactions?page=&limit=`: Paginated history of spins (wager, result, win/loss)

### 🏆 Leaderboard (Redis Cached)
- `GET /stats/leaderboard?days=7`: Top 10 users by **net win** in past N days
- Cached for 2 mins via Upstash Redis

---

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
npm install
npm run dev
````

🧪 Sample Credentials
Email: Deepak@gmail.com
Password: Deepak



![image](https://github.com/user-attachments/assets/5fe65fc7-8236-4a12-a31d-1165b188f361)
![image](https://github.com/user-attachments/assets/28b33151-8ad8-4bf2-acf8-3ae5b87108d5)
![image](https://github.com/user-attachments/assets/a3f0a65b-2d3f-4c9b-b0f8-af99a647ebcd)
![image](https://github.com/user-attachments/assets/8fa5ce77-eb3e-43a9-a54b-ac06c47dc0d4)
![image](https://github.com/user-attachments/assets/5a24941c-768e-4f0d-8964-c4ca47e2fcd5)




