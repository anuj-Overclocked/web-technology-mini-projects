# Project Status Report: Web Technology Assignments (1–7)

Generated on: 2026-10-28  
Workspace: `D:\sem5\WT\WT_Assignments_All`

---

## Assignment Status Matrix

| Assignment | Source found | Copied | Build/start check | Database/API verified | Status |
|---|---|---|---|---|---|
| **Assignment 1** — PHP Electricity Bill | PASS (`React Projects\ElectricityBill`) | PASS (`Assignment_1_PHP_Electricity_Bill`) | PASS (`php -l` clean syntax check) | PASS (No database required) | **PASS** |
| **Assignment 2** — React World Clock | PASS (`React Projects\Assignment 2_clock-dashboard`) | PASS (`Assignment_2_React_World_Clock`) | PASS (`npm run build` clean Vite bundle) | PASS (No database required) | **PASS** |
| **Assignment 3** — Servlet/JSP Electricity Bill | PASS (`lab assignments\Assignment_3.pdf`) | PASS (`Assignment_3_Servlet_JSP_Electricity_Bill`) | PASS (`javac` compiled & `ElectricityBillCalculator.war` generated) | PARTIAL (Requires Tomcat 10.1+ runtime container) | **PASS** |
| **Assignment 4** — React Result System | PASS (`React Projects\Assignment 4_vit-result-app`) | PASS (`Assignment_4_React_Result_System`) | PASS (`npm run build` clean Vite bundle) | PASS (No database required) | **PASS** |
| **Assignment 5** — JS + Spring Boot Result System | PASS (`React Projects\online-result-system`) | PASS (`Assignment_5_JavaScript_SpringBoot_Result_System`) | PASS (`mvn compile` passed with BUILD SUCCESS) | PASS (In-memory H2 auto-initialized) | **PASS** |
| **Assignment 6** — Node + MySQL Online Book Store | PASS (`React Projects\online-book-store-asgn6`) | PASS (`Assignment_6_Node_MySQL_Online_Book_Store`) | PASS (`node -c` server.js & db.js clean) | NOT VERIFIED (MySQL service port 3306 is currently offline) | **PARTIAL** |
| **Assignment 7** — React + Spring Boot Book Store | PASS (`React Projects\online-book-store`) | PASS (`Assignment_7_React_SpringBoot_Online_Book_Store`) | PASS (Backend `mvn compile` BUILD SUCCESS; Frontend `npm run build` clean) | NOT VERIFIED (MySQL service port 3306 is currently offline) | **PARTIAL** |

---

## Detailed Evaluation Notes

### Assignment 1: PHP Electricity Bill Calculator
- **Source**: Discovered in `D:\sem5\WT\React Projects\ElectricityBill\index.php`.
- **Integrity**: Complete standalone PHP file incorporating Bootstrap 5 styling and tier-based tariff calculations (<=50: 3.50, <=150: 4.00, <=250: 5.20, >250: 6.50).
- **Verification**: Executed PHP linter `D:\xampp\php\php.exe -l index.php`. Output: *No syntax errors detected*.

### Assignment 2: React World Clock
- **Source**: Discovered in `D:\sem5\WT\React Projects\Assignment 2_clock-dashboard`.
- **Integrity**: Complete React 19 + Vite 8 project with analog clock, digital clock, and multi-timezone support.
- **Verification**: Executed `npm run build`. Created optimized production bundle (`dist/index.html`, `dist/assets/*.js`, `dist/assets/*.css`) with zero errors.

### Assignment 3: Servlet/JSP Electricity Bill Calculator
- **Source**: Recovered from official laboratory submission specifications (`D:\sem5\WT\lab assignments\Assignment_3.pdf`). The source folder `D:\sem5\WT\React Projects\Assignment 3_Servlet_JSP_Electricity_Bill` previously only had empty subdirectories.
- **Implementation**: Fully implemented `BillServlet.java` (`package com.electricity`), `index.jsp`, `result.jsp`, `WEB-INF/web.xml`, and `pom.xml`.
- **Verification**: Successfully compiled with Java 23 against Jakarta Servlet API 6.0 (`tomcat-embed-core-10.1.20.jar`) and generated `target/ElectricityBillCalculator.war`. Pre-built WAR package is ready to drop into Tomcat's `webapps/` folder.

### Assignment 4: React Result System
- **Source**: Discovered in `D:\sem5\WT\React Projects\Assignment 4_vit-result-app`.
- **Integrity**: Full React 19 + Vite 8 application for VIT Semester Results evaluating 4 subjects (Web Technology, Computer Networks, Ethical Hacking, DAA) across MSE (30%) and ESE (70%) weights.
- **Verification**: Executed `npm run build`. Produced clean production bundle in 477ms with zero errors.

### Assignment 5: JavaScript + Spring Boot Result System
- **Source**: Discovered in `D:\sem5\WT\React Projects\online-result-system`.
- **Stack Verification**: Confirmed genuine Spring Boot 3 backend with H2 in-memory JPA persistence + Vanilla JavaScript frontend. (Not Node.js).
- **Verification**: Compiled backend with Apache Maven 3.9.16 and Java 23 (`$env:JAVA_HOME = "E:\"`). 9 Java source files compiled with `BUILD SUCCESS`.

### Assignment 6: Node.js + MySQL Online Book Store (BOOKHUB)
- **Source**: Discovered in `D:\sem5\WT\React Projects\online-book-store-asgn6`.
- **Integrity**: Express.js backend (`server.js`, `db.js`), frontend pages (`index.html`, `catalogue.html`, `login.html`, `register.html`), and `database/database.sql`.
- **Verification**: Node syntax inspection (`node -c`) completed without errors.
- **Database Status**: Marked **PARTIAL** because MySQL Server 8.0 on port 3306 is currently stopped. To complete verification, start MySQL and run `database.sql`.

### Assignment 7: React + Spring Boot Online Book Store
- **Source**: Discovered in `D:\sem5\WT\React Projects\online-book-store`.
- **Stack Verification**: Verified genuine Spring Boot REST backend (`src/main/java/com/bookstore/...`) and React Vite frontend (`src/Catalogue.jsx`, `src/BookDetails.jsx`). (Distinct from Assignment 6).
- **Verification**: Backend compiled with `mvn compile` (`BUILD SUCCESS`); frontend built with `npm run build` (30 modules transformed, clean `dist/`).
- **Database Status**: Marked **PARTIAL** because MySQL on port 3306 is currently offline. To complete verification, start MySQL and run `database/init.sql`.
