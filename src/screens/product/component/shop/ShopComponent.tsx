import { View, Text } from 'react-native'
import React from 'react'
import RowComponent from '../../../../components/row/RowComponent'
import { moderateScale } from '../../../../utils/ScaleUtils'
import SpaceComponent from '../../../../components/space/SpaceComponent'
import TextComponent from '../../../../components/text/TextComponent'
import { Colors } from '../../../../constants/Colors'
import ShopItemInfoComponent from '../../../../components/shop/store/info/ShopItemInfoComponent'

interface Props {
  avatar: string;
  name: string;
  productQty: number;
  soldQty: number;
}
const ShopComponent = (props: Props) => {
  const { avatar, name, productQty, soldQty } = props;
  return (
    <>
      <RowComponent
        justifyContent={'flex-start'}
        alignItems="center"
        onPress={() => { console.log("shop") }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: moderateScale(60),
            height: moderateScale(60),
            borderWidth: 1,
            borderColor: Colors.GREEN_500,
            borderRadius: 100,
          }}>
          {/* Avatar */}
        </View>
        <SpaceComponent width={moderateScale(10)} />
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          {/* Name */}
          <TextComponent
            fontWeight="bold"
            text={name}
            color={Colors.BLACK}
          />
        </View>
      </RowComponent>
      <SpaceComponent height={20} />
      {/* product of shop */}
      <RowComponent justifyContent={'flex-start'} alignItems="center">
        <ShopItemInfoComponent
          qty={productQty}
          title={'Products'}
        />
        <ShopItemInfoComponent
          qty={soldQty}
          title={'Total sales'}
        />
      </RowComponent>
      <SpaceComponent height={15} />
      {/* Line under banner voucher */}
      <SpaceComponent height={15} />
    </>
  )
}

export default ShopComponent