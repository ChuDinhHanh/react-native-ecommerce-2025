import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { moderateScale } from '../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  'container__row--image': {
    width: moderateScale(100),
    height: moderateScale(100),
    position: 'relative',
  },
  'container__row--inside': {
    width: moderateScale(120),
    height: moderateScale(120),
    backgroundColor: Colors.GREY1,
    borderRadius: moderateScale(60),
    marginVertical: moderateScale(30),
  },
});
