import {StyleSheet} from 'react-native';
import {appInfo} from '../../../constants/Infos';
import {moderateScale} from '../../../utils/ScaleUtils'; // Adjust the import path as needed

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: appInfo.sizes.WIDTH,
    height: moderateScale(200),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  content: {
    margin: moderateScale(16),
  },
  title: {
    width: '60%',
    height: moderateScale(24),
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(8),
  },
  likeAndRate: {
    width: '100%',
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  options: {
    width: '100%',
    height: moderateScale(100),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  returnPolicy: {
    width: '100%',
    height: moderateScale(24),
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(16),
  },
  description: {
    width: '100%',
    height: moderateScale(80),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  feedback: {
    width: '100%',
    height: moderateScale(100),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  shopInfo: {
    width: '100%',
    height: moderateScale(80),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  bottomBar: {
    width: appInfo.sizes.WIDTH,
    height: moderateScale(60),
    borderRadius: moderateScale(8),
    backgroundColor: '#eee',
  },
});
