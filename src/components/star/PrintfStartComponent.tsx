import {View, Text} from 'react-native';
import React from 'react';
import RowComponent from '../row/RowComponent';
import {Colors} from '../../constants/Colors';
import IconEntypo from 'react-native-vector-icons/Entypo';

interface Props {
  rateQty: number;
}

const PrintfStartComponent = (props: Props) => {
  const {rateQty} = props;
  return (
    <RowComponent alignItems="center" justifyContent="flex-start">
      {Array.from({length: 5}, (_, index) => (
        <IconEntypo
          key={index}
          name="star"
          size={15}
          color={index + 1 <= rateQty ? Colors.YELLOW : Colors.GREY_FEEBLE}
        />
      ))}
    </RowComponent>
  );
};

export default PrintfStartComponent;
