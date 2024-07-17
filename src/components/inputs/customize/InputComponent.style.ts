import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {moderateScale, scale, verticalScale} from '../../../utils/ScaleUtils';
import { Variables } from '../../../constants/Variables';

export const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(10),
  },
  input: {
    borderBottomWidth: moderateScale(0.6),
    borderColor: Colors.GREY1,
    padding: moderateScale(10),
    marginBottom: moderateScale(5),
  },
  'container__row--input': {
    padding: moderateScale(10),
    marginBottom: moderateScale(5),
    flex: 1,
    paddingVertical: verticalScale(6),
    fontSize: Variables.FONT_SIZE_PLACEHOLDER,
  },
  container__row: {
    borderBottomWidth: 1,
  },
  container__text: {
    position: 'absolute',
    zIndex: 999,
    right: 0,
    top: -5,
  },
});
