import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/ScaleUtils';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  'container__wrapper--dropdown': {
    borderWidth: 1,
    marginVertical: verticalScale(15),
    padding: moderateScale(10),
    borderRadius: 5,
    borderColor: Colors.GREY_FEEBLE,
  },
  placeholderStyle: {
    fontWeight: 'thin',
    color: Colors.GREY1,
  },
  selectedTextStyle: {
    fontSize: scale(14.5),
    fontWeight: 'thin',
    color: Colors.GREY1,
  },
  iconStyle: {
    width: scale(30),
    height: verticalScale(30),
  },
  'container__wrapper--avatar': {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
