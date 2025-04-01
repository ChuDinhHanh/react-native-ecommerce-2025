import {StyleSheet} from 'react-native';
import {appInfo} from '../../../../constants/Infos';
import {Colors} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: Colors.WHITE,
  },
  text: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  wrapperImage: {
    width: (appInfo.sizes.WIDTH - 10) / 2 - 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTruck: {
    width: 20,
    height: 20,
  },
  cod: {
    borderWidth: 0.5,
    borderColor: Colors.GREY1,
    borderRadius: 2,
    paddingHorizontal: 2,
  },
});
