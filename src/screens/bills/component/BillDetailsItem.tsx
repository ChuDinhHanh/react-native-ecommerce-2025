import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import SessionComponent from '../../../components/session/SessionComponent';
import {useAppSelector} from '../../../redux/Hooks';
import {vietnameseCurrency} from '../../../utils/FormatNumberUtils';
import {styles} from './BillDetailsItem.style';
import {GetBillResponse} from '../../../types/response/GetBillResponse';
import {useTranslation} from 'react-multi-lang';
import {globalStyles} from '../../../styles/globalStyles';

interface Props {
  bill: GetBillResponse;
  onDelete: (code: string) => void;
  onPrintf: (bill: GetBillResponse) => void;
}

const BillDetailsItem = (props: Props) => {
  const {bill, onDelete, onPrintf} = props;
  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const isFocussed = useIsFocused();
  const t = useTranslation(); // Hook for translation

  return (
    <SessionComponent>
      <View style={styles.container}>
        {/* User Information */}
        <View style={[styles.section, globalStyles.center]}>
          <Text style={styles.title}>{t('BillScreen.createdAt')}: {bill.code}</Text>
        </View>
        <View style={[styles.section]}>
          <Text style={styles.text}>
            {t('BillScreen.createdAt')}: {bill.createdAt}
          </Text>
          <Text style={styles.text}>
            {t('BillScreen.paymentMethod')}: {bill.paymentMethod}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>{t('BillScreen.userInfo')}</Text>
          <View style={styles.userInfo}>
            <View>
              <Text style={styles.text}>
                {t('BillScreen.username')}: {bill.user.name}
              </Text>
              <Text style={styles.text}>
                {t('BillScreen.email')}: {bill.user.email}
              </Text>
              <Text style={styles.text}>
                {t('BillScreen.phone')}: {bill.user.phone}
              </Text>
            </View>
          </View>
        </View>

        {/* Shipping Information */}
        <View style={styles.section}>
          <Text style={styles.title}>{t('BillScreen.shippingInfo')}</Text>
          <Text style={styles.text}>
            {t('BillScreen.method')}: {bill.shippingMethod.name}
          </Text>
          <Text style={styles.text}>
            {t('BillScreen.location')}: {bill.shippingMethod.location}
          </Text>
          <Text style={styles.text}>
            {t('BillScreen.price')}: {bill.shippingMethod.price}
          </Text>
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.title}>{t('BillScreen.address')}</Text>
          <Text style={styles.text}>
            {t('BillScreen.description')}: {bill.address.description}
          </Text>
          <Text style={styles.text}>
            {t('BillScreen.deliveryAddress')}: {bill.address.location}
          </Text>
          <Text style={styles.text}>
            {t('BillScreen.contact')}: {bill.address.phoneGet}
          </Text>
          <Text style={styles.text}>
            {t('BillScreen.receiver')}: {bill.address.nameGet}
          </Text>
        </View>

        {/* Bill Items */}
        <View style={styles.section}>
          <Text style={styles.title}>{t('BillScreen.billItems')}</Text>
          <FlatList
            data={bill.billItems}
            keyExtractor={(item, index) => `billItem-${index}`}
            renderItem={({item}) => (
              <View style={styles.billItem}>
                <View>
                  <Text style={styles.text}>
                    {t('BillScreen.nameShop')}: {item.product.author.name}
                  </Text>
                  <Text style={styles.text}>
                    {t('BillScreen.nameProduct')}: {item.product.name}
                  </Text>
                  <Text style={styles.text}>
                    {t('BillScreen.priceLabel')}: {item.product.priceSaleOff}
                  </Text>
                  <Text style={styles.text}>
                    {t('BillScreen.classifies')}: {item.productClassifies}
                  </Text>
                  <Text style={styles.text}>
                    {t('BillScreen.quantity')}: x{item.quantity}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Bill Summary */}
        <View style={styles.section}>
          <Text style={styles.title}>{t('BillScreen.summary')}</Text>
          <Text style={styles.text}>
            {t('BillScreen.totalProductsPrice')}:{' '}
            {vietnameseCurrency(bill.totalProductPrice)}
          </Text>
          <Text style={styles.text}>
            {t('BillScreen.totalPrice')}: {vietnameseCurrency(bill.totalPrice)}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onDelete(bill.code)}>
            <Text style={styles.buttonText}>{t('BillScreen.deleteBill')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.printButton}
            onPress={() => onPrintf(bill)}>
            <Text style={styles.buttonText}>{t('BillScreen.printBill')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SessionComponent>
  );
};

export default BillDetailsItem;
