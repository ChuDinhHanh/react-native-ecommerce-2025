import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import ContainerComponent from '../../../components/container/ContainerComponent'
import SessionComponent from '../../../components/session/SessionComponent'
import SpaceComponent from '../../../components/space/SpaceComponent'
import { Colors } from '../../../constants/Colors'
import { MessengerData } from '../../../data/CommonData'
import InputMessengerScreenComponent from '../component/input/InputMessengerScreenComponent'
import ConversationItemComponent from '../component/item/ConversationItemComponent'
import { styles } from './ConversationScreen.style'

const ConversationScreen = () => {
  return (
    <ContainerComponent backgroundColor={Colors.WHITE} isFull>
      <SessionComponent paddingNotTop={true}>
        <FlatList
          style={styles['container__session--flatList']}
          ListHeaderComponent={() => (
            <>
              <ActivityIndicator size="small" color={Colors.BLACK} />
              <SpaceComponent height={60} />
            </>
          )}
          ListFooterComponent={() => (
            <ActivityIndicator size="small" color={Colors.BLACK} />
          )}
          showsVerticalScrollIndicator={false}
          data={[...MessengerData].sort((a, b) => b.id - a.id)}
          keyExtractor={item => item.id.toString()}
          inverted
          renderItem={({ item, index }) => <ConversationItemComponent item={item} />}
        />
      </SessionComponent>
      {/* Input */}
      <InputMessengerScreenComponent
        placeholder={'Gửi tin nhắn'}
      />
    </ContainerComponent>
  )
}

export default ConversationScreen