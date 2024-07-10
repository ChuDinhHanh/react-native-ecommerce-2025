import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  wrapperAvatar: {
    borderRadius: 100,
    flex: 0,
  },
  wrapperDefaultAvatar: {
    borderRadius: 100,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.WHITE,
  },
  wrapperName: {
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default styles;
