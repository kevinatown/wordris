# Wordris

- [Mobile](#mobile)

## Mobile

### Prerequisite

1. homebrew
2. make sure npm packages are upto date

### Android Setup:

1. Check whatcha need: `npm run cordova:requirements -- android`
2. Java 8 with `JAVA_HOME` set
 ```bash
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
# set $JAVA_HOME
# for me: /Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
 ```
3. Install gradle: `brew install gradle`
4. Get android `sdkmanager` and other tools:
 ```bash
# tapping caskroom may not be needed
brew tap caskroom/cask
brew cask install android-sdk
 ```
5. Install SDK-platform API level android-29 & Android SDK Platform-tools: 
 ```bash
sdkmanager "platform-tools" "platforms;android-28"
 ```
7. Install andriod build tools:
 ```bash
sdkmanager "build-tools;29.0.3"
 ```
8. Add `$ANDROID_SDK_ROOT` env var pointed towards the location of your Android SDK installation, mine was: `/usr/local/Caskroom/android-sdk/4333796`
9. Check your requirements again (Step 1)
10. get adb: `brew cask install android-platform-tools`
11. Add the buildtools to your `PATH` mine were `/usr/local/Caskroom/android-sdk/4333796/build-tools/29.0.3`

### install on android
1. Enable remote debugging on your android.
2. `adb devices` -> return all conected devices
3. `adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk` (use unsigned or debug apk, if there are multiple)

### iOS Setup:
1. Check whatcha need: `npm run cordova:requirements -- ios`
2. Install Xcode:
 ```bash
 xcode-select --install
 ```
3. Install ios-deploy: 
 ```bash
 npm i -g ios-deploy
 ```
4. Install CocoaPods:
 ```bash
 sudo gem install cocoapods
 ```
5. Check your requirements again (Step 1)

### installing on iOS
Open xcode > window > devices and simulators > drag and drop ipa into you're device's app. 

The ipa is located in: `platforms/ios/build/device/Wordris.ipa`


### Deploying to app stores

Versions must change to deploy to app store. Update the `config.xml` version.

Run: 
```
npm version <patch | minor | major>
```


#### Apple:

```
npm run build:mobile:ios:prod

xcrun altool --validate-app -f platforms/ios/build/device/Wordris.ipa -t ios -u <username> -p <App-Specific_Password>

xcrun altool --upload-app -f platforms/ios/build/device/Wordris.ipa -t ios -u <username> -p <App-Specific_Password>
```
Go to https://appstoreconnect.apple.com/ to create release.

#### Google:

```
npm run build:mobile:android:prod
```
Go to https://play.google.com/console to create new release. 

Upload `platforms/android/app/build/outputs/apk/release/wordris_aligned.apk` to the app store.

### More Reading:
- https://github.com/sriramrudraraju/create-react-app-and-cordova/wiki/Creating-Structure-for-Create-react-app-and-Cordova#installation
- [codova getting started](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)
- [cordova platform guide](https://cordova.apache.org/docs/en/4.0.0/guide/platforms/)
- [ios](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html)
- [andriod](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html)
- [encryption](https://stackoverflow.com/questions/2135081/does-my-application-contain-encryption)