@echo off
REM Script para iniciar TikTok Monitor Backend e Frontend

echo ====================================
echo TikTok Monitor - Iniciando Servidores
echo ====================================
echo.

REM Configurar PATH para Node.js
set PATH=C:\nodejs\node-v20.10.0-win-x64;%PATH%

REM Iniciar Backend em uma nova janela
echo Iniciando Backend...
start "TikTok Monitor - Backend" cmd /k "cd /d C:\Users\pregu\tiktok-monitor\backend && npm run dev"

REM Esperar um pouco para backend iniciar
timeout /t 5 /nobreak

REM Iniciar Frontend em uma nova janela
echo Iniciando Frontend...
start "TikTok Monitor - Frontend" cmd /k "cd /d C:\Users\pregu\tiktok-monitor\frontend && npm run dev"

echo.
echo ====================================
echo Servidores iniciados!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ====================================
echo.
pause
