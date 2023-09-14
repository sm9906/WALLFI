import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Navigator
import GameHome from '../homescreens/GameHome'
import Mission from '../homescreens/Mission'
import Collection from '../homescreens/Collection'
import Market from '../homescreens/Market'
import GameLoading from '../homescreens/GameLoading';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='GameLoading'>
            <Stack.Screen name='GameLoading' component={GameLoading} options={{ headerShown: false }} />
            <Stack.Screen name='GameHome' component={GameHome} options={{ headerShown: false }} />
            <Stack.Screen name='Mission' component={Mission} options={{ headerShown: false }} />
            <Stack.Screen name='Collection' component={Collection} options={{ headerShown: false }} />
            <Stack.Screen name='Market' component={Market} options={{ headerShown: false }} />
            {/* <Stack.Screen name='WalletHome' component={WalletHome} />
            <Stack.Screen name='GameMap' component={GameMap} />
            <Stack.Screen name='Fight' component={Fight} /> */}
        </Stack.Navigator>
    )
}

export default HomeNavigation;