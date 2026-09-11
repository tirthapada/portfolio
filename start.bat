@echo off
setlocal enabledelayedexpansion
title Tirthapada 3D Portfolio - Workstation Launcher
cd /d "%~dp0"

echo ================================================================
echo    TIRTHAPADA 3D PORTFOLIO // WORKSTATION LAUNCHER
echo ================================================================
echo.
echo  [1] Start Portfolio Frontend (Port 5173)  -- DEFAULT in 3s
echo  [2] Start Both (Frontend + Backend API Server on Port 5000)
echo  [3] Build Production Bundle
echo  [4] Run TypeScript Typecheck
echo.
echo ================================================================

choice /C 1234 /T 3 /D 1 /M "Select an option [1-4]"
if errorlevel 4 goto TYPECHECK
if errorlevel 3 goto BUILD
if errorlevel 2 goto BOTH
if errorlevel 1 goto FRONTEND

:FRONTEND
echo.
echo [INFO] Starting Vite Frontend Server on http://localhost:5173 ...
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5173"
call pnpm --filter @workspace/tirthapada-portfolio run dev
goto END

:BOTH
echo.
echo [INFO] Launching Backend API Server (Port 5000) in separate window...
start "Tirthapada API Server" cmd /k "cd /d \"%~dp0\" && pnpm --filter @workspace/api-server run dev"
echo [INFO] Launching Frontend Server (Port 5173)...
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5173"
call pnpm --filter @workspace/tirthapada-portfolio run dev
goto END

:BUILD
echo.
echo [INFO] Building production bundle...
call pnpm --filter @workspace/tirthapada-portfolio run build
pause
goto END

:TYPECHECK
echo.
echo [INFO] Running typecheck...
call pnpm --filter @workspace/tirthapada-portfolio run typecheck
pause
goto END

:END
