#!/bin/sh

# Kill Watchman processes and clear watches
watchman watch-del-all
watchman shutdown-server

# Kill Metro bundler process
(kill -9 $(lsof -ti :8081) || true)

# Remove common build and cache directories
rm -rf .cache
rm -rf .next
rm -rf .expo
rm -rf .turbo
rm -rf dist
rm -rf build
rm -rf node_modules

# Remove Metro bundler cache
rm -rf /tmp/metro-bundler-cache-* /tmp/haste-map-react-native-packager-*

# Clean Android build artifacts
rm -rf android/build android/.gradle android/app/build android/app/.cxx

# Clean iOS build artifacts
rm -rf ios/build ios/Pods ios/.xcode.env.local

# Clean Xcode caches
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ~/Library/Caches/org.swift.swiftpm
rm -rf ~/.swiftpm

# Shutdown iOS simulators and resolve package dependencies
xcrun simctl shutdown all
xcodebuild -resolvePackageDependencies

# Run turbo clean
npx turbo run clean --parallel
