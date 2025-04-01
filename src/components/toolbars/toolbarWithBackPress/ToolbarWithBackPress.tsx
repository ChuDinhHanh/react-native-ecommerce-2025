import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {Colors} from '../../../constants/Colors';
import IconButtonComponent from '../../buttons/iconButton/IconButtonComponent';
import TextComponent from '../../text/TextComponent';
import styles from './ToolbarWithBackPress.style';

interface Props {
  title: string;
  isExit?: boolean;
  hideBackPressButton?: boolean;
  isCartScreen?: boolean;
}

export default function ToolbarWithBackPress(props: Props) {
  const {title, isExit, hideBackPressButton, isCartScreen} = props;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleGoBack = () => {
    if (Boolean(isExit) && isExit) {
      BackHandler.exitApp();
    } else {
      navigation.goBack();
      if (isCartScreen) navigation.setParams({});
    }
  };

  return (
    <View style={styles.container}>
      {hideBackPressButton ?? (
        <IconButtonComponent
          iconSize={18}
          iconName="chevron-left"
          iconColor="#000"
          onPress={() => handleGoBack()}
          inactiveBackgroundColor="#ffffff00"
          activeBackgroundColor="#ffffff1a"
          customStyle={styles.container__btn}
        />
      )}

      <TextComponent color={Colors.BLACK} fontSize={18} text={title} />
    </View>
  );
}
