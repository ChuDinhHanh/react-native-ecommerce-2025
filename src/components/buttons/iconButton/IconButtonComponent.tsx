import React, { ReactNode, useMemo, useState } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './IconButtonComponent.style';

interface IconButtonProps {
    iconName?: string;
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
    typeNoBackground?: boolean;
    icon?: ReactNode;
    badgeNumber?: number;
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
    }, [pressed, props.iconColor, props.inactiveBackgroundColor, props.activeBackgroundColor]);

    const iconColorStr = useMemo<string>(() => {
        return (
            props.iconColor ??
            (pressed
                ? props.activeIconColor ?? '#000'
                : props.inactiveIconColor ?? '#fff')
        );
    }, [pressed, props.iconColor]);


    if (props.typeNoBackground) {
        return (
            <Pressable
                onPress={props.onPress}
            >
                <View style={props.customStyle}>
                    {props.icon}
                    {
                        props.badgeNumber && <Badge style={styles.badge}>{props.badgeNumber}</Badge>
                    }
                </View>
            </Pressable>
        )
    } else {
        return <Pressable
            onPressIn={() => setPress(true)}
            onPressOut={() => setPress(false)}
            style={({ pressed }) => [props.customStyle, btnStyle]}
            onPress={props.onPress}>
            <Icon
                name={props.iconName ?? ''}
                size={props.iconSize ?? 20}
                color={iconColorStr}
                solid
            />
        </Pressable>
    }

};

export default IconButtonComponent;
