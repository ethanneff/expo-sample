#!/bin/sh

# Validate the project

set -e

wait_for_user() {
    printf "\n\033[1;34m=== Press Enter to continue (or 'q' to quit) ===\033[0m\n"
    read -r input
    if [ "$input" = "q" ]; then
        printf "\033[1;31mValidation stopped by user\033[0m\n"
        exit 0
    fi
}

pnpx expo@latest install --check;
wait_for_user

pnpx npm-check-updates -i;
wait_for_user

pnpx react-native doctor;
wait_for_user

pnpx expo-doctor@latest;
wait_for_user
