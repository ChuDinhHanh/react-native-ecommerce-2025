import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Routes from './src/routes/Routes'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'
import { PaperProvider } from 'react-native-paper'

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