import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Pressable, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {
  SEARCH_SCREEN,
  SERVICE_STACK_NAVIGATOR,
} from '../../../../constants/Screens';
import {Variables} from '../../../../constants/Variables';
import {RootStackParamList} from '../../../../routes/Routes';
import {styles} from './SearchHomeComponent.style';

const SearchHomeComponent = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClickSearchEvent = useCallback(() => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: SEARCH_SCREEN,
      params: null,
    } as any);
  }, []);

  return (
    <Pressable onPress={handleClickSearchEvent}>
      <View style={styles.container}>
        <AntDesign
          name="search1"
          size={Variables.ICON_SIZE_SMALL}
          style={styles.icon}
        />
        <SpaceComponent width={moderateScale(5)} />
        <TextComponent
          style={styles.text}
          color={Colors.BLACK}
          text={t('HomeScreen.textPlaceholderSearch')}
        />
      </View>
    </Pressable>
  );
};

export default SearchHomeComponent;
