import React, {useCallback, useState} from 'react';
import {Pressable, View} from 'react-native';
import {styles} from './FooterComponent.style';
import RowComponent from '../row/RowComponent';
import TextComponent from '../text/TextComponent';
import {Variables} from '../../constants/Variables';
import {vietnameseCurrency} from '../../utils/FormatNumberUtils';
import {moderateScale} from '../../utils/ScaleUtils';
import SpaceComponent from '../space/SpaceComponent';
import {Colors} from '../../constants/Colors';
import CheckBox from 'react-native-check-box';
import SessionComponent from '../session/SessionComponent';
import {useTranslation} from 'react-multi-lang';

interface Props {
  onPress: () => void;
  totalPrice: number;
  qty?: number;
  titleRightButton: string;
  onSelectAll?: (checked: boolean) => void;
  showSelectAllButton: boolean;
}

const FooterComponent = (props: Props) => {
  const t = useTranslation();
  const {
    totalPrice,
    onPress,
    qty,
    titleRightButton,
    onSelectAll,
    showSelectAllButton,
  } = props;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClickCheckBox = useCallback(() => {
    setIsChecked(!isChecked);
    onSelectAll && onSelectAll(!isChecked);
  }, [isChecked]);

  return (
    <View style={styles.container}>
      <View style={styles.container__inside}>
        <RowComponent justifyContent="flex-start" alignItems="center">
          {showSelectAllButton && (
            <RowComponent
              paddingHorizontal={moderateScale(16)}
              justifyContent="center"
              alignItems="center">
              <CheckBox
                onClick={handleClickCheckBox}
                isChecked={isChecked}
                checkBoxColor={Colors.BLACK}
                checkedCheckBoxColor={Colors.COLOR_BTN_BLUE_PRIMARY}
                leftText={'CheckBox'}
              />
              <TextComponent
                text={t('CartScreen.checkBoxLabel')}
                fontSize={Variables.FONT_SIZE_CAPTION}
                color={Colors.BLACK}
              />
            </RowComponent>
          )}
          <View style={styles['container__inside--left']}>
            <TextComponent
              fontSize={Variables.FONT_SIZE_ERROR_TEXT}
              text={t('CartScreen.totalAmount')}
              color={Colors.BLACK}
            />
            <TextComponent
              fontSize={Variables.FONT_SIZE_BUTTON_TEXT}
              text={vietnameseCurrency(totalPrice)}
              color={Colors.BLACK}
            />
          </View>
          <SpaceComponent width={moderateScale(10)} />
          <Pressable onPress={onPress} style={styles['inside__right--button']}>
            <TextComponent
              fontWeight="bold"
              text={`${titleRightButton} ${qty ? `(${qty})` : ''}`}
            />
          </Pressable>
        </RowComponent>
      </View>
    </View>
  );
};

export default FooterComponent;
