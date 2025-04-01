/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {MenuProvider} from 'react-native-popup-menu';
import notifee, {AndroidImportance} from '@notifee/react-native';
import './gesture-handler';

notifee.createChannel({
  id: 'default',
  name: 'Default Channel',
  importance: AndroidImportance.HIGH,
});

export default function Main() {
  return (
    <MenuProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </MenuProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
