import React, { memo } from 'react'
import { Image, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import Entypo from 'react-native-vector-icons/Entypo'
import RowComponent from '../../../../../components/row/RowComponent'
import SpaceComponent from '../../../../../components/space/SpaceComponent'
import TextComponent from '../../../../../components/text/TextComponent'
import { Colors } from '../../../../../constants/Colors'
import { moderateScale } from '../../../../../utils/ScaleUtils'
import { styles } from './NotificationItemComponent.style'

interface Props {
    id: number;
    image: string;
    title: string;
    content: string;
    timeCreated: string;
    onPress: (id: number) => void;
    isRead: boolean;
    onPressMenuItem: (id: number) => void;
}

const NotificationItemComponent = (props: Props) => {
    const { content, id, image, timeCreated, title, onPress, isRead, onPressMenuItem } = props;
    return (
        <RowComponent onPress={() => onPress(id)} backgroundColor={isRead ? undefined : Colors.WHITE} padding={15} justifyContent='space-between'>
            {/* Left */}
            <View>
                <View
                    style={styles['container__left']}
                >
                    <Image
                        style={styles['container__left--image']}
                        source={{ uri: image }}
                    />
                    {
                        isRead && <View
                            style={styles['container__left--overlay']}
                        />
                    }
                </View>
            </View>
            <SpaceComponent width={moderateScale(10)} />
            {/* Center */}
            <View style={styles.container__center}>
                {/* Title */}
                <TextComponent numberOfLines={2} text={title} color={isRead ? Colors.GREY1 : Colors.BLACK} fontWeight='bold' />
                <SpaceComponent height={moderateScale(2)} />
                <TextComponent
                    numberOfLines={3}
                    text={content} color={Colors.GREY1} />
                <SpaceComponent height={moderateScale(2)} />
                <TextComponent
                    numberOfLines={3}
                    text={timeCreated} color={Colors.GREY1} />
            </View>
            {/* Right */}
            <View>
                <Menu>
                    <MenuTrigger>
                        <Entypo
                            style={styles['container__right--icon']}
                            name='dots-three-vertical'
                            size={moderateScale(15)}
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption style={styles['right__icon--item']} onSelect={() => onPressMenuItem(1)} >
                            <TextComponent text='Đánh dấu đã đọc' color={Colors.BLACK} />
                        </MenuOption>
                        <Divider />
                        <MenuOption style={styles['right__icon--item']} onSelect={() => onPressMenuItem(2)} >
                            <TextComponent text='Đánh dấu chưa đọc' color={Colors.BLACK} />
                        </MenuOption>
                        <Divider />
                        <MenuOption style={styles['right__icon--item']} onSelect={() => onPressMenuItem(3)} >
                            <TextComponent text='Xóa' color={Colors.RED} />
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </RowComponent>
    )
}
export default memo(NotificationItemComponent)