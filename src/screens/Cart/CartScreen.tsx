import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/Hooks'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Variables } from '../../constants/Variables';
import { useLazyGetCartByUserNameQuery } from '../../redux/Service';
import RowComponent from '../../components/row/RowComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import TextButtonComponent from '../../components/buttons/textButton/TextButtonComponent';
import SessionComponent from '../../components/session/SessionComponent';
import { Checkbox } from 'react-native-paper';
import SpaceComponent from '../../components/space/SpaceComponent';
import { moderateScale } from '../../utils/ScaleUtils';
import { FlatList } from 'react-native';

const CartScreen = () => {
  const user = useAppSelector((state) => state.SpeedReducer.userLogin);
  const [getCartByUserName, { isError, isFetching, isLoading, isSuccess, data, error }] = useLazyGetCartByUserNameQuery();
  const isFocused = useIsFocused();
  useEffect(() => {
    const x = async () => {
      await AsyncStorage.getItem(Variables.TOKEN_KEY).then((res) => {
        if (res) {
          getCartByUserName({ username: user?.email ?? "", token: res })
        }
      })
    }
    x();
  }, [isFocused]);

  console.log('====================================');
  console.log(data?.data.items);
  console.log('====================================');

  return (
    <View>
      <SessionComponent>
        {/* Item */}

        {/* Image */}
        <FlatList
          data={data?.data.items}
          renderItem={({ item, index }) => (
            <View>
              {/* Name */}
              <RowComponent justifyContent='space-between' alignItems='center'>
                <TextButtonComponent title={<TextComponent fontWeight='bold' color={Colors.BLACK} text={'Shop quần áo nam nữ'} />} onPress={() => { }} />
                <TextButtonComponent title={<TextComponent color={Colors.BLACK} text='Sửa' />} onPress={() => { }} />
              </RowComponent>
              <RowComponent alignItems='center' justifyContent='space-between'>
                {/* Checkbox */}
                <Checkbox
                  color={Colors.COLOR_BTN_BLUE_PRIMARY}
                  uncheckedColor={Colors.WHITE}
                  status={'checked'}
                  onPress={() => { }}
                />
                <View style={{ flex: 1 }}>
                  <RowComponent>
                    <Image
                      style={{ width: 120, height: 140, borderWidth: 0.5, borderColor: Colors.GREY1 }}
                      source={{ uri: 'https://vsmall.vn/wp-content/uploads/2022/07/cach-chup-anh-quan-ao-dep-bang-dien-thoai.png' }} />
                    {/* Info */}
                    <SpaceComponent width={moderateScale(10)} />
                    <View style={{ flex: 1, backgroundColor: 'blue' }}>
                      {/* Name */}
                      <TextComponent numberOfLines={1} text={item.product.name} color={Colors.BLACK} />
                      {/* Size */}
                      {
                        <FlatList
                          data={data?.data.items}
                          renderItem={({ item, index }) => (
                            <TextComponent numberOfLines={1} text={JSON.stringify(item.cartItem_ProductClassifies)} color={Colors.BLACK} />
                          )}
                        />
                      }
                    </View>
                  </RowComponent>
                  {/* Price  and qty*/}
                  <View>
                    <RowComponent paddingVertical={moderateScale(10)} justifyContent='space-between' alignItems='center'>
                      {/* Price */}
                      <TextComponent color={Colors.RED} fontWeight='bold' text={item.price} />
                      <RowComponent>
                        <TextButtonComponent justifyContent='center' alignItems='center' width={25} height={25} borderColor='red' borderWidth={1} onPress={() => { }} title={<TextComponent color='red' text='+' />} />
                        <TextButtonComponent justifyContent='center' alignItems='center' width={25} height={25} borderColor='red' borderWidth={1} onPress={() => { }} title={<TextComponent color='red' text={item.quantity} />} />
                        <TextButtonComponent justifyContent='center' alignItems='center' width={25} height={25} borderColor='red' borderWidth={1} onPress={() => { }} title={<TextComponent color='red' text='+' />} />
                      </RowComponent>
                    </RowComponent>
                  </View>
                </View>
              </RowComponent>
            </View>
          )}
        />
      </SessionComponent>
    </View>
  )
}

export default CartScreen