import React from 'react';
import { Provider } from 'react-redux';
import store from './src/common/stroe'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletNavigation from './src/features/wallet/walletnavigation/WalletNavigaton';
import GoogleMapNavigator from './src/features/googlemap/googlemapnavigation/GoogleMapNavigaton';
import FightNavigator from './src/features/fight/fightnavigation/FightNavigtion';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Fight" component={FightNavigator} options={{ headerShown: false }} />
          <RootStack.Screen name="GoogleMap" component={GoogleMapNavigator} options={{ headerShown: false }} />
          <RootStack.Screen name="Wallet" component={WalletNavigation} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
