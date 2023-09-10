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
import collection from '../../.././assets/background/collection.png'
import backHome from '../../.././assets/game/button/backHome.png';

export default function Collection({navigation}) {
    
    return (
        <View style={globalStyles.container}>
            <ImageBackground source={collection} style={[globalStyles.bgImg, { alignItems: 'center' }]}>
                <GameHeader />
                <CollectionHeader navigation={navigation}/>
                <View style={{ flex: 6.5 }}></View>
            </ImageBackground>
            <StatusBar />
        </View>
    )
}

function CollectionHeader(props) {
    
    return (
        <View style={{ flex: 1.2, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={[globalStyles.navigationBtn, { backgroundColor: '#DD4F00' }]} onPress={() => props.navigation.navigate('GameHome')}>
                <Image source={backHome} style={globalStyles.btnIcon}/>
            </TouchableOpacity>
            <Text style={[globalStyles.navigationText, { color: '#DD4F00' }]}>동물도감</Text>
        </View>
    );
}