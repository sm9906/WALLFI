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
import market from '../../.././assets/background/market.png'
import backHome from '../../.././assets/game/button/backHome.png';

export default function Market({navigation}) {
    
    return (
        <View style={globalStyles.container}>
            <ImageBackground source={market} style={[globalStyles.bgImg, { alignItems: 'center' }]}>
                <GameHeader />
                <MarketHeader navigation={navigation}/>
                <View style={{ flex: 6.5 }}></View>
            </ImageBackground>
            <StatusBar />
        </View>
    )
}

function MarketHeader(props) {
    
    return (
        <View style={{ flex: 1.2, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={[globalStyles.navigationBtn, { backgroundColor: '#FFC700' }]} onPress={() => props.navigation.navigate('GameHome')}>
                <Image source={backHome} style={globalStyles.btnIcon}/>
            </TouchableOpacity>
            <Text style={[globalStyles.navigationText, { color: '#FFC700' }]}>상점</Text>
        </View>
    );
}