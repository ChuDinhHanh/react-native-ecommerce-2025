import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import ContainerComponent from '../../../../components/container/ContainerComponent';
import { SERVICE_STACK_NAVIGATOR } from '../../../../constants/Screens';
import { useAppDispatch } from '../../../../redux/Hooks';
import { setCurrentlyNotificationScreen } from '../../../../redux/Slice';
import { RootStackParamList } from '../../../../routes/Routes';
import NotificationItemComponent from '../../component/item/notificationItem/NotificationItemComponent';

const NotificationUnReadScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const isFocus = useIsFocused();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isFocus) {
            dispatch(setCurrentlyNotificationScreen(0));
        }
    }, [isFocus]);

    const handleSeeDetailNotification = (id: number) => {
        navigation.navigate(SERVICE_STACK_NAVIGATOR, { id: id });
    }
    return (
        <ContainerComponent
            isFull
        >
            <NotificationItemComponent
                id={0}
                isRead
                image={'https://img.ws.mms.shopee.vn/17e2066120dab83b390da02b7875959a'}
                title={'Đơn hàng của bạn đã được xác nhận!'}
                content={'Vui lòng kiểm tra điện thoại để nhận được các thông tin mới nhất về đơn hàng của bạn'}
                timeCreated={'10-12-2003 10:31'}
                onPress={handleSeeDetailNotification}
                onPressMenuItem={(id) => { console.log(id) }}
            />
        </ContainerComponent>
    )
}

export default NotificationUnReadScreen