# Library Management System Deployment Guide

## 🛠️ Tech Stack
- **Frontend**: Vite + React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Neon.tech recommended)
- **Auth**: JWT + Google OAuth 2.0
- **AI**: Gemini API (Optional)

---

## 🚀 Backend Deployment (Render.com)

1. **Create a New Web Service**:
   - Connect your GitHub repository.
   - Select the `backend` directory as the root.
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`

2. **Configure Environment Variables**:
   Add the following variables in Render's Dashboard:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `JWT_SECRET`: A long random string.
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
   - `AI_API_KEY`: (Optional) Your Gemini API Key for book summaries.
   - `PORT`: `5000` (Render will override this, but good to have).

---

## 🎨 Frontend Deployment (Vercel)

1. **Create a New Project**:
   - Connect your GitHub repository.
   - Select the `frontend` directory as the root.
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

2. **Configure Environment Variables**:
   Add the following variables in Vercel's Dashboard:
   - `VITE_API_URL`: The URL of your deployed Render backend (e.g., `https://your-app.onrender.com`).
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID (same as backend).

3. **Important Configuration**:
   Vercel handles single-page applications (SPA) routing. If you face 404 on refresh, add a `vercel.json` in the frontend root:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

---

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a Project.
3. Configure **OAuth Consent Screen** (Internal or External).
4. Create **OAuth 2.0 Client IDs**:
   - Application Type: Web Application.
   - **Authorized JavaScript Origins**:
     - `http://localhost:5173`
     - `https://your-vercel-domain.vercel.app`
   - **Authorized Redirect URIs**:
     - `https://your-vercel-domain.vercel.app`

---

## 🐘 Neon PostgreSQL Setup

1. Sign up at [Neon.tech](https://neon.tech).
2. Create a new project and database.
3. Go to **SQL Editor** and paste the contents of `backend/database.sql` to initialize the schema.
4. Copy the **Connection String** and use it as `DATABASE_URL`.
