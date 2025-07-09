# Laravel + React Fullstack Project

This is a fullstack web application built using **Laravel 11** (API backend) and **React.js** with **Vite** (frontend). Both backend and frontend are in a single GitHub repository.

## 🛠 Tech Stack

- Backend: Laravel 11 (PHP)
- Frontend: React.js (Vite)
- Auth: Laravel Sanctum
- HTTP: Axios
- DB: MySQL or SQLite

---

## 🚀 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Dagemgissila/chapa-fullstack-interview-assignment.git
cd chapa-fullstack-interview-assignment
```

---

### 2. Setup Laravel Backend

```bash
cd backend
```

#### Install PHP dependencies:

```bash
composer install
```

#### Copy `.env` and generate app key:

```bash
cp .env.example .env
php artisan key:generate
```

#### Configure your database in `.env` file:

Edit `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### Run migrations and seeders:

```bash
php artisan migrate --seed
```

=
#### Serve the backend:

```bash
php artisan serve
```

Backend runs at: `http://127.0.0.1:8000`

---

### 3. Setup React Frontend

```bash
cd ../frontend
```

#### Install dependencies:

```bash
npm install
```

#### Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## ✅ Default Login Credentials (For Testing)

| Role        | Email                | Password  |
|-------------|----------------------|-----------|
| Super Admin | super@admin.com      | password  |
| Admin       | admin@example.com    | password  |
| User        | user@example.com     | password  |

---

## 📄 API Testing

Use Postman or Thunder Client with `http://127.0.0.1:8000/api`.

---
