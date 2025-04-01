import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { setTranslations } from 'react-multi-lang';
import { Alert, Image, Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { Colors } from '../../constants/Colors';
import { AUTHENTICATION_STACK_NAVIGATOR } from '../../constants/Screens';
import { useAppDispatch } from '../../redux/Hooks';
import { getLanguage, loadUser } from '../../redux/userThunks';
import { RootStackParamList } from '../../routes/Routes';
import { useAuthService } from '../../services/authService';
import en from '../../translate/en.json';
import jp from '../../translate/jp.json';
import vi from '../../translate/vi.json';
import styles from './SplashScreen.style';
import FastImage from 'react-native-fast-image';

setTranslations({ vi, jp, en });

const SplashScreen = () => {
  const { handleCheckTokenAlive } = useAuthService();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getLanguage())
        .unwrap()
        .then(() => {
          handleCheckHaveAccount();
        });
    }
  }, [isFocused]);

  const handleCheckHaveAccount = async () => {
    try {
      const data = await dispatch(loadUser()).unwrap();
      if (data && isFocused) {
        await handleCheckTokenAlive(data.token, data.refreshToken);
      } else {
        navigation.replace(AUTHENTICATION_STACK_NAVIGATOR);
      }
    } catch (error) {
      Alert.alert('Cảnh báo', 'Lỗi khi tải người dùng. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container__inner}>
        <View style={styles['container__inner--content']}>
          <View>
            <FastImage
              style={styles['inner__content--image']}
              source={require('../../assets/images/logo/logoSplashScreen.png')}
            />
            <View style={styles['inner__content--text']}>
              <Text style={styles['inner__content--brand']}>SPEED</Text>
              <Text style={styles['inner__content--description']}>
                Explore new shopping method
              </Text>
            </View>
          </View>
          <View style={styles['content__rectangle--first']}>
            <Svg width={200} height={200} viewBox="0 0 200 200" fill="none">
              <Path
                d="M 0 0 L 300 300 L 0 300 Z"
                fill={Colors.GREEN_FIRST}
                opacity={0.15}
              />
            </Svg>
          </View>
          <View style={styles['content__rectangle--seconds']}>
            <Svg width={300} height={300} viewBox="0 0 300 300" fill="none">
              <Path
                d="M 0 0 L 300 300 L 0 300 Z"
                fill={Colors.GREEN_SECONDS}
                opacity={0.1}
              />
            </Svg>
          </View>
          <View style={styles['content__rectangle--third']}>
            <Svg width={300} height={300} viewBox="0 0 300 300" fill="none">
              <Path
                d="M 0 0 L 300 300 L 0 300 Z"
                fill={Colors.GREEN_THIRD}
                opacity={0.2}
              />
            </Svg>
          </View>
          <View style={styles['content__rectangle--fourth']}>
            <Svg width={200} height={200} viewBox="0 0 200 200" fill="none">
              <Path
                d="M 0 0 L 200 200 L 0 800 Z"
                fill={Colors.GREEN_SECONDS}
                opacity={0.2}
              />
            </Svg>
          </View>
          <View style={styles['content__rectangle--five']}>
            <Svg width={300} height={300} viewBox="0 0 300 300" fill="none">
              <Path
                d="M 0 0 L 300 300 L 0 300 Z"
                fill={Colors.GREEN_THIRD}
                opacity={0.2}
              />
            </Svg>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
