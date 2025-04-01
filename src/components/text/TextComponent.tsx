import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { scale } from '../../utils/ScaleUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReadMore from '@fawazahmed/react-native-read-more';

interface Props extends TextProps {
    text: string;
    fontSize?: number;
    color?: string;
    fontFamily?: string;
    width?: number;
    fontWeight?:
    "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    textDecoration?: "line-through" | "none" | "underline" | "underline line-through";
    paddingHorizontal?: number;
    lineHeight?: number;
    customizeStyle?: StyleProp<ViewStyle>;
    readMore?: boolean;
}

const TextComponent = (props: Props) => {
    const { text, fontSize, color, fontFamily, fontWeight, textDecoration, width, paddingHorizontal, customizeStyle, numberOfLines, lineHeight, readMore } =
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
            lineHeight
        }
    }, [props]);
    return (
        <SafeAreaView>
            {
                readMore ? <ReadMore
                    seeMoreStyle={[
                        styles.seeMoreAndLessStyle,
                        { color: color ?? Colors.WHITE },
                    ]}
                    seeLessStyle={[
                        styles.seeMoreAndLessStyle,
                        { color: color ?? Colors.WHITE },
                    ]}
                    numberOfLines={numberOfLines ?? 1}
                    style={[styles.textStyle, textStyle, customizeStyle, { color: color ?? Colors.WHITE }]}>
                    {text}
                </ReadMore> : <Text
                    numberOfLines={numberOfLines}
                    style={[textStyle, customizeStyle]}>
                    {text}
                </Text>
            }


        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    root: {
        flex: 1,
    },
    textStyle: {
        fontSize: 14,
    },
    seeMoreAndLessStyle: {
        fontWeight: 'bold',
    },
});

export default TextComponent;
