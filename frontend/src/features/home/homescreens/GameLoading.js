import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { useDispatch } from 'react-redux';
import { getCharacterList, getGameInfo, getMainCharacter } from '../homeSlice';

export default function GameLoading({navigation}) {

    const userId = 'ssafy'

    const dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            await dispatch(getGameInfo(userId))
            await dispatch(getMainCharacter(userId))
            await dispatch(getCharacterList(userId))
            navigation.navigate('GameHome');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 40 }}>게임 로딩중..</Text>
        </View>
    )
}