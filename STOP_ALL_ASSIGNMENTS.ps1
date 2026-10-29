# ========================================================================================
# STOP_ALL_ASSIGNMENTS.ps1
# Safe Shutdown Script for Web Technology Assignments
# Workspace: D:\sem5\WT\WT_Assignments_All
# ========================================================================================

$workspaceRoot = $PSScriptRoot
if (-not $workspaceRoot) { $workspaceRoot = Get-Location }

$pidTrackerFile = Join-Path $workspaceRoot ".running_pids.json"

Write-Host "========================================================================================" -ForegroundColor Yellow
Write-Host "            STOPPING ALL ASSIGNMENT PROCESSES (SAFE SHUTDOWN)                           " -ForegroundColor Yellow
Write-Host "========================================================================================" -ForegroundColor Yellow

# 1. Stop processes recorded in PID tracker file
if (Test-Path $pidTrackerFile) {
    try {
        $startedProcesses = Get-Content $pidTrackerFile -Raw | ConvertFrom-Json
        foreach ($prop in $startedProcesses.PSObject.Properties) {
            $svcName = $prop.Name
            $info = $prop.Value
            $pidToStop = $info.PID
            $port = $info.Port

            Write-Host "Stopping $svcName (PID: $pidToStop, Port: $port)..." -ForegroundColor Cyan
            
            try {
                cmd.exe /c "taskkill /PID $pidToStop /T /F" 2>&1 | Out-Null
                Write-Host "  -> Terminated process tree for PID $pidToStop." -ForegroundColor Green
            } catch {
                Write-Host "  -> Process PID $pidToStop was already stopped." -ForegroundColor Gray
            }
        }
        Remove-Item -Force $pidTrackerFile -ErrorAction SilentlyContinue
    } catch {
        Write-Host "Error parsing $($pidTrackerFile): $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 2. Sweep dedicated assignment ports to ensure no orphaned processes remain
# Note: Ports 80 (Apache) and 3306 (MySQL) are shared services and left untouched.
$assignmentPorts = @(5173, 5174, 5175, 8080, 8081, 8082, 8083)
Write-Host "Verifying dedicated assignment ports ($($assignmentPorts -join ', '))..." -ForegroundColor Yellow

foreach ($p in $assignmentPorts) {
    $conns = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue
    foreach ($c in $conns) {
        $owner = $c.OwningProcess
        if ($owner -gt 4) {
            Write-Host "  -> Cleaning up lingering process PID $owner on Port $p..." -ForegroundColor Cyan
            cmd.exe /c "taskkill /PID $owner /T /F" 2>&1 | Out-Null
        }
    }
}

Write-Host "========================================================================================" -ForegroundColor Green
Write-Host "All assignment application servers stopped successfully." -ForegroundColor Green
Write-Host "(Note: Shared system services Apache on Port 80 and MySQL on Port 3306 were preserved.)" -ForegroundColor Gray
Write-Host "========================================================================================" -ForegroundColor Green
