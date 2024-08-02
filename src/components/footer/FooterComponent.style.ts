import {StyleSheet} from 'react-native';
import {verticalScale} from '../../utils/ScaleUtils';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    height: verticalScale(75),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 5,
  },
  container__inside: {
    elevation: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  'container__inside--left': {
    alignItems: 'flex-end',
    flex: 1,
  },
  'inside__right--button': {
    height: verticalScale(70),
    backgroundColor: Colors.GREEN_500,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
