import { View, Text } from 'react-native';
import React from 'react';
import { Pressable } from 'react-native';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-multi-lang';
import { styles } from './SearchHomeComponent.style';
import { Variables } from '../../../../constants/Variables';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '../../../../constants/Colors';

interface Props {
    handleClickSearchEvent: () => void;
}

const SearchHomeComponent = (props: Props) => {
    const t = useTranslation();
    const { handleClickSearchEvent } = props;

    return (
        <Pressable onPress={handleClickSearchEvent}>
            <View style={styles.container}>
                <AntDesign name='search1' size={Variables.ICON_SIZE_SMALL} style={styles.icon} />
                <SpaceComponent width={moderateScale(5)} />
                <TextComponent style={styles.text} color={Colors.BLACK} text={t("HomeScreen.textPlaceholderSearch")} />
            </View>
        </Pressable>
    );
}

export default SearchHomeComponent;
