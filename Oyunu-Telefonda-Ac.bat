@echo off
title Alisveris Sokagi - Telefon Sunucusu
cd /d "%~dp0"
echo.
echo  Sunucu calisiyor. Telefonda Safari'ye su adresi yaz:
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4" ^| findstr "192.168"') do echo     http://%%a:8642
echo.
echo  Kapatmak icin bu pencereyi kapat.
echo.
node serve.js
pause
