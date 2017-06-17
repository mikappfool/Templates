# Signs the android-release-unsigned.apk file and creates a signed version in its place
#====================================
#
Cordova build --release 

jarsigner -verbose -tsa http://timestamp.digicert.com -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/Cordova/keyStore/mikapp_keystore.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk mikappfool
mv platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/android-release-SIGNED.apk
#echo ""
#echo ":: running zipalign ::"
#echo ""
#~/Cordova/zipalign -v 4 platforms/android/build/outputs/apk/android-release-SIGNED.apk platforms/android/build/outputs/apk/android-release-ALIGNED-DEPLOYABLE.apk

AppName="$(basename "$PWD")"
APP_NAME="${AppName}"

echo "app name is [ "$APP_NAME" ]"
mkdir deliverable
mv platforms/android/build/outputs/apk/android-release-SIGNED.apk deliverable/$APP_NAME'_SIGN_ME'.apk
echo ""
echo ":: open up jarsigner and select the unsigned file, Sign it, Align it, and your Done! ::"
echo ""