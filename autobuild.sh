#!/bin/bash

@echo off

@REM you may get a "SmartScreen" warning for this file!
@REM This is NORMAL and is done with any downloaded executable.

echo Installing python if not found.
chmod +x install_python.sh
./install_python.sh

pip install --upgrade pip
py build.py -w
pause
