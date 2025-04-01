import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {appInfo} from '../../../constants/Infos';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  skeletonBanner: {
    width: appInfo.sizes.WIDTH,
    height: moderateScale(130),
    marginTop: verticalScale(16),
  },
});
