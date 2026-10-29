# ========================================================================================
# START_ALL_ASSIGNMENTS.ps1
# Master Launcher for all 7 Web Technology Assignments
# Workspace: D:\sem5\WT\WT_Assignments_All
# ========================================================================================

$ErrorActionPreference = 'Continue'
$workspaceRoot = $PSScriptRoot
if (-not $workspaceRoot) { $workspaceRoot = Get-Location }

Write-Host "========================================================================================" -ForegroundColor Cyan
Write-Host "            WEB TECHNOLOGY LAB - MASTER SIMULTANEOUS LAUNCHER                          " -ForegroundColor Cyan
Write-Host "========================================================================================" -ForegroundColor Cyan

# 1. Validate environment & pre-requisites
Write-Host "[1/5] Validating environment & pre-requisites..." -ForegroundColor Yellow

$javaPath = "E:\bin\java.exe"
$javaHome = "E:"
if (Test-Path $javaPath) {
    $javaHome = "E:"
} else {
    $javaCmd = Get-Command java -ErrorAction SilentlyContinue
    if ($javaCmd) {
        $javaPath = $javaCmd.Source
        $javaHome = Split-Path (Split-Path $javaPath -Parent) -Parent
    }
}
if (-not (Test-Path $javaPath)) {
    Write-Host "[ERROR] Valid Java executable not found at E:\bin\java.exe or PATH!" -ForegroundColor Red
    exit 1
}
Write-Host "  -> Java JDK detected: $javaPath (JAVA_HOME: $javaHome)" -ForegroundColor Green

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Write-Host "[ERROR] Node.js executable not found in PATH!" -ForegroundColor Red
    exit 1
}
Write-Host "  -> Node.js detected: $($nodeCmd.Source)" -ForegroundColor Green

# 2. Check XAMPP Apache and MySQL services
Write-Host "[2/5] Checking Apache and MySQL services..." -ForegroundColor Yellow
$apacheListening = Get-NetTCPConnection -LocalPort 80 -State Listen -ErrorAction SilentlyContinue
if (-not $apacheListening) {
    Write-Host "  -> Starting Apache on Port 80..." -ForegroundColor Cyan
    Start-Process "D:\xampp\apache\bin\httpd.exe" -WorkingDirectory "D:\xampp" -WindowStyle Hidden
    Start-Sleep -Seconds 2
} else {
    Write-Host "  -> Apache HTTPD is already running on Port 80." -ForegroundColor Green
}

$mysqlListening = Get-NetTCPConnection -LocalPort 3306 -State Listen -ErrorAction SilentlyContinue
if (-not $mysqlListening) {
    Write-Host "  -> Warning: MySQL is not listening on Port 3306! Please start MySQL service." -ForegroundColor Red
} else {
    Write-Host "  -> MySQL is running on Port 3306." -ForegroundColor Green
}

# 3. Create log directory
$logDir = Join-Path $workspaceRoot "logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }

$pidTrackerFile = Join-Path $workspaceRoot ".running_pids.json"
$startedProcesses = @{}
if (Test-Path $pidTrackerFile) {
    try {
        $startedProcesses = Get-Content $pidTrackerFile -Raw | ConvertFrom-Json -AsHashtable
    } catch {
        $startedProcesses = @{}
    }
}

