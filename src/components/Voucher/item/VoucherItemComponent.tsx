import {View, Text} from 'react-native';
import React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import SessionComponent from '../../session/SessionComponent';
import {Colors} from '../../../constants/Colors';
import RowComponent from '../../row/RowComponent';
import TextComponent from '../../text/TextComponent';
import IconButtonComponent from '../../buttons/iconButton/IconButtonComponent';

interface Props {
  id: number;
  content: string;
  onPress: (id: number) => void;
  fontSize?: number;
  color?: string;
  padding?: number;
}

const VoucherItemComponent = (props: Props) => {
  const {content, onPress, id, fontSize, color, padding} = props;
  return (
    <SessionComponent backgroundColor={Colors.WHITE} padding={padding}>
      <RowComponent justifyContent="space-between" alignItems="center">
        <TextComponent
          fontWeight="bold"
          text={content}
          fontSize={fontSize ?? 18}
          color={color ?? Colors.BLACK}
        />
        <IconButtonComponent
          onPress={() => {}}
          typeNoBackground
          icon={<IconAntDesign name="right" size={15} color={Colors.GREY1} />}
        />
      </RowComponent>
    </SessionComponent>
  );
};

export default VoucherItemComponent;
