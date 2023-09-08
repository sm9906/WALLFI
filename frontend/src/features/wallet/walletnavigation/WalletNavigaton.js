import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MakeAccount from '../walletscreens/MakeAccount';
import WalletHome from '../walletscreens/WalletHome';
import ExchangeSearch from '../walletscreens/ExchangeSearch';
import SendWho from '../walletscreens/SendWho';
import SendHow from '../walletscreens/SnedHow';

const Stack = createNativeStackNavigator();

const WalletNavigation = () => {
    return (
    <Stack.Navigator initialRouteName='WalletHome'>
      <Stack.Screen name="WalletHome" component={WalletHome}
      options={{title:'My 월렛'}}
      />
      <Stack.Screen name="MakeAccount" component={MakeAccount} options={{title:'예/적금'}}/>
      <Stack.Screen name="ExchangeSearch" component={ExchangeSearch} options={{title:'환율'}} />
      <Stack.Screen name="SendWho" component={SendWho} options={{title:''}} />
      <Stack.Screen name="SendHow" component={SendHow} options={{title:''}} />
    </Stack.Navigator>
    )
}

export default WalletNavigation;