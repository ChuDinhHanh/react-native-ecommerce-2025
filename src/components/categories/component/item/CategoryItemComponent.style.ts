import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {moderateScale} from '../../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    height: 200,
    minWidth: 170,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.COLOR_GREY_FEEBLE,
  },
  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textContainer: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
