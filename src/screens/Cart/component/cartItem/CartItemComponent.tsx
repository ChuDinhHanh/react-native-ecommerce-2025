import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import CheckBox from 'react-native-check-box'
import { Divider } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent'
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent'
import RowComponent from '../../../../components/row/RowComponent'
import SessionComponent from '../../../../components/session/SessionComponent'
import SpaceComponent from '../../../../components/space/SpaceComponent'
import TextComponent from '../../../../components/text/TextComponent'
import { Colors } from '../../../../constants/Colors'
import { Variables } from '../../../../constants/Variables'
import { vietnameseCurrency } from '../../../../utils/FormatNumberUtils'
import { moderateScale, verticalScale } from '../../../../utils/ScaleUtils'
import { styles } from './CartItemComponent.style'

interface Props {
    item: any;
    index: number;
    onPress: (index: number) => void;
    onDelete: (itemCartCode: string, qty: number) => void;
    onChangeQty: (itemCartCode: string, qty: number) => void;
}

const CartItemComponent = (props: Props) => {
    const { item, index, onPress, onDelete, onChangeQty } = props;
    const [btnChangeQtyIsDisabled, setBtnChangeQtyIsDisabled] = useState(false);

    useEffect(() => {
        let setTimeoutBtn: NodeJS.Timeout;
        if (btnChangeQtyIsDisabled) {
            setTimeoutBtn = setTimeout(() => {
                setBtnChangeQtyIsDisabled(false)
            }, 400);
        }
        return () => setTimeoutBtn && clearTimeout(setTimeoutBtn);
    }, [btnChangeQtyIsDisabled])

    return (
        (<SessionComponent>
            {/* Top */}
            <RowComponent justifyContent='space-between' alignItems='center'>
                <TextButtonComponent title={<TextComponent color={Colors.BLACK} text={item.shop.name} />} onPress={() => { }} />
                <RowComponent justifyContent='flex-end' alignItems='center'>
                    <IconButtonComponent
                        typeNoBackground
                        icon={
                            <FontAwesome size={Variables.ICON_SIZE_SMALL} name='pencil' color={Colors.GREEN_500} />
                        }
                        onPress={() => { }}
                    />
                    <SpaceComponent width={moderateScale(16)} />
                    <IconButtonComponent
                        typeNoBackground
                        icon={
                            <FontAwesome size={Variables.ICON_SIZE_SMALL} name='trash' color={Colors.RED} />
                        }
                        onPress={() => {
                            onDelete(item.itemCartCode, 0);
                        }}
                    />
                </RowComponent>
            </RowComponent>
            <SpaceComponent height={verticalScale(10)} />
            <RowComponent alignItems='flex-start' justifyContent='space-between'>
                {/* Body */}
                {/*Body left */}
                <RowComponent justifyContent='center' alignItems='center'>
                    <CheckBox
                        onClick={() => onPress(index)}
                        isChecked={item.status}
                        checkBoxColor={item.status ? Colors.COLOR_BTN_BLUE_PRIMARY : undefined}
                        leftText={"CheckBox"}
                    />
                    <SpaceComponent width={moderateScale(10)} />
                    <Image
                        style={styles.body__image}
                        source={{ uri: 'https://vsmall.vn/wp-content/uploads/2022/07/cach-chup-anh-quan-ao-dep-bang-dien-thoai.png' }} />
                </RowComponent>
                <SpaceComponent width={moderateScale(10)} />
                {/* Body right */}
                <View style={styles.body__right}>
                    {/* Name */}
                    <TextComponent numberOfLines={1} text={item.product.name} color={Colors.BLACK} />
                    {/* Size */}
                    <TextComponent numberOfLines={1} text={item.product.cartItem_ProductClassifies} color={Colors.BLACK} />
                </View>
            </RowComponent>
            {/* Price  and qty*/}
            <SpaceComponent height={verticalScale(10)} />
            <RowComponent paddingVertical={moderateScale(10)} justifyContent='space-between' alignItems='center'>
                {/* Price */}
                <TextComponent color={Colors.BLACK} fontWeight='bold' text={vietnameseCurrency(item.totalPrice * item.qty)} />
                <RowComponent>
                    <TextButtonComponent
                        disabled={btnChangeQtyIsDisabled}
                        onPress={() => {
                            if (!btnChangeQtyIsDisabled) {
                                onChangeQty(item.itemCartCode, item.qty - 1);
                                setBtnChangeQtyIsDisabled(true);
                            }
                        }}
                        title={<TextComponent text='-' color={Colors.BLACK} />}
                        borderWidth={.5}
                        paddingHorizontal={moderateScale(12)}
                    />
                    <SpaceComponent width={moderateScale(1)} />
                    <TextButtonComponent
                        onPress={() => { }}
                        title={<TextComponent text={item.qty} color={Colors.BLACK} />}
                        borderWidth={.5}
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
                        title={<TextComponent text='+' color={Colors.BLACK} />}
                        borderWidth={.5}
                        paddingHorizontal={moderateScale(10)}
                    />
                </RowComponent>
            </RowComponent>
            <SpaceComponent height={verticalScale(10)} />
            <Divider />
        </SessionComponent>)
    )
}

export default CartItemComponent