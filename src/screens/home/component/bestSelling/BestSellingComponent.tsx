import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-multi-lang';
import { FlatList, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import RowComponent from '../../../../components/row/RowComponent';
import ProductItem from '../../../../components/shop/product/item/ProductItem';
import ProductSkeleton from '../../../../components/skeletons/product/ProductSkeleton';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import { Colors } from '../../../../constants/Colors';
import { DETAIL_PRODUCT_SCREEN, LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST, SERVICE_STACK_NAVIGATOR } from '../../../../constants/Screens';
import { Variables } from '../../../../constants/Variables';
import { useAppSelector } from '../../../../redux/Hooks';
import { useLazyGetHostProductQuery } from '../../../../redux/Service';
import { RootStackParamList } from '../../../../routes/Routes';
import { useAuthService } from '../../../../services/authService';
import { Token } from '../../../../types/common/Token';
import { GetHostProduce } from '../../../../types/request/GetHostProduce';
import { verticalScale } from '../../../../utils/ScaleUtils';
import { getProductItemStyle, styles } from './BestSellingComponent.style';

const BestSellingComponent = () => {
    const t = useTranslation();
    const { handleCheckTokenAlive } = useAuthService();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
    const [getHostProduct, { data, isError, isFetching, isLoading, error }] = useLazyGetHostProductQuery();
    const isFocused = useIsFocused();

    useEffect(() => {
        const handleGetCategories = async () => {
            try {
                if (token) {
                    const getNewProductData: GetHostProduce = {
                        page: 1,
                        productInPage: 6,
                    }
                    const tokenData: Token = {
                        token: token
                    }
                    await getHostProduct({ data: getNewProductData, token: tokenData });
                }
            } catch (error) {
                // Handle error
            }
        }
        handleGetCategories();
    }, [token]);

    useEffect(() => {
        if (isError && isFocused) {
            handleCheckTokenAlive(token, refreshToken);
        }
    }, [data, isError, isFetching, isFocused]);

    const handlePressProductEvent = (id: string) => {
        navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: DETAIL_PRODUCT_SCREEN,
            params: { code: id }
        } as any)
    };

    const handlePressSeeAllEvent = () => {
        navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: LATEST_PRODUCT_LIST_AND_BEST_SELLING_PRODUCT_LIST,
            params: { products: data?.data }
        } as any)
    }
    return (
        <View style={styles.container}>
            <RowComponent justifyContent='space-between' alignItems='center'>
                <TextComponent fontWeight='bold' text={t("HomeScreen.best_selling_title")} color={Colors.BLACK} />
                {
                    (!isLoading) && <TextButtonComponent
                        isTextFixed
                        disabled={isLoading}
                        spaceSuffix={5}
                        iconOrImageSuffix={<AntDesign name='right' color={Colors.BLACK} />}
                        onPress={handlePressSeeAllEvent}
                        title={<TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} text={t("HomeScreen.best_selling_title")} color={Colors.BLACK} />}
                    />
                }
            </RowComponent>
            {
                isLoading ? <ProductSkeleton /> : <>
                    <SpaceComponent height={verticalScale(16)} />
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        ItemSeparatorComponent={() => <SpaceComponent height={styles.itemSeparator.height} />}
                        data={data?.data}
                        extraData={data?.data}
                        renderItem={({ item, index }) => (
                            <ProductItem
                                marginLeft={getProductItemStyle(index === (data!.data.length - 1))}
                                item={item}
                                onPress={handlePressProductEvent}
                            />
                        )}
                    />
                </>
            }
        </View>
    )
}

export default BestSellingComponent;
