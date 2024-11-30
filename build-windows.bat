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

:: If Python command is still not set, install Python
if "%PYTHON_CMD%"=="" (
	echo Python not found.
	echo Please head to https://www.python.org/downloads/release/python-311/ and install python with the "Windows x86-64 MSI installer".
	echo Make sure to install in the AppData directory
	echo and have "Add to PATH" selected.\
	echo Once you have done so, close the terminal and run the batch file again.
	echo Press enter to exit...
	pause
	exit /b 1
)

:: Install required Python packages
echo Ensuring pip is installed.
%PYTHON_CMD% -m ensurepip

echo Upgrading pip.
%PYTHON_CMD% -m pip install --upgrade pip

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
