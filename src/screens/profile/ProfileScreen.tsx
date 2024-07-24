import React from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import ContainerComponent from '../../components/container/ContainerComponent'
import RowComponent from '../../components/row/RowComponent'
import SessionComponent from '../../components/session/SessionComponent'
import SpaceComponent from '../../components/space/SpaceComponent'
import TextComponent from '../../components/text/TextComponent'
import { Colors } from '../../constants/Colors'
import { Variables } from '../../constants/Variables'
import { globalStyles } from '../../styles/globalStyles'
import { moderateScale, scale } from '../../utils/ScaleUtils'
import ConcessionaryItemComponent from './component/concessionaryItem/ConcessionaryItemComponent'
import OptionItemComponent from './component/optionItem/OptionItemComponent'
import TopBannerComponent from './component/topBanner/TopBannerComponent'
const ProfileScreen = () => {
  return (
    <ContainerComponent isScrollEnable backgroundColor={Colors.WHITE} isFull>
      {/* Banner */}
      <TopBannerComponent />
      {/* Concessionary */}
      <SessionComponent>
        <RowComponent justifyContent='flex-start' alignItems='center'>
          <TextComponent text='Ưu đãi riêng dành cho bạn' color={Colors.BLACK} />
          <SpaceComponent width={scale(5)} />
          <View style={[globalStyles.center, { paddingHorizontal: 5, paddingVertical: .5, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: Colors.GREEN_500 }]}>
            <TextComponent text='Mới' fontSize={14} />
          </View>
        </RowComponent>
      </SessionComponent>
      <Divider />
      {/* List Concessionary */}
      <RowComponent paddingVertical={moderateScale(16)} justifyContent='space-around' alignItems='center'>
        <ConcessionaryItemComponent
          icon={<Entypo name='box' size={Variables.ICON_SIZE_MEDIUM} color={Colors.WHITE} />}
          title={'Đơn đầu tiên'}
          concessionary={'Miễn phí'}
          backgroundColor={"rgb(24, 90, 157)"}
          onPress={() => { }}
        />
        <ConcessionaryItemComponent
          icon={<Ionicons name='ticket' size={Variables.ICON_SIZE_MEDIUM} color={Colors.WHITE} />}
          title={'Mã giảm giá'}
          concessionary={'giảm giá'}
          backgroundColor={"rgb(255 199 55)"}
          onPress={() => { }}
        />
        <ConcessionaryItemComponent
          icon={<MaterialCommunityIcons name='truck-fast' size={Variables.ICON_SIZE_MEDIUM} color={Colors.WHITE} />}
          title={'Miễn phí'}
          concessionary={'Vận chuyển'}
          backgroundColor={"rgb(63 194 162)"}
          onPress={() => { }}
        />
      </RowComponent>
      <Divider />
      {/* History bill */}
      <SessionComponent>
        <RowComponent
          onPress={() => { console.log("xem lịch sử mua hàng") }}
          justifyContent='space-between' alignItems='center'>
          <RowComponent justifyContent='flex-start' alignItems='center'>
            <FontAwesome name="wpforms" size={Variables.ICN_SIZE_TOP_TAB} color={Colors.GREEN_500} />
            <SpaceComponent width={moderateScale(10)} />
            <TextComponent text='Đơn mua' color={Colors.BLACK} />
          </RowComponent>
          <RowComponent justifyContent='flex-start' alignItems='center'>
            <TextComponent fontSize={Variables.FONT_SIZE_ERROR_TEXT} text='Xem lịch sử mua hàng' color={Colors.BLACK} />
            <SpaceComponent width={moderateScale(10)} />
            <AntDesign name="right" size={moderateScale(15)} color={Colors.GREY1} />
          </RowComponent>
        </RowComponent>
      </SessionComponent>
      <Divider />
      {/* Option */}
      <SessionComponent>
        <RowComponent justifyContent='space-around' alignItems='center'>
          <ConcessionaryItemComponent
            icon={<FontAwesome5 name='box-tissue' size={Variables.ICON_SIZE_MEDIUM} color={Colors.GREY1} />}
            title={'Chờ xác nhận'}
            onPress={() => { }}
          />
          <ConcessionaryItemComponent
            icon={<FontAwesome5 name='box' size={Variables.ICON_SIZE_MEDIUM} color={Colors.GREY1} />}
            title={'Chờ lấy hàng'}
            onPress={() => { }}
          />
          <ConcessionaryItemComponent
            icon={<FontAwesome6 name='truck-arrow-right' size={Variables.ICON_SIZE_MEDIUM} color={Colors.GREY1} />}
            title={'Chờ giao hàng'}
            onPress={() => { }}
          />
          <ConcessionaryItemComponent
            icon={<Octicons name='feed-star' size={Variables.ICON_SIZE_MEDIUM} color={Colors.GREY1} />}
            title={'Đánh giá'}
            onPress={() => { }}
          />
        </RowComponent>
      </SessionComponent>
      <Divider />
      {/* had like */}
      <OptionItemComponent
        id={0}
        onPress={() => { }}
        suffix={
          <AntDesign name="hearto" size={Variables.ICN_SIZE_TOP_TAB} color={Colors.GREEN_500} />
        }
        suffixTitle={"Đơn thích"}
        affix={<AntDesign name="right" size={moderateScale(15)} color={Colors.GREY1} />}
        affixTitle={''}
      />
      {/* Following shop */}
      <OptionItemComponent
        id={0}
        onPress={() => { }}
        suffix={
          <Entypo name="shop" size={Variables.ICN_SIZE_TOP_TAB} color={Colors.GREEN_500} />
        }
        suffixTitle={"Shop đang theo dõi"}
        affix={<AntDesign name="right" size={moderateScale(15)} color={Colors.GREY1} />}
        affixTitle={''}
      />
      {/* Had seen currently */}
      <OptionItemComponent
        id={0}
        onPress={() => { }}
        suffix={
          <AntDesign name="clockcircleo" size={Variables.ICN_SIZE_TOP_TAB} color={Colors.GREEN_500} />
        }
        suffixTitle={"Đã xem gần đây"}
        affix={<AntDesign name="right" size={moderateScale(15)} color={Colors.GREY1} />}
        affixTitle={''}
      />
      {/* My opinion */}
      <OptionItemComponent
        id={0}
        onPress={() => { }}
        suffix={
          <AntDesign name="staro" size={Variables.ICN_SIZE_TOP_TAB} color={Colors.GREEN_500} />
        }
        suffixTitle={"Đánh giá của tôi"}
        affix={<AntDesign name="right" size={moderateScale(15)} color={Colors.GREY1} />}
        affixTitle={''}
      />
      {/* Account setting */}
      <OptionItemComponent
        id={0}
        onPress={() => { }}
        suffix={
          <AntDesign name="user" size={Variables.ICN_SIZE_TOP_TAB} color={Colors.GREEN_500} />
        }
        suffixTitle={"Thiết lập tài khoản"}
        affix={<AntDesign name="right" size={moderateScale(15)} color={Colors.GREY1} />}
        affixTitle={''}
      />
      {/* Chat with admin */}
      <OptionItemComponent
        id={0}
        onPress={() => { }}
        suffix={
          <MaterialIcons name="support-agent" size={Variables.ICN_SIZE_TOP_TAB} color={Colors.GREEN_500} />
        }
        suffixTitle={"Chat với Speed"}
        affix={<AntDesign name="right" size={moderateScale(15)} color={Colors.GREY1} />}
        affixTitle={''}
      />
    </ContainerComponent>
  )
}

export default ProfileScreen