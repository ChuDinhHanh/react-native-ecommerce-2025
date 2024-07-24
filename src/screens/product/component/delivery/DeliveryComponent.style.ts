import {StyleSheet} from 'react-native';
import {moderateScale} from '../../../../utils/ScaleUtils';
import {Colors} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  container__wrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  'container__wrapper--inside': {
    flexDirection: 'column',
    alignItems: 'center',
    height: moderateScale(50),
  },
  'wrapper__inside--left': {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: 22,
    borderColor: Colors.GREY_FEEBLE,
    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  'inside__left--node': {
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: 15,
    backgroundColor: Colors.GREY_FEEBLE,
  },
  'wrapper__inside--right': {
    position: 'absolute',
    left: moderateScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  'inside__right--image': {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  'wrapper__inside--divider': {
    width: moderateScale(2),
    height: '100%',
    backgroundColor: Colors.GREY_FEEBLE,
  },
  'wrapper__inside--bottom': {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: 22,
    borderColor: Colors.COLOR_BTN_BLUE_PRIMARY,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'inside__bottom--node': {
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: 15,
    backgroundColor: Colors.COLOR_BTN_BLUE_PRIMARY,
  },
  'bottom__node--right': {
    position: 'absolute',
    left: moderateScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  'node__right--image': {
    width: moderateScale(20),
    height: moderateScale(20),
  },
});
