@echo off
chcp 65001 >nul
echo ====================================
echo    GREFINS WEBSITE LAUNCHER
echo ====================================
echo.

set "websitePath=%~dp0index.html"
echo Website path: %websitePath%

echo.
echo Options:
echo 1. Open in default browser
echo 2. Start local server (requires Python)
echo 3. Open simplified version
echo 4. Exit
echo.

:choice
set /p choice=Enter your choice (1-4): 

if "%choice%"=="1" goto open_browser
if "%choice%"=="2" goto start_server
if "%choice%"=="3" goto open_simple
if "%choice%"=="4" goto exit_script

echo Invalid choice. Please try again.
goto choice

:open_browser
echo Opening website in your default browser...
timeout /t 1 /nobreak >nul
start "" "%websitePath%"
echo Website should now be open in your browser.
echo If it doesn't open, please check that the file exists and your browser is working properly.
goto end

:start_server
echo Starting local server on port 8000...
echo Once the server starts, your website will be available at http://localhost:8000
echo Press Ctrl+C to stop the server when you're done.
echo.
timeout /t 2 /nobreak >nul
cd /d "%~dp0"
python -m http.server 8000
goto end

:open_simple
echo Opening simplified version...
timeout /t 1 /nobreak >nul
start "" "%~dp0simple.html"
echo Simplified version should now be open in your browser.
goto end

:exit_script
echo Exiting...
goto end

:end
echo.
echo ====================================
echo    Press any key to close this window
echo ====================================
pause >nul