import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, Text} from 'react-native';
import ContainerComponent from '../../../components/container/ContainerComponent';
import {Colors} from '../../../constants/Colors';
import {SERVER_SOCKET} from '../../../constants/System';
import {Variables} from '../../../constants/Variables';
import {useAppSelector} from '../../../redux/Hooks';
import {
  useCreateNewMessageMutation,
  useLazyGetMessageByCodeQuery,
} from '../../../redux/Service';
import {RootStackParamList} from '../../../routes/Routes';
import {useAuthService} from '../../../services/authService';
import SessionComponent from '../../../components/session/SessionComponent';
import ConversationSkeletonItem from '../../../components/skeletons/conversation/item/ConversationSkeletonItem';
import {FlatList} from 'react-native';
import ConversationItemComponent from '../component/item/ConversationItemComponent';
import InputMessengerScreenComponent from '../component/input/InputMessengerScreenComponent';
import {styles} from './ConversationScreen.style';

const ConversationScreen = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, 'CONVERSATION_SCREEN'>>();
  const code = route.params.code;
  const senderEmail = route.params.senderEmail;
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const [
    getMessageByCode,
    {data, isError, isFetching, isLoading, isSuccess, error},
  ] = useLazyGetMessageByCodeQuery();
  const [createNewMessage, {isLoading: isLoadingCreateNewMessage}] =
    useCreateNewMessageMutation();
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const {handleCheckTokenAlive} = useAuthService();
  const isFocused = useIsFocused();
  const t = useTranslation();

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        return;
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        Alert.alert(
          t('ConversationScreen.alertWarning'),
          t('ConversationScreen.alertSystemError'),
        );
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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await getMessageByCode({code, token});
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    code && token && fetchMessages();
  }, [code, token, refreshToken]);

  useEffect(() => {
    if (data) {
      setReceivedMessages(data?.data);
    }
  }, [data]);

  useEffect(() => {
    const setupWebSocket = async () => {
      try {
        const ws = new WebSocket(`ws://${SERVER_SOCKET}ws/chat/${code}`);
        ws.onopen = () => {
          console.log('WebSocket connection established');
          setSocket(ws);
        };

        ws.onmessage = event => {
          try {
            const data = JSON.parse(event.data);
            setReceivedMessages(prevMessages => [...prevMessages, data]);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };

        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };

        return () => {
          ws.close();
        };
      } catch (error) {
        console.error('Error setting up WebSocket:', error);
      }
    };

    setupWebSocket();
  }, [code, token, refreshToken]);

  const sendMessage = (message: string) => {
    if (socket && message.trim()) {
      const data = {
        receiver: senderEmail,
        message,
        username: token,
      };
      socket.send(JSON.stringify(data));
      setMessage('');
    } else {
      Alert.alert(
        t('ConversationScreen.alertWarning'),
        t('ConversationScreen.errorNoSocketConnection'),
      );
    }
  };

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE}>
      <SessionComponent paddingNotTop={true}>
        {isLoading && <ConversationSkeletonItem />}
        <FlatList
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          data={receivedMessages ?? []}
          inverted
          renderItem={({item, index}) => (
            <ConversationItemComponent item={item} />
          )}
        />
      </SessionComponent>
      <InputMessengerScreenComponent
        placeholder={t('ConversationScreen.sendPlaceholder')}
        onSubmit={sendMessage}
        isLoading={isLoadingCreateNewMessage}
      />
    </ContainerComponent>
  );
};

export default ConversationScreen;
