@echo off

@REM you may get a "SmartScreen" warning for this file!
@REM This is NORMAL and is done with any downloaded executable.

echo Checking for python
call install_python.bat

echo Updating pip and building.
pip install --upgrade pip
py build.py -w
pause
