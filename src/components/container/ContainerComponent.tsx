import { View, Text, ImageSourcePropType, ScrollView, Image } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { appInfo } from '../../constants/Infos';
import RowComponent from '../row/RowComponent';


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
const ContainerComponent = (props: Props) => {
    const {
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
    } = props;

    const insets = useSafeAreaInsets();

    const content = (
        <SafeAreaView
            style={{
                paddingVertical,
                flex: isFull ? 1 : undefined,
                backgroundColor: backgroundColor ?? Colors.WHITE,
                justifyContent: isCenterJustifyContent ? 'center' : undefined,
                alignItems: isCenterAlignItems ? 'center' : undefined,
                height: isFullHeight ? appInfo.sizes.HEIGHT : undefined,
                width: isFullWidth ? appInfo.sizes.WIDTH : undefined,
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}>
            {children}
        </SafeAreaView>
    );

    return (
        <React.Fragment>
            {isScrollEnable ? (
                <ScrollView
                    style={{ backgroundColor: backgroundColor ?? Colors.WHITE }}
                    showsVerticalScrollIndicator={showsScrollIndicator}>
                    <View>
                        {imageBackground && (
                            <RowComponent
                                marginVertical={20}
                                alignItems="center"
                                justifyContent="center">
                                <Image source={imageBackground} />
                            </RowComponent>
                        )}
                        {content}
                    </View>
                </ScrollView>
            ) : (
                content
            )}
        </React.Fragment>
    );
};

export default ContainerComponent;
