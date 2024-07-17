import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container: {
    flex: 4,
  },
  container__top: {
    flex: 0.5,
  },
  'container__top--image': {
    width: scale(150),
    height: verticalScale(150),
    alignSelf: 'center',
  },
  container__body: {
    flex: 3.1,
  },
  container__bottom: {
    flex: 0.4,
  },
});
