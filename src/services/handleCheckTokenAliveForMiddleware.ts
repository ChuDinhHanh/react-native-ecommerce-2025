import {Alert} from 'react-native';

const url = 'http://10.0.2.2:5181/api/users/token';

export const handleCheckTokenAliveForMiddleware = async (
  token: string,
  refreshToken: string,
) => {
  console.log(
    '=================handleCheckTokenAliveForMiddleware===================',
  );
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({token: token}),
    });
    const responseData = await response.json();
    if (
      responseData.message === 'Token is Expired' &&
      responseData.status === 400
    ) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({refreshToken: refreshToken}),
        });
        const responseData = await response.json();
        if (
          responseData.message === 'Refresh token has expired' &&
          responseData.status === 400
        ) {
          Alert.alert('refresh token expired');
        }
        return;
      } catch (error) {
        Alert.alert('take refresh token error');
      }
    }
    return;
  } catch (error) {
    Alert.alert('take token error');
  }
};
