import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {moderateScale, verticalScale} from '../../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container__left: {
    flex: 1,
    height: verticalScale(42),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
    borderRadius: 5,
    paddingLeft: 5,
  },
  container__input: {
    flex: 1,
  },
  container__btn: {
    padding: 7,
    borderRadius: 5,
    marginRight: 5,
  },
  container__right: {
    backgroundColor: Colors.WHITE,
    padding: moderateScale(8),
    borderRadius: 5,
    marginRight: 5,
    elevation: 5,
    marginLeft: 5,
  },
});
