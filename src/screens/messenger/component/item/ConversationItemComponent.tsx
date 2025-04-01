import React from 'react';
import {Text, View} from 'react-native';
import DefaultAvatar from '../../../../components/common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../../../components/row/RowComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {GetMessageByCodeResponse} from '../../../../types/response/GetMessageByCodeResponse';
import {moderateScale} from '../../../../utils/ScaleUtils';
import {styles} from './ConversationItemComponent.style';
import {useAppSelector} from '../../../../redux/Hooks';

interface Props {
  item: GetMessageByCodeResponse;
}
const ConversationItemComponent = (props: Props) => {
  const {item} = props;
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
  return (
    <>
      {item.sender.username === userLogin?.email ? (
        <RowComponent
          justifyContent="space-between"
          paddingVertical={moderateScale(5)}>
          <View style={styles.wrapper_messenger}>
            <View style={styles.wrapper_messenger_tier1_not_sender}>
              <View
                style={[
                  styles.wrapper_messenger_Tier2,
                  styles['your__wrapper--messenger'],
                ]}>
                <TextComponent text={item.text} color={Colors.WHITE} />
              </View>
            </View>
          </View>
          {/* Avatar */}
          <View style={styles.wrapper_avatar}>
            <DefaultAvatar
              size={moderateScale(40)}
              name={item.sender.name ?? item.sender.username}
              image={item.sender.avatar ?? ''}
            />
          </View>
        </RowComponent>
      ) : (
        <RowComponent
          justifyContent="space-between"
          paddingVertical={moderateScale(5)}>
          {/* Avatar */}
          <View style={styles.wrapper_avatar}>
            <DefaultAvatar
              size={moderateScale(40)}
              name={item.sender.name ?? item.sender.username}
              image={item.sender.avatar ?? ''}
            />
          </View>
          {/* Content */}
          <View style={styles.wrapper_messenger}>
            <View style={styles.wrapper_messenger_tier1_is_sender}>
              <View
                style={[
                  styles.wrapper_messenger_Tier2,
                  styles['another__wrapper--messenger'],
                ]}>
                <TextComponent text={item.text} color={Colors.BLACK} />
              </View>
            </View>
          </View>
        </RowComponent>
      )}
    </>
  );
};

export default ConversationItemComponent;
