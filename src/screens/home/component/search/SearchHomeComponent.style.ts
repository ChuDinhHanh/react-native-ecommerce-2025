import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import {Variables} from '../../../../constants/Variables';
import {moderateScale} from '../../../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateScale(40),
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
    borderRadius: 5,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: Colors.BLACK,
  },
  text: {
    fontSize: Variables.FONT_SIZE_PLACEHOLDER,
    color: Colors.BLACK,
  },
});
