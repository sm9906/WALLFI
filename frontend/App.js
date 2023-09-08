import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WalletNavigation from './src/features/wallet/walletnavigation/WalletNavigaton';
import { Provider } from 'react-redux';
import { store } from './src/common/store';

export default function App(){
  return(
    <NavigationContainer>
      <Provider store={store}>
        <WalletNavigation />
      </Provider>
    </NavigationContainer>
  )
}