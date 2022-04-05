#!/bin/bash

if ! which tweego > /dev/null
then
    echo "Please install Tweego and add it to your PATH"
    exit 1
fi

SUGARCUBE_VERSION=2.36.1
SUGARCUBE_ARCHIVE="sugarcube-$SUGARCUBE_VERSION-for-twine-2.1-local.zip"
if ! test -f "storyformats/$SUGARCUBE_ARCHIVE"
then
    echo "Downloading SugarCube story format..."
    curl -L "https://github.com/tmedwards/sugarcube-2/releases/download/v$SUGARCUBE_VERSION/$SUGARCUBE_ARCHIVE" -o "storyformats/$SUGARCUBE_ARCHIVE"
    echo "Unpacking SugarCube story format..."
    unzip -d "storyformats/" -o "storyformats/$SUGARCUBE_ARCHIVE"
fi

OUTPUT="Abyss Diver.html"
echo "Compiling to: $OUTPUT"
tweego src/* -o "$OUTPUT"
