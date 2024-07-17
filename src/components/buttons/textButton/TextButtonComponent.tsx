import React, { ReactNode, useMemo } from 'react';
import { ActivityIndicator, FlexAlignType, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { styles } from './TextButtonComponent.style';
import SpaceComponent from '../../space/SpaceComponent';

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
    disabled?: boolean;
    paddingVertical?: number;
    paddingHorizontal?: number;
    iconOrImageSuffix?: ReactNode;
    isLoading?: boolean;
    ActivityIndicatorSize?: number,
    ActivityIndicatorColor?: string
}

export default function TextButtonComponent(props: Readonly<Props>) {

    const btnStyle = useMemo<StyleProp<ViewStyle>>(() => {
        return [
            {
                marginVertical: props.marginVertical,
                alignSelf: props.alignSelf,
                backgroundColor: props.disabled ? Colors.GREY1 : props.backgroundColor,
                borderRadius: props.borderRadius,
                padding: props.padding,
                borderWidth: props.borderWidth,
                borderColor: props.borderColor,
                paddingVertical: props.paddingVertical,
                paddingHorizontal: props.paddingHorizontal
            }
        ];
    }, [props.alignSelf, props.marginVertical, props.borderRadius, props.padding, props.borderWidth, props.borderColor, props.disabled]);

    return (
        <Pressable
            disabled={props.disabled ?? false}
            style={[btnStyle, styles.container]}
            onPress={props.onPress}>
            {
                (Boolean(props.iconOrImageAffix) || props.isLoading) && <View style={styles['container__icon--left']}>
                    {
                        props.iconOrImageAffix
                    }
                    {
                        props.isLoading && <ActivityIndicator size={props.ActivityIndicatorSize ?? 25} color={props.ActivityIndicatorColor ?? Colors.WHITE} />
                    }
                </View>
            }
            {
                props.title
            }
            {
                Boolean(props.iconOrImageSuffix) && <View style={styles['container__icon--right']}>
                    {
                        props.iconOrImageSuffix
                    }
                </View>
            }
        </Pressable>
    )
}