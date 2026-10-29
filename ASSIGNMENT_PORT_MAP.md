# Collision-Free Port Allocation Map

This document defines the verified, non-conflicting port allocation across all seven Web Technology assignments in `D:\sem5\WT\WT_Assignments_All`.

---

## Port Allocation Matrix

| Assignment | Project Name | Component | Technology | Port | Verified URL | Status |
|:---|:---|:---|:---|:---:|:---|:---:|
| **Assignment 1** | PHP Electricity Bill | Web App | PHP 8.2 / Apache 2.4 | **80** | `http://localhost/Assignment_1_PHP_Electricity_Bill/index.php` | **ACTIVE** |
| **Assignment 2** | React World Clock | Frontend | React 19 / Vite 8 | **5173** | `http://localhost:5173/` | **ACTIVE** |
| **Assignment 3** | Servlet/JSP Bill Calculator | Web App | Java Servlet 3.1 / Tomcat 8.5 | **8083** | `http://localhost:8083/ElectricityBillCalculator/` | **ACTIVE** |
| **Assignment 4** | React Result System | Frontend | React 19 / Vite 8 | **5174** | `http://localhost:5174/` | **ACTIVE** |
| **Assignment 5** | JavaScript/Spring Boot Result | Fullstack | Spring Boot 3.2 / H2 / Static UI | **8082** | `http://localhost:8082/` | **ACTIVE** |
| **Assignment 6** | Node/MySQL Book Store | Fullstack | Express 4 / MySQL / Static UI | **8081** | `http://localhost:8081/` | **ACTIVE** |
| **Assignment 7** | React/SpringBoot Book Store | Backend API | Spring Boot 3.4 / MySQL | **8080** | `http://localhost:8080/api/books` | **ACTIVE** |
| **Assignment 7** | React/SpringBoot Book Store | Frontend UI | React 19 / Vite 8 | **5175** | `http://localhost:5175/` | **ACTIVE** |
| **Shared** | MySQL Database Server | Database | MySQL 8.0 Community Server | **3306** | `localhost:3306` | **ACTIVE** |

---

## Architectural Separation & Conflict Prevention

1. **Tomcat on Port 8083:**
   - Previous Tomcat installation at `D:\xampp\tomcat` was set to default port `8080`.
   - Changing Tomcat's HTTP Connector to port `8083` in `D:\xampp\tomcat\conf\server.xml` frees port `8080` for Assignment 7's Spring Boot backend.

2. **Spring Boot Backend Isolation:**
   - **Assignment 7:** Listens on port `8080`. Its React frontend on port `5175` communicates with `http://localhost:8080/api/books` with `@CrossOrigin` enabled.
   - **Assignment 5:** Listens on port `8082`. Its embedded static frontend and REST API (`/api/results`) both operate on port `8082`, completely isolated from Assignment 7.

3. **Node.js Express Isolation:**
   - **Assignment 6:** Configured with `PORT=8081` in `backend/.env`. Served directly by Express static middleware on port `8081`, avoiding collisions with Tomcat and Spring Boot.

4. **Vite Frontend Isolation:**
   - **Assignment 2:** Strict port `5173`.
   - **Assignment 4:** Strict port `5174`.
   - **Assignment 7:** Strict port `5175`.
   - All three Vite configs declare `server: { port: <port>, strictPort: true }` to guarantee no auto-incrementing port shifts occur.

5. **Database Namespace Separation:**
   - Both Assignment 6 and Assignment 7 connect to the shared MySQL 8.0 service on port 3306:
     - Assignment 6 uses database: `online_book_store_asgn6`
     - Assignment 7 uses database: `online_book_store`
   - Assignment 5 uses an isolated in-memory H2 database (`jdbc:h2:mem:vit_result_db`).
