import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigator
import GameHome from "../homescreens/GameHome";
import Mission from "../homescreens/Mission";
import Collection from "../homescreens/Collection";
import Market from "../homescreens/Market";
import GameLoading from "../homescreens/GameLoading";
import GameAccessories from "../homescreens/GameAccessories";
import AnimalDeco from "../homescreens/AnimalDeco";
import ItemExchange from '../homescreens/ItemExchange';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='GameLoading'>
      <Stack.Screen
        name='GameLoading'
        component={GameLoading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='GameHome'
        component={GameHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Mission'
        component={Mission}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Collection'
        component={Collection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Market'
        component={Market}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name='WalletHome' component={WalletHome} />
            <Stack.Screen name='GameMap' component={GameMap} />
            <Stack.Screen name='Fight' component={Fight} /> */}
      <Stack.Screen
        name="GameAccessories"
        component={GameAccessories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnimalDeco"
        component={AnimalDeco}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ItemExchange'
        component={ItemExchange}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
