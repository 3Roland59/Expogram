#!/bin/bash

# Define the path to the build.gradle file for react-native-webrtc
GRADLE_FILE_PATH="./node_modules/react-native-webrtc/android/build.gradle"

# Define the repository entries to add
REPOSITORIES="
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
        maven { url 'https://oss.sonatype.org/content/repositories/snapshots' }
    }
}
"

# Append the repositories to the build.gradle file if it exists
if [ -f "$GRADLE_FILE_PATH" ]; then
  echo "$REPOSITORIES" >> "$GRADLE_FILE_PATH"
  echo "Added custom repositories to build.gradle"
else
  echo "build.gradle not found, please check the path."
fi