# Function to start service if not already listening
function Start-ServiceIfFree {
    param(
        [string]$Name,
        [int]$Port,
        [string]$WorkingDir,
        [string]$Command,
        [string]$LogFile
    )

    $conn = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    if ($conn) {
        Write-Host "  -> $Name is ALREADY listening on Port $Port (PID: $($conn[0].OwningProcess)). Skipping launch." -ForegroundColor Green
        return
    }

    Write-Host "  -> Launching $Name on Port $Port..." -ForegroundColor Cyan
    $fullLogPath = Join-Path $logDir $LogFile
    $proc = Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd /d `"$WorkingDir`" && $Command > `"$fullLogPath`" 2>&1" -WindowStyle Hidden -PassThru
    
    $startedProcesses[$Name] = @{
        Port = $Port
        PID = $proc.Id
        LogFile = $fullLogPath
        StartTime = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    }
}

Write-Host "[3/5] Starting individual assignment servers..." -ForegroundColor Yellow

# Assignment 2: React World Clock (Port 5173)
Start-ServiceIfFree -Name "Asgn2_React_World_Clock" `
    -Port 5173 `
    -WorkingDir (Join-Path $workspaceRoot "Assignment_2_React_World_Clock") `
    -Command "npm run dev" `
    -LogFile "asgn2_world_clock.log"

# Assignment 3: Tomcat Servlet / JSP (Port 8083)
Start-ServiceIfFree -Name "Asgn3_Tomcat_Servlet" `
    -Port 8083 `
    -WorkingDir (Join-Path $workspaceRoot "Assignment_3_Servlet_JSP_Electricity_Bill") `
    -Command "set JAVA_HOME=$javaHome&& set CATALINA_HOME=D:\xampp\tomcat&& D:\xampp\tomcat\bin\catalina.bat run" `
    -LogFile "asgn3_tomcat.log"

# Assignment 4: React Result System (Port 5174)
Start-ServiceIfFree -Name "Asgn4_React_Result_System" `
    -Port 5174 `
    -WorkingDir (Join-Path $workspaceRoot "Assignment_4_React_Result_System") `
    -Command "npm run dev" `
    -LogFile "asgn4_result_system.log"

# Assignment 5: Spring Boot Result Backend & Frontend (Port 8082)
Start-ServiceIfFree -Name "Asgn5_SpringBoot_Result_System" `
    -Port 8082 `
    -WorkingDir (Join-Path $workspaceRoot "Assignment_5_JavaScript_SpringBoot_Result_System\backend") `
    -Command "java -jar target\result-system-1.0.0.jar" `
    -LogFile "asgn5_result_system.log"

# Assignment 6: Node.js Express Online Book Store (Port 8081)
Start-ServiceIfFree -Name "Asgn6_Node_Online_Book_Store" `
    -Port 8081 `
    -WorkingDir (Join-Path $workspaceRoot "Assignment_6_Node_MySQL_Online_Book_Store\backend") `
    -Command "npm start" `
    -LogFile "asgn6_bookstore.log"

# Assignment 7: Spring Boot Backend (Port 8080)
Start-ServiceIfFree -Name "Asgn7_SpringBoot_Book_Store_Backend" `
    -Port 8080 `
    -WorkingDir (Join-Path $workspaceRoot "Assignment_7_React_SpringBoot_Online_Book_Store\backend") `
    -Command "java -jar target\backend-0.0.1-SNAPSHOT.jar" `
    -LogFile "asgn7_backend.log"

# Assignment 7: React Frontend (Port 5175)
Start-ServiceIfFree -Name "Asgn7_React_Book_Store_Frontend" `
    -Port 5175 `
    -WorkingDir (Join-Path $workspaceRoot "Assignment_7_React_SpringBoot_Online_Book_Store\frontend") `
    -Command "npm run dev" `
    -LogFile "asgn7_frontend.log"

# Save tracked PIDs
$startedProcesses | ConvertTo-Json | Set-Content $pidTrackerFile

# 4. Wait for servers to stabilize and verify health
Write-Host "[4/5] Polling services until initialized (up to 30 seconds)..." -ForegroundColor Yellow

$checks = @(
    @{ Name = "Asgn 1 (PHP / Apache)"; Url = "http://127.0.0.1/Assignment_1_PHP_Electricity_Bill/index.php"; Port = 80; Status = $false },
    @{ Name = "Asgn 2 (React Clock)"; Url = "http://localhost:5173/"; Port = 5173; Status = $false },
    @{ Name = "Asgn 3 (Tomcat Servlet)"; Url = "http://localhost:8083/ElectricityBillCalculator/"; Port = 8083; Status = $false },
    @{ Name = "Asgn 4 (React Result)"; Url = "http://localhost:5174/"; Port = 5174; Status = $false },
    @{ Name = "Asgn 5 (Spring Boot UI)"; Url = "http://localhost:8082/"; Port = 8082; Status = $false },
    @{ Name = "Asgn 6 (Node Express)"; Url = "http://localhost:8081/"; Port = 8081; Status = $false },
    @{ Name = "Asgn 7 (Spring Boot API)"; Url = "http://localhost:8080/api/books"; Port = 8080; Status = $false },
    @{ Name = "Asgn 7 (React Frontend)"; Url = "http://localhost:5175/"; Port = 5175; Status = $false }
)

$maxAttempts = 15
for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
    $allHealthy = $true
    foreach ($chk in $checks) {
        if (-not $chk.Status) {
            try {
                $resp = Invoke-WebRequest -Uri $chk.Url -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
                if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) {
                    $chk.Status = $true
                    $chk.Code = $resp.StatusCode
                } else {
                    $allHealthy = $false
                }
            } catch {
                $allHealthy = $false
            }
        }
    }
    if ($allHealthy) { break }
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "========================================================================================" -ForegroundColor Green
Write-Host "                         SIMULTANEOUS HEALTH CHECK STATUS                               " -ForegroundColor Green
Write-Host "========================================================================================" -ForegroundColor Green

foreach ($chk in $checks) {
    if ($chk.Status) {
        Write-Host ("  [PASS: {0}] {1,-30} -> {2}" -f $chk.Code, $chk.Name, $chk.Url) -ForegroundColor Green
    } else {
        Write-Host ("  [WAIT/PEND] {0,-30} -> {1}" -f $chk.Name, $chk.Url) -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================================================================" -ForegroundColor Cyan
Write-Host "               ALL 7 ASSIGNMENTS READY FOR SIMULTANEOUS USE                             " -ForegroundColor Cyan
Write-Host "========================================================================================" -ForegroundColor Cyan
Write-Host "  Assignment 1:  http://localhost/Assignment_1_PHP_Electricity_Bill/index.php" -ForegroundColor White
Write-Host "  Assignment 2:  http://localhost:5173/" -ForegroundColor White
Write-Host "  Assignment 3:  http://localhost:8083/ElectricityBillCalculator/" -ForegroundColor White
Write-Host "  Assignment 4:  http://localhost:5174/" -ForegroundColor White
Write-Host "  Assignment 5:  http://localhost:8082/" -ForegroundColor White
Write-Host "  Assignment 6:  http://localhost:8081/" -ForegroundColor White
Write-Host "  Assignment 7:  http://localhost:5175/" -ForegroundColor White
Write-Host "========================================================================================" -ForegroundColor Cyan
Write-Host "To safely stop background services, run: .\STOP_ALL_ASSIGNMENTS.ps1" -ForegroundColor Yellow
