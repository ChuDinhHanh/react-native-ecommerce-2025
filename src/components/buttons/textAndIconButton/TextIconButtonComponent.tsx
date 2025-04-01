import React, {ReactNode} from 'react';
import {
  DimensionValue,
  FlexAlignType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {globalStyles} from '../../../styles/globalStyles';
import SpaceComponent from '../../space/SpaceComponent';
import {styles} from './TextIconButtonComponent.style';

interface Props {
  title?: ReactNode;
  affix?: ReactNode;
  suffix?: ReactNode;
  spacePrevious?: number;
  spaceBehind?: number;
  onPress: () => void;
  backgroundColor?: string;
  width?: DimensionValue;
  marginVertical?: number;
  height?: DimensionValue;
  borderRadius?: number;
  type?: 'primary' | 'normal';
  isDisable?: boolean;
  boxShadow?: boolean;
  alignSelf?: 'auto' | FlexAlignType | undefined;
}
const TextIconButtonComponent = (props: Props) => {
  const {
    width,
    suffix,
    affix,
    spaceBehind,
    spacePrevious,
    title,
    onPress,
    backgroundColor,
    height,
    marginVertical,
    borderRadius,
    type,
    isDisable,
    boxShadow,
    alignSelf,
  } = props;

  return (
    <TouchableOpacity
      disabled={isDisable}
      onPress={() => onPress()}
      style={[
        globalStyles.row,
        boxShadow && globalStyles.shadow,
        styles.wrapper_content,
        {
          backgroundColor: isDisable
            ? Colors.GREY_LOGIN_BY_SOCIAL
            : backgroundColor,
          width: width ?? 'auto',
          height: height ?? 'auto',
          borderRadius,
          marginVertical,
          alignSelf,
        },
      ]}>
      {affix}
      <SpaceComponent width={spacePrevious ?? 0} />
      {title}
      <SpaceComponent width={spaceBehind ?? 0} />
      {type && type === 'primary' ? (
        <View style={{position: 'absolute', right: 14}}>{suffix}</View>
      ) : (
        suffix
      )}
    </TouchableOpacity>
  );
};

export default TextIconButtonComponent;
