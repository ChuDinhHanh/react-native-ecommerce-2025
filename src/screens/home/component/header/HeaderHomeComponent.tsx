import { DrawerActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Pressable } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent'
import DefaultAvatar from '../../../../components/common/defaultAvatar/DefaultAvatar'
import RowComponent from '../../../../components/row/RowComponent'
import SpaceComponent from '../../../../components/space/SpaceComponent'
import TextComponent from '../../../../components/text/TextComponent'
import { Colors } from '../../../../constants/Colors'
import { Variables } from '../../../../constants/Variables'
import { RootStackParamList } from '../../../../routes/Routes'
import { moderateScale, verticalScale } from '../../../../utils/ScaleUtils'
import { useTranslation } from 'react-multi-lang'

const HeaderHomeComponent = () => {
    const t = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <React.Fragment>
            <RowComponent justifyContent='space-between' alignItems='center'>
                {/* Top */}
                <IconButtonComponent typeNoBackground onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} icon={<Entypo name='menu' size={moderateScale(25)} color={Colors.BLACK} />} />
                <Pressable onPress={() => { console.log("avatar") }}>
                    <DefaultAvatar size={moderateScale(40)} name='Hanh' />
                </Pressable>
            </RowComponent>
            <SpaceComponent height={verticalScale(16)} />
            {/* Title welcome*/}
            <TextComponent fontSize={Variables.FONT_SIZE_SUBTITLE} text={`${t("HomeScreen.TitleIntroduce")}`} color={Colors.BLACK} />
            <TextComponent fontSize={Variables.FONT_SIZE_BODY_TEXT} text={`${t("HomeScreen.TitleIntroduce_description")}`} color={Colors.BLACK} />
            <SpaceComponent height={moderateScale(16)} />
        </React.Fragment>
    )
}

export default HeaderHomeComponent