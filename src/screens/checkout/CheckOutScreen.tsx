import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-multi-lang';
import {FlatList, ScrollView, View} from 'react-native';
import ContainerComponent from '../../components/container/ContainerComponent';
import FooterComponent from '../../components/footer/FooterComponent';
import RowComponent from '../../components/row/RowComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import {Colors} from '../../constants/Colors';
import {PAYMENT_SCREEN} from '../../constants/Screens';
import {RootStackParamList} from '../../routes/Routes';
import {vietnameseCurrency} from '../../utils/FormatNumberUtils';
import {moderateScale, verticalScale} from '../../utils/ScaleUtils';
import {styles} from './CheckOutScreen.style';
import FastImage from 'react-native-fast-image';

const CheckOutScreen = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CHECK_OUT_SCREEN'>>();
  const cartItemChecked = route.params.cartItemChecked;
  const listCodeCartChecked = route.params.listCodeCartChecked;
  const totalPrice = route.params.totalPrice;

  const addCartCheckedAction = async () => {
    navigation.navigate(PAYMENT_SCREEN, {
      listCodeCartChecked: listCodeCartChecked,
    });
  };

  return (
    <ContainerComponent
      isFull
      backgroundColor={Colors.WHITE}
      isScrollEnable={false}>
      <ScrollView>
        {/* List Product checked */}
        <SpaceComponent height={verticalScale(15)} />
        <FlatList
          contentContainerStyle={styles.flatListContent}
          scrollEnabled={false}
          data={cartItemChecked}
          extraData={cartItemChecked}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <SpaceComponent height={verticalScale(15)} />
          )}
          renderItem={({item}) =>
            item.status ? (
              <View style={styles.itemContainer}>
                <RowComponent>
                  {/* Image */}
                  {item.image.startsWith('http') ? (
                    <FastImage
                      style={styles.productImage}
                      source={{uri: item.image}}
                    />
                  ) : (
                    <FastImage
                      style={styles.productImage}
                      source={{
                        uri: `http://10.0.2.2:5181/api/get/image/${item.image}`,
                      }}
                    />
                  )}
                  {/* Product info */}
                  <SpaceComponent width={moderateScale(10)} />
                  <View style={styles.wrapperLeft}>
                    <TextComponent text={item.shop.name} color={Colors.BLACK} />
                    <TextComponent
                      text={`${t('CheckoutScreen.productType')}: ${
                        item.product.cartItem_ProductClassifies
                      }`}
                      color={Colors.GREY1}
                    />
                    <TextComponent
                      text={`${t('CheckoutScreen.quantity')}: ${item.qty}`}
                      color={Colors.GREY1}
                    />
                    <TextComponent
                      text={`${t('CheckoutScreen.price')}: ${vietnameseCurrency(
                        parseInt(item.totalPrice),
                      )}`}
                      color={Colors.GREY1}
                    />
                  </View>
                </RowComponent>
              </View>
            ) : null
          }
        />
      </ScrollView>
      <FooterComponent
        showSelectAllButton={false}
        onPress={addCartCheckedAction}
        totalPrice={totalPrice}
        titleRightButton={t('CheckoutScreen.checkout')}
      />
    </ContainerComponent>
  );
};

export default CheckOutScreen;
