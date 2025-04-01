import React, {useEffect, useCallback} from 'react';
import {FlatList, View, Alert} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-multi-lang';

import {useAppSelector} from '../../redux/Hooks';
import {useLazyGetCategoriesQuery} from '../../redux/Service';
import {useAuthService} from '../../services/authService';
import {RootStackParamList} from '../../routes/Routes';

import SessionComponent from '../session/SessionComponent';
import CategorySkeleton from '../skeletons/category/CategorySkeleton';
import SpaceComponent from '../space/SpaceComponent';
import TextComponent from '../text/TextComponent';
import CategoryItemComponent from './component/item/CategoryItemComponent';

import {
  DETAIL_CATEGORY_SCREEN,
  SERVICE_STACK_NAVIGATOR,
} from '../../constants/Screens';
import {styles} from './CategoriesComponent.style';
import {moderateScale} from '../../utils/ScaleUtils';
import {Colors} from '../../constants/Colors';
import {Variables} from '../../constants/Variables';
import {Category} from '../../types/response/Category';

const CategoriesComponent = () => {
  const {handleCheckTokenAlive} = useAuthService();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const t = useTranslation();

  const token = useAppSelector(state => state.SpeedReducer.token) ?? '';
  const refreshToken =
    useAppSelector(state => state.SpeedReducer.userLogin?.refreshToken) ?? '';

  const [getCategories, {data, isError, isLoading, error}] =
    useLazyGetCategoriesQuery();

  const handleGetCategories = useCallback(async () => {
    if (token) {
      try {
        await getCategories({token});
      } catch (error) {
        // Handle error
      }
    }
  }, [token, getCategories]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  const handleError = useCallback(() => {
    if (isError && isFocused) {
      const textError = JSON.parse(JSON.stringify(error));
      const errorMessage = textError?.data?.message || textError?.message;
      if (errorMessage === Variables.ABORTED_ERROR) {
        handleGetCategories();
      } else if (errorMessage === Variables.TOKEN_EXPIRED) {
        handleCheckTokenAlive(token, refreshToken);
      } else {
        // Alert.alert(t("Alert.warning"), t("Alert.systemError"));
      }
    }
  }, [
    isError,
    isFocused,
    error,
    token,
    refreshToken,
    handleCheckTokenAlive,
    t,
  ]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  const handlePressCategoryEvent = (code: string) => {
    navigation.navigate(SERVICE_STACK_NAVIGATOR, {
      screen: DETAIL_CATEGORY_SCREEN,
      params: {code},
    } as any);
  };

  const renderItem = (item: Category, index: number) => {
    const isLastItem = index === data?.data.length! - 1;
    return (
      <>
        {item.level === 1 ? (
          <CategoryItemComponent
            item={item}
            onPress={handlePressCategoryEvent}
          />
        ) : null}

        {isLastItem && <SpaceComponent width={moderateScale(25)} />}
      </>
    );
  };

  if (isLoading) {
    return (
      <SessionComponent>
        <CategorySkeleton />
      </SessionComponent>
    );
  }

  return (
    <View>
      {/* Title */}
      <SessionComponent>
        <TextComponent
          color={Colors.BLACK}
          style={styles.title}
          text={t('HomeScreen.categories_title')}
        />
      </SessionComponent>
      {/* List categories */}
      <FlatList
        horizontal
        data={data?.data}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({item, index}) => renderItem(item, index)}
        ListEmptyComponent={
          <TextComponent text={t('HomeScreen.no_categories')} />
        }
      />
    </View>
  );
};

export default CategoriesComponent;
