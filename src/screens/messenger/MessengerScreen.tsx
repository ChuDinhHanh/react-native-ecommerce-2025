import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, FlatList, Pressable, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import DefaultAvatar from '../../components/common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import MessageSkeletonComponent from '../../components/skeletons/message/MessageSkeletonComponent';
import TextComponent from '../../components/text/TextComponent';
import {Colors} from '../../constants/Colors';
import {
  CONVERSATION_SCREEN,
  SERVICE_STACK_NAVIGATOR,
} from '../../constants/Screens';
import {Variables} from '../../constants/Variables';
import {useAppSelector} from '../../redux/Hooks';
import {useLazyGetBoxChatsQuery} from '../../redux/Service';
import {RootStackParamList} from '../../routes/Routes';
import {useAuthService} from '../../services/authService';
import {moderateScale} from '../../utils/ScaleUtils';
import {styles} from './MessengerScreen.style';
import NothingComponent from '../../components/banner/nothing/NothingComponent';

const MessengerScreen = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [getChatBox, {data, error, isError, isSuccess, isLoading, isFetching}] =
    useLazyGetBoxChatsQuery();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const {handleCheckTokenAlive} = useAuthService();
  const isFocused = useIsFocused();
  const {language} = useAppSelector(state => state.SpeedReducer);
  const handlePressIntoConversation = (
    boxChatCode: string,
    senderEmail: string,
  ) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: CONVERSATION_SCREEN,
      params: {code: boxChatCode, senderEmail: senderEmail},
    } as any);
  };

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        getChatBoxAction();
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

  const getChatBoxAction = async () => {
    try {
      await getChatBox({token: token});
    } catch (error) {
      // Handle error
    }
  };
  useEffect(() => {
    getChatBoxAction();
  }, []);

  const handlePrintfChatBox = useMemo(
    () =>
      data?.data.length ? (
        <FlatList
          extraData={data?.data ?? []}
          data={data?.data ?? []}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() =>
                handlePressIntoConversation(item.code, item.sender.username)
              }>
              <SessionComponent paddingVertical={10} backgroundColor="white">
                <RowComponent
                  justifyContent="space-between"
                  alignItems="center">
                  <DefaultAvatar
                    size={moderateScale(50)}
                    name={item.sender.name ?? item.sender.username}
                  />
                  <View style={styles.messageContainer}>
                    <TextComponent
                      fontWeight="bold"
                      numberOfLines={1}
                      color={
                        item.countMessNotRead ? Colors.BLACK : Colors.GREY1
                      }
                      text={item.sender.name ?? item.sender.username}
                    />
                    <TextComponent
                      fontSize={Variables.FONT_SIZE_ERROR_TEXT}
                      numberOfLines={1}
                      color={
                        item.countMessNotRead
                          ? Colors.COLOR_BTN_BLUE_PRIMARY
                          : Colors.GREY1
                      }
                      text={item.lastMessage}
                    />
                  </View>
                  {Boolean(item.countMessNotRead) && (
                    <View style={styles.unreadCountContainer}>
                      <Text style={styles.unreadCountText}>
                        {item.countMessNotRead}
                      </Text>
                    </View>
                  )}
                </RowComponent>
              </SessionComponent>
              <Divider />
            </Pressable>
          )}
        />
      ) : (
        <NothingComponent title={t('ChatBoxScreen.nothingTitle')} />
      ),
    [data, t],
  );

  return <>{isLoading ? <MessageSkeletonComponent /> : handlePrintfChatBox}</>;
};

export default MessengerScreen;
