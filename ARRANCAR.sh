#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Navigate to the script directory
cd "$SCRIPT_DIR"

# Run your command here
# For example:
echo "Running command in $SCRIPT_DIR"
# Add your command here
npm run dev
# Optionally, you can navigate back to the original directory
# cd -

