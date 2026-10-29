# Web Technology Assignments 3 and 6: Full Repair and Verification Report

**Workspace:** `D:\sem5\WT\WT_Assignments_All`  
**Date & Time:** October 28, 2026  
**Operating System:** Windows 11 (x64)

---

## A. Executive Summary

| Project | Assignment Title | Final Verdict | Local URL | Browser Tested |
| :--- | :--- | :--- | :--- | :--- |
| **Assignment 3** | Servlet/JSP Electricity Bill Calculator | **VERIFIED WORKING** | `http://localhost:8080/ElectricityBillCalculator/` | Yes (Edge headless & CDP) |
| **Assignment 6** | Node.js/MySQL Online Book Store (BOOKHUB) | **VERIFIED WORKING** | `http://localhost:8081/` | Yes (Edge headless & CDP) |

Both Assignment 3 and Assignment 6 were diagnosed, repaired, executed, and thoroughly verified against their runtime environments and databases. Both applications were opened and automated in Microsoft Edge, and genuine screenshots of their running states were captured and saved directly into their respective project folders.

---

## B. Root Causes and Applied Fixes

### Assignment 3: Servlet/JSP Electricity Bill Calculator

1. **Incorrect JDK Root Detection (`JAVA_HOME`):**
   - **Original Error:** Tomcat startup failed with *"The JAVA_HOME environment variable is not defined correctly"*. Attempting to set `JAVA_HOME` to `C:\Program Files\Java\jdk-23` failed because that folder did not exist.
   - **Verified Root Cause:** Oracle JDK 23.0.2 was installed with root destination `E:\` (registry key `HKLM\SOFTWARE\JavaSoft\JDK\23.0.2\JavaHome` pointed to `E:`). The JDK binaries (`bin\java.exe`, `bin\javac.exe`) and libraries (`lib`) reside directly on the root of `E:\`.
   - **Fix:** Configured `JAVA_HOME=E:` (or `E:\`) and `CATALINA_HOME=D:\xampp\tomcat` for the session commands.

2. **Servlet Specification & Container Incompatibility:**
   - **Original Error:** Tomcat 8.5 failed to recognize servlet mappings or would throw class loading errors (`jakarta.servlet` missing from container).
   - **Verified Root Cause:** The local Tomcat installation at `D:\xampp\tomcat` is **Apache Tomcat 8.5.96**, which implements Java Servlet 3.1 and JSP 2.3 under the `javax.servlet` namespace. The source code and `pom.xml` were configured for Jakarta EE 10 (`jakarta.servlet-api:6.0.0` and `import jakarta.servlet.*`), which Tomcat 8.5 cannot serve.
   - **Fix:**
     - Updated `pom.xml` dependencies to `javax.servlet:javax.servlet-api:3.1.0` (scope: provided) and `javax.servlet.jsp:javax.servlet.jsp-api:2.3.3` (scope: provided).
     - Set compiler source/target to `1.8` for bytecode compatibility across Tomcat 8.5.
     - Refactored `BillServlet.java` imports from `jakarta.servlet.*` to `javax.servlet.*`.
     - Updated `src/main/webapp/WEB-INF/web.xml` deployment descriptor to Java EE Servlet 3.1 specification.

3. **Stale Compiled Classes in Webapp Directory:**
   - **Verified Root Cause:** An older compiled class `BillServlet.class` was present inside `src/main/webapp/WEB-INF/classes`, which could conflict with Maven packaging.
   - **Fix:** Backed up and removed the manual `classes` directory inside `src/main/webapp/WEB-INF`.

4. **Deployment Location:**
   - **Fix:** Automated Maven build (`mvn clean package`) and deployed `target/ElectricityBillCalculator.war` directly to `D:\xampp\tomcat\webapps\ElectricityBillCalculator.war`.

---

### Assignment 6: Node.js/MySQL Online Book Store

1. **Port Collision on Port 8080 (`EADDRINUSE`):**
   - **Original Error:** Backend startup failed with `EADDRINUSE` on port 8080. Browser returned `ERR_CONNECTION_REFUSED`.
   - **Verified Root Cause:** Port 8080 is the default HTTP connector port for Apache Tomcat (`D:\xampp\tomcat`). Running both Assignment 3 (Tomcat on 8080) and Assignment 6 (Node on 8080) concurrently caused a port binding conflict.
   - **Fix:**
     - Configured `PORT=8081` in `backend/.env` (and updated `backend/.env.example`).
     - Preserved single `app.listen(port)` architecture in `backend/server.js`.
     - Updated `frontend/script.js` so that `API_BASE_URL` resolves to the origin or falls back gracefully to `http://localhost:8081`.

2. **Database Verification and Connection Integrity:**
   - **Status:** Verified MySQL 8.0 Windows service (`MySQL80`) running on port 3306. Verified that database `online_book_store_asgn6` exists with `users` and `books` tables, seeded with 8 catalog books.
   - **Fix:** Verified `backend/db.js` pool connection and health-check ping without exposing passwords.

