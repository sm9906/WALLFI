import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LogIn from '../authscreens/LogIn';

const Stack = createNativeStackNavigator();

const AuthNavigation= () => {
  return (
    <Stack.Navigator initialRouteName='LogIn'>
      <Stack.Screen name="LogIn" component={LogIn} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default AuthNavigation;