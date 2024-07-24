import {Alert} from 'react-native';

export const vietnameseCurrency = (money: number) => {
  return money.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
};

export const getFormatQuantity = (quantity: number) => {
  let result: any = null;
  const oneBillion = 1000000000;
  const oneMillion = 1000000;
  const oneThousand = 1000;
  if (quantity >= oneThousand) {
    if (quantity >= oneBillion) {
      result = quantity / oneBillion + 'B';
    } else if (quantity >= oneMillion) {
      result = quantity / oneMillion + 'M';
    } else {
      result = quantity / oneThousand + 'K';
    }
  } else {
    result = quantity;
  }
  return result;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  let formattedPhoneNumber = phoneNumber.trim();

  if (formattedPhoneNumber.startsWith('0')) {
    formattedPhoneNumber = '+84' + formattedPhoneNumber.slice(1);
  } else if (!formattedPhoneNumber.startsWith('+84')) {
    formattedPhoneNumber = '+84' + formattedPhoneNumber;
  }

  if (!/^\+84\d{9,10}$/.test(formattedPhoneNumber)) {
    Alert.alert(
      'Cảnh báo',
      'Invalid phone number format. Please enter a valid Vietnamese phone number.',
    );
  }

  return formattedPhoneNumber;
};
