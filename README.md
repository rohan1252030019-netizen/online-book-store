# Online Bookstore (CNT BookStore)

A full-stack online book store web application built with **React (Vite)** on the frontend, **Node.js & Express** on the backend, and **MySQL** for database management.

---

## 📚 Features

- **Book Catalog & Browsing**: Explore books categorized into Fiction, Non-Fiction, Tech & Programming, Business, Self-Help, and Science.
- **Search & Filtering**: Search books by title, author, and filter by categories.
- **Detailed Book View**: View book details, price, descriptions, and cover previews.
- **Shopping Cart**: Add books to cart, modify quantities, and calculate totals.
- **User Authentication**: Secure user registration and login with encrypted passwords (`bcrypt`).
- **Responsive UI**: Clean, modern interface designed for desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite**
- **React Router DOM v7**
- **Axios** for API requests
- Custom CSS design system

### Backend
- **Node.js** & **Express**
- **MySQL2** (with connection pooling)
- **bcrypt** for password hashing
- **CORS** & **dotenv**

### Database
- **MySQL** relational database schema with sample book catalog

---

## 📁 Project Structure

```text
CNTBOOKSTORE PROJECT/
├── client/                 # React Vite frontend
│   ├── public/covers/      # Book cover images
│   ├── src/
│   │   ├── api/            # API service calls
│   │   ├── components/     # UI components (Navbar, BookCard, SearchBar, etc.)
│   │   ├── context/        # Auth & Cart React Contexts
│   │   ├── pages/          # Home, Catalogue, BookDetails, Cart, Login, Register
│   │   └── styles/         # CSS styles
│   └── package.json
├── server/                 # Express backend REST API
│   ├── config/             # Database connection pool
│   ├── controllers/        # Auth and Book business logic
│   ├── routes/             # API endpoints (/api/auth, /api/books)
│   ├── server.js           # Server entry point
│   ├── .env.example        # Sample environment variables
│   └── package.json
├── database/               # Database initialization
│   └── schema.sql          # Tables definition and sample seed data
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

---

### 2. Database Setup

1. Start your local MySQL service.
2. Execute the schema script using MySQL CLI or MySQL Workbench:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   This will create the database `online_book_store` and insert the sample catalog.

---

### 3. Backend Setup

1. Open a terminal in the `server` directory:
   ```bash
   cd server
   npm install
   ```
2. Create your `.env` configuration file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your MySQL credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=online_book_store
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   # or
   npm start
   ```
   Server runs at `http://localhost:5000`.

---

### 4. Frontend Setup

1. Open a terminal in the `client` directory:
   ```bash
   cd client
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

---

## 📄 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | Fetch all books (supports `?category=` and `?search=`) |
| `GET` | `/api/books/categories` | Fetch available book categories |
| `GET` | `/api/books/:id` | Fetch details of a single book |
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Log in existing user |
| `GET` | `/api/auth/profile/:id` | Fetch user profile info |

---

## 📜 License

This project is licensed under the ISC License.
