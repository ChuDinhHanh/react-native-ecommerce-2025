import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { moderateScale } from 'react-native-size-matters'
import ContainerComponent from '../../components/container/ContainerComponent'
import LoadingComponent from '../../components/loading/LoadingComponent'
import BillSkeletonComponent from '../../components/skeletons/bill/BillSkeletonComponent'
import { Colors } from '../../constants/Colors'
import { Variables } from '../../constants/Variables'
import { useAppSelector } from '../../redux/Hooks'
import { useLazyGetBillQuery, useUpdateBillMutation } from '../../redux/Service'
import { useAuthService } from '../../services/authService'
import { GetBill } from '../../types/request/getBill'
import { UpdateBill } from '../../types/request/UpdateBill'
import { GetBillResponse } from '../../types/response/GetBillResponse'
import { handlePrintfBill } from '../../utils/PrintfUntils'
import BillDetailsItem from './component/BillDetailsItem'

const BillScreen = () => {
    const { handleCheckTokenAlive } = useAuthService();
    const email = useAppSelector((state) => state.SpeedReducer.userLogin?.email) ?? "";
    const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const isFocussed = useIsFocused();
    const [getBill, { data, error, isError, isLoading, isFetching }] = useLazyGetBillQuery();
    const [tempData, setTempData] = useState<GetBillResponse[] | []>([]);
    const [updateBill, { data: dataUpdateBill, isError: isErrorUpdateBill, error: errorUpdateBill, isLoading: isLoadingUpdateBill, reset, isSuccess }] = useUpdateBillMutation();

    // Get data first time get in
    useEffect(() => {
        token && email && getBillAction();
    }, [token, email]);

    const getBillAction = async () => {
        const data: GetBill = {
            username: email
        }
        await getBill({ data: data, token: token });
    }

    useEffect(() => {
        if (data?.data.length) {
            console.log("---------------useEffect-----------------")
            setTempData(data?.data);
        }
        if (isError && isFocussed) {
            console.log('====================================');
            console.log(JSON.stringify(error));
            console.log('====================================');
        }
    }, [isError, error, isLoading, data]);

    // Update new data from server when user go out screen
    useEffect(() => {
        !isFocussed && getBillAction();
    }, [isFocussed]);

    const handleDeleteBill = async (billCode: string) => {
        const newData = tempData.filter(item => item.code !== billCode) ?? [];
        setTempData(newData);
        if (token && billCode) {
            try {
                const data: UpdateBill = {
                    code: billCode,
                    status: -1
                }
                await updateBill({ data: data, token: token });
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        if (isFocussed && isErrorUpdateBill) {
            console.log('================isError====================');
            console.log(JSON.stringify(errorUpdateBill));
            console.log('====================================');
        }
        if (isErrorUpdateBill || isSuccess) reset();
    }, [isFocussed, isErrorUpdateBill, errorUpdateBill, isSuccess, dataUpdateBill]);


    const handleOnPressPrintfBill = async (bill: GetBillResponse) => {
        const result = await requestStoragePermission();
        if (result) {
            await handlePrintfBill(bill)
        };
    }

    const requestStoragePermission = async () => {
        let resultOfPermission = true;
        try {
            const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            if (result !== RESULTS.GRANTED) {
                resultOfPermission = false;
            }
        } catch (error) {
            console.error('Error requesting storage permission', error);
            resultOfPermission = false;
        }
        return resultOfPermission;
    };

    return (
        <ContainerComponent
            isFull
            backgroundColor={Colors.WHITE}
        >
            {
                isLoading ? <BillSkeletonComponent /> : <FlatList
                    data={tempData ? tempData.filter((item) => item.status !== -1) : []}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (<BillDetailsItem onDelete={handleDeleteBill} bill={item} onPrintf={handleOnPressPrintfBill} />)}
                />
            }
            {
                (isFetching || isLoadingUpdateBill) && isFocussed && !isLoading && <LoadingComponent
                    title={'Đang tải dữ liệu...'}
                    size={Variables.FONT_SIZE_ERROR_TEXT}
                    color={Colors.WHITE}
                    icon=''
                    iconSize={moderateScale(25)}
                    iconColor={Colors.GREEN_500}
                />
            }
        </ContainerComponent>
    )
}

export default BillScreen