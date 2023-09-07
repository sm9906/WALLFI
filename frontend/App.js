import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './src/features/home/homenavigation/HomeNavigation.js';

export default function Background(){
  return(
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
  )
}