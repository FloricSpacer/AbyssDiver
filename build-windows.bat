@echo off

REM You may get a "SmartScreen" warning for this file!
REM This is NORMAL and happens with any downloaded executable.

echo Checking for Python installation...

REM Check if 'py', 'python', or 'python3' is available
where py >nul 2>&1
if %errorlevel% equ 0 (
	set PYTHON_CMD=py
) else (
	where python >nul 2>&1
	if %errorlevel% equ 0 (
		set PYTHON_CMD=python
	) else (
		where python3 >nul 2>&1
		if %errorlevel% equ 0 (
			set PYTHON_CMD=python3
		) else (
			echo Error: Neither 'py', 'python', nor 'python3' was found in PATH.
			echo Please install Python and ensure it is in your PATH.
			pause
			exit /b 1
		)
	)
)

REM Run the install_python_windows.bat script if required
if exist install_python_windows.bat (
	echo Running install_python_windows.bat to ensure Python is installed...
	call install_python_windows.bat
) else (
	echo Skipping install_python_windows.bat as it was not found.
)

REM Update pip using the detected Python command
echo Updating pip...
%PYTHON_CMD% -m ensurepip --upgrade >nul 2>&1
%PYTHON_CMD% -m pip install --upgrade pip

REM Run the build script
echo Running build.py with watch mode...
%PYTHON_CMD% build.py -w

pause
