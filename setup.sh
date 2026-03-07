#!/bin/bash
# setup.sh — Run this once after cloning to initialize the project
# Prerequisites: Node.js 20+, JDK 17, Android SDK

set -e

echo "=== Installing dependencies ==="
npm install

echo ""
echo "=== Building web app ==="
npm run build

echo ""
echo "=== Initializing Capacitor ==="
npx cap init "Violin Reference" com.violin.reference --web-dir dist 2>/dev/null || true
npx cap add android 2>/dev/null || true
npx cap sync android

echo ""
echo "=== Building debug APK ==="
cd android
chmod +x gradlew
./gradlew assembleDebug

APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
  echo ""
  echo "✅ APK built successfully!"
  echo "   Location: android/$APK_PATH"
  echo "   Size: $(du -h "$APK_PATH" | cut -f1)"
  echo ""
  echo "   Install on connected device:"
  echo "   adb install android/$APK_PATH"
else
  echo "❌ APK build failed. Check the output above for errors."
  exit 1
fi
