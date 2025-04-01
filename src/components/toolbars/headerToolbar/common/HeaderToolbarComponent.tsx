import {View, Text} from 'react-native';
import React from 'react';
import RowComponent from '../../../row/RowComponent';
import TextButtonComponent from '../../../buttons/textButton/TextButtonComponent';
import {ToggleButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Variables} from '../../../../constants/Variables';
import IconButtonComponent from '../../../buttons/iconButton/IconButtonComponent';
import SpaceComponent from '../../../space/SpaceComponent';
import {moderateScale} from '../../../../utils/ScaleUtils';
interface Props {
  iconSize: number;
  iconColor: string;
}
const HeaderToolbarComponent = (props: Props) => {
  const {iconColor, iconSize} = props;
  return (
    <RowComponent justifyContent="flex-end" alignItems="center">
      <IconButtonComponent
        typeNoBackground
        icon={
          <Ionicons name="settings-outline" size={iconSize} color={iconColor} />
        }
        onPress={() => {}}
      />
    </RowComponent>
  );
};

export default HeaderToolbarComponent;
