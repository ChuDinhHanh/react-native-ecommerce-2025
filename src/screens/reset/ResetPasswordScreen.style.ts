import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: verticalScale(20),
  },
  container__image: {
    width: scale(200),
    height: scale(200),
  },
});
