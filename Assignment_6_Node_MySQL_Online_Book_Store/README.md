# BOOKHUB Online Book Store

A responsive online bookstore built for Web Technology Assignment 6.

## Assignment Requirement
Design and develop a responsive website for an online book store using Node.js and MySQL/MongoDB/Oracle with a home page, login page, catalogue page, and database-backed registration page.

## Verified Environment & Technologies
- **Node.js**: v24.21.0
- **npm**: 11.19.0
- **Database**: MySQL Server 8.0 (Service: `MySQL80`, port 3306)
- **Backend Framework**: Express 4.21.2
- **Database Driver**: `mysql2` 3.12.0 (Promise pool)
- **Security**: `bcryptjs` 2.4.3 (salted password hashing, 12 rounds)
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+), served directly by Express static middleware
- **Local Application URL**: `http://localhost:8081`
- **Configured Port**: `8081` (avoids conflict with Tomcat on port 8080)

## Features
- **Responsive Navigation**: BOOKHUB homepage, mobile hamburger toggle, clean typography and responsive layout.
- **Database-Backed Registration**: Validates email format and password length (minimum 8 chars), checks duplicate emails, and securely stores salted bcrypt hashes in MySQL `users` table.
- **Secure Authentication**: Compares submitted passwords against bcrypt hashes and stores user session metadata in browser `sessionStorage`.
- **Dynamic Catalogue**: REST API-driven book catalogue with live search by title/author, category filtering, responsive book cards, and book detail modals.
- **Single HTTP Listener Architecture**: Exactly one `app.listen()` call running Express static and API routes.

## Folder Structure
```text
Assignment_6_Node_MySQL_Online_Book_Store/
├── backend/
│   ├── .env                 # Environment configuration (PORT=8081, DB credentials)
│   ├── .env.example         # Template for environment settings
│   ├── db.js                # MySQL2 connection pool & health check
│   ├── package.json         # Dependencies & startup scripts
│   └── server.js            # Express server and REST API endpoints
├── database/
│   └── database.sql         # Database schema (users & books tables) and seed data
├── evidence/
│   ├── 01_backend_startup.png
│   ├── 02_homepage.png
│   ├── 03_book_listing.png
│   ├── 04_login_success.png
│   ├── 04_registration_success.png
│   └── 05_api_health.png
├── frontend/
│   ├── catalogue.html / .js # Catalogue view with search & category filters
│   ├── index.html           # Homepage
│   ├── login.html / .js     # Login authentication form
│   ├── register.html / .js  # User registration form
│   ├── script.js            # Shared navigation & resilient API base URL resolution
│   └── style.css            # Stylesheet
└── README.md
```

## How to Setup and Run

### 1. Database Setup
1. Ensure the MySQL service is running (`MySQL80` on port 3306).
2. Execute the initialization script `database/database.sql` in MySQL Workbench or via MySQL command line:
   ```powershell
   # If mysql CLI is in PATH:
   Get-Content database\database.sql | mysql -u root -p
   ```
   This creates database `online_book_store_asgn6` and tables `books` and `users` with 8 pre-seeded books.

### 2. Environment Configuration
Verify that `backend/.env` exists and contains:
```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your_mysql_password>
DB_NAME=online_book_store_asgn6
PORT=8081
```

### 3. Run the Backend Server
Open PowerShell in the backend directory:
```powershell
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_6_Node_MySQL_Online_Book_Store\backend"
npm start
```
The server will start listening at:
```
BOOKHUB server running at http://localhost:8081
MySQL database connected.
```

### 4. How to Stop the Application
Press `Ctrl + C` in the terminal running `npm start`.

## API Endpoints Verified
- `GET /api/health` — Verifies MySQL pool ping; returns `{ status: "ok", database: "connected" }`.
- `GET /api/books` — Returns all 8 books in JSON format.
- `GET /api/books/:id` — Returns single book details; returns 400 for non-numeric ID and 404 for non-existent ID.
- `POST /api/register` — Validates inputs, rejects short passwords / bad emails (400), rejects duplicate emails (409), hashes password with bcrypt, and stores record (201).
- `POST /api/login` — Compares bcrypt hash; returns 200 with user session object on success, or 401 on invalid credentials.

## Browser Pages Verified
- Home: `http://localhost:8081/`
- Catalogue: `http://localhost:8081/catalogue.html`
- Registration: `http://localhost:8081/register.html`
- Login: `http://localhost:8081/login.html`
