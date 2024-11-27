@echo off
setlocal

REM Ensure the script runs in the directory of the batch file
cd /D "%~dp0"

echo Checking for Python installation...

REM Check for 'py', 'python', or 'python3' in order and set PYTHON_CMD
set "PYTHON_CMD="
where py >nul 2>&1
if %errorlevel% equ 0 (
	set "PYTHON_CMD=py"
) else (
	where python >nul 2>&1
	if %errorlevel% equ 0 (
		set "PYTHON_CMD=python"
	) else (
		where python3 >nul 2>&1
		if %errorlevel% equ 0 (
			set "PYTHON_CMD=python3"
		)
	)
)

REM If Python command is still not set, install Python
if "%PYTHON_CMD%"=="" (
	echo Python not found. Installing Python...
	if exist install_python_windows.bat (
		call install_python_windows.bat
		if %errorlevel% neq 0 (
			echo Failed to install Python. Exiting.
			pause
			exit /b 1
		)
	) else (
		echo install_python_windows.bat not found. Please ensure it exists.
		pause
		exit /b 1
	)

	REM Retry Python detection after installation
	where py >nul 2>&1 && set "PYTHON_CMD=py"
	where python >nul 2>&1 && set "PYTHON_CMD=python"
	where python3 >nul 2>&1 && set "PYTHON_CMD=python3"

	if "%PYTHON_CMD%"=="" (
		echo Python installation failed or not found in PATH. Exiting.
		echo You may need to restart your terminal for it to register the newly installed python.
		pause
		exit /b 1
	)
) else (
	echo Python found: %PYTHON_CMD%
)

REM Update pip using the detected Python command
echo Updating pip...
%PYTHON_CMD% -m ensurepip --upgrade >nul 2>&1
if %errorlevel% neq 0 (
	echo Failed to ensure pip is installed.
)

%PYTHON_CMD% -m pip install --upgrade pip
if %errorlevel% neq 0 (
	echo Failed to upgrade pip.
	pause
	exit /b 1
)

REM Run the build script
echo Running build.py with watch mode...
%PYTHON_CMD% build.py -w
if %errorlevel% neq 0 (
	echo build.py execution failed.
	pause
	exit /b 1
)

echo Build completed successfully.
pause
