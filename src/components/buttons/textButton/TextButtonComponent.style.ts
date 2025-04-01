import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ['container__icon--left']: {
    position: 'absolute',
    left: 10,
  },
  ['container__icon--right']: {
    position: 'absolute',
    right: 10,
  },
});
