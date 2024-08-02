import React, { ReactNode, useMemo } from 'react';
import { ActivityIndicator, DimensionValue, FlexAlignType, Pressable, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors } from '../../../constants/Colors';
import SpaceComponent from '../../space/SpaceComponent';
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
    disabled?: boolean;
    paddingVertical?: number;
    paddingHorizontal?: number;
    iconOrImageSuffix?: ReactNode;
    isLoading?: boolean;
    ActivityIndicatorSize?: number,
    ActivityIndicatorColor?: string,
    isTextFixed?: boolean;
    spaceAffix?: number;
    spaceSuffix?: number;
    typeVertical?: boolean;
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | undefined;
    alignItems?: FlexAlignType | undefined;
    marginHorizontal?: number;
    marginRight?: number;
}

export default function TextButtonComponent(props: Readonly<Props>) {

    const btnStyle = useMemo<StyleProp<ViewStyle>>(() => {
        return [
            {
                marginVertical: props.marginVertical,
                alignSelf: props.alignSelf,
                backgroundColor: props.disabled ? Colors.COLOR_GREY_FEEBLE : props.backgroundColor,
                borderRadius: props.borderRadius,
                padding: props.padding,
                borderWidth: props.borderWidth,
                borderColor: props.borderColor,
                paddingVertical: props.paddingVertical,
                paddingHorizontal: props.paddingHorizontal,
                width: props.width,
                height: props.height,
                justifyContent: props.justifyContent,
                alignItems: props.alignItems,
                marginHorizontal: props.marginHorizontal,
                marginRight: props.marginRight
            }
        ];
    }, [props]);

    if (props.isTextFixed) {
        return (
            <TouchableOpacity
                disabled={props.disabled ?? false}
                style={[btnStyle, props.typeVertical ? { alignItems: "center" } : { flexDirection: "row", alignItems: 'center' }]}
                onPress={props.onPress}>
                {
                    (Boolean(props.iconOrImageAffix) || props.isLoading) && <View style={{}}>
                        {
                            props.iconOrImageAffix
                        }
                        {
                            props.isLoading && <ActivityIndicator size={props.ActivityIndicatorSize ?? 25} color={props.ActivityIndicatorColor ?? Colors.WHITE} />
                        }
                    </View>
                }
                <SpaceComponent width={props.spaceAffix ?? 0} />
                {
                    props.title
                }
                <SpaceComponent width={props.spaceSuffix ?? 0} />
                {
                    Boolean(props.iconOrImageSuffix) && <View style={{}}>
                        {
                            props.iconOrImageSuffix
                        }
                    </View>
                }
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
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
            </TouchableOpacity>
        )
    }

}