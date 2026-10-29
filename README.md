# Web Technology Assignments — Complete Repository (Assignments 1–7)

**Student**: Anuj Kamble  
**Course**: Web Technology (CS-F, Batch B1)  
**Workspace**: `D:\sem5\WT\WT_Assignments_All`

---

## Workspace Structure

All seven assignments have been organized into clean, dedicated directories according to specification:

```
WT_Assignments_All/
├── Assignment_1_PHP_Electricity_Bill/
│   ├── index.php
│   └── README.md
├── Assignment_2_React_World_Clock/
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   └── README.md
├── Assignment_3_Servlet_JSP_Electricity_Bill/
│   ├── pom.xml
│   ├── README.md
│   ├── target/
│   │   └── ElectricityBillCalculator.war
│   └── src/
│       └── main/
│           ├── java/com/electricity/BillServlet.java
│           └── webapp/
│               ├── index.jsp
│               ├── result.jsp
│               └── WEB-INF/web.xml
├── Assignment_4_React_Result_System/
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   └── README.md
├── Assignment_5_JavaScript_SpringBoot_Result_System/
│   ├── backend/
│   │   ├── pom.xml
│   │   └── src/main/java/com/vit/result/
│   ├── frontend/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   └── QUICK_START.md
├── Assignment_6_Node_MySQL_Online_Book_Store/
│   ├── backend/
│   │   ├── server.js
│   │   ├── db.js
│   │   ├── package.json
│   │   └── .env.example
│   ├── database/
│   │   └── database.sql
│   ├── frontend/
│   │   ├── index.html
│   │   ├── catalogue.html
│   │   ├── login.html
│   │   └── register.html
│   └── README.md
├── Assignment_7_React_SpringBoot_Online_Book_Store/
│   ├── backend/
│   │   ├── pom.xml
│   │   └── src/main/java/com/bookstore/backend/
│   ├── database/
│   │   └── init.sql
│   ├── docs/
│   ├── frontend/
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── src/
│   └── README.md
├── RUN_ALL_ASSIGNMENTS.md
├── PROJECT_STATUS.md
└── README.md
```

---

## Assignment Overview & Tech Stacks

| # | Assignment Name | Primary Stack | Highlights |
|---|---|---|---|
| **1** | **PHP Electricity Bill Calculator** | PHP 8.2 + Bootstrap 5 | Real-time calculation across 4 tier tariff slabs (<=50: ₹3.50, <=150: ₹4.00, <=250: ₹5.20, >250: ₹6.50). |
| **2** | **React World Clock Dashboard** | React 19 + Vite 8 | Interactive dashboard with real-time analog clock, digital display, timezone selector, and stopwatch/timer widgets. |
| **3** | **Servlet/JSP Electricity Bill Calculator** | Java 23/17 + Jakarta Servlet API 6.0 + JSP 3.1 + Maven | Dynamic web application calculating electricity bills on Apache Tomcat. Pre-compiled WAR available in `target/`. |
| **4** | **React VIT Result System** | React 19 + Vite 8 | Student semester result portal evaluating 4 subjects with MSE 30% and ESE 70% dynamic calculations and grade analysis. |
| **5** | **JavaScript + Spring Boot Result System** | Spring Boot 3 + H2 Database + Vanilla JS | RESTful result management system with Spring Data JPA backend and responsive JavaScript frontend. Self-contained in-memory H2 DB. |
| **6** | **Node.js + MySQL Online Book Store (BOOKHUB)** | Node.js + Express + MySQL + HTML/CSS/JS | Full-stack online book store with user authentication, catalogue browsing, cart logic, and MySQL persistence. |
| **7** | **React + Spring Boot Online Book Store** | React 19 + Vite + Spring Boot 3 + MySQL | Modern enterprise architecture book store with React frontend router, Spring Boot REST controllers, and MySQL database. |

---

## Master One-Command Simultaneous Launch

All 7 assignments can be started and stopped simultaneously using the automated master scripts:

```powershell
# Master Simultaneous Launcher (Starts all 7 assignments without port conflicts)
.\START_ALL_ASSIGNMENTS.ps1

# Master Safe Shutdown (Gracefully terminates only assignment processes)
.\STOP_ALL_ASSIGNMENTS.ps1
```

### Reference Documentation
- **Port Allocation Map:** [ASSIGNMENT_PORT_MAP.md](file:///d:/sem5/WT/WT_Assignments_All/ASSIGNMENT_PORT_MAP.md)
- **Master Verification Report:** [ALL_ASSIGNMENTS_VERIFICATION_REPORT.md](file:///d:/sem5/WT/WT_Assignments_All/ALL_ASSIGNMENTS_VERIFICATION_REPORT.md)
- **Individual Running Instructions:** [RUN_ALL_ASSIGNMENTS.md](file:///d:/sem5/WT/WT_Assignments_All/RUN_ALL_ASSIGNMENTS.md)
- **Status Matrix:** [PROJECT_STATUS.md](file:///d:/sem5/WT/WT_Assignments_All/PROJECT_STATUS.md)

### Key Local Environment Variables

```powershell
# Set Java 23 for Maven & Spring Boot builds
$env:JAVA_HOME = "E:\"

# Run PHP CLI development server
& "D:\xampp\php\php.exe" -S localhost:8000
```
