![App Screenshot](/app/public/images/og-image.png)

# 🎮 GameVers

**GameVers** is a fullstack game product management web application built with **Next.js App Router**, **MongoDB**, and **TailwindCSS**. It allows users to browse, search, and manage game product data efficiently.

## 🚀 Features

- 🔍 Search and filter game products
- 📦 Pagination and data management
- 🧩 RESTful API with Next.js Route Handlers
- 🌐 Fully deployable on Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 App Router, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: JWT (JsonWebToken)
- **Deployment**: Vercel

## 📂 Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   └── api/               # API handlers (GET, POST, etc.)
├── components/            # Reusable UI components
├── db/
│   ├── models/            # MongoDB models and functions
│   └── utils/             # JWT, DB connection, etc.
└── ...
```

## 🧪 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Adityasputra/gamevers-app.git
cd gamevers-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_DATABASE_NAME=gamevers_db
NEXT_PUBLIC_MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

> Replace values with your actual credentials.

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to see the app.

## 🌍 Deployment

This app can be deployed seamlessly on **Vercel**. Make sure to configure the necessary environment variables through the Vercel dashboard (avoid using localhost URLs).

## ⚠️ Common Issues

- **Missing Environment Variables**: Ensure `NEXT_PUBLIC_BASE_URL` is defined in both local and production environments.

---

© 2025 Aditya Saputra · Built with ❤️ using Next.js
