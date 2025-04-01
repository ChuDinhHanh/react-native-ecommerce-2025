import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    backgroundColor: '#fff',
    borderRadius: moderateScale(3),
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  section: {
    marginBottom: verticalScale(20),
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingBottom: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    color: '#333',
  },
  text: {
    fontSize: moderateScale(14),
    color: '#555',
    marginBottom: verticalScale(4),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: moderateScale(12),
  },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    borderColor: '#E0E0E0',
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
  },
  productImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    marginRight: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  cancelButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#FF6B6B',
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  printButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#4CAF50',
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(14),
    color: '#FFF',
    fontWeight: 'bold',
  },
});
