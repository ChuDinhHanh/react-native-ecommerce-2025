import React, {ReactNode} from 'react';
import {
  FlexAlignType,
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';

interface Props {
  alignItems?: FlexAlignType | undefined;
  children: ReactNode;
  height?: number;
  onPress?: () => void;
  marginVertical?: number;
  borderRadius?: number;
  backgroundColor?: string;
  marginHorizontal?: number;
  paddingHorizontal?: number;
  padding?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  marginLeft?: number;
  onLayout?: (event: LayoutChangeEvent, isBottom: boolean) => void;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  styles?: StyleProp<ViewStyle>;
  paddingVertical?: number;
}

const RowComponent = (props: Props) => {
  const {
    children,
    alignItems,
    justifyContent,
    onPress,
    marginVertical,
    height,
    marginLeft,
    backgroundColor,
    borderRadius,
    marginHorizontal,
    paddingHorizontal,
    padding,
    onLayout,
    flexWrap,
    styles,
    paddingVertical,
  } = props;
  const style = [
    {
      alignItems,
      justifyContent,
      marginVertical,
      height,
      marginLeft,
      backgroundColor,
      borderRadius,
      marginHorizontal,
      paddingHorizontal,
      padding,
      flexWrap,
      paddingVertical,
    },
    globalStyles.row,
    styles,
  ];
  return (
    <React.Fragment>
      {onPress ? (
        <Pressable style={style} onPress={onPress}>
          {children}
        </Pressable>
      ) : (
        <View
          onLayout={onLayout ? event => onLayout(event, false) : undefined}
          style={style}>
          {children}
        </View>
      )}
    </React.Fragment>
  );
};

export default RowComponent;
