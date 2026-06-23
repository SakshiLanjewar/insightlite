# 📊 InsightLite — MERN Stack Analytics Dashboard

A clean, modern, full-stack analytics dashboard built with **MongoDB, Express.js, React.js, and Node.js**.  
Perfect for a B.Tech portfolio project!

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 JWT Auth | Secure register & login with token-based sessions |
| 📊 Summary Cards | Total Users, Sales, Revenue, Orders |
| 📈 Bar Chart | Monthly sales & orders (Recharts) |
| 🥧 Pie Chart | Activity category breakdown |
| 📋 Activity Table | Recent events with live search |
| 👤 Profile Page | View & edit user info |
| 🌙 Dark Mode | System-aware dark/light toggle |
| 📱 Responsive | Mobile + desktop layout |

---

## 🗂️ Project Structure

```
insightlite/
├── backend/
│   ├── config/
│   │   └── seed.js          # Database seeder
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── analyticsController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT protection
│   ├── models/
│   │   ├── User.js
│   │   ├── Analytics.js
│   │   └── Activity.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── analyticsRoutes.js
│   │   └── userRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ActivityTable.jsx
    │   │   ├── CategoryPieChart.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   ├── SalesBarChart.jsx
    │   │   └── StatCard.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── NotFound.jsx
    │   │   ├── Profile.jsx
    │   │   └── Register.jsx
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── helpers.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local install or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier)
- npm

---

### Step 1 — Clone / Download
```bash
cd insightlite
```

---

### Step 2 — Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

Open `.env` and set your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/insightlite
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRE=7d
```

> 💡 For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

---

### Step 3 — Seed the Database

```bash
npm run seed
```

This creates:
- 12 months of analytics data
- 15 sample activity records
- 1 demo admin account

**Demo credentials:**
```
Email:    admin@insightlite.com
Password: admin123
```

---

### Step 4 — Start Backend

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

Test it: `http://localhost:5000/api/health` → should return `{"status":"OK"}`

---

### Step 5 — Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/me` | Private | Get current user |

### Analytics
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/analytics/summary` | Private | Stats cards data |
| GET | `/api/analytics/chart` | Private | Bar chart data |
| GET | `/api/analytics/pie` | Private | Pie chart data |
| GET | `/api/analytics/activities?search=` | Private | Activity table |

### Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users` | Private | All users |
| PUT | `/api/users/profile` | Private | Update profile |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS (styling)
- Recharts (charts)
- Axios (API calls)
- React Router v6 (navigation)

**Backend**
- Node.js + Express.js
- Mongoose (MongoDB ODM)
- JSON Web Tokens (auth)
- bcryptjs (password hashing)

**Database**
- MongoDB (3 collections: users, analytics, activities)

---

## 📸 Pages

1. **`/login`** — Sign in form with demo shortcut button
2. **`/register`** — Create new account
3. **`/dashboard`** — Main analytics view (protected)
4. **`/profile`** — View & update user info (protected)

---

## 👨‍💻 For Your Portfolio

Key things to highlight:
- **JWT authentication flow** — token stored in localStorage, sent via Axios interceptor
- **Protected routes** — `PrivateRoute` component wraps dashboard pages
- **Context API** — Global auth + theme state without Redux
- **Debounced search** — Activity search waits 400ms before API call
- **Responsive design** — Works on mobile and desktop

---

## 🐛 Common Issues

**MongoDB connection error?**
- Make sure MongoDB service is running: `sudo systemctl start mongod` (Linux)
- On Windows: check MongoDB in Services

**CORS error?**
- Make sure backend is running on port 5000 and frontend on 5173

**"Cannot find module"?**
- Run `npm install` inside both `/backend` and `/frontend` folders

---

Made with ❤️ for learning MERN Stack
