import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/Hooks'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Variables } from '../../constants/Variables';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Routes';
import { AUTHENTICATION_STACK_NAVIGATOR, LOGIN_SCREEN } from '../../constants/Screens';
import { Screen } from 'react-native-screens';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const userLogin = useAppSelector((state) => state.SpeedReducer.userLogin);
  const handleLogOutPressEvent = () => {
    AsyncStorage.removeItem(Variables.USER_LOGIN_KEY);
    AsyncStorage.removeItem(Variables.TOKEN_KEY);
    navigation.navigate(AUTHENTICATION_STACK_NAVIGATOR);
  }

  useEffect(() => {
    const x = async () => {
      await AsyncStorage.getItem(Variables.USER_LOGIN_KEY).then((res)=>{
        console.log(res);
        AsyncStorage.getItem(Variables.TOKEN_KEY).then((res)=>{
          console.log(res);
        })
      })
    }
    x();
  }, [])
  return (
    <View>
      <Text>{
        JSON.stringify(userLogin)
      }</Text>
      <Button title='Logout' onPress={handleLogOutPressEvent} />
    </View>
  )
}

export default HomeScreen