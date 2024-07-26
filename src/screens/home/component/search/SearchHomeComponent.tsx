import { View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import SpaceComponent from '../../../../components/space/SpaceComponent'
import TextComponent from '../../../../components/text/TextComponent'
import { Variables } from '../../../../constants/Variables'
import { Colors } from '../../../../constants/Colors'
import { moderateScale } from '../../../../utils/ScaleUtils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTranslation } from 'react-multi-lang'

interface Props {
    handleClickSearchEvent: () => void;
}
const SearchHomeComponent = (props: Props) => {
    const t = useTranslation();
    const { handleClickSearchEvent } = props;
    return (
        <Pressable onPress={handleClickSearchEvent}>
            <View style={{ width: '100%', height: moderateScale(40), backgroundColor: Colors.COLOR_GREY_FEEBLE, borderRadius: 5, justifyContent: 'flex-start', paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name='search1' size={Variables.ICON_SIZE_SMALL} color={Colors.BLACK} />
                <SpaceComponent width={moderateScale(5)} />
                <TextComponent fontSize={Variables.FONT_SIZE_PLACEHOLDER} text={t("HomeScreen.textPlaceholderSearch")} color={Colors.BLACK} />
            </View>
        </Pressable>
    )
}

export default SearchHomeComponent