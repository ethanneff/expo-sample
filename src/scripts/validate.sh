#!/bin/sh

# Validate the project

set -e

# Function to wait for user input with visual feedback
wait_for_user() {
    echo "\n\033[1;34m=== Press Enter to continue (or 'q' to quit) ===\033[0m"
    read -r input
    if [ "$input" = "q" ]; then
        echo "\033[1;31mValidation stopped by user\033[0m"
        exit 0
    fi
}

pnpx npm-check-updates -i;
wait_for_user

pnpx expo@latest install --check;
wait_for_user

pnpx expo-doctor@latest;
