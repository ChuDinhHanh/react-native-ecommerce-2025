import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: Colors.WHITE,
    elevation: 5,
  },
  container__btn: {
    position: 'absolute',
    left: 10,
    zIndex: 99,
  },
  // Toolbar
  header: {
    height: 40,
  },
  appbarContent: {
    color: '#0065FF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  appbarAction: {
    width: 35,
    height: 35,
  },
});

export default styles;
