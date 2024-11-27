#!/bin/bash

# Check for 'py', 'python', or 'python3' in order
if command -v py &>/dev/null; then
	PYTHON_CMD="py"
elif command -v python &>/dev/null; then
	PYTHON_CMD="python"
elif command -v python3 &>/dev/null; then
	PYTHON_CMD="python3"
else
	PYTHON_CMD=""
fi

# If Python is found, print its version and exit
if [[ -n "$PYTHON_CMD" ]]; then
	echo "Python is already installed."
	$PYTHON_CMD --version
	exit 0
fi

# Handle installation prompts based on OS type
if [[ "$OSTYPE" == "darwin"* ]]; then
	echo "Mac"
	echo "Please manually install Python from:"
	echo "https://www.python.org/downloads/macos/"
	echo "Download the macOS 64-bit universal2 installer from the Stable Releases section."
	read -p "Press Enter to continue..."
else
	echo "Linux"
	echo "Please manually install Python using this guide:"
	echo "https://www.geeksforgeeks.org/how-to-install-python-on-linux/"
	echo "Use Python 3.8 - 3.12 and ensure pip is installed."
	read -p "Press Enter to continue..."
fi

echo "You will need to restart your terminal for python to be available."
read -p ""
exit 1
