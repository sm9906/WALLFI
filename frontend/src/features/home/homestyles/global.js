import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../homecomponents/ScreenSize.js';

export const globalStyles = StyleSheet.create({
    container: {
        // width: SCREEN_WIDTH,
        flex: 1,

    },
    bgImg: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: '100%',
        resizeMode: 'contain',
    },
    navigationBtn: {
        flex: 1,
        height: '55%',
        borderRadius: 15,
        marginStart: '5%',
        justifyContent:  'center',
    },
    btnIcon: {
        width: '100%',
        height: '55%',
        resizeMode: 'contain',
    },
    navigationText: {
        flex: 5,
        fontSize: 35,
        fontWeight: 'bold',
        height: '45%',
        marginStart: '5%',
    }
});