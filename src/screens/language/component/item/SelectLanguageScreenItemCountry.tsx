import React from 'react';
import {Image, ImageSourcePropType, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RowComponent from '../../../../components/row/RowComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {styles} from './SelectLanguageScreenItemCountry.style';
import {moderateScale} from '../../../../utils/ScaleUtils';
import {Colors} from '../../../../constants/Colors';
import FastImage, {Source} from 'react-native-fast-image';

interface Props {
  id: number;
  flag: number | Source | undefined;
  countryName: string;
  isSelected: boolean;
  onSubmit: (id: number) => void;
}

const SelectLanguageScreenItemCountry = (props: Props) => {
  const {countryName, flag, isSelected, onSubmit, id} = props;

  return (
    <Pressable onPress={() => onSubmit(id)} style={styles.container}>
      <RowComponent
        paddingVertical={moderateScale(5)}
        paddingHorizontal={moderateScale(10)}
        alignItems="center"
        justifyContent="space-between">
        {/* Country name and flag */}
        <RowComponent justifyContent="flex-start" alignItems="center">
          <FastImage source={flag} style={styles.flagImage} />
          <SpaceComponent width={moderateScale(20)} />
          <TextComponent color={Colors.BLACK} text={countryName} />
        </RowComponent>
        {/* Icon selected */}
        {isSelected && (
          <AntDesign
            name="checkcircle"
            size={moderateScale(25)}
            color={Colors.GREEN_500}
          />
        )}
      </RowComponent>
    </Pressable>
  );
};

export default SelectLanguageScreenItemCountry;
