import React, { useMemo } from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { scale } from '../../utils/ScaleUtils';

interface Props {
    text: string;
    fontSize?: number;
    color?: string;
    fontFamily?: string;
    width?: number;
    fontWeight?:
    "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    textDecoration?: "line-through" | "none" | "underline" | "underline line-through";
    paddingHorizontal?: number;
    customizeStyle?: StyleProp<ViewStyle>
}

const TextComponent = (props: Props) => {
    const { text, fontSize, color, fontFamily, fontWeight, textDecoration, width, paddingHorizontal, customizeStyle } =
        props;
    const textStyle = useMemo<StyleProp<ViewStyle>>(() => {
        return {
            fontSize: fontSize ?? scale(15),
            color: color ?? Colors.WHITE,
            fontFamily: fontFamily,
            fontWeight,
            textDecorationLine: textDecoration ? 'line-through' : 'none',
            flexWrap: 'wrap',
            width,
            paddingHorizontal,
        }
    }, [props]);
    return (
        <Text
            style={[textStyle, customizeStyle]}>
            {text}
        </Text>
    );
};

export default TextComponent;
