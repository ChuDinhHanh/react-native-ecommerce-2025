import {View, Text} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {styles} from './DropdownComponent.style';
import {useTranslation} from 'react-multi-lang';
import {Colors} from '../../constants/Colors';

interface TypeItemDropdown {
  name: string;
  value: string;
}

interface Props {
  touched: boolean | undefined;
  errors: string | undefined;
  dropdownData: TypeItemDropdown[];
  values: TypeItemDropdown | string | null | undefined;
  onSetFieldValue: (title: string, item: any) => void;
  onSetValue: (item: any) => void;
  placeHolder: string;
  FieldValue: string;
}

const DropdownComponent = (props: Props) => {
  const {
    errors,
    touched,
    dropdownData,
    values,
    onSetFieldValue,
    onSetValue,
    placeHolder,
    FieldValue,
  } = props;
  const t = useTranslation();
  return (
    <Dropdown
      style={[
        styles['container__wrapper--dropdown'],
        {
          borderColor: touched
            ? errors
              ? Colors.RED
              : Colors.COLOR_GREEN_SUCCESS
            : Colors.GREY_FEEBLE,
        },
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={dropdownData}
      labelField="name"
      valueField="value"
      placeholder={t(placeHolder)}
      value={values}
      onChange={item => {
        onSetFieldValue(FieldValue, item.value);
        onSetValue(item.value);
      }}
    />
  );
};

export default DropdownComponent;
