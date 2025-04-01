import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../../../../utils/ScaleUtils';
import {Colors} from '../../../../../constants/Colors';

export const styles = StyleSheet.create({
  container__left: {
    width: moderateScale(60),
    height: moderateScale(60),
    marginTop: verticalScale(5),
  },
  'container__left--image': {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    objectFit: 'cover',
    borderWidth: 0.5,
    borderColor: Colors.BLACK,
  },
  'container__left--overlay': {
    position: 'absolute',
    borderRadius: 9999,
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderColor: Colors.BLACK,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container__center: {
    flex: 1,
  },
  'container__right--icon': {
    marginTop: verticalScale(5),
  },
  'right__icon--item': {
    padding: moderateScale(10),
  },
});
