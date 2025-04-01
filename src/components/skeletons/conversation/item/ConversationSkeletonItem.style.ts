import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  messageContent: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
    marginRight: 10,
  },
  senderA: {
    flexDirection: 'row',
  },
  senderB: {
    flexDirection: 'row-reverse',
  },
});
