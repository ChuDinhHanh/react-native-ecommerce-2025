import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GREEN_500,
    flex: 1,
  },
  container__inner: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  'container__inner--content': {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  'inner__content--image': {
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
  'inner__content--brand': {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    fontFamily: 'NotoSerifKhojki-SemiBold',
  },
  'inner__content--description': {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    fontFamily:'PlaywritePE-Regular'
  },
  'content__rectangle--first': {
    position: 'absolute',
    top: 0,
    left: -20,
    transform: [{rotate: '20deg'}],
  },
  'content__rectangle--seconds': {
    position: 'absolute',
    top: -150,
    right: 0,
    transform: [{rotate: '-40deg'}],
  },
  'content__rectangle--third': {
    position: 'absolute',
    top: 100,
    right: -200,
    transform: [{rotate: '45deg'}],
  },
  'content__rectangle--fourth': {
    position: 'absolute',
    bottom: 0,
    left: 40,
    transform: [{rotate: '45deg'}],
  },
  'content__rectangle--five': {
    position: 'absolute',
    bottom: 0,
    right: -30,
    transform: [{rotate: '-25deg'}],
  },
  'inner__content--text': {
    position: 'absolute',
    bottom: -60,
    alignSelf: 'center',
  },
});

export default styles;
