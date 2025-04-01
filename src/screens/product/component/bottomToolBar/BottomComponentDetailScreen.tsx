import React from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-paper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextButtonComponent from '../../../../components/buttons/textButton/TextButtonComponent';
import RowComponent from '../../../../components/row/RowComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {globalStyles} from '../../../../styles/globalStyles';
import {vietnameseCurrency} from '../../../../utils/FormatNumberUtils';
import {moderateScale} from '../../../../utils/ScaleUtils';
import {useTranslation} from 'react-multi-lang';
import {styles} from './BottomComponentDetailScreen.style';

interface Props {
  price: number;
  onPress: (flag: number) => void;
}

const BottomComponentDetailScreen = (props: Props) => {
  const {onPress, price} = props;
  const t = useTranslation();

  return (
    <View style={styles.wrapper}>
      <Divider />
      <RowComponent>
        {/* Left */}
        <View style={[styles.leftContainer, globalStyles.row]}>
          <TextButtonComponent
            typeVertical
            isTextFixed
            iconOrImageAffix={
              <IconAntDesign
                name="message1"
                color={Colors.BLACK}
                size={moderateScale(20)}
              />
            }
            spaceAffix={5}
            title={
              <TextComponent
                fontSize={Variables.FONT_SIZE_ERROR_TEXT}
                text={t('BottomComponentDetailScreen.shop')}
                color={Colors.BLACK}
              />
            }
            onPress={() => onPress(1)}
          />
          <TextButtonComponent
            typeVertical
            isTextFixed
            iconOrImageAffix={
              <Ionicons
                name="cart-outline"
                color={Colors.BLACK}
                size={moderateScale(25)}
              />
            }
            spaceAffix={5}
            title={
              <TextComponent
                fontSize={Variables.FONT_SIZE_ERROR_TEXT}
                text={t('BottomComponentDetailScreen.addToCart')}
                color={Colors.BLACK}
              />
            }
            onPress={() => onPress(2)}
          />
        </View>
        {/* Right */}
        <View style={[styles.rightContainer, globalStyles.center]}>
          <TextButtonComponent
            typeVertical
            isTextFixed
            title={
              <TextComponent
                fontSize={Variables.FONT_SIZE_ERROR_TEXT}
                text={t('BottomComponentDetailScreen.buyNow')}
                color={Colors.WHITE}
              />
            }
            iconOrImageSuffix={
              <TextComponent
                fontWeight="bold"
                text={vietnameseCurrency(price)}
                color={Colors.WHITE}
              />
            }
            onPress={() => onPress(3)}
          />
        </View>
      </RowComponent>
    </View>
  );
};

export default BottomComponentDetailScreen;
