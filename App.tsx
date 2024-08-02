import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'
import Routes from './src/routes/Routes'

const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer >
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </PaperProvider>
  )
}

export default App