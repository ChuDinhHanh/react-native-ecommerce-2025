import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/ScaleUtils';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: verticalScale(100),
  },
  itemContainer: {
    marginHorizontal: 16,
  },
  productImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderWidth: 0.5,
    borderColor: Colors.GREY1,
  },
  wrapperLeft: {
    flex: 1,
  },
});
