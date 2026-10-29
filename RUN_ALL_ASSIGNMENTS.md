# Running All 7 Web Technology Assignments

This guide provides the exact commands, prerequisite environments, local URLs, database instructions, port strategies, and troubleshooting steps for all 7 Web Technology assignments in this workspace.

---

## Global Environment & Runtime Reference

The development tools on this system are configured as follows:

- **Node.js**: `v24.21.0` (with `npm`)
- **Java JDK**: Java 23 (`javac 23.0.2` located at `E:\bin\javac.exe` / `E:\`)
  - **Important**: To run Maven or Java commands properly in PowerShell, always define:
    ```powershell
    $env:JAVA_HOME = "E:\"
    ```
- **Apache Maven**: `3.9.16` located at `C:\Program Files\apache-maven-3.9.16-bin\apache-maven-3.9.16\bin\mvn.cmd`
- **PHP**: PHP 8.2.12 located at `D:\xampp\php\php.exe`
- **Tomcat**: Apache Tomcat 8.5/10.1 located at `D:\xampp\tomcat`
- **MySQL**: MySQL Server 8.0 located at `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe` (Port `3306`)

---

## Recommended Port Allocation Strategy

To demonstrate multiple assignments without port conflicts:

| Assignment | Stack | Default Port | Alternative Port |
|---|---|---|---|
| **Assignment 1** | PHP Development Server | `8000` | `8001`, `8085` |
| **Assignment 2** | React + Vite | `5173` | Auto-assigns (`5174`, etc.) |
| **Assignment 3** | Jakarta Servlet / JSP (Tomcat) | `8080` (or `8082`) | Configurable in `server.xml` |
| **Assignment 4** | React + Vite | `5174` (or `5173`) | Auto-assigns (`5175`, etc.) |
| **Assignment 5** | Spring Boot (H2) + Vanilla JS | Backend `8080`, Frontend `3000` | Backend `--server.port=8082` |
| **Assignment 6** | Node.js + Express + MySQL | `8080` (or `5000`) | Set `PORT=5000` in `.env` |
| **Assignment 7** | Spring Boot + React + MySQL | Backend `8080`, Frontend `5173` | Backend `--server.port=8083` |

> **Note on Port 8080**: Assignments 3, 5, 6, and 7 default to port `8080` if run simultaneously. Run them one at a time for demonstration, or use the alternative port flags provided below.

---

## Assignment 1: PHP Electricity Bill Calculator

- **Folder Path**: `D:\sem5\WT\WT_Assignments_All\Assignment_1_PHP_Electricity_Bill`
- **Technology Stack**: PHP 8.2, HTML5, Bootstrap 5.3.2 CDN
- **Prerequisites**: PHP CLI or XAMPP Apache
- **Database Required**: None

### Exact Terminal Commands
Open PowerShell in the assignment folder:
```powershell
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_1_PHP_Electricity_Bill"
& "D:\xampp\php\php.exe" -S localhost:8000
```

### Access URL
Open your browser and navigate to:
```
http://localhost:8000
```

### How to Stop
Press `Ctrl + C` in the PowerShell terminal.

### Common Errors & Fixes
- **Error**: `'php' is not recognized as an internal or external command`  
  **Fix**: Invoke with full path: `& "D:\xampp\php\php.exe" -S localhost:8000`.
- **Error**: `Failed to listen on localhost:8000 (reason: Address already in use)`  
  **Fix**: Use port 8001: `& "D:\xampp\php\php.exe" -S localhost:8001`.

---

## Assignment 2: React World Clock

- **Folder Path**: `D:\sem5\WT\WT_Assignments_All\Assignment_2_React_World_Clock`
- **Technology Stack**: React 19, Vite 8, Lucide React, HTML5/CSS3
- **Prerequisites**: Node.js v24+, npm
- **Database Required**: None

### Exact Terminal Commands
```powershell
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_2_React_World_Clock"
npm install  # only needed if node_modules is missing
npm run dev
```

### Access URL
```
http://localhost:5173
```

### How to Stop
Press `Ctrl + C` in the PowerShell terminal.

### Common Errors & Fixes
- **Error**: Port 5173 is busy  
  **Fix**: Vite will automatically offer or bind to `5174`. Open the URL displayed in the terminal.

---

## Assignment 3: Servlet/JSP Electricity Bill Calculator

- **Folder Path**: `D:\sem5\WT\WT_Assignments_All\Assignment_3_Servlet_JSP_Electricity_Bill`
- **Technology Stack**: Jakarta Servlet API 6.0, JSP 3.1, Java 23 / 17+, Apache Maven, Bootstrap 5.3.3
- **Prerequisites**: JDK 17+, Apache Maven, Apache Tomcat 10.1+ (Jakarta EE 10)
- **Database Required**: None

### Build & Package Commands
```powershell
$env:JAVA_HOME = "E:\"
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_3_Servlet_JSP_Electricity_Bill"

# Build target WAR package
cmd /c "E:\bin\javac.exe -cp C:\Users\ASUS\.m2\repository\org\apache\tomcat\embed\tomcat-embed-core\10.1.20\tomcat-embed-core-10.1.20.jar -d src\main\webapp\WEB-INF\classes src\main\java\com\electricity\BillServlet.java"
cmd /c "E:\bin\jar.exe -cvf target\ElectricityBillCalculator.war -C src\main\webapp ."
```
*(Pre-compiled WAR package `target\ElectricityBillCalculator.war` is already provided and verified)*

### Deploy to Tomcat
1. Copy `target\ElectricityBillCalculator.war` into Tomcat's `webapps\` directory:
   ```powershell
   Copy-Item ".\target\ElectricityBillCalculator.war" -Destination "<TOMCAT_HOME>\webapps\"
   ```
2. Start Tomcat (`startup.bat` or via XAMPP Control Panel).

### Access URL
```
http://localhost:8080/ElectricityBillCalculator/
```

### How to Stop
Run `shutdown.bat` in Tomcat's `bin\` folder or stop Tomcat in XAMPP.

### Common Errors & Fixes
- **Error**: `ClassNotFoundException: jakarta.servlet.http.HttpServlet` on Tomcat 8.5/9  
  **Fix**: Tomcat 8.5/9 uses `javax.servlet`. Deploy to Apache Tomcat 10.1+ (Jakarta EE 10 compatible) where `jakarta.*` packages are supported.

---

## Assignment 4: React Result System

- **Folder Path**: `D:\sem5\WT\WT_Assignments_All\Assignment_4_React_Result_System`
- **Technology Stack**: React 19, Vite 8, Lucide React, HTML5/CSS3
- **Prerequisites**: Node.js v24+, npm
- **Database Required**: None (static subject evaluation data structure with MSE 30% + ESE 70% calculation)

### Exact Terminal Commands
```powershell
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_4_React_Result_System"
npm install  # only needed if node_modules is missing
npm run dev
```

### Access URL
```
http://localhost:5173
```
*(or `http://localhost:5174` if port 5173 is occupied)*

### How to Stop
Press `Ctrl + C` in the PowerShell terminal.

---

## Assignment 5: JavaScript + Spring Boot Result System

- **Folder Path**: `D:\sem5\WT\WT_Assignments_All\Assignment_5_JavaScript_SpringBoot_Result_System`
- **Technology Stack**: 
  - **Backend**: Spring Boot 3.3.3, Spring Data JPA, H2 In-Memory Database, Maven
  - **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Prerequisites**: JDK 17+ (`E:\`), Apache Maven, Web Browser
- **Database Required**: None (Self-contained in-memory H2 database auto-initialized on startup)

### Exact Terminal Commands

#### Terminal 1 — Start Spring Boot Backend:
```powershell
$env:JAVA_HOME = "E:\"
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_5_JavaScript_SpringBoot_Result_System\backend"
cmd /c "`"C:\Program Files\apache-maven-3.9.16-bin\apache-maven-3.9.16\bin\mvn.cmd`" spring-boot:run"
```
*(Backend starts on `http://localhost:8080`)*

#### Terminal 2 — Serve Frontend:
You can open `frontend\index.html` directly in your browser, or serve it with Python / Node:
```powershell
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_5_JavaScript_SpringBoot_Result_System\frontend"
python -m http.server 3000
```

### Access URLs
- **Frontend Portal**: `http://localhost:3000` (or double click `frontend\index.html`)
- **Backend API**: `http://localhost:8080/api/results`
- **H2 Console**: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:vit_result_db`, User: `sa`, Password: empty)

### How to Stop
Press `Ctrl + C` in each running terminal.

### Common Errors & Fixes
- **Error**: `Port 8080 is already in use`  
  **Fix**: Stop other assignments or pass alternative port:
  ```powershell
  cmd /c "`"C:\Program Files\apache-maven-3.9.16-bin\apache-maven-3.9.16\bin\mvn.cmd`" spring-boot:run -Dspring-boot.run.arguments=--server.port=8082"
  ```
  *(Update `API_BASE_URL` in `frontend\script.js` to match if port changed)*

---

## Assignment 6: Node.js + MySQL Online Book Store

- **Folder Path**: `D:\sem5\WT\WT_Assignments_All\Assignment_6_Node_MySQL_Online_Book_Store`
- **Technology Stack**: Node.js, Express.js, MySQL (mysql2 pool), bcryptjs, HTML5/CSS3/JavaScript
- **Prerequisites**: Node.js v24+, MySQL Server 8.0 running on localhost:3306
- **Database Required**: MySQL Database `online_book_store_asgn6`

### Database Setup Steps
1. Make sure MySQL service is running on port 3306:
   ```powershell
   # Start MySQL Service in Windows Services or XAMPP
   ```
2. Import the database schema and seed data:
   ```powershell
   Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_6_Node_MySQL_Online_Book_Store"
   & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < "database\database.sql"
   ```
3. Configure credentials:
   Edit `backend\.env` to match your local MySQL root password:
   ```properties
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=online_book_store_asgn6
   PORT=5000
   ```
   *(Note: Setting `PORT=5000` avoids conflict with Spring Boot on 8080)*

### Exact Terminal Commands
```powershell
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_6_Node_MySQL_Online_Book_Store\backend"
npm install  # only if node_modules needs refresh
node server.js
```

### Access URL
Open your browser to:
```
http://localhost:5000
```
*(The Express server serves both the frontend static pages and the REST API)*

### How to Stop
Press `Ctrl + C` in the PowerShell terminal.

### Common Errors & Fixes
- **Error**: `ECONNREFUSED 127.0.0.1:3306`  
  **Fix**: MySQL service is not running. Start MySQL from Windows Services (`services.msc`) or XAMPP Control Panel.
- **Error**: `ER_ACCESS_DENIED_ERROR`  
  **Fix**: Update `DB_PASSWORD` in `backend\.env` to your actual MySQL root password.

---

## Assignment 7: React + Spring Boot Online Book Store

- **Folder Path**: `D:\sem5\WT\WT_Assignments_All\Assignment_7_React_SpringBoot_Online_Book_Store`
- **Technology Stack**:
  - **Backend**: Spring Boot 3.x, Spring Data JPA, MySQL Connector, Maven
  - **Frontend**: React 19, React Router DOM 7, Vite 8, Lucide React
  - **Database**: MySQL (`online_book_store`)
- **Prerequisites**: JDK 17+ (`E:\`), Apache Maven, Node.js v24+, MySQL Server 8.0
- **Database Required**: MySQL Database `online_book_store`

### Database Setup Steps
1. Make sure MySQL service is running on port 3306.
2. Initialize database:
   ```powershell
   Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_7_React_SpringBoot_Online_Book_Store"
   & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < "database\init.sql"
   ```
3. Update MySQL credentials in `backend\src\main\resources\application.properties` if needed:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/online_book_store
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

### Exact Terminal Commands

#### Terminal 1 — Start Spring Boot Backend:
```powershell
$env:JAVA_HOME = "E:\"
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_7_React_SpringBoot_Online_Book_Store\backend"
cmd /c "`"C:\Program Files\apache-maven-3.9.16-bin\apache-maven-3.9.16\bin\mvn.cmd`" spring-boot:run"
```
*(Backend REST API runs on `http://localhost:8080/api/books`)*

#### Terminal 2 — Start React Frontend:
```powershell
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_7_React_SpringBoot_Online_Book_Store\frontend"
npm run dev
```

### Access URL
Open your browser to:
```
http://localhost:5173
```

### How to Stop
Press `Ctrl + C` in each running terminal.

### Common Errors & Fixes
- **Error**: `Communications link failure` on backend startup  
  **Fix**: MySQL is offline. Start MySQL on port 3306 before launching the backend.
- **Error**: `Port 8080 already in use`  
  **Fix**: If Assignment 5 or 6 is active, shut it down before launching Assignment 7 backend.
