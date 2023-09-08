import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image
} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Collection({navigation}) {
    return (
        <View>
            <Text>도감</Text>
        </View>
    )
}