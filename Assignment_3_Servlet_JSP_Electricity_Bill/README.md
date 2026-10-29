# Assignment 3 — Servlet/JSP Electricity Bill Calculator

A responsive Java Servlet and JSP web application to calculate electricity bills based on slab tariffs.

## Verified Environment & Technology Stack
- **Servlet Container**: Apache Tomcat 8.5.96 (at `D:\xampp\tomcat`)
- **Java Development Kit**: Oracle JDK 23.0.2 (installed at `E:\`)
- **Build System**: Apache Maven 3.9.16
- **Servlet Specification**: Java Servlet API 3.1 (`javax.servlet:javax.servlet-api:3.1.0`), JSP 2.3 (`javax.servlet.jsp:javax.servlet.jsp-api:2.3.3`)
- **Styling**: Bootstrap 5.3.3 CDN
- **Context Path**: `/ElectricityBillCalculator`
- **Application URL**: `http://localhost:8080/ElectricityBillCalculator/`

## Tariff Slab Rates
- **First 50 units**: ₹3.50 / unit
- **Next 100 units (51–150)**: ₹4.00 / unit
- **Next 100 units (151–250)**: ₹5.20 / unit
- **Above 250 units**: ₹6.50 / unit

## Project Structure
```
Assignment_3_Servlet_JSP_Electricity_Bill/
├── evidence/
│   ├── 01_maven_build.png
│   ├── 02_tomcat_startup_deployment.png
│   ├── 03_form_input.png
│   └── 04_calculation_result.png
├── pom.xml
├── README.md
├── target/
│   └── ElectricityBillCalculator.war
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── electricity/
        │           └── BillServlet.java
        └── webapp/
            ├── index.jsp
            ├── result.jsp
            └── WEB-INF/
                └── web.xml
```

## How to Build and Run

### 1. Build the WAR from Source
Open PowerShell in this project folder:
```powershell
Set-Location "D:\sem5\WT\WT_Assignments_All\Assignment_3_Servlet_JSP_Electricity_Bill"
mvn clean package
```
This compiles `BillServlet.java` and generates `target\ElectricityBillCalculator.war`.

### 2. Deploy to Tomcat
Deploy the generated WAR to the Tomcat `webapps` folder:
```powershell
Copy-Item ".\target\ElectricityBillCalculator.war" -Destination "D:\xampp\tomcat\webapps\ElectricityBillCalculator.war" -Force
```

### 3. Start Tomcat
Start Tomcat from PowerShell (or command prompt) with the correct `JAVA_HOME` and `CATALINA_HOME`:
```powershell
cmd /c "set JAVA_HOME=E:&& set CATALINA_HOME=D:\xampp\tomcat&& D:\xampp\tomcat\bin\catalina.bat run"
```

### 4. Access the Application
Open your browser and navigate to:
```
http://localhost:8080/ElectricityBillCalculator/
```

### 5. How to Stop Tomcat
In the terminal running Tomcat, press `Ctrl + C`, or execute:
```powershell
cmd /c "set JAVA_HOME=E:&& set CATALINA_HOME=D:\xampp\tomcat&& D:\xampp\tomcat\bin\catalina.bat stop"
```

## Features Tested and Verified
- `GET /ElectricityBillCalculator/` loads the calculation input form with Bootstrap 5 styling (HTTP 200).
- `POST /ElectricityBillCalculator/calculate` with valid numeric units forwards to `result.jsp` showing the correct bill calculation (HTTP 200).
  - Slab 1 (e.g. 30 units): `30 * 3.50 = ₹105.00`
  - Slab 2 (e.g. 75 units): `(50 * 3.50) + (25 * 4.00) = ₹275.00`
  - Slab 3 (e.g. 200 units): `(50 * 3.50) + (100 * 4.00) + (50 * 5.20) = ₹835.00`
  - Slab 4 (e.g. 300 units): `(50 * 3.50) + (100 * 4.00) + (100 * 5.20) + (50 * 6.50) = ₹1420.00`
- Invalid / non-numeric input safely redirects back to `index.jsp` (HTTP 302).
- Direct `GET /ElectricityBillCalculator/calculate` safely redirects to `index.jsp` (HTTP 302).
- Clean Tomcat deployment with no 404, 500, or JSP compilation errors.
