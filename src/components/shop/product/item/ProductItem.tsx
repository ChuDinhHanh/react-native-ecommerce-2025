import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {appInfo} from '../../../../constants/Infos';
import {Variables} from '../../../../constants/Variables';
import {Product} from '../../../../types/other/Product';
import {vietnameseCurrency} from '../../../../utils/FormatNumberUtils';
import RateQtyProductComponent from '../../../rate/RateQtyProductComponent';
import RowComponent from '../../../row/RowComponent';
import SessionComponent from '../../../session/SessionComponent';
import SpaceComponent from '../../../space/SpaceComponent';
import TextComponent from '../../../text/TextComponent';
import {styles} from './ProductItem.style';
import {SERVER_ADDRESS} from '../../../../constants/System';
import FastImage from 'react-native-fast-image';

interface Props {
  item: Product;
  onPress: (id: string) => void;
  marginLeft?: number;
}

const ProductItem = (props: Props) => {
  const {item, onPress, marginLeft} = props;
  return (
    <TouchableOpacity onPress={() => onPress(item.code)}>
      <View key={item.createdAt} style={[styles.container, {marginLeft}]}>
        {item.images.length != 0 && (
          <View style={styles.wrapperImage}>
            {item.images[0].includes('http') ? (
              <FastImage style={styles.image} source={{uri: item.images[0]}} />
            ) : (
              <FastImage
                style={styles.image}
                source={{
                  uri: `${SERVER_ADDRESS}api/get/image/${item.images[0]}`,
                }}
              />
            )}
          </View>
        )}

        <SessionComponent padding={5}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.text,
              {maxWidth: (appInfo.sizes.WIDTH - 20) / 2 - 10},
            ]}>
            {item.name}
          </Text>
          <RowComponent justifyContent={'flex-start'} alignItems="center">
            {/* Price */}
            <TextComponent
              text={vietnameseCurrency(item.priceSaleOff ?? item.price)}
              color={Colors.RED}
              fontWeight="bold"
            />
            <SpaceComponent width={5} />
            {/* Price sale off */}
            {item.priceSaleOff && (
              <TextComponent
                textDecoration="line-through"
                text={vietnameseCurrency(item.price)}
                color={Colors.RED}
                fontSize={12}
              />
            )}
          </RowComponent>
          {/* Fast delivery */}
          {item.shippingUnit === Variables.FAST_DELIVERY && (
            <RowComponent justifyContent={'flex-start'} alignItems="center">
              <FastImage
                style={styles.imageTruck}
                source={require('../../../../assets/images/data/product/truck.png')}
              />
              <SpaceComponent width={5} />
              <View style={styles.cod}>
                <TextComponent
                  text={item.shippingUnit}
                  fontSize={10}
                  color={Colors.RED}
                />
              </View>
            </RowComponent>
          )}
          <RateQtyProductComponent />
        </SessionComponent>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
