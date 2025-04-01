import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import SessionComponent from '../../components/session/SessionComponent'
import RowComponent from '../../components/row/RowComponent'
import DefaultAvatar from '../../components/common/defaultAvatar/DefaultAvatar'
import TextComponent from '../../components/text/TextComponent'
import { MessengerData } from '../../data/MessengerData'
import { moderateScale } from '../../utils/ScaleUtils'
import { Divider } from 'react-native-paper'
import { Colors } from '../../constants/Colors'
import { Variables } from '../../constants/Variables'

const MessengerScreen = () => {
  return (
    <FlatList
      extraData={MessengerData}
      data={MessengerData}
      renderItem={({ item, index }) => (
        <View>
          <SessionComponent paddingVertical={10} backgroundColor='white'>
            <RowComponent justifyContent='space-between' alignItems='center'>
              {/* Avatar */}
              <DefaultAvatar size={moderateScale(60)} name={'Hanh'} />
              {/* Name and messenger */}
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <TextComponent fontWeight='bold' numberOfLines={1} color={Colors.BLACK} text={item.name} />
                <TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} numberOfLines={1} color={Colors.BLACK} text={item.newMesseger} />
              </View>
              {/* Time */}
              <TextComponent numberOfLines={1} color={Colors.BLACK} text={item.timeSend} />
            </RowComponent>
          </SessionComponent>
          <Divider />
        </View>
      )}
    />
  )
}

export default MessengerScreen