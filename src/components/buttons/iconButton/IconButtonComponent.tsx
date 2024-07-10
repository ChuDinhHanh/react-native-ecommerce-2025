import { View, Text, StyleProp, ViewStyle, Pressable } from 'react-native';
import React, { useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface IconButtonProps {
    iconName: string;
    iconColor?: string;
    iconSize?: number;
    onPress: () => void;
    activeBackgroundColor?: string;
    inactiveBackgroundColor?: string;
    activeIconColor?: string;
    inactiveIconColor?: string;
    customStyle?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
    borderRadius?: number;
}

const IconButtonComponent = (props: IconButtonProps) => {
    const [pressed, setPress] = useState<boolean>(false);
    const btnStyle = useMemo<StyleProp<ViewStyle>>(() => {
        return {
            alignItems: 'center',
            justifyContent: 'center',
            width: props.width ?? 42,
            height: props.height ?? 42,
            borderRadius: props.borderRadius ?? 999,
            backgroundColor: pressed
                ? props.activeBackgroundColor ?? '#fff'
                : props.inactiveBackgroundColor ?? '#000',
        };
    }, [pressed, props.iconColor]);

    const iconColorStr = useMemo<string>(() => {
        return (
            props.iconColor ??
            (pressed
                ? props.activeIconColor ?? '#000'
                : props.inactiveBackgroundColor ?? '#fff')
        );
    }, [pressed, props.iconColor]);

    return (
        <Pressable
            onPressIn={() => setPress(true)}
            onPressOut={() => setPress(false)}
            style={({ pressed }) => [props.customStyle, btnStyle]}
            onPress={props.onPress}>
            <Icon
                name={props.iconName}
                size={props.iconSize ?? 20}
                color={iconColorStr}
                solid
            />

        </Pressable>
    );
};

export default IconButtonComponent;
