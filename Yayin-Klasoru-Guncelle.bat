@echo off
title Yayin klasorunu guncelle
cd /d "%~dp0"
if exist yayin rmdir /s /q yayin
mkdir yayin
copy index.html yayin\ >nul
xcopy assets yayin\assets\ /e /i /q >nul
copy _headers_src yayin\_headers >nul 2>nul
copy manifest.webmanifest yayin\ >nul 2>nul
echo Hazir: yayin klasorunu Netlify Drop'a surukle -> https://app.netlify.com/drop
rem explorer yayin
