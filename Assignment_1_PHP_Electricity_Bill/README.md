# Assignment 1 — PHP Electricity Bill Calculator

A responsive PHP web application that calculates electricity consumption charges based on slab tariffs.

## Technology Stack
- **Backend/Frontend**: PHP 8.x + HTML5
- **Styling**: Bootstrap 5.3.2 CDN
- **Web Server**: Built-in PHP Development Server or Apache (XAMPP)

## Tariff Slab Rates
- **First 50 units**: ₹3.50 / unit
- **Next 100 units (51–150)**: ₹4.00 / unit
- **Next 100 units (151–250)**: ₹5.20 / unit
- **Above 250 units**: ₹6.50 / unit

## File Structure
```
Assignment_1_PHP_Electricity_Bill/
├── index.php
└── README.md
```

## How to Run

### Option 1: Built-in PHP CLI Server (Fastest)
Run the following PowerShell command inside this folder:
```powershell
& "D:\xampp\php\php.exe" -S localhost:8000
```
Then visit:
```
http://localhost:8000
```
To stop the server: Press `Ctrl + C` in the terminal.

### Option 2: Apache via XAMPP
1. Copy or link this folder into `D:\xampp\htdocs\Assignment_1_PHP_Electricity_Bill`.
2. Start the Apache service from the XAMPP Control Panel.
3. Open your browser and navigate to:
   ```
   http://localhost/Assignment_1_PHP_Electricity_Bill/index.php
   ```
