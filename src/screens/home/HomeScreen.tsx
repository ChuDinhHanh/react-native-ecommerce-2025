import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-multi-lang'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import ProductBannerComponent from '../../components/banner/product/ProductBannerComponent'
import CategoriesComponent from '../../components/categories/CategoriesComponent'
import ContainerComponent from '../../components/container/ContainerComponent'
import SessionComponent from '../../components/session/SessionComponent'
import { Colors } from '../../constants/Colors'
import { appInfo } from '../../constants/Infos'
import { DETAIL_CATEGORY_SCREEN, SEARCH_SCREEN, SERVICE_STACK_NAVIGATOR } from '../../constants/Screens'
import { SingleProductData } from '../../data/SingleProductData'
import { useAppSelector } from '../../redux/Hooks'
import { RootStackParamList } from '../../routes/Routes'
import { moderateScale } from '../../utils/ScaleUtils'
import BestSellingComponent from './component/bestSelling/BestSellingComponent'
import HeaderHomeComponent from './component/header/HeaderHomeComponent'
import NewWestProduceComponent from './component/newest/NewWestProduceComponent'
import SearchHomeComponent from './component/search/SearchHomeComponent'

const HomeScreen = () => {
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { language } = useAppSelector((state) => state.SpeedReducer);

  const handlePressCategoryEvent = (code: string) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: DETAIL_CATEGORY_SCREEN,
      params: {
        code: code
      }
    } as any)
  }
  const handleClickSearchEvent = useCallback(() => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: SEARCH_SCREEN,
      params: null
    } as any)
  }, []);

  return (
    <ContainerComponent
      isFull
      backgroundColor={Colors.WHITE}
      isScrollEnable
    >
      <SessionComponent>
        {/* Header */}
        <HeaderHomeComponent />
        {/* Search */}
        <SearchHomeComponent handleClickSearchEvent={handleClickSearchEvent} />
      </SessionComponent>
      {/* Banner */}
      <ProductBannerComponent
        borderRadius={6}
        autoScroll={true}
        widthOfBanner={appInfo.sizes.WIDTH}
        height={moderateScale(130)}
        data={SingleProductData.images}
        showNode
        paddingHorizontal={16}
      />
      {/* Categories */}
      <CategoriesComponent
        onPress={handlePressCategoryEvent}
      />
      <SessionComponent>
        {/* best selling product */}
        <BestSellingComponent />
        {/* New west product */}
        <NewWestProduceComponent />
      </SessionComponent>
    </ContainerComponent>
  )
}

export default HomeScreen