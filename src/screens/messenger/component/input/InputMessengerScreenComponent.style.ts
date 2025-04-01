import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {moderateScale} from '../../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  input: {
    marginHorizontal: moderateScale(16),
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
    flex: 1,
    borderRadius: 100,
    paddingHorizontal: moderateScale(16),
  },
});
