import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from "../googlemapscreens/MapScreen";

const Stack = createNativeStackNavigator();

const GoogleMapNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="GoogleMap">
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};

export default GoogleMapNavigator;
