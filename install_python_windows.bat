@echo off
setlocal enabledelayedexpansion

:: Check if Python is already installed
python --version >nul 2>&1
if "!errorlevel!"=="0" (
	echo Python is already installed.
	python --version
	exit /b 0
)

:: Check if Python 3.10 specifically is installed
python3.10 --version >nul 2>&1
if "!errorlevel!"=="0" (
	echo Python 3.10 is already installed.
	python3.10 --version
	exit /b 0
)

:: Check if Python is accessible via py launcher
py -3.10 --version >nul 2>&1
if "!errorlevel!"=="0" (
	echo Python 3.10 is already installed.
	py -3.10 --version
	exit /b 0
)

:: Set Python version and download URL
set "PYTHON_VERSION=3.10.9"
set "PYTHON_INSTALLER=python-!PYTHON_VERSION!-amd64.exe"
set "PYTHON_URL=https://www.python.org/ftp/python/!PYTHON_VERSION!/!PYTHON_INSTALLER!"

:: Download the Python installer if not already present
if not exist "!PYTHON_INSTALLER!" (
	echo Downloading Python !PYTHON_VERSION! installer...
	curl -L "!PYTHON_URL!" -o "!PYTHON_INSTALLER!"
	if "!errorlevel!" neq "0" (
		echo Failed to download Python installer.
		exit /b 1
	)
)

:: Install Python silently (which it doesnt btw)
echo Installing Python...
"!PYTHON_INSTALLER!" /quiet InstallAllUsers=0 PrependPath=1 Include_test=0
if "!errorlevel!" neq "0" (
	echo Python installation failed.
	exit /b 1
)

echo Python should be installed now - please restart your open terminals.
pause

exit /b 0
