import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WalletNavigation from './src/features/wallet/walletnavigation/WalletNavigaton';

export default function Background(){
  return(
      <NavigationContainer>
        <WalletNavigation />
      </NavigationContainer>
  )
}