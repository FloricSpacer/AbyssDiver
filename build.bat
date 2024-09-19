@echo off
setlocal

set "WORKAREA=%~dp0"
set "TWEEGO=tweego"

where "%TWEEGO%" >nul

if errorlevel 1 (
    set "TWEEGO_VERSION=2.1.1"
    set "TWEEGO_OS=windows"
    set "TWEEGO_ARCH="

    rem Determine architecture
    echo %PROCESSOR_ARCHITECTURE%
    if "%PROCESSOR_ARCHITECTURE%"=="x86" (
        set "TWEEGO_ARCH=x86"
    ) else if "%PROCESSOR_ARCHITECTURE%"=="AMD64" (
        set "TWEEGO_ARCH=x64"
    ) else (
        echo No pre-built Tweego is available for CPU family %PROCESSOR_ARCHITECTURE%.
        echo Please build Tweego from source and either add it to your PATH or put its location in the TWEEGO environment variable.
        exit /b 1
    )

    set "TWEEGO_ARCHIVE=tweego-%TWEEGO_VERSION%-%TWEEGO_OS%-%TWEEGO_ARCH%.zip"
    echo "%TWEEGO_ARCHIVE%"

    set "TWEEGO_EXE=tweego.exe"

    if not exist "%WORKAREA%\tools\%TWEEGO_ARCHIVE%" (
        echo Downloading Tweego...
        curl -L "https://github.com/tmedwards/tweego/releases/download/v%TWEEGO_VERSION%/%TWEEGO_ARCHIVE%" -o "%WORKAREA%\tools\%TWEEGO_ARCHIVE%"

        echo Unpacking Tweego...
        powershell -command "Expand-Archive -Path '%WORKAREA%\tools\%TWEEGO_ARCHIVE%' -DestinationPath '%WORKAREA%\tools\' -Force"

        attrib +x "%WORKAREA%\tools\%TWEEGO_EXE%"
    )

    set "TWEEGO=%WORKAREA%tools/%TWEEGO_EXE%"
    echo Using downloaded Tweego: %TWEEGO%
) else (
    echo Using systemwide Tweego: %TWEEGO%
)

set "SUGARCUBE_VERSION=2.36.1"
set "SUGARCUBE_ARCHIVE=sugarcube-%SUGARCUBE_VERSION%-for-twine-2.1-local.zip"

if not exist "%WORKAREA%storyformats\%SUGARCUBE_ARCHIVE%" (
    echo Downloading SugarCube story format...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/tmedwards/sugarcube-2/releases/download/v%SUGARCUBE_VERSION%/%SUGARCUBE_ARCHIVE%' -OutFile '%WORKAREA%storyformats\%SUGARCUBE_ARCHIVE%'"
    echo Unpacking SugarCube story format...
    powershell -Command "Expand-Archive -Path '%WORKAREA%storyformats\%SUGARCUBE_ARCHIVE%' -DestinationPath '%WORKAREA%storyformats\' -Force"
)

set "OUTPUT=AbyssDiver.html"
echo Compiling to: %OUTPUT%
set "TWEEGO_PATH=%WORKAREA%/storyformats/"
"%TWEEGO%" "%WORKAREA%/src/" "%WORKAREA%/dependencies/" -o "%OUTPUT%" %*

pause
