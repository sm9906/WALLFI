import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { globalStyles } from "../homestyles/global.js";

import GameHeader from '../homecomponents/GameHeader.js';
import mission from '../../.././assets/background/mission.png'
import backHome from '../../.././assets/game/button/backHome.png';

export default function Mission({navigation}) {

    return (
        <View style={globalStyles.container}>
            <ImageBackground source={mission} style={[globalStyles.bgImg, { alignItems: 'center' }]}>
                <GameHeader />
                <MissionHeader navigation={navigation}/>
                <View style={{ flex: 6.5 }}></View>
            </ImageBackground>
            <StatusBar />
        </View>
    )
}

function MissionHeader(props) {

    return (
        <View style={{ flex: 1.2, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={[globalStyles.navigationBtn, { backgroundColor: '#76009F' }]} onPress={() => props.navigation.navigate('GameHome')}>
                <Image source={backHome} style={globalStyles.btnIcon}/>
            </TouchableOpacity>
            <Text style={[globalStyles.navigationText, { color: '#76009F' }]}>미션</Text>
        </View>
    );
}

function MenuBar(props) {

    return (
        <View></View>
    );
}

const styles = StyleSheet.create({

})