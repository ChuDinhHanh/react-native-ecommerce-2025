import React, {ReactNode} from 'react';
import {View} from 'react-native';
import IconButtonComponent from '../../../../components/buttons/iconButton/IconButtonComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {globalStyles} from '../../../../styles/globalStyles';
import {styles} from './ConcessionaryItemComponent.style';

interface Props {
  icon: ReactNode;
  title: string;
  concessionary?: string;
  backgroundColor?: string;
  onPress: (id: number) => void;
}
const ConcessionaryItemComponent = (props: Props) => {
  const {backgroundColor, concessionary, icon, title} = props;
  return (
    <View style={[styles.container, globalStyles.center]}>
      <IconButtonComponent
        typeNoBackground
        icon={icon}
        onPress={() => {}}
        customStyle={[
          styles.container__icon,
          globalStyles.center,
          {backgroundColor: backgroundColor ?? Colors.WHITE},
        ]}
      />
      <TextComponent
        fontSize={Variables.FONT_SIZE_ERROR_TEXT}
        color={Colors.BLACK}
        text={title}
      />
      {concessionary && (
        <TextComponent
          fontSize={Variables.FONT_SIZE_ERROR_TEXT}
          color={Colors.GREY1}
          text={concessionary}
        />
      )}
    </View>
  );
};

export default ConcessionaryItemComponent;
