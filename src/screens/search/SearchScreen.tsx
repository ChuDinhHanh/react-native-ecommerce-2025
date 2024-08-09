import React, { useEffect, useMemo } from 'react'
import ContainerComponent from '../../components/container/ContainerComponent'
import SessionComponent from '../../components/session/SessionComponent'
import SearchBarComponent from './component/searchBar/SearchBarComponent'
import { Colors } from '../../constants/Colors'
import { useLazySearchProductQuery } from '../../redux/Service'
import { Alert, FlatList } from 'react-native'
import { useAppSelector } from '../../redux/Hooks'
import { Text } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/Routes'
import { DETAIL_PRODUCT_SCREEN } from '../../constants/Screens'
import ProductItem from '../../components/shop/product/item/ProductItem'
import NothingComponent from '../../components/banner/nothing/NothingComponent'
import { styles } from './SearchScreen.style'
import ProductSkeleton from '../../components/skeletons/product/ProductSkeleton'
import { useAuthService } from '../../services/authService'

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { handleCheckTokenAlive } = useAuthService();
  const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
  const refreshToken = useAppSelector((state) => state.SpeedReducer.userLogin?.refreshToken) ?? "";
  const isFocused = useIsFocused();
  const [searchProduct, {
    isError: isErrorSearchProduct,
    isLoading: isLoadingSearchProduct,
    error: errorSearchProduct,
    data: dataSearchProduct
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
    }
  }

  const handlePressProductEvent = (id: string) => {
    navigation.navigate(DETAIL_PRODUCT_SCREEN, { code: id })
  }

  const handlePrintProductEvent = useMemo(() => (
    (dataSearchProduct?.data.length !== 0) ?
      <FlatList
        scrollEnabled={false}
        keyExtractor={(item: any) => item.id}
        columnWrapperStyle={styles.flatList}
        contentContainerStyle={styles.flatList__content}
        numColumns={2}
        extraData={dataSearchProduct?.data}
        data={dataSearchProduct?.data}
        renderItem={({ item }) => <ProductItem onPress={handlePressProductEvent} item={item} />}
      />
      :
      <NothingComponent />
  ), [dataSearchProduct?.data])

  return (
    <ContainerComponent
      isFull
      backgroundColor={Colors.WHITE}
    >
      <SessionComponent>
        <SearchBarComponent onSubmit={handleSearchProduct} />
        {
          isLoadingSearchProduct ? <ProductSkeleton /> : handlePrintProductEvent
        }
      </SessionComponent>
    </ContainerComponent>
  )
}

export default SearchScreen