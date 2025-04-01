import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../constants/Colors';
import {Variables} from '../../constants/Variables';
import {RootStackParamList} from '../../routes/Routes';
import {moderateScale} from '../../utils/ScaleUtils';
import TextButtonComponent from '../buttons/textButton/TextButtonComponent';
import DefaultAvatar from '../common/defaultAvatar/DefaultAvatar';
import RowComponent from '../row/RowComponent';
import SpaceComponent from '../space/SpaceComponent';
import PrintfStartComponent from '../star/PrintfStartComponent';
import TextComponent from '../text/TextComponent';
import {FEED_BACK_SCREEN} from '../../constants/Screens';
import {useTranslation} from 'react-multi-lang';

interface Props {
  rate: any;
  data: any;
}

const FeedBackComponent = (props: Props) => {
  const {data, rate} = props;
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const anonymousName = (name: string) => {
    if (!name || name.length < 3) {
      return name;
    }
    const firstAndLastCharacter: string[] = [];
    firstAndLastCharacter.push(name[0]);
    firstAndLastCharacter.push(name[name.length - 1]);
    const encryptName = name.substring(2).replace(/./g, '*');
    const newName =
      firstAndLastCharacter[0] + encryptName + firstAndLastCharacter[1];
    return newName;
  };

  return (
    <React.Fragment>
      {/* Rate total qty */}
      <TextComponent
        text={t('FeedBackText.ratingTitle')}
        color={Colors.BLACK}
        fontSize={Variables.FONT_SIZE_BODY_TEXT}
      />
      <SpaceComponent height={moderateScale(5)} />
      <RowComponent alignItems="center" justifyContent="space-between">
        <RowComponent alignItems="center" justifyContent="flex-start">
          <TextComponent text={`${rate}`} color={Colors.BLACK} />
          <TextComponent text={' / 5 '} color={Colors.GREY1} />
          <PrintfStartComponent rateQty={5} />
        </RowComponent>
        <TextButtonComponent
          spaceSuffix={moderateScale(5)}
          onPress={() => navigation.navigate(FEED_BACK_SCREEN, {id: 1})}
          title={
            <TextComponent
              text={t('FeedBackText.viewAllButton')}
              color={Colors.BLACK}
            />
          }
          isTextFixed
          iconOrImageSuffix={
            <AntDesign
              name="right"
              size={moderateScale(15)}
              color={Colors.BLACK}
            />
          }
        />
      </RowComponent>
      {data?.map((item: any) => (
        <View key={item.id} style={{paddingVertical: 10}}>
          <RowComponent justifyContent="flex-start" alignItems="center">
            <DefaultAvatar
              size={30}
              name={item.user.name[0]}
              image={item.user.avatar}
            />
            <SpaceComponent width={10} />
            <TextComponent
              text={anonymousName(item.user.name)}
              color={Colors.BLACK}
            />
          </RowComponent>
          <SpaceComponent height={5} />
          {/* Star */}
          <PrintfStartComponent rateQty={item.rate} />
          <SpaceComponent height={5} />
          {/* Product name */}
          <TextComponent
            text={t('FeedBackText.productName')}
            color={Colors.GREY1}
          />
          <TextComponent color={Colors.BLACK} text={item.feedBack} />
        </View>
      ))}
    </React.Fragment>
  );
};

export default FeedBackComponent;
