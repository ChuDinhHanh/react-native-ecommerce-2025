import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import RateQtyProductComponent from '../../../../components/rate/RateQtyProductComponent'
import RowComponent from '../../../../components/row/RowComponent'
import TextComponent from '../../../../components/text/TextComponent'
import { Colors } from '../../../../constants/Colors'
import { useLikeProductMutation } from '../../../../redux/Service'
import { useAuthService } from '../../../../services/authService'
import { LikeProduct } from '../../../../types/request/LikeProduct'
import { scale } from '../../../../utils/ScaleUtils'
import { debounce } from 'lodash';

interface Props {
    token: string,
    userName: string,
    productCode: string,
    refreshToken: string,
    isLike: boolean;
}
const LikeAndRateComponent = (props: Props) => {
    const { token, userName, productCode, isLike, refreshToken } = props;
    const { handleCheckTokenAlive } = useAuthService();
    const [likeProduct, { isError, isLoading, isSuccess, reset, status, data, error }] = useLikeProductMutation();
    const isFocused = useIsFocused();
    const [_liked, setLiked] = useState(isLike);

    useEffect(() => {
        setLiked(isLike);
    }, [isLike])

    const handleLikeEvent = useCallback(debounce(async () => {
        setLiked(prevLiked => !prevLiked);
        const likeAction = async () => {
            try {
                const likeProductData: LikeProduct = {
                    username: userName,
                    productCode: productCode
                }
                console.log({ data: likeProductData, token: token });
                await likeProduct({ data: likeProductData, token: token });
            } catch (error) {
                setLiked(prevLiked => !prevLiked);
            }
        }
        isFocused && token && userName && productCode && likeAction();
    }, 300), [token, userName, productCode, likeProduct]);

    useEffect(() => {
        if (!isFocused) return;
        if (isError) {
            console.log('=================isError===================');
            console.log(JSON.stringify(isError));
            console.log('====================================');
            const checkTokenExpired = async () => {
                await handleCheckTokenAlive(token, refreshToken);
            }
            checkTokenExpired();
        }
    }, [isError, error, data, isFocused])

    return (
        <RowComponent marginVertical={0} padding={0} justifyContent='space-between' alignItems='center'>
            <RateQtyProductComponent
                rateQty={<TextComponent text="(33)" color={Colors.COLOR_BLUE_BANNER} />}
                fontSize={scale(15)}
                color={Colors.BLACK}
            />
            <IconButton onPress={handleLikeEvent} icon={'heart'} iconColor={_liked ? Colors.RED : Colors.GREY1} />
        </RowComponent>
    )
}

export default LikeAndRateComponent