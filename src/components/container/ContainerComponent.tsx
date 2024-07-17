import { View, Text, ImageSourcePropType, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { appInfo } from '../../constants/Infos';
import RowComponent from '../row/RowComponent';
import { styles } from './ContainerComponent.style';


interface Props {
    isScrollEnable?: boolean;
    backgroundColor?: string;
    isFullHeight?: boolean;
    isFullWidth?: boolean;
    isFull?: boolean;
    children: ReactNode;
    paddingVertical?: number;
    showsScrollIndicator?: boolean;
    imageBackground?: ImageSourcePropType | undefined;
    isCenterJustifyContent?: boolean;
    isCenterAlignItems?: boolean;
}
const ContainerComponent = ({
    backgroundColor,
    isFullHeight,
    isFullWidth,
    children,
    paddingVertical,
    isScrollEnable,
    showsScrollIndicator,
    imageBackground,
    isFull,
    isCenterJustifyContent,
    isCenterAlignItems
}: Props) => {

    const insets = useSafeAreaInsets();

    const content = (
        <SafeAreaView
            style={{
                flex: isFull ? 1 : undefined,
                backgroundColor,
                justifyContent: isCenterJustifyContent ? 'center' : undefined,
                alignItems: isCenterAlignItems ? 'center' : undefined,
                height: isFullHeight ? appInfo.sizes.HEIGHT : undefined,
                width: isFullWidth ? appInfo.sizes.WIDTH : undefined,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
                paddingVertical,
            }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

    return (
        <React.Fragment>
            {isScrollEnable ? (
                <ScrollView
                    contentContainerStyle={styles.container}
                    style={{ backgroundColor: backgroundColor ?? Colors.WHITE }}
                    showsVerticalScrollIndicator={showsScrollIndicator}>
                    {content}
                </ScrollView>
            ) : (
                content
            )}
        </React.Fragment>
    );
};

export default ContainerComponent;
