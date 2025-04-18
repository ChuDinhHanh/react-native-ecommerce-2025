import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Alert, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {Divider} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import RowComponent from '../../../../components/row/RowComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {CartItem} from '../../../../types/other/CartItem';
import {vietnameseCurrency} from '../../../../utils/FormatNumberUtils';
import {moderateScale, verticalScale} from '../../../../utils/ScaleUtils';
import {styles} from './CartItemComponent.style';
import FastImage from 'react-native-fast-image';

interface Props {
  item: CartItem;
  index: number;
  onPress: (code: string) => void;
  onDelete: (itemCartCode: string, qty: number) => void;
  onChangeQty: (itemCartCode: string, qty: number) => void;
  onUpdate: (item: CartItem, index: number) => void;
}

const CartItemComponent = (props: Props) => {
  const t = useTranslation();
  const {item, index, onPress, onDelete, onChangeQty, onUpdate} = props;
  const [btnChangeQtyIsDisabled, setBtnChangeQtyIsDisabled] = useState(false);

  useEffect(() => {
    let setTimeoutBtn: NodeJS.Timeout;
    if (btnChangeQtyIsDisabled) {
      setTimeoutBtn = setTimeout(() => {
        setBtnChangeQtyIsDisabled(false);
      }, 400);
    }
    return () => setTimeoutBtn && clearTimeout(setTimeoutBtn);
  }, [btnChangeQtyIsDisabled]);

  const handleDeletePress = () => {
    Alert.alert(
      t('CartScreen.title'),
      t('CartScreen.message'),
      [
        {
          text: t('CartScreen.title'),
          style: 'cancel',
        },
        {
          text: t('CartScreen.confirmButton'),
          onPress: () => onDelete(item.itemCartCode, 0),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SessionComponent>
      {/* Top */}
      <RowComponent justifyContent="space-between" alignItems="center">
        <TextButtonComponent
          title={<TextComponent color={Colors.BLACK} text={item.shop.name} />}
          onPress={() => {}}
        />
        <RowComponent justifyContent="center" alignItems="center">
          <IconButtonComponent
            typeNoBackground
            icon={
              <FontAwesome
                size={Variables.ICON_SIZE_SMALL}
                name="pencil-square-o"
                color={Colors.BLACK}
              />
            }
            onPress={() => onUpdate(item, index)}
          />
          <SpaceComponent width={moderateScale(16)} />
          <IconButtonComponent
            typeNoBackground
            icon={
              <FontAwesome
                size={Variables.ICON_SIZE_SMALL}
                name="trash"
                color={Colors.BLACK}
              />
            }
            onPress={handleDeletePress}
          />
        </RowComponent>
      </RowComponent>
      <SpaceComponent height={verticalScale(10)} />
      <RowComponent alignItems="flex-start" justifyContent="space-between">
        {/* Body */}
        {/*Body left */}
        <RowComponent justifyContent="center" alignItems="center">
          <CheckBox
            onClick={() => onPress(item.itemCartCode)}
            isChecked={Boolean(item.status)}
            checkBoxColor={
              item.status ? Colors.COLOR_BTN_BLUE_PRIMARY : undefined
            }
            leftText={'CheckBox'}
          />
          <SpaceComponent width={moderateScale(10)} />
          {item.image.startsWith('http') ? (
            <FastImage style={styles.body__image} source={{uri: item.image}} />
          ) : (
            <FastImage
              style={styles.body__image}
              source={{uri: `http://10.0.2.2:5181/api/get/image/${item.image}`}}
            />
          )}
        </RowComponent>
        <SpaceComponent width={moderateScale(10)} />
        {/* Body right */}
        <View style={styles.body__right}>
          {/* Name */}
          <TextComponent
            numberOfLines={1}
            text={item.product.name}
            color={Colors.BLACK}
          />
          {/* Size */}
          <TextComponent
            numberOfLines={1}
            text={item.product.cartItem_ProductClassifies}
            color={Colors.BLACK}
          />
        </View>
      </RowComponent>
      {/* Price  and qty*/}
      <SpaceComponent height={verticalScale(10)} />
      <RowComponent
        paddingVertical={moderateScale(10)}
        justifyContent="space-between"
        alignItems="center">
        {/* Price */}
        <TextComponent
          color={Colors.BLACK}
          fontWeight="bold"
          text={vietnameseCurrency(Number(item.totalPrice) * item.qty)}
        />
        <RowComponent>
          <TextButtonComponent
            disabled={btnChangeQtyIsDisabled}
            onPress={() => {
              if (!btnChangeQtyIsDisabled) {
                onChangeQty(item.itemCartCode, item.qty - 1);
                setBtnChangeQtyIsDisabled(true);
              }
            }}
            colorDisable={Colors.WHITE}
            title={<TextComponent text="-" color={Colors.BLACK} />}
            borderWidth={0.5}
            paddingHorizontal={moderateScale(12)}
          />
          <SpaceComponent width={moderateScale(1)} />
          <TextButtonComponent
            onPress={() => {}}
            title={<TextComponent text={`${item.qty}`} color={Colors.BLACK} />}
            borderWidth={0.5}
            paddingHorizontal={moderateScale(10)}
          />
          <SpaceComponent width={moderateScale(1)} />
          <TextButtonComponent
            disabled={btnChangeQtyIsDisabled}
            onPress={() => {
              if (!btnChangeQtyIsDisabled) {
                onChangeQty(item.itemCartCode, item.qty + 1);
                setBtnChangeQtyIsDisabled(true);
              }
            }}
            colorDisable={Colors.WHITE}
            title={<TextComponent text="+" color={Colors.BLACK} />}
            borderWidth={0.5}
            paddingHorizontal={moderateScale(10)}
          />
        </RowComponent>
      </RowComponent>
      <SpaceComponent height={verticalScale(10)} />
      <Divider />
    </SessionComponent>
  );
};

export default CartItemComponent;
