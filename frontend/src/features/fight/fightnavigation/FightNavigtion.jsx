import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainBattle from "../fightscreens/MainBattle";

const Stack = createNativeStackNavigator();

const FightNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Fight">
        <Stack.Screen name="MainBattle" component={MainBattle} options={{headerShown: false }} />
    </Stack.Navigator>
  )
};

export default FightNavigator;
