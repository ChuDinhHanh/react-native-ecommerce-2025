import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as Yup from 'yup';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import CustomTextInput from '../../components/inputs/customize/InputComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import TextComponent from '../../components/text/TextComponent';
import {Colors} from '../../constants/Colors';
import {Variables} from '../../constants/Variables';
import {useAppSelector} from '../../redux/Hooks';
import {useCreateNewAddressMutation} from '../../redux/Service';
import {RootStackParamList} from '../../routes/Routes';
import {useAuthService} from '../../services/authService';
import {Address} from '../../types/request/Address';
import {moderateScale, verticalScale} from '../../utils/ScaleUtils';
import MapComponent, {
  LocationMarkAndAddress,
} from './component/map/MapComponent';

type AddressWithShow = Address & {
  addressShow: string;
};

const AddressScreen = () => {
  const {handleCheckTokenAlive} = useAuthService();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);
  const [visible, setVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [
    createNewAddress,
    {isError, isLoading, isSuccess, reset, data, error},
  ] = useCreateNewAddressMutation();

  const validationSchema = Yup.object().shape({
    nameGet: Yup.string().required('Tên người nhận hàng là bắt buộc'),
    phoneGet: Yup.string()
      .required('Số điện thoại là bắt buộc')
      .min(10, 'Số điện thoại phải có ít nhất 10 chữ số'),
    description: Yup.string().optional(),
    addressShow: Yup.string().required('Địa chỉ giao hàng là bắt buộc'),
  });

  const handleCreateNewAddress = useCallback(
    (values: LocationMarkAndAddress, setFieldValue: any) => {
      setVisible(false);
      setFieldValue('lat', String(values.latitude));
      setFieldValue('long', String(values.longitude));
      setFieldValue('addressShow', values.address);
    },
    [],
  );

  const handleSubmit = (values: AddressWithShow) => {
    const {addressShow, ...restValues} = values;
    const AddAddressData: Address = {
      ...restValues,
      status: toggleCheckBox ? '1' : '0',
      location: addressShow,
    };
    const createNewAddressAction = async () => {
      try {
        await createNewAddress({
          address: AddAddressData,
          token: token ?? '',
        });
      } catch (error) {
        // Handle
      }
    };
    createNewAddressAction();
  };

  useEffect(() => {
    if (data) {
      Alert.alert('Thông báo', 'Tạo địa chỉ thành công');
      navigation.goBack();
    }
    if (isError) {
      try {
        handleCheckTokenAlive(token, refreshToken);
      } catch (error) {
        // Handle
      }
    }
  }, [isError, error, data]);

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE} isScrollEnable>
      <View style={{flex: 0.85}}>
        <SessionComponent>
          <Formik
            initialValues={{
              username: userLogin?.email ?? '',
              description: '',
              lat: '',
              long: '',
              phoneGet: '',
              nameGet: '',
              status: '',
              addressShow: '',
              location: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <CustomTextInput
                  title="Tên người nhận hàng"
                  suffix={
                    <Octicons
                      name="feed-person"
                      size={Variables.ICON_SIZE_SMALL}
                    />
                  }
                  placeholder={'Hãy nhập tên người nhận hàng'}
                  onChangeText={handleChange('nameGet')}
                  onBlur={handleBlur('nameGet')}
                  value={values.nameGet}
                  error={errors.nameGet}
                  touched={touched.nameGet}
                />
                <CustomTextInput
                  title="Số điện thoại"
                  suffix={
                    <MaterialIcons
                      name="local-phone"
                      size={Variables.ICON_SIZE_SMALL}
                    />
                  }
                  placeholder={'Hãy nhập số điện thoại'}
                  onChangeText={handleChange('phoneGet')}
                  onBlur={handleBlur('phoneGet')}
                  value={values.phoneGet}
                  error={errors.phoneGet}
                  touched={touched.phoneGet}
                />
                <CustomTextInput
                  title="Lời nhắn"
                  suffix={
                    <Octicons name="pencil" size={Variables.ICON_SIZE_SMALL} />
                  }
                  placeholder={'Hãy nhập lời nhắn về địa chỉ nếu có'}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                />
                <TextButtonComponent
                  isTextFixed
                  borderRadius={5}
                  spaceAffix={16}
                  iconOrImageAffix={
                    <FontAwesome5
                      size={Variables.ICON_SIZE_SMALL}
                      name="map-marked-alt"
                    />
                  }
                  title={
                    <TextComponent
                      text="Chọn địa chỉ giao hàng"
                      color={Colors.BLACK}
                    />
                  }
                  onPress={() => setVisible(true)}
                />
                <TextComponent text={values.addressShow} color={Colors.BLACK} />
                {errors.addressShow && touched.addressShow && (
                  <TextComponent
                    fontSize={Variables.FONT_SIZE_ERROR_TEXT}
                    text={errors.addressShow}
                    color={Colors.RED}
                  />
                )}

                <RowComponent
                  marginVertical={verticalScale(16)}
                  justifyContent="flex-start"
                  alignItems="center">
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                  <TextComponent
                    text="Địa chỉ mặc định?"
                    color={Colors.BLACK}
                  />
                </RowComponent>
                <TextButtonComponent
                  disabled={isLoading}
                  isLoading={isLoading}
                  borderRadius={5}
                  padding={moderateScale(15)}
                  width={'100%'}
                  backgroundColor={Colors.GREEN_500}
                  onPress={handleSubmit}
                  title={
                    <TextComponent
                      fontWeight="bold"
                      fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
                      color={Colors.WHITE}
                      text={'Xác nhận địa điểm giao hàng'}
                    />
                  }
                />
                <Portal>
                  <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    contentContainerStyle={{flex: 1}}>
                    <MapComponent
                      onPress={values =>
                        handleCreateNewAddress(values, setFieldValue)
                      }
                    />
                  </Modal>
                </Portal>
              </>
            )}
          </Formik>
        </SessionComponent>
      </View>
    </ContainerComponent>
  );
};

export default AddressScreen;
