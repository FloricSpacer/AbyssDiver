#!/bin/bash

WORKAREA=`dirname $0`

TWEEGO="$(which ${TWEEGO:-tweego} 2> /dev/null)"
if test -x "$TWEEGO"
then
    echo "Using systemwide Tweego: $TWEEGO"
else
    TWEEGO_VERSION=2.1.1
    TWEEGO_EXE="tweego"
    case "$(uname -s)" in
    Darwin)
        TWEEGO_OS=macos
        ;;
    Linux)
        TWEEGO_OS=linux
        ;;
    CYGWIN*|MSYS*|MINGW*)
        TWEEGO_OS=windows
        TWEEGO_EXE="tweego.exe"
        ;;
     *)
        echo "No pre-built Tweego is available for OS $(uname -s)."
        echo "Please build Tweego from source and either add it to your PATH " \
             "or put its location in the TWEEGO environment variable."
        exit 1
        ;;
    esac
    case "$(uname -m)" in
    i?86)
        TWEEGO_ARCH=x86
        ;;
    x86_64|amd64|x64)
        TWEEGO_ARCH=x64
        ;;
    *)
        echo "No pre-built Tweego is available for CPU family $(uname -m)."
        echo "Please build Tweego from source and either add it to your PATH " \
             "or put its location in the TWEEGO environment variable"
        exit 1
        ;;
    esac
    TWEEGO_ARCHIVE="tweego-$TWEEGO_VERSION-$TWEEGO_OS-$TWEEGO_ARCH.zip"
    TWEEGO="$WORKAREA/tools/$TWEEGO_EXE"
    if ! test -f "$WORKAREA/tools/$TWEEGO_ARCHIVE"
    then
        echo "Downloading Tweego..."
        curl -L "https://github.com/tmedwards/tweego/releases/download/v$TWEEGO_VERSION/$TWEEGO_ARCHIVE" -o "$WORKAREA/tools/$TWEEGO_ARCHIVE"
        echo "Unpacking Tweego..."
        unzip -d "$WORKAREA/tools/" -o "$WORKAREA/tools/$TWEEGO_ARCHIVE" "$TWEEGO_EXE"
        chmod a+x "$TWEEGO"
    fi
    echo "Using downloaded Tweego: $TWEEGO"
fi

SUGARCUBE_VERSION=2.37.0
SUGARCUBE_ARCHIVE="sugarcube-$SUGARCUBE_VERSION-for-twine-2.1-local.zip"
if ! test -f "$WORKAREA/storyformats/$SUGARCUBE_ARCHIVE"
then
    echo "Downloading SugarCube story format..."
    curl -L "https://github.com/tmedwards/sugarcube-2/releases/download/v$SUGARCUBE_VERSION/$SUGARCUBE_ARCHIVE" -o "$WORKAREA/storyformats/$SUGARCUBE_ARCHIVE"
    echo "Unpacking SugarCube story format..."
    unzip -d "$WORKAREA/storyformats/" -o "$WORKAREA/storyformats/$SUGARCUBE_ARCHIVE"
fi

OUTPUT="Abyss Diver.html"
echo "Compiling to: $OUTPUT"
TWEEGO_PATH="$WORKAREA/storyformats/" "$TWEEGO" "$WORKAREA/src/" "$WORKAREA/dependencies/" -o "$OUTPUT" "$@"
