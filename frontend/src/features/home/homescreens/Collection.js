import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image
} from 'react-native';
import GameHeader from '../homecomponents/GameHeader.js';

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Collection({navigation}) {
    return (
        <View style={{ flex: 1 }}>
            <GameHeader />
            <Text style={{ flex: 1.2 }}>도감</Text>
            <View style={{ flex: 6.5 }}></View>
        </View>
    )
}