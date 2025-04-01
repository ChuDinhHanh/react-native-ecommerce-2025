import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-paper'
import RowComponent from '../../../../components/row/RowComponent'
import SessionComponent from '../../../../components/session/SessionComponent'
import SpaceComponent from '../../../../components/space/SpaceComponent'
import { moderateScale } from '../../../../utils/ScaleUtils'
import TextComponent from '../../../../components/text/TextComponent'
import { Colors } from '../../../../constants/Colors'
interface Props {
  id: number;
  onPress: (id: number) => void;
  suffix: ReactNode;
  suffixTitle?: string;
  affix: ReactNode;
  affixTitle?: string;
}
const OptionItemComponent = (props: Props) => {
  const { id, affix, affixTitle, onPress, suffix, suffixTitle } = props;
  return (
    <View>
      <SessionComponent>
        <RowComponent
          onPress={() => onPress(id)}
          justifyContent='space-between' alignItems='center'>
          <RowComponent justifyContent='flex-start' alignItems='center'>
            {suffix}
            <SpaceComponent width={moderateScale(10)} />
            {suffixTitle && <TextComponent text={suffixTitle} color={Colors.BLACK} />}
          </RowComponent>
          <RowComponent justifyContent='flex-start' alignItems='center'>
            {affixTitle && <TextComponent text={affixTitle} color={Colors.BLACK} />}
            <SpaceComponent width={moderateScale(10)} />
            {affix}
          </RowComponent>
        </RowComponent>
      </SessionComponent>
      <Divider />
    </View>
  )
}

export default OptionItemComponent