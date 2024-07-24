import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import TextComponent from '../../text/TextComponent';
import { styles } from './ProductBannerComponent.style';

const DotsComponent = React.memo(
    ({ length, currentDot }: { length: number; currentDot: number }) => {
        return (
            <View style={styles.wrapperDot}>
                {Array.from({ length }).map((_, index: number) => (
                    <View
                        style={[
                            styles.dot,
                            {
                                backgroundColor:
                                    currentDot === index ? Colors.WHITE : Colors.GREY1,
                            },
                        ]}
                        key={index}></View>
                ))}
            </View>
        );
    },
);

interface Props {
    height: number;
    widthOfBanner: number;
    data: any;
    showNode?: boolean;
    showIndexNumber?: boolean;
    autoScroll: boolean;
    borderRadius?: number;
    paddingHorizontal?: number;
}


const CurrentIndex = React.memo(
    ({ length, currentDot }: { length: number; currentDot: number }) => {
        return (
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: Colors.GREY1,
                    paddingHorizontal: 6,
                    borderRadius: 3,
                    bottom: 16,
                    right: 16,
                }}>
                <TextComponent text={`${currentDot + 1}/${length}`} fontWeight="bold" />
            </View>
        );
    },
);


const ProductBannerComponent = (props: Props) => {
    const { height, widthOfBanner, data, showNode, showIndexNumber, autoScroll, borderRadius, paddingHorizontal } =
        props;
    const [dataImage, setDataImage] = useState<[{ id: number, image: string }][]>(data);
    const BannerRef = useRef<FlatList>(null);
    const [currentIndexDot, setCurrentIndexDot] = useState(0);
    // Session padding total is 20
    const isFocusing = useIsFocused();
    const totalWidthOfBanner = data.length * widthOfBanner;

    const handleMomentumScrollEnd = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(offsetX / widthOfBanner);
        setCurrentIndexDot(currentIndex)
    }

    const renderItem = (item: any, index: number) => {
        return (
            <Pressable
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => {
                    console.log('click banner', item.id);
                }}>
                <View
                    style={{
                        width: widthOfBanner,
                        paddingHorizontal
                    }}>
                    <Image style={[styles.bannerImages, { height, borderRadius }]} source={{ uri: item.image }} />
                </View>
            </Pressable>
        );
    };
    return (
        <View>
            <FlatList
                keyExtractor={(item) => item.id.toString()} // Thêm keyExtractor
                onMomentumScrollEnd={handleMomentumScrollEnd}
                ref={BannerRef}
                contentContainerStyle={{
                    width: totalWidthOfBanner,
                }}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                data={dataImage}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
            {/* Dot */}
            {showNode && (
                <DotsComponent currentDot={currentIndexDot} length={data.length} />
            )}
            {/* Current index */}
            {showIndexNumber && (
                <CurrentIndex currentDot={currentIndexDot} length={data.length} />
            )}
        </View>
    )
}

export default ProductBannerComponent