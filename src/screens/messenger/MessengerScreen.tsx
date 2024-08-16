import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useMemo } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import DefaultAvatar from '../../components/common/defaultAvatar/DefaultAvatar'
import RowComponent from '../../components/row/RowComponent'
import SessionComponent from '../../components/session/SessionComponent'
import TextComponent from '../../components/text/TextComponent'
import { Colors } from '../../constants/Colors'
import { CONVERSATION_SCREEN, SERVICE_STACK_NAVIGATOR } from '../../constants/Screens'
import { Variables } from '../../constants/Variables'
import { useLazyGetBoxChatsQuery } from '../../redux/Service'
import { RootStackParamList } from '../../routes/Routes'
import { moderateScale } from '../../utils/ScaleUtils'
import { useAppSelector } from '../../redux/Hooks'
import MessageSkeletonComponent from '../../components/skeletons/message/MessageSkeletonComponent'

const MessengerScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [getChatBox, { data, error, isError, isSuccess, isLoading, isFetching }] = useLazyGetBoxChatsQuery();
  const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";

  const handlePressIntoConversation = (boxChatCode: string, senderEmail: string) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: CONVERSATION_SCREEN,
      params: { code: boxChatCode, senderEmail: senderEmail }
    } as any)
  }

  useEffect(() => {
    const getChatBoxAction = async () => {
      try {
        await getChatBox({ token: token });
      } catch (error) {
        // Handle
      }
    }
    getChatBoxAction();
  }, []);

  const handlePrintfChatBox = useMemo(() => (
    <FlatList
      extraData={data?.data ?? []}
      data={data?.data ?? []}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => handlePressIntoConversation(item.code, item.sender.username)}>
          <SessionComponent paddingVertical={10} backgroundColor='white'>
            <RowComponent justifyContent='space-between' alignItems='center'>
              {/* Avatar */}
              <DefaultAvatar size={moderateScale(50)} name={item.sender.name ?? item.sender.username} />
              {/* Name and messenger */}
              <View style={{ flex: 1, paddingLeft: 10, paddingRight: 16 }}>
                <TextComponent fontWeight='bold' numberOfLines={1} color={item.countMessNotRead ? Colors.BLACK : Colors.GREY1} text={item.sender.name ?? item.sender.username} />
                <TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} numberOfLines={1} color={item.countMessNotRead ? Colors.COLOR_BTN_BLUE_PRIMARY : Colors.GREY1} text={item.lastMessage} />
              </View>
              {
                Boolean(item.countMessNotRead) && <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.RED,
                    borderRadius: 20
                  }}
                >
                  <Text style={{ color: Colors.WHITE }}>{item.countMessNotRead}</Text>
                </View>
              }
            </RowComponent>
          </SessionComponent>
          <Divider />
        </Pressable>
      )}
    />
  ), [data])

  return (
    <>
      {
        isLoading
          ?
          <MessageSkeletonComponent />
          :
          handlePrintfChatBox
      }
    </>
  )
}

export default MessengerScreen