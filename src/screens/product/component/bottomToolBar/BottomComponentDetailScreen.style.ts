import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.WHITE,
    width: '100%',
  },
  leftContainer: {
    width: '60%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rightContainer: {
    width: '40%',
    backgroundColor: Colors.GREEN_500,
    paddingVertical: 10,
  },
});
