import {StyleSheet} from 'react-native';
import {appInfo} from '../../constants/Infos';
import {Colors} from '../../constants/Colors';
import {fontFamilies} from '../../constants/FontFamilies';
import {moderateScale, scale, verticalScale} from '../../utils/ScaleUtils';

export const styles = StyleSheet.create({
  container__image: {
    width: scale(120),
    height: verticalScale(120),
    alignSelf: 'center',
    objectFit: 'cover',
    position: 'relative',
    marginVertical: scale(10),
  },
  'container__wrapper--dropdown': {
    borderWidth: 1,
    marginVertical: verticalScale(15),
    padding: moderateScale(10),
    borderRadius: 5,
    borderColor: Colors.GREY_FEEBLE,
  },
  placeholderStyle: {
    fontWeight: 'thin',
    color: Colors.GREY1,
  },
  selectedTextStyle: {
    fontSize: scale(14.5),
    fontWeight: 'thin',
    color: Colors.GREY1,
  },
  iconStyle: {
    width: scale(30),
    height: verticalScale(30),
  },
  'container__wrapper--avatar': {
    justifyContent: 'center',
    alignItems: 'center',
  },
  'container__row--inside': {
    width: scale(110),
    height: scale(110),
    position: 'relative',
    borderRadius: 60,
  },
  'inside__image--avatar': {
    width: '100%',
    height: '100%',
    borderRadius: scale(100),
    borderWidth: 2,
    borderColor: Colors.GREY1,
  },
  'inside__image--button': {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  container__top: {
    flex: 0.8,
  },
  container__bottom: {
    flex: 0.2,
  },
});
