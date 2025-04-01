import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {moderateScale, scale, verticalScale} from '../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  wrapper_input: {
    overflow: 'hidden',
    width: moderateScale(40),
    height: verticalScale(50),
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.GREY_FEEBLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: scale(18),
    width: '100%',
    height: '100%',
  },
});
