import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, Image, View} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {Asset} from 'react-native-image-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {RootStackParamList} from '../../../routes/Routes';
import ContainerComponent from '../../../components/container/ContainerComponent';
import SpaceComponent from '../../../components/space/SpaceComponent';
import ImagePicker from '../../../components/common/imagePicker/ImagePicker';
import SessionComponent from '../../../components/session/SessionComponent';
import RowComponent from '../../../components/row/RowComponent';
import IconButtonComponent from '../../../components/buttons/iconButton/IconButtonComponent';
import {Colors} from '../../../constants/Colors';
import {Variables} from '../../../constants/Variables';
import TextComponent from '../../../components/text/TextComponent';
import {styles} from './ProfileSettingScreen.style';
import {globalStyles} from '../../../styles/globalStyles';
import TextButtonComponent from '../../../components/buttons/textButton/TextButtonComponent';
import InputComponent from '../../../components/inputs/customize/InputComponent';
import {
  useUpdateProfileMutation,
  useUploadImageMutation,
} from '../../../redux/Service';
import {useAppDispatch, useAppSelector} from '../../../redux/Hooks';
import {SERVER_ADDRESS} from '../../../constants/System';
import {UpdateProfileRequest} from '../../../types/request/UpdateProfileRequest';
import {updateProfileRedux} from '../../../redux/Slice';
import FastImage from 'react-native-fast-image';

interface ProfileFormValues {
  name: string;
}

const ProfileSettingScreen: React.FC = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [uploadImage, {isError, isLoading, isSuccess, data, error}] =
    useUploadImageMutation();
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const avatar =
    useAppSelector(state => state.SpeedReducer.userLogin?.avatar) ?? '';
  const [initialValues, setInitialValues] = useState<ProfileFormValues>({
    name: '',
  });
  const dispatch = useAppDispatch();
  const [imagePicker, setImagePicker] = useState<Asset[]>();
  const [imagePickerOption, setImagePickerOption] = useState<
    ActionSheet | any
  >();
  const [
    updateProfile,
    {
      data: dataUpdateProfile,
      isError: isErrorUpdateProfile,
      isLoading: isLoadingUpdateProfile,
      isSuccess: isSuccessUpdateProfile,
      error: errorUpdateProfile,
    },
  ] = useUpdateProfileMutation();
  const [imageNameUploadResponse, setImageNameUploadResponse] = useState('');
  const handleShowActionSheet = useCallback(() => {
    imagePickerOption?.show();
  }, [imagePickerOption]);

  const handleUploadImageAction = async () => {
    if (imagePicker?.length) {
      const image = imagePicker[0];
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      console.log(JSON.stringify(formData));
      try {
        await uploadImage({file: formData})
          .unwrap()
          .then(res => {
            if (res) {
              setImageNameUploadResponse(res.data);
              setInitialValues(prevValues => ({
                ...prevValues,
                avatar: res.data,
              }));
            }
          });
      } catch (error: any) {
        if (error.error === 'TypeError: Network request failed') {
          Alert.alert(t('Alert.warning'), t('Alert.systemError'));
        }
      }
    }
  };

  useEffect(() => {
    handleUploadImageAction();
  }, [imagePicker]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('Name is required'))
      .min(2, t('Name must be at least 2 characters long')),
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    const dataUpdate: UpdateProfileRequest = {
      name: values.name,
      image: imageNameUploadResponse[0],
    };
    try {
      await updateProfile({data: dataUpdate, token: token}).then(res => {
        if (res) {
          dispatch(updateProfileRedux(dataUpdate));
        }
      });
    } catch (error) {
      // handle
    }
  };

  useEffect(() => {
    if (dataUpdateProfile) {
      Alert.alert(t('Alert.notification'), 'Cập nhật thành công');
      navigation.goBack();
    }
    if (isErrorUpdateProfile) {
      Alert.alert(t('Alert.warning'), 'Cập nhật không thành công');
    }
  }, [isErrorUpdateProfile, errorUpdateProfile, dataUpdateProfile]);

  return (
    <ContainerComponent isScrollEnable isFull>
      <View style={styles['container__top']}>
        <SessionComponent>
          <RowComponent justifyContent="center" alignItems="center">
            <View style={styles['container__row--inside']}>
              {imagePicker && imagePicker.length > 0 ? (
                <FastImage
                  style={styles['inside__image--avatar']}
                  source={{uri: imagePicker[0].uri}}
                />
              ) : avatar ? (
                <FastImage
                  style={styles['inside__image--avatar']}
                  source={{
                    uri: avatar.includes('http')
                      ? avatar
                      : `${SERVER_ADDRESS}api/get/image/${avatar}`,
                  }}
                />
              ) : (
                <FastImage
                  style={styles['inside__image--avatar']}
                  source={require('../../../assets/images/data/register/rabbit.png')}
                />
              )}
              <IconButtonComponent
                customStyle={styles['inside__image--button']}
                width={35}
                height={35}
                iconName={'camera'}
                onPress={handleShowActionSheet}
                activeBackgroundColor={Colors.GREY_FEEBLE}
                inactiveBackgroundColor={Colors.GREY1}
              />
            </View>
          </RowComponent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values)}
            enableReinitialize>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <InputComponent
                  suffix={
                    <SimpleLineIcons
                      name="pencil"
                      size={Variables.ICON_SIZE_SMALL}
                    />
                  }
                  placeholder={t('Name')}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                />
                <SpaceComponent height={20} />
                <TextButtonComponent
                  isLoading={isLoadingUpdateProfile || isLoading}
                  padding={15}
                  borderRadius={5}
                  backgroundColor={Colors.GREEN_500}
                  title={
                    <TextComponent
                      fontWeight="bold"
                      fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
                      color={Colors.WHITE}
                      text={t('Save Changes')}
                    />
                  }
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </SessionComponent>
      </View>
      <View style={[styles.container__bottom, globalStyles.center]}>
        <ImagePicker
          optionsRef={ref => setImagePickerOption(ref)}
          onResult={result => setImagePicker(result)}
        />
        <SpaceComponent height={2} />
      </View>
    </ContainerComponent>
  );
};

export default ProfileSettingScreen;
