import React from 'react';

// 1. Navigator import 한다
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MakeAccount from '../walletscreens/MakeAccount';
import WalletHome from '../walletscreens/WalletHome';
import ExchangeSearch from '../walletscreens/ExchangeSearch';
// 3. Navigator로 사용할 객체 선언한다
const Stack = createNativeStackNavigator();

const WalletNavigation = () => {
    return (
    <Stack.Navigator initialRouteName='WalletHome'>
      <Stack.Screen name="WalletHome" component={WalletHome}
      options={{title:'My 월렛'}}
      />
      <Stack.Screen name="MakeAccount" component={MakeAccount} options={{title:'예/적금'}}/>
      <Stack.Screen name="ExchangeSearch" component={ExchangeSearch} options={{title:'환율'}} />
    </Stack.Navigator>
    )
}

export default WalletNavigation;