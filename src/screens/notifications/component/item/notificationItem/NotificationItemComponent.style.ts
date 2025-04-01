import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container__left: {
    width: moderateScale(80),
    height: moderateScale(80),
    marginTop: verticalScale(5),
  },
  'container__left--image': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  'container__left--overlay': {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
