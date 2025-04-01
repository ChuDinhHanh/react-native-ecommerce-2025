import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../../utils/ScaleUtils';
import {Colors} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  'container__session--flatList': {
    marginBottom: moderateScale(40),
  },
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  flatListContent: {
    paddingVertical: verticalScale(50),
  },
  flatList: {
    flex: 1,
    backgroundColor: 'red',
  },
});