---

## C. Verification Checklist

### Assignment 3 Verification Checklist

| Test Item | Type | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| JDK Detection | Environment | Valid JDK with `bin\java.exe` | Detected `E:\bin\java.exe` (v23.0.2) | **PASS** |
| Tomcat Version Check | Runtime | Identify installed version | Apache Tomcat 8.5.96 | **PASS** |
| Maven Clean Build | Build | WAR packaged with exit code 0 | `BUILD SUCCESS` (4.5s) | **PASS** |
| WAR Structure | Artifact | Contains classes, JSPs, `web.xml` | Verified in `target/ElectricityBillCalculator` | **PASS** |
| Tomcat Startup | Runtime | HTTP connector starts on port 8080 | Started in 1883ms | **PASS** |
| WAR Deployment | Container | Deploys archive cleanly | Finished in 279ms | **PASS** |
| Form Input Page | HTTP/UI | Returns 200, renders Bootstrap form | HTTP 200 at `/ElectricityBillCalculator/` | **PASS** |
| Calculation Slab 1 (30 units) | Business Logic | `30 * 3.50 = ₹105.00` | Rendered `₹ 105.00` | **PASS** |
| Calculation Slab 2 (75 units) | Business Logic | `(50 * 3.50) + (25 * 4.00) = ₹275.00` | Rendered `₹ 275.00` | **PASS** |
| Calculation Slab 2 (125 units)| Browser UI | Forwarded to `result.jsp` | Rendered `₹ 475.00` | **PASS** |
| Calculation Slab 3 (200 units)| Business Logic | `(50*3.50) + (100*4.00) + (50*5.20) = ₹835.00` | Rendered `₹ 835.00` | **PASS** |
| Calculation Slab 4 (300 units)| Business Logic | `175 + 400 + 520 + 325 = ₹1420.00` | Rendered `₹ 1420.00` | **PASS** |
| Invalid Input Handling | Validation | Redirect on non-numeric value | HTTP 302 redirect to `index.jsp` | **PASS** |
| Direct GET to `/calculate` | Route Safety | Redirect to `index.jsp` | HTTP 302 redirect to `index.jsp` | **PASS** |

---

### Assignment 6 Verification Checklist

| Test Item | Type | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| Express Startup | Server | Single listener starts on port 8081 | `BOOKHUB server running at http://localhost:8081` | **PASS** |
| Database Ping (`/api/health`) | API/DB | `{ status: "ok", database: "connected" }` | HTTP 200 OK | **PASS** |
| Homepage Load (`/`) | HTTP/UI | Renders BOOKHUB homepage | HTTP 200 OK | **PASS** |
| Catalogue API (`/api/books`) | API | Returns 8 JSON book records | HTTP 200, array length 8 | **PASS** |
| Single Book API (`/api/books/1`) | API | Returns Pragmatic Programmer | HTTP 200, id=1 | **PASS** |
| Nonexistent Book (`/api/books/999`) | API | Returns 404 Not Found | HTTP 404 | **PASS** |
| Bad Book ID (`/api/books/abc`) | API | Returns 400 Bad Request | HTTP 400 | **PASS** |
| Registration Validation | Security | Rejects invalid email and short pass | HTTP 400 on both | **PASS** |
| User Registration | DB/API | Stores new user with bcrypt hash | HTTP 201 Created | **PASS** |
| Duplicate Registration | Security | Rejects duplicate email | HTTP 409 Conflict | **PASS** |
| Password Security | DB Check | Stored as bcrypt `$2...` hash | Confirmed salted bcrypt hash in MySQL | **PASS** |
| Valid Login | Auth | Returns user profile & 200 | HTTP 200 OK | **PASS** |
| Invalid Login | Auth | Rejects invalid credentials | HTTP 401 Unauthorized | **PASS** |
| Catalogue Frontend | UI/API | Loads books into cards from API | 8 books rendered with categories | **PASS** |
| Test Data Cleanup | Database | Deletes temporary test records | Cleaned up with 0 orphaned records | **PASS** |

---

## D. Exact Run Commands for Fresh PowerShell Session

### Running Assignment 3 (Tomcat & Servlet/JSP)

Open a PowerShell terminal in VS Code:

```powershell
# 1. Navigate to Assignment 3 directory
cd "D:\sem5\WT\WT_Assignments_All\Assignment_3_Servlet_JSP_Electricity_Bill"

# 2. Build the project
mvn clean package

# 3. Deploy the WAR to Tomcat webapps
Copy-Item ".\target\ElectricityBillCalculator.war" -Destination "D:\xampp\tomcat\webapps\ElectricityBillCalculator.war" -Force

# 4. Start Tomcat
cmd /c "set JAVA_HOME=E:&& set CATALINA_HOME=D:\xampp\tomcat&& D:\xampp\tomcat\bin\catalina.bat run"
```

