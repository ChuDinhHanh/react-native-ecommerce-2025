import {StyleSheet} from 'react-native';
import {moderateScale} from '../../../../utils/ScaleUtils';
import {Colors} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    marginBottom: moderateScale(16),
  },
  rowContent: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryRow: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flagImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    objectFit: 'cover',
    borderWidth: 0.5,
    borderColor: Colors.GREY_FEEBLE,
  },
});
