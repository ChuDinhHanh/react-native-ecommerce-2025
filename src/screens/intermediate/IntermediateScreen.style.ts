import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  'container__wrapper--dropdown': {
    borderWidth: 1,
    margin: 15,
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.GREY_FEEBLE,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: Colors.BLACK,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  btnContinue: {
    width: 100,
    height: 45,
    backgroundColor: Colors.COLOR_BTN_BLUE_SECOND,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  txtRegister: {
    color: Colors.WHITE,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container__image: {
    objectFit: 'cover',
  },
  container__wrapper: {
    borderRadius: 10,
    elevation:5
  },
});

export default styles;
