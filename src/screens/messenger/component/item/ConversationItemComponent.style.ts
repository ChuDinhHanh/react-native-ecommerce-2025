import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  wrapper_messenger: {
    width: '86%',
  },
  wrapper_messenger_tier1_not_sender: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  wrapper_messenger_tier1_is_sender: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  wrapper_messenger_Tier2: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: Colors.GREY_FEEBLE,
  },
  'your__wrapper--messenger': {
    backgroundColor: Colors.COLOR_BTN_BLUE_PRIMARY,
  },
  'your__messenger--text': {
    color: Colors.WHITE,
  },
  'another__wrapper--messenger': {
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
  },
  'another__messenger--text': {
    color: Colors.BLACK,
  },
  wrapper_avatar: {
    width: '10%',
  },
  container: {
    marginVertical: 10,
    width: '100%',
  },
});
