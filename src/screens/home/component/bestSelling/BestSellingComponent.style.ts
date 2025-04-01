import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {moderateScale, verticalScale} from '../../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowComponent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemSeparator: {
    height: verticalScale(15),
  },
});

export const getProductItemStyle = (isLastItem: boolean) =>
  isLastItem ? moderateScale(8) : 0;
