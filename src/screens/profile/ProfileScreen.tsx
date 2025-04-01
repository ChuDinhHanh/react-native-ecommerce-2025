import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import ContainerComponent from '../../components/container/ContainerComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import {
  ACCOUNT_SETTING,
  BILL_SCREEN,
  LIST_PRODUCT_LIKED,
  SERVICE_STACK_NAVIGATOR,
} from '../../constants/Screens';
import { Variables } from '../../constants/Variables';
import { useAppSelector } from '../../redux/Hooks';
import { RootStackParamList } from '../../routes/Routes';
import { moderateScale } from '../../utils/ScaleUtils';
import ConcessionaryItemComponent from './component/concessionaryItem/ConcessionaryItemComponent';
import OptionItemComponent from './component/optionItem/OptionItemComponent';
import TopBannerComponent from './component/topBanner/TopBannerComponent';
const ProfileScreen = () => {
  const t = useTranslation();
  const language = useAppSelector(state => state.SpeedReducer.language);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const userLogin = useAppSelector(state => state.SpeedReducer.userLogin);

  const handleClickButtonEvent = useCallback(
    (key: number) => {
      switch (key) {
        case Variables.LIST_PRODUCT_LIKED:
          navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: LIST_PRODUCT_LIKED,
            params: {username: userLogin?.email},
          } as any);
          break;
        case Variables.BILL_SCREEN:
          navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: BILL_SCREEN,
            params: {username: userLogin?.email},
          } as any);
          break;
        case Variables.ACCOUNT_SETTING:
          navigation.navigate(SERVICE_STACK_NAVIGATOR, {
            screen: ACCOUNT_SETTING,
            params: null,
          } as any);
          break;

        default:
          break;
      }
    },
    [userLogin],
  );
  return (
    <ContainerComponent isScrollEnable backgroundColor={Colors.WHITE} isFull>
      {/* Banner */}
      <TopBannerComponent />
      {/* Concessionary */}
      <Divider />
      {/* History bill */}
      <SessionComponent>
        <RowComponent
          onPress={() => handleClickButtonEvent(Variables.BILL_SCREEN)}
          justifyContent="space-between"
          alignItems="center">
          <RowComponent justifyContent="flex-start" alignItems="center">
            <FontAwesome
              name="wpforms"
              size={Variables.ICN_SIZE_TOP_TAB}
              color={Colors.GREEN_500}
            />
            <SpaceComponent width={moderateScale(10)} />
            <TextComponent
              text={t('ProfileScreen.purchaseOrder')}
              color={Colors.BLACK}
            />
          </RowComponent>
          <RowComponent justifyContent="flex-start" alignItems="center">
            <TextComponent
              fontSize={Variables.FONT_SIZE_ERROR_TEXT}
              text={t('ProfileScreen.viewPurchaseHistory')}
              color={Colors.BLACK}
            />
            <SpaceComponent width={moderateScale(10)} />
            <AntDesign
              name="right"
              size={moderateScale(15)}
              color={Colors.GREY1}
            />
          </RowComponent>
        </RowComponent>
      </SessionComponent>
      <Divider />
      {/* Option */}
      <SessionComponent>
        <RowComponent justifyContent="space-around" alignItems="center">
          <ConcessionaryItemComponent
            icon={
              <FontAwesome5
                name="box-tissue"
                size={Variables.ICON_SIZE_MEDIUM}
                color={Colors.GREY1}
              />
            }
            title={'Chờ xác nhận'}
            onPress={() => {}}
          />
          <ConcessionaryItemComponent
            icon={
              <FontAwesome5
                name="box"
                size={Variables.ICON_SIZE_MEDIUM}
                color={Colors.GREY1}
              />
            }
            title={'Chờ lấy hàng'}
            onPress={() => {}}
          />
          <ConcessionaryItemComponent
            icon={
              <FontAwesome6
                name="truck-arrow-right"
                size={Variables.ICON_SIZE_MEDIUM}
                color={Colors.GREY1}
              />
            }
            title={'Chờ giao hàng'}
            onPress={() => {}}
          />
          <ConcessionaryItemComponent
            icon={
              <Octicons
                name="feed-star"
                size={Variables.ICON_SIZE_MEDIUM}
                color={Colors.GREY1}
              />
            }
            title={'Đánh giá'}
            onPress={() => {}}
          />
        </RowComponent>
      </SessionComponent>
      <Divider />
      {/* had like */}
      <OptionItemComponent
        id={0}
        onPress={() => handleClickButtonEvent(Variables.LIST_PRODUCT_LIKED)}
        suffix={
          <AntDesign
            name="hearto"
            size={Variables.ICN_SIZE_TOP_TAB}
            color={Colors.GREEN_500}
          />
        }
        suffixTitle={t('ProfileScreen.likedProducts')}
        affix={
          <AntDesign
            name="right"
            size={moderateScale(15)}
            color={Colors.GREY1}
          />
        }
        affixTitle={''}
      />
      {/* Following shop */}
      <OptionItemComponent
        id={0}
        onPress={() => {}}
        suffix={
          <Entypo
            name="shop"
            size={Variables.ICN_SIZE_TOP_TAB}
            color={Colors.GREEN_500}
          />
        }
        suffixTitle={'Shop đang theo dõi'}
        affix={
          <AntDesign
            name="right"
            size={moderateScale(15)}
            color={Colors.GREY1}
          />
        }
        affixTitle={''}
      />
      {/* My opinion */}
      <OptionItemComponent
        id={0}
        onPress={() => {}}
        suffix={
          <AntDesign
            name="staro"
            size={Variables.ICN_SIZE_TOP_TAB}
            color={Colors.GREEN_500}
          />
        }
        suffixTitle={'Đánh giá của tôi'}
        affix={
          <AntDesign
            name="right"
            size={moderateScale(15)}
            color={Colors.GREY1}
          />
        }
        affixTitle={''}
      />
      {/* Account setting */}
      <OptionItemComponent
        id={0}
        onPress={() => handleClickButtonEvent(Variables.ACCOUNT_SETTING)}
        suffix={
          <AntDesign
            name="user"
            size={Variables.ICN_SIZE_TOP_TAB}
            color={Colors.GREEN_500}
          />
        }
        suffixTitle={t('ProfileScreen.settings')}
        affix={
          <AntDesign
            name="right"
            size={moderateScale(15)}
            color={Colors.GREY1}
          />
        }
        affixTitle={''}
      />
      {/* Chat with admin */}
      <OptionItemComponent
        id={0}
        onPress={() => {}}
        suffix={
          <MaterialIcons
            name="support-agent"
            size={Variables.ICN_SIZE_TOP_TAB}
            color={Colors.GREEN_500}
          />
        }
        suffixTitle={'Chat với Speed'}
        affix={
          <AntDesign
            name="right"
            size={moderateScale(15)}
            color={Colors.GREY1}
          />
        }
        affixTitle={''}
      />
    </ContainerComponent>
  );
};

export default ProfileScreen;
