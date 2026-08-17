@echo off
title Netlify'a yayinla
cd /d "%~dp0"
call Yayin-Klasoru-Guncelle.bat
netlify deploy --prod --dir yayin --no-build --message "guncelleme"
pause
