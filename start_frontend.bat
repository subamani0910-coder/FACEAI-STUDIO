@echo off
cd /d "%~dp0frontend"
set "PATH=C:\Program Files\nodejs;%PATH%"
if not exist node_modules (call npm install)
call npm run dev -- --host 0.0.0.0
