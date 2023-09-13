import React from 'react';
import { Provider } from 'react-redux';
import store from './src/common/store.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigation from './src/features/home/homenavigation/HomeNavigation.js';

const RootStack = createNativeStackNavigator();

export default function App(){
  return(
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name='Home' component={HomeNavigation} options={{ headerShown: false}} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}