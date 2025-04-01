import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState, useTransition} from 'react';
import {Alert, FlatList} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {moderateScale} from 'react-native-size-matters';
import ContainerComponent from '../../components/container/ContainerComponent';
import LoadingComponent from '../../components/loading/LoadingComponent';
import BillSkeletonComponent from '../../components/skeletons/bill/BillSkeletonComponent';
import {Colors} from '../../constants/Colors';
import {Variables} from '../../constants/Variables';
import {useAppSelector} from '../../redux/Hooks';
import {useLazyGetBillQuery, useUpdateBillMutation} from '../../redux/Service';
import {GetBill} from '../../types/request/getBill';
import {UpdateBill} from '../../types/request/UpdateBill';
import {GetBillResponse} from '../../types/response/GetBillResponse';
import BillDetailsItem from './component/BillDetailsItem';
import {useAuthService} from '../../services/authService';
import {useTranslation} from 'react-multi-lang';
import { handlePrintfBill } from '../../utils/PrintfUntils';

const BillScreen = () => {
  const t = useTranslation();
  const {handleCheckTokenAlive} = useAuthService();
  const email =
    useAppSelector(state => state.SpeedReducer.userLogin?.email) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const isFocused = useIsFocused();
  const [getBill, {data, error, isError, isLoading, isFetching}] =
    useLazyGetBillQuery();
  const [tempData, setTempData] = useState<GetBillResponse[]>([]);
  const [
    updateBill,
    {
      isError: isErrorUpdateBill,
      error: errorUpdateBill,
      isLoading: isLoadingUpdateBill,
      isSuccess,
      reset,
    },
  ] = useUpdateBillMutation();

  useEffect(() => {
    if (isFocused) {
      getBillAction();
    }
  }, [isFocused, token, email]);

  const getBillAction = async () => {
    if (token && email) {
      const requestData: GetBill = {username: email};
      try {
        await getBill({data: requestData, token});
      } catch (error) {
        // Handle error if needed
      }
    }
  };

  useEffect(() => {
    if (data?.data) {
      setTempData(data.data);
    }
  }, [data]);


  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        getBillAction();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        Alert.alert(t('Alert.warning'), t('Alert.systemError'));
      }
    }

    if (isFocused && isErrorUpdateBill) {
      const textError = JSON.parse(JSON.stringify(errorUpdateBill));
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
    isError,
    isFocused,
    error,
    token,
    refreshToken,
    handleCheckTokenAlive,
    isErrorUpdateBill,
    errorUpdateBill,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  useEffect(() => {
    if (!isFocused) {
      getBillAction();
    }
  }, [isFocused]);

  const handleDeleteBill = async (billCode: string) => {
    const newData = tempData.filter(item => item.code !== billCode);
    setTempData(newData);

    if (token && billCode) {
      try {
        const updateData: UpdateBill = {code: billCode, status: -1};
        await updateBill({data: updateData, token});
      } catch (error) {
        // Handle error if needed
      }
    }
  };

  useEffect(() => {
    if (isErrorUpdateBill || isSuccess) {
      reset();
    }
  }, [isFocused, isErrorUpdateBill, errorUpdateBill, isSuccess, reset]);

  const handleOnPressPrintfBill = async (bill: GetBillResponse) => {
    if (await requestStoragePermission()) {
      await handlePrintfBill(bill);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  };

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE}>
      {isLoading ? (
        <BillSkeletonComponent />
      ) : (
        <FlatList
          data={tempData.filter(item => item.status !== -1)}
          keyExtractor={item => item.code}
          renderItem={({item}) => (
            <BillDetailsItem
              onDelete={handleDeleteBill}
              bill={item}
              onPrintf={handleOnPressPrintfBill}
            />
          )}
        />
      )}
      {(isFetching || isLoadingUpdateBill) && !isLoading && (
        <LoadingComponent
          title={t('DetailProductScreen.loadingData')}
          size={Variables.FONT_SIZE_ERROR_TEXT}
          color={Colors.WHITE}
          icon=""
          iconSize={moderateScale(25)}
          iconColor={Colors.GREEN_500}
        />
      )}
    </ContainerComponent>
  );
};

export default BillScreen;
