import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../homecomponents/ScreenSize.js';
import GameHeader from '../homecomponents/GameHeader.js';
import IMG_URL from '../../.././assets/background/home.png';
import trophy from '../../.././assets/gamehome/Trophy.png';

// 상태바 겹침현상을 없애려면 react-native에서 import 해줘야함

export default function GameHome({navigation}) {
    return (
        <View style={styles.container}>
            <ImageBackground source={IMG_URL} style={styles.bgImg}>
                <GameHeader />
                <Season />
                <Content />
                <Bottom />
            </ImageBackground>
            <StatusBar />
        </View>
    )
}

function Season() {

    return (
        <View style={styles.season}>
            <LinearGradient style={styles.box} colors={['rgba(142, 170, 245, 1)', 'rgba(72, 122, 255, 0.4)', 'transparent']}>
                <Image source={trophy} style={styles.trophy}/>
                <Text style={styles.seasonText}>1 시즌</Text>
            </LinearGradient>
        </View>
    )
}

function Content() {

    return (
        <View style={styles.content}>
            <View>

            </View>
            <View>
                <View></View>
                <View>
                    <Text></Text>
                </View>
            </View>
            <View>

            </View>
        </View>
    )
}

function Bottom() {

    return (
        <View style={styles.bottom}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImg: {
        width: SCREEN_WIDTH,
        height: '100%',
    },
    season: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
        height: '70%',
        borderColor: 'white',
        borderWidth: 4,
        borderRadius: 10,
    },
    trophy: {
        width: '20%',
        height: '100%',
    },
    seasonText: {
        fontSize: 20,
        color: '#E3B75A',
        
        textAlign: 'center',
        alignSelf: 'center',
    },
    content: {
        flex: 5,
        flexDirection: 'row',
    },
    bottom: {
        flex: 1.5,
        flexDirection: 'row',
    }
})