import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(60),
    height: moderateScale(60),
    borderWidth: 1,
    borderColor: Colors.GREEN_500,
    borderRadius: 100,
  },
});
