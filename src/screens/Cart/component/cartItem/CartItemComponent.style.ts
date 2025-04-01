import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {moderateScale} from '../../../../utils/ScaleUtils';
import {appInfo} from '../../../../constants/Infos';

export const styles = StyleSheet.create({
  body__image: {
    width: moderateScale(120),
    height: moderateScale(140),
    borderWidth: 0.5,
    borderColor: Colors.GREY1,
  },
  body__right: {
    flex: 1,
  },
});
