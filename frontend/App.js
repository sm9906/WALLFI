import React from 'react';
import './ReactotronConfig';
import store from './src/common/store'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FightNavigator from './src/features/fight/fightnavigation/FightNavigtion';
import WalletNavigation from './src/features/wallet/walletnavigation/WalletNavigaton';
import GoogleMapNavigator from './src/features/googlemap/googlemapnavigation/GoogleMapNavigaton';
import AuthNavigation from './src/features/auth/authnavigation/AuthNavigation'
import HomeNavigation from './src/features/home/homenavigation/HomeNavigation.js';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName='Auth' >
          <RootStack.Screen name="GoogleMap" component={GoogleMapNavigator} options={{ headerShown: false }} />
          <RootStack.Screen name="Fight" component={FightNavigator} options={{ headerShown: false }} />
          <RootStack.Screen name="Wallet" component={WalletNavigation} options={{ headerShown: false }} />
          <RootStack.Screen name="Auth" component={AuthNavigation } options={{ headerShown: false }}/>
          <RootStack.Screen name='Home' component={HomeNavigation} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
