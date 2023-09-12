import React from 'react';
import { Provider } from 'react-redux';
import store from './src/common/store'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletNavigation from './src/features/wallet/walletnavigation/WalletNavigaton';
import AuthNavigation from './src/features/auth/authnavigation/AuthNavigation'

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName='Auth'>
          <RootStack.Screen name="Auth" component={AuthNavigation } options={{ headerShown: false }}/>
          <RootStack.Screen name="Wallet" component={WalletNavigation} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
