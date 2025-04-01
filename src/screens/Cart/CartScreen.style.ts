import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/ScaleUtils';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
  },
  body__image: {
    width: moderateScale(120),
    height: moderateScale(140),
    borderWidth: 0.5,
    borderColor: Colors.GREY1,
  },
});
