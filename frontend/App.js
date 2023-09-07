import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletNavigation from './src/features/wallet/walletnavigation/WalletNavigaton';
import GoogleMapNavigator from './src/features/googlemap/googlemapnavigation/GoogleMapNavigaton';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="GoogleMap" component={GoogleMapNavigator} options={{ headerShown: false }} />
        <RootStack.Screen name="Wallet" component={WalletNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
