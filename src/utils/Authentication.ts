// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next';
// Settings.setAppID('APP ID');
// Settings.initializeSDK();

// export async function onGoogleButtonPress() {
//   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//   const {idToken} = await GoogleSignin.signIn();
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//   return auth().signInWithCredential(googleCredential);
// }

// export async function onFacebookButtonPress() {
//   const result = await LoginManager.logInWithPermissions([
//     'public_profile',
//     'email',
//   ]);
//   if (result.isCancelled) {
//     throw 'User cancelled the login process';
//   }
//   const data = await AccessToken.getCurrentAccessToken();
//   if (!data) {
//     throw 'Something went wrong obtaining access token';
//   }
//   const facebookCredential = auth.FacebookAuthProvider.credential(
//     data.accessToken,
//   );
//   return auth().signInWithCredential(facebookCredential);
// }
