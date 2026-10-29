# All 7 Web Technology Assignments: Master Verification and Audit Report

**Workspace:** `D:\sem5\WT\WT_Assignments_All`  
**Execution Environment:** Windows 11 (x64), Oracle JDK 23.0.2 (at `E:\`), Node.js v24.21.0, Apache 2.4.58 (XAMPP), Apache Tomcat 8.5.96, MySQL 8.0  
**Verification Date:** October 28, 2026  
**Final Master Verdict:** **ALL 7 ASSIGNMENTS VERIFIED WORKING SIMULTANEOUSLY**

---

## 1. Executive Summary

All seven Web Technology assignments have been audited, diagnosed, repaired, and successfully executed simultaneously without any port collisions, broken paths, or service conflicts:

| Assignment | Title | Architecture | Port | URL | Verdict |
|:---|:---|:---|:---:|:---|:---:|
| **Assignment 1** | PHP Electricity Bill | PHP 8.2 / Apache 2.4 | **80** | `http://localhost/Assignment_1_PHP_Electricity_Bill/index.php` | **VERIFIED WORKING** |
| **Assignment 2** | React World Clock | React 19 / Vite 8 | **5173** | `http://localhost:5173/` | **VERIFIED WORKING** |
| **Assignment 3** | Servlet/JSP Electricity Bill | Java Servlet 3.1 / Tomcat 8.5 | **8083** | `http://localhost:8083/ElectricityBillCalculator/` | **VERIFIED WORKING** |
| **Assignment 4** | React Result System | React 19 / Vite 8 | **5174** | `http://localhost:5174/` | **VERIFIED WORKING** |
| **Assignment 5** | JavaScript/Spring Boot Result | Spring Boot 3.2 / H2 | **8082** | `http://localhost:8082/` | **VERIFIED WORKING** |
| **Assignment 6** | Node/MySQL Book Store | Express 4 / MySQL | **8081** | `http://localhost:8081/` | **VERIFIED WORKING** |
| **Assignment 7** | React/SpringBoot Book Store | Spring Boot 3.4 / MySQL / React 19 | **8080 (API) / 5175 (UI)** | `http://localhost:5175/` | **VERIFIED WORKING** |

---

## 2. Collision-Free Port Allocation Table

| Port | Service | Process / PID | Assignment | Conflict Check |
|:---:|:---|:---|:---|:---:|
| **80** | Apache HTTPD 2.4 | `httpd.exe` | Assignment 1 (PHP Electricity Bill) | Verified Free / Dedicated |
| **5173** | Vite Dev Server | `node.exe` | Assignment 2 (React World Clock) | Strict Port Enforced |
| **5174** | Vite Dev Server | `node.exe` | Assignment 4 (React Result System) | Strict Port Enforced |
| **5175** | Vite Dev Server | `node.exe` | Assignment 7 (React Book Store UI) | Strict Port Enforced |
| **8080** | Spring Boot Embedded Tomcat | `java.exe` | Assignment 7 (Book Store Backend) | Moved Tomcat 8.5 off 8080 |
| **8081** | Express HTTP Server | `node.exe` | Assignment 6 (Node Book Store) | Configured in `.env` |
| **8082** | Spring Boot Embedded Tomcat | `java.exe` | Assignment 5 (Result System Backend & UI) | Configured in properties |
| **8083** | Apache Tomcat 8.5.96 | `java.exe` | Assignment 3 (Servlet/JSP Bill Calculator) | Configured in `server.xml` |
| **3306** | MySQL 8.0 Server | `mysqld.exe` | Shared MySQL Database Server | Shared (`online_book_store` & `online_book_store_asgn6`) |

---

## 3. Detailed Audit, Root Cause Analysis, and Verification by Assignment

### Assignment 1: PHP Electricity Bill Calculator
- **Architecture:** PHP 8.2 backend, Bootstrap 5.3.2 frontend served by XAMPP Apache 2.4 on port 80.
- **Root Cause & Fix:** Apache was running but lacked a directory link from `D:\xampp\htdocs\Assignment_1_PHP_Electricity_Bill`. Created a directory junction so both `http://localhost/Assignment1/index.php` and `http://localhost/Assignment_1_PHP_Electricity_Bill/index.php` function identically.
- **Functionality Verified:**
  - GET request loads bill calculator input form (HTTP 200).
  - POST request with units = 75 calculates tariff: `(50 * 3.50) + (25 * 4.00) = Rs. 275.00` (HTTP 200).
- **Evidence:** `evidence/assignment_1/asgn1_php_bill_result.png`.

---

### Assignment 2: React World Clock
- **Architecture:** React 19 + Vite 8 frontend.
- **Root Cause & Fix:** `vite.config.js` did not enforce strict port binding, risking port collisions. Added `server: { port: 5173, strictPort: true }`.
- **Functionality Verified:**
  - Vite dev server starts on `http://localhost:5173/`.
  - Analog and digital clocks render live time for Mumbai and interactive world time zones with 24H/12H toggling.
- **Evidence:** `evidence/assignment_2/asgn2_world_clock.png`.

---

### Assignment 3: Servlet/JSP Electricity Bill Calculator
- **Architecture:** Java Servlet 3.1 (`javax.servlet`) and JSP 2.3, packaged as `ElectricityBillCalculator.war` and deployed to Apache Tomcat 8.5.96.
- **Root Causes & Fixes:**
  1. *JDK Path:* Registry specified `E:` as JDK home. Pointed `JAVA_HOME=E:` and `CATALINA_HOME=D:\xampp\tomcat`.
  2. *Servlet Namespace:* Migrated `pom.xml`, `BillServlet.java`, and `web.xml` from `jakarta.servlet` (EE 10) to `javax.servlet` (EE 7 / Servlet 3.1).
  3. *Port Relocation:* Moved Tomcat connector port from 8080 to **8083** in `D:\xampp\tomcat\conf\server.xml` to allow Assignment 7 Spring Boot on port 8080.
- **Functionality Verified:**
  - GET request to `http://localhost:8083/ElectricityBillCalculator/` loads input form (HTTP 200).
  - POST request to `/calculate` with units = 125 computes `(50 * 3.50) + (75 * 4.00) = ₹ 475.00` and renders `result.jsp` (HTTP 200).
- **Evidence:** `evidence/assignment_3/asgn3_tomcat_bill_result.png`.

---

### Assignment 4: React Result System
- **Architecture:** React 19 + Vite 8 frontend.
- **Root Cause & Fix:** Port not locked in `vite.config.js`. Added `server: { port: 5174, strictPort: true }`.
- **Functionality Verified:**
  - Vite dev server starts on `http://localhost:5174/`.
  - VIT Semester Result UI displays student marks for 4 subjects (Web Tech, CN, Ethical Hacking, DAA), total, 87.25%, Grade A+, and PASS status.
- **Evidence:** `evidence/assignment_4/asgn4_react_result_system.png`.

---

### Assignment 5: JavaScript/Spring Boot Result System
- **Architecture:** Spring Boot 3.2.0 backend, in-memory H2 database (`vit_result_db`), embedded static frontend.
- **Root Causes & Fixes:**
  1. *Port Conflict:* Originally set to `server.port=8080`, causing startup failure when 8080 was occupied. Changed to `server.port=8082` in `application.properties`.
  2. *CORS Configuration:* Updated `@CrossOrigin` in `ResultController.java` to support origins `http://localhost:8082`, `http://localhost:5500`, and `http://127.0.0.1:8082`.
  3. *Percentage Formatting:* Frontend sends percentage as string; made `SemesterResultService.java` robust to strip `%` signs.
  4. *Static Resource Deployment:* Copied `frontend/*` into `src/main/resources/static` so Spring Boot serves the UI directly at `http://localhost:8082/`.
- **Functionality Verified:**
  - GET `http://localhost:8082/` renders VIT Student Semester Result Portal (HTTP 200).
  - POST `/api/results` creates student record with 4 subject marks; returns JSON with generated ID and persists in H2 (HTTP 201).
- **Evidence:** `evidence/assignment_5/asgn5_springboot_result_system.png`.

---

### Assignment 6: Node.js/MySQL Online Book Store
- **Architecture:** Node.js v24, Express 4.21, `mysql2`, `bcryptjs`, MySQL database `online_book_store_asgn6`.
- **Root Causes & Fixes:**
  1. *Port Collision:* Configured `PORT=8081` in `backend/.env`.
  2. *Frontend API Base URL:* Updated `frontend/script.js` to dynamically point to port 8081.
- **Functionality Verified:**
  - GET `http://localhost:8081/api/health` returns `{"status":"ok","database":"connected"}` (HTTP 200).
  - GET `http://localhost:8081/catalogue.html` loads 8 catalog books from MySQL (HTTP 200).
  - User registration with bcrypt salted password hashing and login verification verified.
- **Evidence:** `evidence/assignment_6/asgn6_node_catalogue.png`.

---

### Assignment 7: React/Spring Boot Online Book Store
- **Architecture:** Spring Boot 3.4.3 backend on port 8080, MySQL database `online_book_store`, React 19 frontend on port 5175.
- **Root Causes & Fixes:**
  1. *CORS Restriction:* `BookController.java` had hardcoded `@CrossOrigin(origins = "http://localhost:5173")`. Because Assignment 7 React frontend runs on port 5175, browser blocked API calls. Updated `BookController.java` to allow `http://localhost:5175`.
  2. *Frontend Port Locking:* Set `server: { port: 5175, strictPort: true }` in `frontend/vite.config.js`.
- **Functionality Verified:**
  - Backend API: `GET http://localhost:8080/api/books` returns 16 book records from MySQL (HTTP 200).
  - Frontend UI: `http://localhost:5175/catalogue` renders 16 live book cards across categories with search and category filtering.
- **Evidence:** `evidence/assignment_7/asgn7_catalogue_live_books.png` and `asgn7_react_bookstore.png`.

---

## 4. Master Launcher & Safe Shutdown Scripts

### Master Launcher: `START_ALL_ASSIGNMENTS.ps1`
- Validates Java JDK 23 (`E:\bin\java.exe`), Node.js, and Maven.
- Checks status of Apache on port 80 and MySQL on port 3306.
- Starts all background services in their correct directories with isolated logs saved to `logs/`.
- Tracks background PIDs in `.running_pids.json` to prevent duplicates.
- Runs a live HTTP health check across all 8 endpoints and prints active URLs.

**Run Command:**
```powershell
.\START_ALL_ASSIGNMENTS.ps1
```

### Safe Shutdown Script: `STOP_ALL_ASSIGNMENTS.ps1`
- Reads `.running_pids.json` and cleanly stops only the process trees started by the master launcher.
- Preserves shared system services (Apache on Port 80 and MySQL on Port 3306).

**Run Command:**
```powershell
.\STOP_ALL_ASSIGNMENTS.ps1
```

---

## 5. Backup Archive

| Original File | Backup Location | Purpose |
|:---|:---|:---|
| `D:\xampp\tomcat\conf\server.xml` | `D:\xampp\tomcat\conf\server.xml.bak` | Preserves original Tomcat port 8080 config |
| `Assignment_3_.../pom.xml` | `Assignment_3_.../pom.xml.bak` | Preserves original Jakarta EE POM |
| `Assignment_3_.../BillServlet.java` | `Assignment_3_.../BillServlet.java.bak` | Preserves original Jakarta servlet code |
| `Assignment_3_.../web.xml` | `Assignment_3_.../web.xml.bak` | Preserves original web.xml |
| `Assignment_5_.../application.properties` | `Assignment_5_.../application.properties.bak` | Preserves original port 8080 settings |
| `Assignment_5_.../ResultController.java` | `Assignment_5_.../ResultController.java.bak` | Preserves original CORS annotation |
| `Assignment_5_.../script.js` | `Assignment_5_.../script.js.bak` | Preserves original API base URL |
| `Assignment_6_.../backend/.env` | `Assignment_6_.../backend/.env.bak` | Preserves original `.env` |
| `Assignment_6_.../frontend/script.js` | `Assignment_6_.../frontend/script.js.bak` | Preserves original API resolution |
| `Assignment_7_.../BookController.java` | `Assignment_7_.../BookController.java.bak` | Preserves original CORS annotation |

---

## 6. Final Simultaneous Run Verification

Summary of live HTTP checks executed simultaneously:
- `http://127.0.0.1/Assignment_1_PHP_Electricity_Bill/index.php` -> **HTTP 200 [OK]**
- `http://localhost:5173/` -> **HTTP 200 [OK]**
- `http://localhost:8083/ElectricityBillCalculator/` -> **HTTP 200 [OK]**
- `http://localhost:5174/` -> **HTTP 200 [OK]**
- `http://localhost:8082/` -> **HTTP 200 [OK]**
- `http://localhost:8081/` -> **HTTP 200 [OK]**
- `http://localhost:8080/api/books` -> **HTTP 200 [OK]**
- `http://localhost:5175/` -> **HTTP 200 [OK]**

All 7 assignments are fully operational, tested, and ready for simultaneous demonstration.
