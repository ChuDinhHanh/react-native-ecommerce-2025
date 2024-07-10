import React, { ReactNode, useMemo } from 'react';
import { FlexAlignType, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './TextButtonComponent.style';

type Props = {
    title: ReactNode;
    onPress: () => void;
    alignSelf?: "auto" | FlexAlignType | undefined;
    marginVertical?: number;
    backgroundColor?: string;
    padding?: number;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    iconOrImageAffix?: ReactNode;
}

export default function TextButtonComponent(props: Readonly<Props>) {

    const btnStyle = useMemo<StyleProp<ViewStyle>>(() => {
        return [
            {
                marginVertical: props.marginVertical,
                alignSelf: props.alignSelf,
                backgroundColor: props.backgroundColor,
                borderRadius: props.borderRadius,
                padding: props.padding,
                borderWidth: props.borderWidth,
                borderColor: props.borderColor
            }
        ];
    }, [props.alignSelf, props.marginVertical, props.borderRadius, props.padding, props.borderWidth, props.borderColor]);

    return (
        <Pressable
            style={[btnStyle, styles.container]}
            onPress={props.onPress}>
            {
                Boolean(props.iconOrImageAffix) && <View style={styles.container__icon}>
                    {
                        props.iconOrImageAffix
                    }
                </View>
            }
            {
                props.title
            }
        </Pressable>
    )
}