import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ScrollView } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import ContainerComponent from '../../../components/container/ContainerComponent'
import SessionComponent from '../../../components/session/SessionComponent'
import { Colors } from '../../../constants/Colors'
import { useAppSelector } from '../../../redux/Hooks'
import { useCreateNewMessageMutation, useLazyGetMessageByCodeQuery } from '../../../redux/Service'
import { RootStackParamList } from '../../../routes/Routes'
import { CreateNewMessageRequest } from '../../../types/request/CreateNewMessageRequest'
import InputMessengerScreenComponent from '../component/input/InputMessengerScreenComponent'
import ConversationItemComponent from '../component/item/ConversationItemComponent'
import { styles } from './ConversationScreen.style'

const ConversationScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "CONVERSATION_SCREEN">>();
  const code = route.params.code;
  const senderEmail = route.params.senderEmail;
  const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
  const [getMessageByCode, { data, isError, isFetching, isLoading, isSuccess, error }] = useLazyGetMessageByCodeQuery();
  const [createNewMessage, { data: dataCreateNewMessage, isError: isErrorCreateNewMessage, isLoading: isLoadingCreateNewMessage, isSuccess: isSuccessCreateNewMessage, error: errorCreateNewMessage }] = useCreateNewMessageMutation();
  const userLogin = useAppSelector((state) => state.SpeedReducer.userLogin);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getMessageByCodeQueryAction = async () => {
      try {
        console.log({ code: code, token: token });
        getMessageByCode({ code: code, token: token });
      } catch (error) {
        // Handle
      }
    }
    code && token && getMessageByCodeQueryAction();
  }, [code, token]);

  const handleSendMessageAction = (content: string) => {
    const createNewMessageAction = async () => {
      try {
        const data: CreateNewMessageRequest = {
          sender: senderEmail,
          message: content
        };
        await createNewMessage({ data: data, token: token });
      } catch (error) {
        // Handle
        Alert.alert("Error", 'khong gui tin nhan duoc');
      }
    }
    userLogin?.email && token && createNewMessageAction();
  }

  // useEffect(() => {
  //   if (data) {

  //   }
  //   if (isError) {
  //     console.log('===============isError=====================');
  //     console.log(JSON.stringify(isError));
  //     console.log('====================================');
  //   }
  // }, [isError, isLoading, isSuccess]);

  // Socket

  // useEffect(() => {
  //   const socket = io('https://64e61d2a09e64530d17f9bb8.mockapi.io/account');

  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   socket.on('message', (data) => {
  //     console.log('Received message:', data);
  //     setConverstation(data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // const sendMessage = () => {
  //   const socket = io('http://your-server-ip-address:3000');
  //   socket.emit('sendMessage', 'Tin nhắn từ client'); // Thay 'sendMessage' bằng tên sự kiện bạn muốn sử dụng
  // };


  return (
    <ContainerComponent backgroundColor={Colors.WHITE} isFull>
      <SessionComponent paddingNotTop={true}>
        <FlatList
          contentContainerStyle={{ paddingVertical: verticalScale(50) }}
          style={styles['container__session--flatList']}
          showsVerticalScrollIndicator={false}
          data={data?.data ?? []}
          keyExtractor={item => item.id.toString()}
          inverted
          renderItem={({ item, index }) => <ConversationItemComponent item={item} />}
        />
      </SessionComponent>
      {/* Input */}
      <InputMessengerScreenComponent
        placeholder={'Gửi tin nhắn'}
        onSubmit={handleSendMessageAction}
        isLoading={isLoadingCreateNewMessage}
      />
    </ContainerComponent>
  )
}

export default ConversationScreen