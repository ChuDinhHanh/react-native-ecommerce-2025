import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 0.6,
    borderColor: Colors.GREY1,
    padding: 10,
    marginBottom: 5,
  },
  'container__row--input': {
    padding: 10,
    marginBottom: 5,
    flex: 1,
    paddingVertical:6,
  },
  container__row: {
    borderBottomWidth: 1,
  },
});
