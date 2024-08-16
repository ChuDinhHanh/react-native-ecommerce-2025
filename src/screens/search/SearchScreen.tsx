import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, FlatList } from 'react-native'
import NothingComponent from '../../components/banner/nothing/NothingComponent'
import ContainerComponent from '../../components/container/ContainerComponent'
import SessionComponent from '../../components/session/SessionComponent'
import ProductItem from '../../components/shop/product/item/ProductItem'
import ProductSkeleton from '../../components/skeletons/product/ProductSkeleton'
import { Colors } from '../../constants/Colors'
import { DETAIL_PRODUCT_SCREEN } from '../../constants/Screens'
import { useAppSelector } from '../../redux/Hooks'
import { useLazySearchProductQuery } from '../../redux/Service'
import { RootStackParamList } from '../../routes/Routes'
import { useAuthService } from '../../services/authService'
import SearchBarComponent from './component/searchBar/SearchBarComponent'
import { styles } from './SearchScreen.style'

const SearchScreen = () => {
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { handleCheckTokenAlive } = useAuthService();
  const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
  const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
  const isFocused = useIsFocused();
  const [searchProduct, {
    isError: isErrorSearchProduct,
    isLoading: isLoadingSearchProduct,
    error: errorSearchProduct,
    data: dataSearchProduct,
    isFetching: isFetchingSearchProduct
  }] = useLazySearchProductQuery();


  useEffect(() => {
    if (isErrorSearchProduct && isFocused) {
      handleCheckTokenAlive(token, refreshToken);
    }
  }, [isErrorSearchProduct, errorSearchProduct, isFocused]);

  const handleSearchProduct = async (value: string) => {
    try {
      await searchProduct({
        name: value,
        token: token ?? ""
      })
    } catch (error) {
      // Handle
      Alert.alert('SearchScreen', JSON.stringify(error));
    }
  }


  const handlePressProductEvent = (id: string) => {
    navigation.navigate(DETAIL_PRODUCT_SCREEN, { code: id })
  }

  const handlePrintProductEvent = useMemo(() => (
    (dataSearchProduct?.data.length !== 0) ?
      <FlatList
        scrollEnabled={false}
        keyExtractor={(item) => item.code.toString()}
        columnWrapperStyle={styles.flatList}
        contentContainerStyle={styles.flatList__content}
        numColumns={2}
        extraData={dataSearchProduct?.data}
        data={dataSearchProduct?.data}
        renderItem={({ item }) => <ProductItem onPress={handlePressProductEvent} item={item} />}
      />
      :
      <NothingComponent effectiveHeight={150} title={t("SearchScreen.productNotFoundTitle")} />
  ), [dataSearchProduct?.data]);

  return (
    <ContainerComponent
      isFull
      backgroundColor={Colors.WHITE}
      isScrollEnable
    >
      <SessionComponent>
        <SearchBarComponent isDisabled={isLoadingSearchProduct || isFetchingSearchProduct} onSubmit={handleSearchProduct} />
        {
          (isLoadingSearchProduct || isFetchingSearchProduct) ? <ProductSkeleton /> : handlePrintProductEvent
        }
      </SessionComponent>
    </ContainerComponent>
  )
}

export default SearchScreen