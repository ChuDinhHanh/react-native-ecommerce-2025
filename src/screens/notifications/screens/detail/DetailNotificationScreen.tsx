import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
import ContainerComponent from '../../../../components/container/ContainerComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {RootStackParamList} from '../../../../routes/Routes';
import {verticalScale} from '../../../../utils/ScaleUtils';
import {useNotificationHadReadMutation} from '../../../../redux/Service';
import {useAppSelector} from '../../../../redux/Hooks';
import {Alert} from 'react-native';
import {useTranslation} from 'react-multi-lang';
import {useAuthService} from '../../../../services/authService';

const DetailNotificationScreen = () => {
  const {handleCheckTokenAlive} = useAuthService();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const t = useTranslation();
  const route =
    useRoute<RouteProp<RootStackParamList, 'DETAIL_NOTIFICATION_SCREEN'>>();
  const [notificationHadRead, {data, isError, isLoading, isSuccess, error}] =
    useNotificationHadReadMutation();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const item = route.params?.item;
  const isFocused = useIsFocused();

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        handleNotificationHadReadAction();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        Alert.alert(t('Alert.warning'), t('Alert.systemError'));
      }
    }
  }, [
    isError,
    isFocused,
    error,
    token,
    refreshToken,
    handleCheckTokenAlive,
    t,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  const handleNotificationHadReadAction = async () => {
    await notificationHadRead({notificationId: item.id, token: token});
  };

  useEffect(() => {
    token && item.id && handleNotificationHadReadAction();
  }, [item]);

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE} isScrollEnable>
      <SessionComponent>
        <TextComponent color={Colors.BLACK} text={item.createdAt} />
        <SpaceComponent height={verticalScale(16)} />
        <TextComponent
          color={Colors.BLACK}
          fontSize={Variables.FONT_SIZE_SUBTITLE}
          text={item.message}
        />
      </SessionComponent>
    </ContainerComponent>
  );
};

export default DetailNotificationScreen;
