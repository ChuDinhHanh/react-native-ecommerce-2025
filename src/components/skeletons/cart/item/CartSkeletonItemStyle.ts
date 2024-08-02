import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {moderateScale} from '../../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    height: moderateScale(200),
    marginRight: moderateScale(10),
    borderRadius: 5,
    borderColor: Colors.COLOR_GREY_FEEBLE,
    marginBottom: moderateScale(10),
    padding: moderateScale(16),
  },
});
