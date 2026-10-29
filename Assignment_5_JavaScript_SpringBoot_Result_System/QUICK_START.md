# QUICK START GUIDE

## Prerequisites
- Java 17+ installed (currently Java 23.0.2)
- Python 3+ installed (for http.server)
- Maven 3.9.16+ installed

## Step 1: Build Backend (One Time Only)

```powershell
cd "d:\sem5\WT\React Projects\online-result-system\backend"
mvn clean install -DskipTests
```

**Expected Output**: "BUILD SUCCESS"

---

## Step 2: Run the Application

### Terminal 1 — START BACKEND SERVER

```powershell
cd "d:\sem5\WT\React Projects\online-result-system\backend"
java -jar target/result-system-1.0.0.jar
```

**Wait for message**: "Tomcat started on port 8080"
**Backend API ready at**: http://localhost:8080

---

### Terminal 2 — START FRONTEND SERVER

```powershell
cd "d:\sem5\WT\React Projects\online-result-system\frontend"
python -m http.server 5500
```

**Wait for message**: "Serving HTTP on :: port 5500"
**Frontend ready at**: http://localhost:5500/index.html

---

## Step 3: Open in Browser

Open your web browser and navigate to:
```
http://localhost:5500/index.html
```

---

## Test the System

### Sample Input:
- Name: Test Student
- PRN: 1234567890
- Division: TE-A
- Web Technology: MSE 25, ESE 60
- DAA: MSE 24, ESE 55
- Computer Networks: MSE 27, ESE 62
- Ethical Hacking: MSE 22, ESE 58

### Expected Output:
- Total: 333 / 400
- Percentage: 83.25%
- Result: PASS

### Verify in Database:
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/results" -UseBasicParsing | Select-Object -ExpandProperty Content
```

---

## Database Options

### Currently Using: H2 (No Setup Required)
- In-memory database
- Automatic table creation
- Data persists during session
- Perfect for testing

### Optional: Switch to MySQL
1. Create database: `CREATE DATABASE vit_result_db;`
2. Start backend with MySQL profile:
   ```powershell
   java -jar target/result-system-1.0.0.jar --spring.profiles.active=mysql
   ```

---

## Shutdown

Press `Ctrl+C` in either terminal to stop the server.

---

## Troubleshooting

### Backend won't start
- Check Java is installed: `java -version`
- Check Maven build succeeded: `target/result-system-1.0.0.jar` exists
- Check port 8080 is available

### Frontend can't reach backend
- Verify backend is running: http://localhost:8080/api/results/health
- Check browser console for CORS errors
- Ensure CORS is enabled in ResultApplication.java

### Database errors
- Using H2: No setup needed, tables auto-create
- Using MySQL: Ensure database exists and credentials in application-mysql.properties

---

Last Updated: 2026-08-31
