import React from 'react';

// 1. Navigator import 한다
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";

import MakeAccount from '../walletscreens/MakeAccount'
import WalletHome from '../walletscreens/WalletHome'
// 3. Navigator로 사용할 객체 선언한다
const Stack = createNativeStackNavigator();

const WalletNavigation = () => {
    return (
    
	// 4. 객체 안에 .Navigator 라는 property 나옴
    <Stack.Navigator initialRouteName='WalletHome'>
      <Stack.Screen name="WalletHome" component={WalletHome}/>
      <Stack.Screen name="MakeAccount" component={MakeAccount} />
    </Stack.Navigator>

    )
}

export default WalletNavigation;