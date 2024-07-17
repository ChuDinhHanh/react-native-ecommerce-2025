import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: moderateScale(20),
  },
  container__image: {
    width: moderateScale(250),
    height: moderateScale(250),
  },
});
