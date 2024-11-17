@echo off

REM You may get a "SmartScreen" warning for this file!
REM This is NORMAL and happens with any downloaded executable.

echo Checking for Python installation...

REM Check if 'py' or 'python' is available
where py >nul 2>&1
if %errorlevel% equ 0 (
	set PYTHON_CMD=py
) else (
	where python >nul 2>&1
	if %errorlevel% equ 0 (
		set PYTHON_CMD=python
	) else (
		echo Error: Neither 'py' nor 'python' was found in PATH.
		echo Please install Python and ensure it is in your PATH.
		pause
		exit /b 1
	)
)

REM Run the install_python.bat script
call install_python.bat

REM Update pip using the detected Python command
echo Updating pip...
%PYTHON_CMD% -m ensurepip --upgrade >nul 2>&1
%PYTHON_CMD% -m pip install --upgrade pip

REM Run the build script
echo Running build.py with watch mode...
%PYTHON_CMD% build.py -w

pause
