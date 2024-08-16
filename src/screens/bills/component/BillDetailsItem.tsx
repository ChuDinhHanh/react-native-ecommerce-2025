import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import SessionComponent from '../../../components/session/SessionComponent';
import { useAppSelector } from '../../../redux/Hooks';
import { vietnameseCurrency } from '../../../utils/FormatNumberUtils';
import { styles } from './BillDetailsItem.style';
import { GetBillResponse } from '../../../types/response/GetBillResponse';

interface Props {
    bill: GetBillResponse;
    onDelete: (code: string) => void;
    onPrintf: (bill: GetBillResponse) => void;
}
const BillDetailsItem = (props: Props) => {
    const { bill, onDelete, onPrintf } = props;
    const token = useAppSelector((state) => state.SpeedReducer.token) ?? "";
    const isFocussed = useIsFocused();

    return (
        <SessionComponent>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>User Information</Text>
                    <View style={styles.userInfo}>
                        <View>
                            <Text style={styles.text}>{bill.user.name}</Text>
                            <Text style={styles.text}>{bill.user.email}</Text>
                            <Text style={styles.text}>{bill.user.phone}</Text>
                        </View>
                    </View>
                </View>

                {/* Shipping Information */}
                <View style={styles.section}>
                    <Text style={styles.title}>Shipping Information</Text>
                    <Text style={styles.text}>Method: {bill.shippingMethod.name}</Text>
                    <Text style={styles.text}>Location: {bill.shippingMethod.location}</Text>
                    <Text style={styles.text}>Price: {bill.shippingMethod.price}</Text>
                </View>

                {/* Address */}
                <View style={styles.section}>
                    <Text style={styles.title}>Address</Text>
                    <Text style={styles.text}>{bill.address.description}</Text>
                    <Text style={styles.text}>{bill.address.location}</Text>
                    <Text style={styles.text}>Contact: {bill.address.phoneGet}</Text>
                    <Text style={styles.text}>Receiver: {bill.address.nameGet}</Text>
                </View>

                {/* Bill Items */}
                <View style={styles.section}>
                    <Text style={styles.title}>Bill Items</Text>
                    <FlatList
                        data={bill.billItems}
                        keyExtractor={(item, index) => `billItem-${index}`}
                        renderItem={({ item }) => (
                            <View style={styles.billItem}>
                                <View>
                                    <Text style={styles.text}>{item.product.name}</Text>
                                    <Text style={styles.text}>Price: {item.product.priceSaleOff}</Text>
                                    <Text style={styles.text}>Classifies: {item.productClassifies}</Text>
                                    <Text style={styles.text}>Quantity: {item.quantity}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>

                {/* Bill Summary */}
                <View style={styles.section}>
                    <Text style={styles.title}>Summary</Text>
                    <Text style={styles.text}>Total Products Price: {vietnameseCurrency(bill.totalProductPrice)}</Text>
                    <Text style={styles.text}>Total Price: {vietnameseCurrency(bill.totalPrice)}</Text>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => onDelete(bill.code)}>
                        <Text style={styles.buttonText}>Xóa hóa đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.printButton} onPress={() => onPrintf(bill)}>
                        <Text style={styles.buttonText}>In hóa đơn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SessionComponent>
    );
};

export default BillDetailsItem;
