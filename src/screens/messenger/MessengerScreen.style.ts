import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 16,
  },
  unreadCountContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.RED,
    borderRadius: 20,
  },
  unreadCountText: {
    color: Colors.WHITE,
  },
});
