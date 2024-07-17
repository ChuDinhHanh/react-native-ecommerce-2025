import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Image } from 'react-native';
import { Divider, IconButton, Modal, Portal } from 'react-native-paper';
import { Colors } from '../../../constants/Colors';
import { fontFamilies } from '../../../constants/FontFamilies';
import { Variables } from '../../../constants/Variables';
import { SignUpByGoogle } from '../../../types/request/SignUpByGoogle';
import { scale, verticalScale } from '../../../utils/ScaleUtils';
import TextButtonComponent from '../../buttons/textButton/TextButtonComponent';
import DropdownComponent from '../../dropdown/DropdownComponent';
import RowComponent from '../../row/RowComponent';
import SpaceComponent from '../../space/SpaceComponent';
import TextComponent from '../../text/TextComponent';
import { styles } from './SocialLoginComponent.style';
import { SignInByGoogle } from '../../../types/request/SignInByGoogle';
interface Props {
    isLogin: boolean;
    onPressLoginByGoogle: (type: SignInByGoogle) => void;
    onPressRegisterByGoogle: (type: SignUpByGoogle) => void;
}

// Google config
GoogleSignin.configure({
    webClientId: '741095176449-v10ft0apql9rlm9ik6ovu434e89e7rn4.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        // Handle
    }
}


const SocialLoginComponent = (props: Props) => {
    const t = useTranslation();
    const { isLogin, onPressRegisterByGoogle, onPressLoginByGoogle } = props;
    const [visible, setVisible] = React.useState(false);
    // Modal
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', paddingTop: 10, paddingHorizontal: 20, marginHorizontal: 15, borderRadius: 5 };
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<any>();
    const [typeAccount, setTypeAccount] = useState<string>();

    const dropdownData = [
        { name: t('RegisterScreen.textChooseTypeAccountRegisterSellPerson'), value: Variables.TYPE_SELLER },
        { name: t('RegisterScreen.textChooseTypeAccountRegisterBuyPerson'), value: Variables.TYPE_BUYER },
    ];

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        if (user) {
            let dataLoginOrRegisterByGoogle;
            if (isLogin) {
                dataLoginOrRegisterByGoogle = {
                    email: user.email,
                    emailVerified: user.emailVerified
                }
            } else {
                dataLoginOrRegisterByGoogle = {
                    name: user.displayName,
                    avatar: user.photoURL,
                    roleCode: typeAccount,
                    email: user.email,
                    emailVerified: user.emailVerified
                }
            }
            if (isLogin) {
                onPressLoginByGoogle(dataLoginOrRegisterByGoogle as SignInByGoogle)
            } else {
                onPressRegisterByGoogle(dataLoginOrRegisterByGoogle as SignUpByGoogle);
            }
            signOutForSocialAccount();
        }
    }, [user]);


    const signOutForSocialAccount = () => {
        const signOut = async () => {
            try {
                // Sign out Firebase Authentication
                await auth().signOut();
                // Sign out Google Sign-In (if had login by Google)
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
            } catch (error) {
                // Handle
            }
        };
        if (auth().currentUser) signOut();
    }

    const handleChooseItemDropdown = (item: string) => {
        hideModal();
        setTypeAccount(item);
        onGoogleButtonPress();
    }

    const handlePressGoogleButton = () => {
        if (isLogin) {
            onGoogleButtonPress();
        } else {
            showModal();
        }
    }
    return (
        <React.Fragment>
            <SpaceComponent height={verticalScale(35)} />
            <RowComponent
                alignItems='center'
                justifyContent='center'
            >
                <Divider style={styles.divider} />
                <TextComponent fontFamily={fontFamilies.Roboto_Medium} paddingHorizontal={scale(10)} text={
                    isLogin ? t("LoginScreen.textOrLoginWith") : t("RegisterScreen.textOrRegisterWith")
                } color={Colors.COLOR_GREY} />
                <Divider style={styles.divider} />
            </RowComponent>
            <SpaceComponent height={verticalScale(35)} />
            <TextButtonComponent
                iconOrImageAffix={
                    <Image source={require('../../../assets/images/data/socialLogin/Facebook.png')} />
                }
                borderWidth={1}
                borderColor={Colors.GREY_LOGIN_BY_SOCIAL}
                padding={scale(10)}
                borderRadius={5}
                backgroundColor={Colors.WHITE}
                title={<TextComponent fontSize={Variables.FONT_SIZE_BUTTON_TEXT} color={Colors.BLACK} text={
                    isLogin ? t("LoginBySocial.textLoginWithFacebook") :
                        t("RegisterBySocial.textRegisterWithFacebook")
                } />}
                onPress={() => {
                    console.log('Login with facebook')
                }}
            />
            <SpaceComponent height={verticalScale(10)} />
            <TextButtonComponent
                iconOrImageAffix={
                    <Image source={require('../../../assets/images/data/socialLogin/Google.png')} />
                }
                borderWidth={1}
                borderColor={Colors.GREY_LOGIN_BY_SOCIAL}
                padding={scale(10)}
                borderRadius={5}
                backgroundColor={Colors.WHITE}
                title={<TextComponent fontSize={Variables.FONT_SIZE_BUTTON_TEXT} color={Colors.BLACK}
                    text={
                        isLogin ? t("LoginBySocial.textLoginWithGoogle") :
                            t("RegisterBySocial.textRegisterWithGoogle")
                    }
                />}
                onPress={handlePressGoogleButton}
            />
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <>
                        <RowComponent alignItems='center' justifyContent='space-between'>
                            <TextComponent fontSize={Variables.FONT_SIZE_BUTTON_TEXT} text='Vui lòng lựa chọn vai trò đăng ký' color={Colors.BLACK} />
                            <IconButton icon={'close'} onPress={hideModal} />
                        </RowComponent>
                        <DropdownComponent
                            touched={undefined}
                            errors={undefined}
                            dropdownData={dropdownData}
                            values={undefined}
                            onSetFieldValue={() => { }}
                            onSetValue={handleChooseItemDropdown}
                        />
                    </>
                </Modal>
            </Portal>
        </React.Fragment>
    );
};

export default memo(SocialLoginComponent);



// import { View, Text } from 'react-native'
// import React from 'react'
// import { Button } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

// async function onFacebookButtonPress() {
//   // Attempt login with permissions
//   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//   if (result.isCancelled) {
//     throw 'User cancelled the login process';
//   }

//   // Once signed in, get the users AccessToken
//   const data = await AccessToken.getCurrentAccessToken();

//   if (!data) {
//     throw 'Something went wrong obtaining access token';
//   }

//   // Create a Firebase credential with the AccessToken
//   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(facebookCredential);
// }


// function FacebookSignIn() {
//   return (
//     <Button
//       title="Facebook Sign-In"
//       onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
//     />
//   );
// }

// const LoginScreen = () => {
//   return (
//     <View>
//       <Text>{FacebookSignIn()}</Text>
//     </View>
//   )
// }

// export default LoginScreen