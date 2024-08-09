import {StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  flatList: {
    justifyContent: 'space-between',
  },
  flatList__content: {
    paddingBottom: moderateScale(100),
  },
});
