import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Routes from './src/routes/Routes'

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App