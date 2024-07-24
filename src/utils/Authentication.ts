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

// import React, { useState, useEffect } from 'react';
// import { View, Text, Alert, TouchableOpacity, TextInput, Button } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const VerificationWithPhoneNumberScreen = () => {
//     const [confirm, setConfirm] = useState<any | null>(null);
//     const [authenticated, setAuthenticated] = useState(false);

//     useEffect(() => {
//         const subscriber = auth().onAuthStateChanged((user) => {
//             setAuthenticated(!!user);
//         });
//         return subscriber; // unsubscribe on unmount
//     }, []);

//     const signIn = async (phoneNumber: string) => {
//         try {
//             const confirmation = await auth().signInWithPhoneNumber(formatPhoneNumber(phoneNumber));
//             setConfirm(confirmation);
//         } catch (error: any) {
//             Alert.alert('Error', error.message);
//         }
//     };

//     const confirmVerificationCode = async (code: string) => {
//         try {
//             if (confirm) {
//                 await confirm.confirm(code);
//                 setConfirm(null);
//             }
//         } catch (error: any) {
//             Alert.alert('Invalid code');
//         }
//     };

//     const formatPhoneNumber = (phoneNumber: string) => {
//         let formattedPhoneNumber = phoneNumber.trim();

//         if (formattedPhoneNumber.startsWith('0')) {
//             formattedPhoneNumber = '+84' + formattedPhoneNumber.slice(1);
//         } else if (!formattedPhoneNumber.startsWith('+84')) {
//             formattedPhoneNumber = '+84' + formattedPhoneNumber;
//         }

//         if (!/^\+84\d{9,10}$/.test(formattedPhoneNumber)) {
//             Alert.alert('Cảnh báo', 'Invalid phone number format. Please enter a valid Vietnamese phone number.')
//         }

//         return formattedPhoneNumber;
//     };

//     if (authenticated) return <Authenticated />;
//     if (confirm) return <VerifyCode onSubmit={confirmVerificationCode} />;
//     return <PhoneNumber onSubmit={signIn} />;
// };

// export default VerificationWithPhoneNumberScreen;

// interface PropsPhoneNumber {
//     onSubmit: (phone: string) => void;
// }

// const PhoneNumber = (props: PropsPhoneNumber) => {
//     const [value, setValue] = useState('');
//     return (
//         <View>
//             <TextInput
//                 style={{ backgroundColor: 'green' }}
//                 value={value}
//                 onChangeText={setValue}
//                 placeholder="Enter phone number"
//                 keyboardType="phone-pad"
//             />
//             <TouchableOpacity
//                 style={{ height: '100%', width: '100%' }}
//                 onPress={() => props.onSubmit(value)}
//             >
//                 <Text> Send OTP </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// interface PropsVerifyCode {
//     onSubmit: (code: string) => void;
// }

// const VerifyCode = (props: PropsVerifyCode) => {
//     const [value, setValue] = useState('');
//     return (
//         <View>
//             <TextInput
//                 style={{ backgroundColor: 'green' }}
//                 value={value}
//                 onChangeText={setValue}
//                 placeholder="Enter OTP"
//                 keyboardType="number-pad"
//             />
//             <Button title="Confirm OTP" onPress={() => props.onSubmit(value)} />
//         </View>
//     );
// };

// const Authenticated = () => {
//     return (
//         <View>
//             <Button title="Sign out" onPress={() => auth().signOut()} />
//         </View>
//     );
// };
