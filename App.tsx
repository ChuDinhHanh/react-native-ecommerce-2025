import notifee, { AndroidColor, AndroidImportance, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'
import Routes from './src/routes/Routes'

const t = useTranslation();

export default function App() {
  const [loading, setLoading] = useState(true);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log('Notification caused application to open');
      console.log('Press action used to open the app');
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);

    // Subscribe to foreground events
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification');
          break;
        case EventType.PRESS:
          console.log('User pressed notification');
          break;
      }
    });

    // Handle messages when the app is in the foreground
    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      onDisplayNotification();
    });

    // Handle messages when the app is in the background
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    notifee.getBadgeCount().then(count => {
      notifee.setBadgeCount(count);
    });

    return () => {
      unsubscribe();
      unsubscribeMessage();
    };
  }, []);

  if (loading) {
    return null;
  }

  // Display a notification
  async function onDisplayNotification() {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.RED,
    });

    await notifee.displayNotification({
      title: t("PushNotifications.title"),
      body: 'PushNotifications.body',
      android: {
        channelId,
        largeIcon: require('./src/assets/images/logo/logoSplashScreen.png'),
      },
    });
  }

  // Create a trigger notification
  async function onCreateTriggerNotification() {
    const date = new Date(Date.now());
    date.setHours(23);
    date.setMinutes(14);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'your-channel-id',
        },
      },
      trigger,
    );
  }

  // Cancel a notification
  async function cancel(notificationId: string) {
    await notifee.cancelNotification(notificationId);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer >
              <Routes />
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  )
}