import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {appInfo} from '../../../constants/Infos';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listContent: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexBasis: '47%',
    marginHorizontal: '1.5%',
    marginBottom: 10,
  },
});
