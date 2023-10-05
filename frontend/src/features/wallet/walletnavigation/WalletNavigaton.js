import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MakeAccount from '../walletscreens/MakeAccount';
import WalletHome from '../walletscreens/WalletHome';
import ExchangeSearch from '../walletscreens/ExchangeSearch';
import SendWho from '../walletscreens/SendWho';
import SendHow, {EthereumHow} from '../walletscreens/SendHow';
import SendMemo from '../walletscreens/SendMemo';
import WalletLoading from '../walletscreens/WalletLoading';
import MakeDeposit from '../walletscreens/MakeDeposit' 

const Stack = createNativeStackNavigator();

const WalletNavigation = () => {
    return (
    <Stack.Navigator initialRouteName='WalletLoading'>
      <Stack.Screen name="WalletHome" component={WalletHome}
      options={{title:'My 월렛', headerBackVisible: false,}}/>
      <Stack.Screen name="MakeAccount" component={MakeAccount} options={{title:'예/적금'}}/>
      <Stack.Screen name="ExchangeSearch" component={ExchangeSearch} options={{title:'환율'}} />
      <Stack.Screen name="SendWho" component={SendWho} options={{title:''}} />
      <Stack.Screen name="SendHow" component={SendHow} options={{title:''}} />
      <Stack.Screen name="SendMemo" component={SendMemo} options={{ headerShown: false }} />
      <Stack.Screen name="WalletLoading" component={WalletLoading} options={{headerShown: false}}/>
      <Stack.Screen name="MakeDeposit" component={MakeDeposit} options={{title:''}}/>
      <Stack.Screen name="EthereumHow" component={EthereumHow} options={{title:''}}/>
    </Stack.Navigator>
    )
}

export default WalletNavigation;
