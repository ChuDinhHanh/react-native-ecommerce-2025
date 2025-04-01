import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: moderateScale(16),
    borderRadius: moderateScale(5),
  },
  textTitle: {
    flex: 1,
    fontSize: scale(14),
    color: Colors.BLACK,
    marginBottom: verticalScale(10),
  },
});
