import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import { Colors } from '../../constants/Colors';

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
}

const TextComponent = (props: Props) => {
    const { text, fontSize, color, fontFamily, fontWeight, textDecoration, width, paddingHorizontal } =
        props;
    const textStyle = useMemo<StyleProp<ViewStyle>>(() => {
        return {
            fontSize: fontSize ?? 15,
            color: color ?? Colors.WHITE,
            fontFamily: fontFamily,
            fontWeight,
            textDecorationLine: textDecoration ? 'line-through' : 'none',
            flexWrap: 'wrap',
            width,
            paddingHorizontal
        }
    }, [paddingHorizontal, width, textDecoration, fontFamily, Colors, fontSize]);
    return (
        <Text
            style={textStyle}>
            {text}
        </Text>
    );
};

export default TextComponent;
