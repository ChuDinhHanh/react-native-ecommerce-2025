import React, { ReactNode, useRef, useState } from 'react';
import { ImageSourcePropType, KeyboardAvoidingView, NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { appInfo } from '../../constants/Infos';
import ButtonBackToTop from '../buttons/backTop/ButtonBackToTop';
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
    haveBackButton?: boolean;
    isCenter?: boolean;
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
    isCenterAlignItems,
    haveBackButton,
    isCenter
}: Props) => {

    const insets = useSafeAreaInsets();
    const [showBackToTopButton, setShowBackToTopButton] = useState(true);
    const ScrollViewRef = useRef<ScrollView>(null);
    const handleScrollEvent = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
        showBackToTopButton: boolean,
        setShowBackToTopButton: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        if (event.nativeEvent) {
            const currentHeight = event.nativeEvent.contentOffset.y;
            if (Math.round(currentHeight) > Math.round(appInfo.sizes.HEIGHT * (2 / 3))) {
                !showBackToTopButton && setShowBackToTopButton(true);
            } else {
                showBackToTopButton && setShowBackToTopButton(false);
            }
        }
    };

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
                style={{
                    flex: 1,
                    justifyContent: isCenter ? 'center' : undefined,
                    alignItems: isCenter ? 'center' : undefined
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView >
    );

    return (
        <React.Fragment>
            {isScrollEnable ? (
                <>
                    <ScrollView
                        onScroll={event => { haveBackButton && handleScrollEvent(event, showBackToTopButton, setShowBackToTopButton) }}
                        ref={ScrollViewRef}
                        contentContainerStyle={styles.container}
                        style={{ backgroundColor: backgroundColor ?? Colors.WHITE }}
                        showsVerticalScrollIndicator={showsScrollIndicator}>
                        {content}
                    </ScrollView>
                    {
                        haveBackButton && showBackToTopButton && <ButtonBackToTop scrollViewRef={ScrollViewRef} />
                    }
                </>
            ) : (
                content
            )}
        </React.Fragment>
    );
};

export default ContainerComponent;
