import messaging from '@react-native-firebase/messaging';

export const getDeviceToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Error getting device token:', error);
    return null;
  }
};
