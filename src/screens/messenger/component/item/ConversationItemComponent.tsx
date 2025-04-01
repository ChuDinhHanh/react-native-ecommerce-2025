import React from 'react';
import { View } from 'react-native';
import DefaultAvatar from '../../../../components/common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../../../components/row/RowComponent';
import TextComponent from '../../../../components/text/TextComponent';
import { Colors } from '../../../../constants/Colors';
import { moderateScale } from '../../../../utils/ScaleUtils';
import { styles } from './ConversationItemComponent.style';

interface Props {
    item: any
}
const ConversationItemComponent = (props: Props) => {
    const { item } = props;
    return (
        <>
            {
                item.isSender ? (
                    <RowComponent justifyContent='space-between' paddingVertical={moderateScale(5)}>
                        <View style={styles.wrapper_messenger}>
                            <View style={styles.wrapper_messenger_tier1_not_sender}>
                                <View style={[styles.wrapper_messenger_Tier2, styles['your__wrapper--messenger']]}>
                                    <TextComponent text={item.messenger} color={Colors.WHITE} />
                                </View>
                            </View>
                        </View>
                        {/* Avatar */}
                        <View style={styles.wrapper_avatar}>
                            <DefaultAvatar size={moderateScale(40)} name={item.user.name} image={item.user.url} />
                        </View>
                    </RowComponent>
                ) : (
                    <RowComponent justifyContent='space-between' paddingVertical={moderateScale(5)}>
                        {/* Avatar */}
                        <View style={styles.wrapper_avatar}>
                            <DefaultAvatar size={moderateScale(40)} name={item.user.name} image={item.user.url} />
                        </View>
                        {/* Content */}
                        <View style={styles.wrapper_messenger}>
                            <View style={styles.wrapper_messenger_tier1_is_sender}>
                                <View style={[styles.wrapper_messenger_Tier2, styles['another__wrapper--messenger']]}>
                                    <TextComponent text={item.messenger} color={Colors.BLACK} />
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