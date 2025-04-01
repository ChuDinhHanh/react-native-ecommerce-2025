import React, {memo} from 'react';
import {useTranslation} from 'react-multi-lang';
import {ImageSourcePropType, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import RowComponent from '../../../../../components/row/RowComponent';
import SpaceComponent from '../../../../../components/space/SpaceComponent';
import TextComponent from '../../../../../components/text/TextComponent';
import {Colors} from '../../../../../constants/Colors';
import {NotificationItem} from '../../../../../types/response/NotificationItem';
import {moderateScale} from '../../../../../utils/ScaleUtils';
import {styles} from './NotificationItemComponent.style';
import FastImage, {Source} from 'react-native-fast-image';

interface Props {
  id: number;
  notificationId: string;
  image: number | Source | undefined;
  title: string;
  content?: string;
  timeCreated: string;
  onPress: (item?: NotificationItem) => void;
  isRead: boolean;
  onPressMenuItem: (notificationId: string) => void;
}

const NotificationItemComponent = (props: Props) => {
  const t = useTranslation();
  const {
    content,
    id,
    image,
    timeCreated,
    title,
    onPress,
    isRead,
    onPressMenuItem,
    notificationId,
  } = props;

  return (
    <RowComponent
      alignItems="center"
      onPress={() => onPress()}
      backgroundColor={isRead ? undefined : Colors.WHITE}
      padding={15}
      justifyContent="space-between">
      {/* Left */}
      <View>
        <View style={styles['container__left']}>
          <FastImage style={styles['container__left--image']} source={image} />
          {isRead && <View style={styles['container__left--overlay']} />}
        </View>
      </View>
      <SpaceComponent width={moderateScale(10)} />
      {/* Center */}
      <View style={styles.container__center}>
        {/* Title */}
        <TextComponent
          numberOfLines={2}
          text={title}
          color={isRead ? Colors.GREY1 : Colors.BLACK}
          fontWeight="bold"
        />
        <SpaceComponent height={moderateScale(2)} />
        {content && (
          <TextComponent
            numberOfLines={3}
            text={content}
            color={Colors.GREY1}
          />
        )}
        <SpaceComponent height={moderateScale(2)} />
        <TextComponent
          numberOfLines={3}
          text={timeCreated}
          color={Colors.GREY1}
        />
      </View>
      {/* Right */}
      <View>
        <Menu>
          <MenuTrigger>
            <Entypo
              style={styles['container__right--icon']}
              name="dots-three-vertical"
              size={moderateScale(15)}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              style={styles['right__icon--item']}
              onSelect={() => onPressMenuItem(notificationId)}>
              <TextComponent
                text={t('NotificationScreen.delete')}
                color={Colors.RED}
              />
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </RowComponent>
  );
};

export default memo(NotificationItemComponent);
