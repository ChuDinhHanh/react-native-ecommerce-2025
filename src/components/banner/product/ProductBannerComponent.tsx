import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import TextComponent from '../../text/TextComponent';
import { styles } from './ProductBannerComponent.style';
import { SERVER_ADDRESS } from '../../../constants/System';

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

const ProductBannerComponent = (props: Props) => {
    const { height, widthOfBanner, data, showNode, showIndexNumber, autoScroll, borderRadius, paddingHorizontal } =
        props;
    const BannerRef = useRef<FlatList>(null);
    const [currentIndexDot, setCurrentIndexDot] = useState(0);
    const isFocusing = useIsFocused();
    const totalWidthOfBanner = data.length * widthOfBanner;
    const scrollInterval = useRef<NodeJS.Timeout | null>(null);

    const handleMomentumScrollEnd = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(offsetX / widthOfBanner);
        setCurrentIndexDot(currentIndex);
    };

    const startAutoScroll = () => {
        if (autoScroll && isFocusing && scrollInterval.current === null) {
            scrollInterval.current = setInterval(() => {
                setCurrentIndexDot((prevIndex) => {
                    const nextIndex = prevIndex + 1 >= data.length ? 0 : prevIndex + 1;
                    BannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                    return nextIndex;
                });
            }, 3000); // Thời gian giữa mỗi lần chuyển banner
        }
    };

    const stopAutoScroll = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current);
            scrollInterval.current = null;
        }
    };

    useEffect(() => {
        if (isFocusing) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
        return stopAutoScroll; // Cleanup interval on unmount or when focus is lost
    }, [isFocusing, autoScroll]);

    useEffect(() => {
        // Restart auto scroll when currentIndexDot or autoScroll changes
        if (autoScroll) {
            stopAutoScroll();
            startAutoScroll();
        }
    }, [currentIndexDot, autoScroll]);

    const renderItem = (item: any, index: number) => {
        return (
            <Pressable
                key={index}
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
                    <Image style={[styles.bannerImages, { height, borderRadius }]} source={{ uri: `${SERVER_ADDRESS}api/get/image/${item.name}` }} />
                </View>
            </Pressable>
        );
    };

    return (
        <View>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                ref={BannerRef}
                contentContainerStyle={{
                    width: totalWidthOfBanner,
                }}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data ?? []}
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

export default ProductBannerComponent;
