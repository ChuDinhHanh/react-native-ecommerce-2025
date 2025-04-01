import {StyleSheet} from 'react-native';
import {moderateScale} from '../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  wrapperDot: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: moderateScale(5),
    alignSelf: 'center',
  },
  dot: {
    marginHorizontal: 2,
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: 4,
  },
  bannerImages: {
    width: '100%',
    objectFit: 'cover',
  },
});
