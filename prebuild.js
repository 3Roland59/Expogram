const fs = require('fs');
const path = require('path');

const gradleFilePath = path.resolve(__dirname, 'node_modules', 'react-native-webrtc', 'android', 'build.gradle');

const repositories = `
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
        maven { url 'https://oss.sonatype.org/content/repositories/snapshots' }
    }
}
`;

if (fs.existsSync(gradleFilePath)) {
    fs.appendFileSync(gradleFilePath, repositories);
    console.log('Added custom repositories to build.gradle');
} else {
    console.error('build.gradle not found, please check the path.');
}
