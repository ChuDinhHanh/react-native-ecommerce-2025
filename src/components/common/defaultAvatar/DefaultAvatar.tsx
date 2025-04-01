import React from 'react';
import {Text, View} from 'react-native';
import styles from './DefaultAvatar.style';
import {moderateScale} from '../../../utils/ScaleUtils';
import {Colors} from '../../../constants/Colors';
import TextComponent from '../../text/TextComponent';
import {SERVER_ADDRESS} from '../../../constants/System';
import FastImage from 'react-native-fast-image';

interface Props {
  name: string;
  image?: string;
  size?: number;
}

const DefaultAvatar = (props: Props) => {
  const {name, image, size} = props;
  return (
    <>
      {image ? (
        <FastImage
          source={{
            uri: image.includes('http')
              ? image
              : `${SERVER_ADDRESS}api/get/image/${image}`,
          }}
          style={[
            styles.wrapperAvatar,
            {
              width: size ?? moderateScale(65),
              height: size ?? moderateScale(65),
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.wrapperDefaultAvatar,
            {
              width: size ?? moderateScale(65),
              height: size ?? moderateScale(65),
              backgroundColor: Colors.GREY4,
            },
          ]}>
          <TextComponent text={name[0]} color={Colors.BLACK} />
        </View>
      )}
    </>
  );
};

export default DefaultAvatar;