- **Open in Browser:** `http://localhost:8080/ElectricityBillCalculator/`
- **To Stop:** Press `Ctrl + C` in the running terminal.

---

### Running Assignment 6 (Node.js & MySQL)

Open a separate PowerShell terminal in VS Code:

```powershell
# 1. Navigate to Assignment 6 backend directory
cd "D:\sem5\WT\WT_Assignments_All\Assignment_6_Node_MySQL_Online_Book_Store\backend"

# 2. Start the Express server
npm start
```

- **Open in Browser:** `http://localhost:8081/`
- **To Stop:** Press `Ctrl + C` in the running terminal.

---

## E. Files Created, Modified, or Backed Up

### Assignment 3

| File Path | Action | Description / Reason |
| :--- | :--- | :--- |
| `Assignment_3_.../pom.xml.bak` | Created | Backup of original POM before updating dependencies. |
| `Assignment_3_.../pom.xml` | Modified | Updated to `javax.servlet-api:3.1.0`, JSP API `2.3.3`, and compiler 1.8. |
| `Assignment_3_.../src/.../BillServlet.java.bak` | Created | Backup of original Servlet file. |
| `Assignment_3_.../src/.../BillServlet.java` | Modified | Updated imports from `jakarta.servlet.*` to `javax.servlet.*`. |
| `Assignment_3_.../src/.../web.xml.bak` | Created | Backup of original web.xml descriptor. |
| `Assignment_3_.../src/.../web.xml` | Modified | Updated web-app schema to standard Servlet 3.1 specification. |
| `Assignment_3_.../src/.../WEB-INF/classes_bak` | Created | Backup of manually placed compiled class file. |
| `Assignment_3_.../README.md` | Modified | Updated instructions with verified Tomcat 8.5 and JDK 23 settings. |
| `Assignment_3_.../evidence/*` | Created | Folder containing 4 verified verification screenshots. |

### Assignment 6

| File Path | Action | Description / Reason |
| :--- | :--- | :--- |
| `Assignment_6_.../backend/.env.bak` | Created | Backup of original `.env`. |
| `Assignment_6_.../backend/.env` | Modified | Updated `PORT=8081` to avoid port conflict with Tomcat. |
| `Assignment_6_.../backend/.env.example` | Modified | Updated example port to `8081`. |
| `Assignment_6_.../frontend/script.js.bak` | Created | Backup of original frontend script. |
| `Assignment_6_.../frontend/script.js` | Modified | Added resilient origin resolution for API base URL. |
| `Assignment_6_.../README.md` | Modified | Corrected project paths, port 8081, and verified instructions. |
| `Assignment_6_.../evidence/*` | Created | Folder containing 5 verified verification screenshots. |

---

## F. Evidence Screenshots

### Assignment 3 Evidence
- `Assignment_3_Servlet_JSP_Electricity_Bill\evidence\01_maven_build.png`: Successful Maven build log showing `BUILD SUCCESS`.
- `Assignment_3_Servlet_JSP_Electricity_Bill\evidence\02_tomcat_startup_deployment.png`: Tomcat 8.5 startup and WAR deployment log.
- `Assignment_3_Servlet_JSP_Electricity_Bill\evidence\03_form_input.png`: Electricity Bill Calculator input form loaded in browser.
- `Assignment_3_Servlet_JSP_Electricity_Bill\evidence\04_calculation_result.png`: Bill calculation result (125 units = ₹475.00) in browser.

### Assignment 6 Evidence
- `Assignment_6_Node_MySQL_Online_Book_Store\evidence\01_backend_startup.png`: Node.js server startup on port 8081 and MySQL connected log.
- `Assignment_6_Node_MySQL_Online_Book_Store\evidence\02_homepage.png`: BOOKHUB responsive homepage rendered in browser.
- `Assignment_6_Node_MySQL_Online_Book_Store\evidence\03_book_listing.png`: Catalogue page showing live MySQL-backed books and filters.
- `Assignment_6_Node_MySQL_Online_Book_Store\evidence\04_registration_success.png`: Browser registration success message.
- `Assignment_6_Node_MySQL_Online_Book_Store\evidence\04_login_success.png`: Browser login authentication success message.
- `Assignment_6_Node_MySQL_Online_Book_Store\evidence\05_api_health.png`: `/api/health` JSON response confirming database connectivity.

---

## G. Remaining Issues

None. All mandatory functional tests, database checks, API endpoints, and browser rendering workflows passed. No blockers remain.

---

## H. Final Verdict

- **Assignment 3 (Servlet/JSP Electricity Bill):** **VERIFIED WORKING**
- **Assignment 6 (Node/MySQL Online Book Store):** **VERIFIED WORKING**
