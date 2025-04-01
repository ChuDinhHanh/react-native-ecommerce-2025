import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/ScaleUtils';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  flatList: {
    justifyContent: 'space-between',
  },
  flatList__content: {
    marginVertical: moderateScale(40),
  },
  wrapperSkeleton: {
    marginTop: verticalScale(20),
  },
});
