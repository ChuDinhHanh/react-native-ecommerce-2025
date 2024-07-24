import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, View } from 'react-native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ProductBannerComponent from '../../components/banner/product/ProductBannerComponent'
import IconButtonComponent from '../../components/buttons/iconButton/IconButtonComponent'
import CategoriesComponent from '../../components/categories/CategoriesComponent'
import DefaultAvatar from '../../components/common/defaultAvatar/DefaultAvatar'
import ContainerComponent from '../../components/container/ContainerComponent'
import RowComponent from '../../components/row/RowComponent'
import SessionComponent from '../../components/session/SessionComponent'
import SpaceComponent from '../../components/space/SpaceComponent'
import TextComponent from '../../components/text/TextComponent'
import { Colors } from '../../constants/Colors'
import { appInfo } from '../../constants/Infos'
import { DETAIL_CATEGORY_SCREEN, SEARCH_SCREEN, SERVICE_STACK_NAVIGATOR } from '../../constants/Screens'
import { Variables } from '../../constants/Variables'
import { SingleProductData } from '../../data/SingleProductData'
import { RootStackParamList } from '../../routes/Routes'
import { moderateScale } from '../../utils/ScaleUtils'

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
    >
      <SessionComponent>
        <RowComponent justifyContent='space-between' alignItems='center'>
          {/* Top */}
          <IconButtonComponent onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} iconName='bars' />
          <Pressable onPress={() => { console.log("avatar") }}>
            <DefaultAvatar size={moderateScale(50)} name='Hanh' />
          </Pressable>
        </RowComponent>
        {/* Title welcome*/}
        <TextComponent fontSize={Variables.FONT_SIZE_SUBTITLE} text='Chào mừng đến với speed,' color={Colors.BLACK} />
        <TextComponent fontSize={Variables.FONT_SIZE_BODY_TEXT} text='Sàn thương mại điện tử số 1 Việt Nam' color={Colors.BLACK} />
        <SpaceComponent height={moderateScale(16)} />
        {/* Search */}
        <Pressable onPress={handleClickSearchEvent}>
          <View style={{ width: '100%', height: moderateScale(50), backgroundColor: Colors.COLOR_GREY_FEEBLE, borderRadius: 100, justifyContent: 'flex-start', paddingLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='search1' size={Variables.ICON_SIZE_SMALL} color={Colors.BLACK} />
            <SpaceComponent width={moderateScale(5)} />
            <TextComponent fontSize={Variables.FONT_SIZE_PLACEHOLDER} text='Tìm kiếm' color={Colors.BLACK} />
          </View>
        </Pressable>
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
    </ContainerComponent>
  )
}

export default HomeScreen