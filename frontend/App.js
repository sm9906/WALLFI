import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './src/features/home/homenavigation/HomeNavigation.js';

export default function App(){
  return(
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
  )
}