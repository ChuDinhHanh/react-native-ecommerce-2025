import React from 'react';
import {View, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent';
import RowComponent from '../../../../components/row/RowComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {moderateScale, scale} from '../../../../utils/ScaleUtils';
import {styles} from './AddressComponent.style';
import {useTranslation} from 'react-multi-lang';

interface Props {
  onPress: () => void;
  addressDisplay: string;
}

const AddressComponent = (props: Props) => {
  const {onPress, addressDisplay} = props;
  const t = useTranslation(); // Use i18n hook for translations

  return (
    <>
      <RowComponent justifyContent="space-between" alignItems="center">
        <View style={styles.iconContainer}>
          {/* Icon */}
          <FontAwesome6
            name="location-dot"
            color={Colors.RED}
            size={Variables.ICON_SIZE_SMALL}
          />
        </View>
        <View style={styles.textContainer}>
          <TextComponent color={Colors.BLACK} text={t('addressScreen.title')} />
        </View>
      </RowComponent>
      <RowComponent justifyContent="space-between" alignItems="center">
        <View style={styles.emptyContainer} />
        <View style={styles.addressContainer}>
          <TextComponent
            fontSize={scale(14)}
            color={Colors.BLACK}
            text={addressDisplay}
          />
        </View>
        <View style={styles.iconButtonContainer}>
          <IconButtonComponent
            typeNoBackground
            onPress={() => onPress()}
            icon={
              <AntDesign
                name="right"
                size={moderateScale(16)}
                color={Colors.BLACK}
              />
            }
          />
        </View>
      </RowComponent>
    </>
  );
};

export default AddressComponent;
