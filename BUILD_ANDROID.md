# Building the Android App Bundle (.aab) for Google Play

The app is an Expo project that uses Continuous Native Generation, so the
`android/` folder is generated (it is git-ignored) rather than committed.
There are two supported ways to produce an uploadable `.aab`.

## Option A — EAS Build (recommended, builds in the cloud)

No local Android SDK required. Requires a free Expo account.

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile production
```

This uses the `production` profile in `eas.json` (`buildType: app-bundle`) and
produces a signed `.aab`. EAS can generate and securely store the upload
keystore for you the first time.

## Option B — Local Gradle build (what was used to produce the first .aab)

Prerequisites: JDK 17, Android SDK (platform 36, build-tools 36.0.0, NDK
27.1.12297006, cmake 3.22.1).

```bash
# 1) Generate the native Android project
npx expo prebuild --platform android --clean

# 2) Create an upload keystore (KEEP THIS FILE SAFE — you need it for every update)
keytool -genkeypair -v \
  -keystore android/app/upload-keystore.jks \
  -alias upload -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass <STORE_PASSWORD> -keypass <KEY_PASSWORD> \
  -dname "CN=Daily Muse, OU=Mobile, O=Daily Muse, C=US"

# 3) Add signing properties to android/gradle.properties
#    RELEASE_STORE_FILE=upload-keystore.jks
#    RELEASE_STORE_PASSWORD=<STORE_PASSWORD>
#    RELEASE_KEY_ALIAS=upload
#    RELEASE_KEY_PASSWORD=<KEY_PASSWORD>
#    (the release signingConfig in android/app/build.gradle reads these)

# 4) Build the signed bundle
cd android && ./gradlew :app:bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

> If Gradle tries to auto-download a JDK and crashes with a Foojay /
> `JvmVendorSpec.IBM_SEMERU` error, install JDK 17 and add to
> `android/gradle.properties`:
> `org.gradle.java.installations.auto-download=false`
> `org.gradle.java.installations.paths=/path/to/jdk-17`

## Uploading to Google Play

1. Create the app in the Google Play Console (package `com.ahmedreyyan.dailymuse`).
2. Enroll in **Play App Signing** (recommended). Upload `app-release.aab`.
3. Keep `upload-keystore.jks` and its passwords safe — the same key must sign
   every future update (or reset the upload key via Play App Signing).

## App identity

- Display name: **Daily Muse**
- Package / applicationId: `com.ahmedreyyan.dailymuse`
- versionName `1.0.0`, versionCode `1` (bump `version` in `app.json` and the
  Gradle `versionCode` for each release).
