import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik, FormikProps} from 'formik';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, View} from 'react-native';
import {IconButton, Modal, Portal} from 'react-native-paper';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import DropdownComponent from '../../components/dropdown/DropdownComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import {Colors} from '../../constants/Colors';
import {
  ADDRESS_SCREEN,
  BOTTOM_TAB_NAVIGATOR,
  HOME_SCREEN,
} from '../../constants/Screens';
import {Variables} from '../../constants/Variables';
import {useAppSelector} from '../../redux/Hooks';
import {
  useAddCartCheckedMutation,
  useCreateBillMutation,
  useLazyGetShippingMethodQuery,
  useLazyGetUserAddressQuery,
} from '../../redux/Service';
import {RootStackParamList} from '../../routes/Routes';
import {useAuthService} from '../../services/authService';
import {Bill, Order} from '../../types/request/Bill';
import {calculateDistance} from '../../utils/DistanceUtils';
import {vietnameseCurrency} from '../../utils/FormatNumberUtils';
import {validationSchemaPaymentUtils} from '../../utils/Rules';
import {moderateScale, verticalScale} from '../../utils/ScaleUtils';
import AddressComponent from '../checkout/component/address/AddressComponent';
import SelectAddressComponent from './component/address/SelectAddressComponent';
import PayPalPayment from './component/paypal/PayPalPayment ';

interface ShippingUnit {
  name: string;
  value: string;
}

interface Address {
  addressCode: string;
  addressDisplayName: string;
  lat: string;
  long: string;
}

