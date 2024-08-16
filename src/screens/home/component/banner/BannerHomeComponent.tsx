import React, { useEffect } from 'react'
import ProductBannerComponent from '../../../../components/banner/product/ProductBannerComponent'
import { appInfo } from '../../../../constants/Infos'
import { useAppSelector } from '../../../../redux/Hooks'
import { useLazyGetBannerQuery } from '../../../../redux/Service'
import { moderateScale } from '../../../../utils/ScaleUtils'

const BannerHomeComponent = () => {
    const [getBanner, { isError, isFetching, isLoading, isSuccess, error, data }] = useLazyGetBannerQuery();
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";

    useEffect(() => {
        const getBannerAction = async () => {
            try {
                await getBanner({ token: token });
            } catch (error) {

            }
        }
        token && getBannerAction();
    }, [token]);

    useEffect(() => {
        if (data) {
        }
        if (isError) {
        }
    }, [data])

    return (
        <ProductBannerComponent
            borderRadius={6}
            autoScroll={true}
            widthOfBanner={appInfo.sizes.WIDTH}
            height={moderateScale(130)}
            data={data?.data ?? []}
            showNode
            paddingHorizontal={16}
        />
    )
}

export default BannerHomeComponent