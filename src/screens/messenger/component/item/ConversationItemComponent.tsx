import React from 'react';
import { View } from 'react-native';
import DefaultAvatar from '../../../../components/common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../../../components/row/RowComponent';
import TextComponent from '../../../../components/text/TextComponent';
import { Colors } from '../../../../constants/Colors';
import { useAppSelector } from '../../../../redux/Hooks';
import { GetMessageByCodeResponse } from '../../../../types/response/GetMessageByCodeResponse';
import { moderateScale } from '../../../../utils/ScaleUtils';
import { styles } from './ConversationItemComponent.style';

interface Props {
    item: GetMessageByCodeResponse;
}
const ConversationItemComponent = (props: Props) => {
    const { item } = props;
    const email = useAppSelector((state) => state.SpeedReducer.userLogin?.email) ?? "";
    return (
        <>
            {
                item.sender.username !== email ? (
                    <RowComponent alignItems='center' justifyContent='space-between' paddingVertical={moderateScale(5)}>
                        <View style={styles.wrapper_messenger}>
                            <View style={styles.wrapper_messenger_tier1_not_sender}>
                                <View style={[styles.wrapper_messenger_Tier2, styles['your__wrapper--messenger']]}>
                                    <TextComponent text={item.text} color={Colors.WHITE} />
                                </View>
                            </View>
                        </View>
                        {/* Avatar */}
                        <View style={styles.wrapper_avatar}>
                            <DefaultAvatar size={moderateScale(35)} name={item.receiver.name} image={item.receiver.avatar ?? ""} />
                        </View>
                    </RowComponent>
                ) : (
                    <RowComponent alignItems='center' justifyContent='space-between' paddingVertical={moderateScale(5)}>
                        {/* Avatar */}
                        <View style={styles.wrapper_avatar}>
                            <DefaultAvatar size={moderateScale(40)} name={item.receiver.name} image={item.receiver.avatar ?? ""} />
                        </View>
                        {/* Content */}
                        <View style={styles.wrapper_messenger}>
                            <View style={styles.wrapper_messenger_tier1_is_sender}>
                                <View style={[styles.wrapper_messenger_Tier2, styles['another__wrapper--messenger']]}>
                                    <TextComponent text={item.text} color={Colors.BLACK} />
                                </View>
                            </View>
                        </View>
                    </RowComponent>
                )
            }
        </ >
    )
}

export default ConversationItemComponent