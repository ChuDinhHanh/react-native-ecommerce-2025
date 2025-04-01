import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../../../../routes/Routes';
import ContainerComponent from '../../../../components/container/ContainerComponent';
import { Image } from 'react-native-svg';
import { Colors } from '../../../../constants/Colors';
import SessionComponent from '../../../../components/session/SessionComponent';
import TextComponent from '../../../../components/text/TextComponent';
import { Variables } from '../../../../constants/Variables';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import { moderateScale } from '../../../../utils/ScaleUtils';
import RowComponent from '../../../../components/row/RowComponent';

const DetailNotificationScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "DETAIL_NOTIFICATION_SCREEN">>();
    const id = route.params?.id;

    return (
        <ContainerComponent
            isFull
            backgroundColor={Colors.WHITE}
            isScrollEnable
        >
            <SessionComponent>
                <RowComponent justifyContent='flex-end'>
                    <TextComponent color={Colors.BLACK} text='10-12-2003 10:41' />
                </RowComponent>
                <TextComponent color={Colors.BLACK} fontSize={Variables.FONT_SIZE_SUBTITLE} text='Mẫu thông báo nhiều người dùng nhất năm 2024' />
                <SpaceComponent height={moderateScale(16)} />
                <TextComponent color={Colors.GREY1} text='Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm  thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024Mẫu thông báo nhiều người dùng nhất năm 2024' />
            </SessionComponent>
        </ContainerComponent>
    )
}

export default DetailNotificationScreen