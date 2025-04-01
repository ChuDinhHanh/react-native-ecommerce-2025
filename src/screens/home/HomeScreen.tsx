import React from 'react';
import { useTranslation } from 'react-multi-lang';
import CategoriesComponent from '../../components/categories/CategoriesComponent';
import ContainerComponent from '../../components/container/ContainerComponent';
import SessionComponent from '../../components/session/SessionComponent';
import { Colors } from '../../constants/Colors';
import { useAppSelector } from '../../redux/Hooks';
import BannerHomeComponent from './component/banner/BannerHomeComponent';
import BestSellingComponent from './component/bestSelling/BestSellingComponent';
import HeaderHomeComponent from './component/header/HeaderHomeComponent';
import NewWestProduceComponent from './component/newest/NewWestProduceComponent';
import SearchHomeComponent from './component/search/SearchHomeComponent';
import { shallowEqual } from 'react-redux';

const HomeScreen = () => {
  const t = useTranslation();
  const { language } = useAppSelector(state => state.SpeedReducer, shallowEqual);

  return (
    <ContainerComponent isFull backgroundColor={Colors.WHITE} isScrollEnable>
      <SessionComponent>
        {/* Header */}
        <HeaderHomeComponent />
        {/* Search */}
        <SearchHomeComponent />
      </SessionComponent>
      {/* Banner x*/}
      <BannerHomeComponent />
      {/* Categories */}
      <CategoriesComponent />
      <SessionComponent>
        {/* best selling product */}
        <BestSellingComponent />
        {/* New west product */}
        <NewWestProduceComponent />
      </SessionComponent>
    </ContainerComponent>
  );
};

export default HomeScreen;