const PaymentScreen = () => {
  const {handleCheckTokenAlive} = useAuthService();
  const t = useTranslation();
  const formikRef = useRef<FormikProps<any>>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [visible, setVisible] = React.useState(false);
  const [visiblePaypal, setVisiblePaypal] = React.useState(false);
  const [
    getUserAddress,
    {
      isError: isErrorGetUserAddress,
      isFetching: isFetchingGetUserAddress,
      isLoading: isLoadingGetUserAddress,
      data: dataGetUserAddress,
      error: errorGetUserAddress,
    },
  ] = useLazyGetUserAddressQuery();
  const [
    getShippingMethod,
    {
      isError: isErrorGetShippingMethod,
      isFetching: isFetchingGetShippingMethod,
      isLoading: isLoadingGetShippingMethod,
      data: dataGetShippingMethod,
      error: errorGetShippingMethod,
    },
  ] = useLazyGetShippingMethodQuery();
  // Modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showModalPaypal = () => setVisiblePaypal(true);
  const hideModalPaypal = () => setVisiblePaypal(false);
  const route = useRoute<RouteProp<RootStackParamList, 'PAYMENT_SCREEN'>>();
  const listCodeCartChecked = route.params.listCodeCartChecked;
  const [addressDisplay, setAddressDisplay] = useState<Address>();
  const isFocused = useIsFocused();
  const [
    addCartChecked,
    {
      isError: isErrorAddCartChecked,
      isLoading: isLoadingAddCartChecked,
      error: errorAddCartChecked,
      data: dataAddCartChecked,
    },
  ] = useAddCartCheckedMutation();

  const [
    createBill,
    {
      isError: isErrorCreateBill,
      isLoading: isLoadingCreateBill,
      error: errorCreateBill,
      data: dataCreateBill,
    },
  ] = useCreateBillMutation();

  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const [selectShippingUnit, setSelectShippingUnit] = useState();
  const [selectPaymentMethod, setPaymentMethod] = useState();

  const [initialValues, setInitialValues] = useState<Bill>({
    username: userLogin?.email ?? '',
    shippingUnit: '',
    paymentMethod: '',
  });
  const [shippingUnit, setShippingUnit] = useState<ShippingUnit[]>([]);

  const paymentMethod = [
    {name: t('PaymentScreen.payWithCash'), value: 'Tiền mặt'},
    {name: t('PaymentScreen.payWithCreaditCart'), value: 'Thẻ tín dụng'},
  ];

  const totalPriceOfDeliveryOfProduct = useMemo(() => {
    let price = 0;
    let distance = 0;
    const shippingUnitLocation = dataGetShippingMethod?.data?.find(
      (item: any) => item.code === selectShippingUnit,
    );

    if (shippingUnitLocation && addressDisplay) {
      distance = calculateDistance(
        Number(shippingUnitLocation.lat),
        Number(shippingUnitLocation.long),
        Number(addressDisplay.lat),
        Number(addressDisplay.long),
      );
      const pricePerKm = shippingUnitLocation.price;
      price = distance * 500 + pricePerKm;
    }

    return {
      price,
      distance,
    };
  }, [dataGetShippingMethod, selectShippingUnit, addressDisplay]);

  const handleProcessWhenSuccess = () => {
    Alert.alert(t('Alert.notification'), t('PaymentScreen.paymentSuccess'));
    navigation.replace(BOTTOM_TAB_NAVIGATOR, {
      screen: HOME_SCREEN,
      params: null,
    } as any);
  };

  useEffect(() => {
    if (dataCreateBill) {
      handleProcessWhenSuccess();
    }
  }, [isErrorCreateBill, errorCreateBill, dataCreateBill]);

  // Address
  useEffect(() => {
    const getAddress = async () => {
      try {
        await getUserAddress({
          user: userLogin?.email ?? '',
          token: token ?? '',
        }).then(res => {
          //   Handle
        });
      } catch (error) {}
    };

    const getShippingMethods = async () => {
      try {
        await getShippingMethod({
          token: token ?? '',
        }).then(res => {
          //   Handle
        });
      } catch (error) {}
    };

    if (userLogin?.email && token) getAddress();
    if (token) getShippingMethods();
  }, [userLogin?.email, token, getUserAddress]);

  useEffect(() => {
    if (dataGetShippingMethod) {
      const convertedData: ShippingUnit[] = dataGetShippingMethod?.data?.map(
        (item: any) => ({
          name: item.name,
          value: item.code,
        }),
      );
      setShippingUnit(convertedData);
    }
  }, [isErrorGetShippingMethod, errorGetShippingMethod, dataGetShippingMethod]);

  const handleSelectAddress = (item: Address) => {
    hideModal();
    setAddressDisplay(item);
  };

  const handleCreateNewAddress = () => {
    hideModal();
    navigation.navigate(ADDRESS_SCREEN);
  };

  const handleError = useCallback(() => {
    if (isErrorAddCartChecked && isFocused) {
      const textError = JSON.parse(JSON.stringify(errorAddCartChecked));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        return;
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        Alert.alert(t('Alert.warning'), errorMessage);
      }
    }

    if (isErrorCreateBill && isFocused) {
      const textError = JSON.parse(JSON.stringify(errorCreateBill));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else if (errorMessage === Variables.ABORTED_ERROR) {
        handleProcessWhenSuccess();
      } else {
        Alert.alert(t('Alert.warning'), JSON.stringify(errorCreateBill));
      }
    }

    if (isErrorGetUserAddress && isFocused) {
      const textError = JSON.parse(JSON.stringify(errorGetUserAddress));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        return;
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        Alert.alert(t('Alert.warning'), t('Alert.systemError'));
      }
    }

    if (isErrorGetShippingMethod && isFocused) {
      const textError = JSON.parse(JSON.stringify(errorGetShippingMethod));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        return;
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        Alert.alert(t('Alert.warning'), t('Alert.systemError'));
      }
    }
  }, [
    isFocused,
    isErrorAddCartChecked,
    errorAddCartChecked,
    isErrorCreateBill,
    errorCreateBill,
    isErrorGetUserAddress,
    errorGetUserAddress,
    isErrorGetShippingMethod,
    errorGetShippingMethod,
    token,
    refreshToken,
    handleCheckTokenAlive,
    t,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  useEffect(() => {
    if (selectPaymentMethod === Variables.CREDIT_CARD) {
      showModalPaypal();
    }
  }, [selectPaymentMethod]);

  const paymentByPalpalSuccess = () => {
    hideModalPaypal();
    Alert.alert(t('Alert.notification'), t('PaymentScreen.paymentSuccess'));
    formikRef.current?.submitForm();
  };

  const paymentByPalpalUnSuccess = () => {
    Alert.alert(t('Alert.notification'), t('PaymentScreen.paymentFailure'));
  };

  const handlePaymentRequest = async (values: Bill) => {
    try {
      await addCartChecked({
        code: listCodeCartChecked,
        token: token ?? '',
      }).then(response => {
        if (response) {
          const order: Omit<Order, 'shippingUnit'> = {
            shippingCode: values.shippingUnit,
            addressCode: addressDisplay?.addressCode ?? '',
            kilometers: totalPriceOfDeliveryOfProduct.distance ?? 0,
            username: values.username,
            paymentMethod: values.paymentMethod,
          };
          // Send to server
          const paymentAction = async () => {
            try {
              await createBill({
                order: order,
                token: token ?? '',
              });
            } catch (error) {
              // Handle
            }
          };
          paymentAction();
        }
      });
    } catch (error) {
      // Handle
    }
  };

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE}>
      <SessionComponent>
        {/* Address */}
        <AddressComponent
          onPress={showModal}
          addressDisplay={addressDisplay?.addressDisplayName ?? ''}
        />
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchemaPaymentUtils}
          onSubmit={handlePaymentRequest}
          enableReinitialize>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View>
              <DropdownComponent
                placeHolder={t('PaymentScreen.selectShippingUnit')}
                touched={touched.shippingUnit}
                errors={errors.shippingUnit}
                dropdownData={shippingUnit}
                values={values.shippingUnit}
                onSetFieldValue={setFieldValue}
                onSetValue={value => setSelectShippingUnit(value)}
                FieldValue={'shippingUnit'}
              />
              {errors.shippingUnit && touched.shippingUnit && (
                <TextComponent
                  color={Colors.RED}
                  text={t(errors.shippingUnit)}
                />
              )}
              <DropdownComponent
                placeHolder={t('PaymentScreen.selectPaymentMethod')}
                touched={touched.paymentMethod}
                errors={errors.paymentMethod}
                dropdownData={paymentMethod}
                values={values.paymentMethod}
                onSetFieldValue={setFieldValue}
                onSetValue={value => setPaymentMethod(value)}
                FieldValue={'paymentMethod'}
              />
              {errors.paymentMethod && touched.paymentMethod && (
                <TextComponent
                  color={Colors.RED}
                  text={t(errors.paymentMethod)}
                />
              )}
              <TextComponent
                color={Colors.BLACK}
                text={`${t('PaymentScreen.shippingCost')}: ${vietnameseCurrency(
                  totalPriceOfDeliveryOfProduct.price,
                )}`}
              />
              <SpaceComponent height={verticalScale(16)} />
              <TextButtonComponent
                disabled={isLoadingCreateBill || isLoadingAddCartChecked}
                isLoading={isLoadingCreateBill || isLoadingAddCartChecked}
                padding={moderateScale(15)}
                borderRadius={5}
                backgroundColor={Colors.GREEN_500}
                title={
                  <TextComponent
                    fontWeight="bold"
                    fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
                    color={Colors.WHITE}
                    text={t('PaymentScreen.payNow')}
                  />
                }
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </SessionComponent>
      <SelectAddressComponent
        token={token ?? ''}
        user={userLogin?.email ?? ''}
        onSelect={handleSelectAddress}
        onCreate={handleCreateNewAddress}
        visible={visible}
        hideModal={hideModal}
        ListAddress={dataGetUserAddress?.data}
        isLoading={isLoadingGetUserAddress}
        isFetching={isFetchingGetUserAddress}
      />
      <Portal>
        <Modal
          visible={visiblePaypal}
          onDismiss={hideModalPaypal}
          contentContainerStyle={{width: '100%', height: '100%'}}>
          <RowComponent
            justifyContent="space-between"
            alignItems="center"
            backgroundColor={Colors.WHITE}>
            <TextComponent
              paddingHorizontal={moderateScale(16)}
              fontWeight="bold"
              color={Colors.BLACK}
              text={t('PaymentScreen.paypalPaymentTitle')}
            />
            <IconButton icon={'close'} onPress={hideModalPaypal} />
          </RowComponent>
          <PayPalPayment
            currency="USD"
            total="26"
            shipping={'6'}
            subtotal="20"
            shipping_discount="0"
            tax="0"
            successPayment={paymentByPalpalSuccess}
            failPayment={paymentByPalpalUnSuccess}
          />
        </Modal>
      </Portal>
    </ContainerComponent>
  );
};

export default PaymentScreen;
