

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, View } from 'react-native';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import DropdownComponent from '../../components/dropdown/DropdownComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import { Variables } from '../../constants/Variables';
import { useAppSelector } from '../../redux/Hooks';
import { useAddCartCheckedMutation, useLazyGetUserAddressQuery, usePaymentMutation } from '../../redux/Service';
import { RootStackParamList } from '../../routes/Routes';
import { Bill } from '../../types/request/Bill';
import { vietnameseCurrency } from '../../utils/FormatNumberUtils';
import { moderateScale, verticalScale } from '../../utils/ScaleUtils';
import { validationSchemaPaymentUtils } from '../../utils/ValidationSchemaUtils';
import AddressComponent from '../checkout/component/address/AddressComponent';
import { IconButton, Modal, Portal } from 'react-native-paper';
import RowComponent from '../../components/row/RowComponent';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { ADDRESS_SCREEN } from '../../constants/Screens';

const PaymentScreen = () => {
    const t = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [visible, setVisible] = React.useState(false);
    const [getUserAddress, { isError, isFetching, isLoading, data }] = useLazyGetUserAddressQuery();
    // Modal
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const route = useRoute<RouteProp<RootStackParamList, 'PAYMENT_SCREEN'>>();
    const containerStyle = { backgroundColor: 'white', paddingTop: 10, paddingHorizontal: 20, marginHorizontal: 15, borderRadius: 5 };
    const [addCartChecked,
        {
            isError: isErrorAddCartChecked,
            isLoading: isLoadingAddCartChecked,
            error: errorAddCartChecked,
            data: dataAddCartChecked
        }
    ] = useAddCartCheckedMutation();

    const [paymentMutation, {
        isError: isErrorPayment,
        isLoading: isLoadingPayment,
        error: errorPayment,
        data: dataPayment
    }] = usePaymentMutation();

    const userLogin = useAppSelector((state) => state.SpeedReducer.userLogin);
    const token = useAppSelector((state) => state.SpeedReducer.token);
    const [selectShippingUnit, setSelectShippingUnit] = useState();
    const listCodeCartChecked = route.params.listCodeCartChecked;
    const [initialValues, setInitialValues] = useState<Bill>({
        username: userLogin?.email ?? "",
        shippingUnit: '',
        paymentMethod: '',
        shippingUnitPrice: 0
    });

    const shippingUnit = [
        { name: 'Giao hàng hỏa tốc', value: 'Giao hàng hỏa tốc' },
        { name: 'Giao hàng bình thường', value: 'Giao hàng bình thường' },
    ];

    const paymentMethod = [
        { name: 'Tiền mặt', value: 'Tiền mặt' },
        { name: 'Thẻ tín dụng', value: 'Thẻ tín dụng' },
    ];

    const priceOfDelivery = [
        { name: 'Giao hàng hỏa tốc', value: '1231231231' },
        { name: 'Giao hàng bình thường', value: '12312321312' },
    ]

    const dropdownData = [
        { name: t('PaymentScreen.createNewAddress'), value: Variables.CREATE_NEW_ADDRESS },
        { name: t('PaymentScreen.selectOldAddress'), value: Variables.SELECT_ADDRESS_FROM_DATA },
    ];

    const totalPriceOfDeliveryOfProduct = useMemo(() => {
        let price = '0';
        priceOfDelivery.map((item) => {
            if (item.name == selectShippingUnit) {
                price = item.value
            }
        })
        return price;
    }, [selectShippingUnit, priceOfDelivery])

    const handleChooseItemDropdown = (item: string) => {
        hideModal();
        if (item === Variables.CREATE_NEW_ADDRESS) {
            navigation.navigate(ADDRESS_SCREEN);
        } else {

        }

    }

    useEffect(() => {
        if (isErrorAddCartChecked && errorAddCartChecked) {
            const errorText = JSON.parse(JSON.stringify(errorAddCartChecked));
            Alert.alert('Add Cart Check Error', errorText?.data ? errorText?.data?.message : errorText?.message || 'An error occurred while adding to cart');
        }
    }, [isErrorAddCartChecked, errorAddCartChecked]);

    useEffect(() => {
        if (isErrorPayment && errorPayment) {
            const errorText = JSON.parse(JSON.stringify(errorPayment))
            Alert.alert('Payment Error', errorText?.data ? errorText?.data?.message : errorText?.message || 'An error occurred during payment');
        }
    }, [isErrorPayment, errorPayment]);

    const handlePaymentRequest = (values: Bill) => {
        const addCheckCart: Bill = values;
        addCheckCart.username = userLogin?.email!
        addCheckCart.shippingUnitPrice = parseInt(totalPriceOfDeliveryOfProduct)
        // Send to server
        const paymentAction = async () => {
            try {
                const addCartData = { code: listCodeCartChecked, token: token ?? "" }
                const response = await addCartChecked(addCartData);
                if (response) {
                    const payment = {
                        bill: addCheckCart,
                        token: token ?? ""
                    }
                    await paymentMutation(payment);
                }
            } catch (error) {
                console.error("Payment request failed:", error);
            }
        }
        paymentAction();
    }

    // Address
    useEffect(() => {
        const getAddress = async () => {
            try {
                await getUserAddress({
                    user: userLogin?.email ?? "",
                    token: token ?? ""
                });
            } catch (error) {

            }
        }
        getAddress();
    }, []);


    return (
        <ContainerComponent isFull backgroundColor={Colors.WHITE}>
            <SessionComponent>
                {/* Address */}
                <AddressComponent onPress={showModal} />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemaPaymentUtils}
                    onSubmit={handlePaymentRequest}
                    enableReinitialize
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <View>
                            <DropdownComponent
                                placeHolder='Hãy chọn phương thức thanh toán'
                                touched={touched.shippingUnit}
                                errors={errors.shippingUnit}
                                dropdownData={shippingUnit}
                                values={values.shippingUnit}
                                onSetFieldValue={setFieldValue}
                                onSetValue={(value) => setSelectShippingUnit(value)}
                                FieldValue={'shippingUnit'}
                            />
                            {errors.shippingUnit && touched.shippingUnit && (
                                <TextComponent color={Colors.RED} text={t(errors.shippingUnit)} />
                            )}
                            <DropdownComponent
                                placeHolder='Hãy chọn đơn vị giao hàng'
                                touched={touched.paymentMethod}
                                errors={errors.paymentMethod}
                                dropdownData={paymentMethod}
                                values={values.paymentMethod}
                                onSetFieldValue={setFieldValue}
                                onSetValue={(value) => { console.log(value) }}
                                FieldValue={'paymentMethod'}
                            />
                            {errors.paymentMethod && touched.paymentMethod && (
                                <TextComponent color={Colors.RED} text={t(errors.paymentMethod)} />
                            )}
                            <TextComponent color={Colors.BLACK} text={`Chi phí giao hàng: ${vietnameseCurrency(parseInt(totalPriceOfDeliveryOfProduct))}`} />
                            <SpaceComponent height={verticalScale(16)} />
                            <TextButtonComponent
                                padding={moderateScale(15)}
                                borderRadius={5}
                                backgroundColor={Colors.GREEN_500}
                                title={
                                    <TextComponent
                                        fontWeight='bold'
                                        fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
                                        color={Colors.WHITE}
                                        text={"Thanh toán ngay"}
                                    />
                                }
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </SessionComponent>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <>
                        <RowComponent alignItems='center' justifyContent='space-between'>
                            <TextComponent fontSize={Variables.FONT_SIZE_BUTTON_TEXT} text='Vui lòng lựa chọn địa chỉ nhận hàng' color={Colors.BLACK} />
                            <IconButton icon={'close'} onPress={hideModal} />
                        </RowComponent>
                        <DropdownComponent
                            touched={undefined}
                            errors={undefined}
                            dropdownData={dropdownData}
                            values={undefined}
                            onSetFieldValue={() => { }}
                            onSetValue={handleChooseItemDropdown}
                            placeHolder={''}
                            FieldValue={''}
                        />
                    </>
                </Modal>
            </Portal>
        </ContainerComponent>
    );
};

export default PaymentScreen;