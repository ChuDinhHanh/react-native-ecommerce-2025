import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { Category } from '../../../../types/response/Category';
import { moderateScale } from '../../../../utils/ScaleUtils';
import SpaceComponent from '../../../space/SpaceComponent';
import TextComponent from '../../../text/TextComponent';
import { styles } from './CategoryItemComponent.style';
import { SERVER_ADDRESS } from '../../../../constants/System';

interface Props {
    item: Category;
    onPress: (code: string) => void;
    marginRight?: number;
}

const CategoryItemComponent = (props: Props) => {
    const { item, onPress, marginRight } = props;
    return (
        <Pressable onPress={() => onPress(item.code)} style={{ marginRight: marginRight ?? 10 }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: `${SERVER_ADDRESS}api/get/image/${item.image}` }}
                    />
                </View>
                <SpaceComponent height={moderateScale(10)} />
                <View style={styles.textContainer}>
                    <TextComponent
                        numberOfLines={2}
                        color={Colors.BLACK}
                        text={item.name}
                    />
                </View>
            </View>
        </Pressable>
    );
}

export default CategoryItemComponent;
