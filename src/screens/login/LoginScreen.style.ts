import {StyleSheet} from 'react-native';
import {appInfo} from '../../constants/Infos';

export const styles = StyleSheet.create({
  container__image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  container__top: {
    width: '100%',
    height: appInfo.sizes.HEIGHT * 0.85,
  },
  container__question: {
    height: appInfo.sizes.HEIGHT * 0.05,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
