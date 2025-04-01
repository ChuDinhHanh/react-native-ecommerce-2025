import {useIsFocused} from '@react-navigation/native';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';
import RateQtyProductComponent from '../../../../components/rate/RateQtyProductComponent';
import RowComponent from '../../../../components/row/RowComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {useLikeProductMutation} from '../../../../redux/Service';
import {useAuthService} from '../../../../services/authService';
import {LikeProduct} from '../../../../types/request/LikeProduct';
import {scale} from '../../../../utils/ScaleUtils';
import {Alert} from 'react-native';
import {useTranslation} from 'react-multi-lang';

interface Props {
  token: string;
  userName: string;
  productCode: string;
  refreshToken: string;
  isLike: boolean;
}
const LikeAndRateComponent = (props: Props) => {
  const t = useTranslation();
  const {token, userName, productCode, isLike, refreshToken} = props;
  const {handleCheckTokenAlive} = useAuthService();
  const [
    likeProduct,
    {isError, isLoading, isSuccess, reset, status, data, error},
  ] = useLikeProductMutation();
  const isFocused = useIsFocused();
  const [_liked, setLiked] = useState(isLike);

  useEffect(() => {
    setLiked(isLike);
  }, [isLike]);

  const handleLikeEvent = useCallback(
    debounce(async () => {
      setLiked(prevLiked => !prevLiked);
      const likeAction = async () => {
        try {
          const likeProductData: LikeProduct = {
            username: userName,
            productCode: productCode,
          };
          await likeProduct({data: likeProductData, token: token});
        } catch (error) {
          //   Handle
        }
      };
      isFocused && token && userName && productCode && likeAction();
    }, 300),
    [token, userName, productCode, likeProduct],
  );

  const handleError = useCallback(() => {
    if (!isFocused) return;
    if (isError && isFocused) {
      setLiked(prevLiked => !prevLiked);
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        handleLikeEvent();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        // Alert.alert(t("Alert.warning"), JSON.stringify(isError));
      }
    }
  }, [isError, error, data, isFocused]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  return (
    <RowComponent
      marginVertical={0}
      padding={0}
      justifyContent="space-between"
      alignItems="center">
      <RateQtyProductComponent
        rateQty={<TextComponent text="(33)" color={Colors.COLOR_BLUE_BANNER} />}
        fontSize={scale(15)}
        color={Colors.BLACK}
      />
      <IconButton
        onPress={handleLikeEvent}
        icon={'heart'}
        iconColor={_liked ? Colors.RED : Colors.GREY1}
      />
    </RowComponent>
  );
};

export default LikeAndRateComponent;
