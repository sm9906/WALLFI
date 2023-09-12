import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert
} from 'react-native';

import { globalStyles } from "../homestyles/global.js";

import GameHeader from '../homecomponents/GameHeader.js';
import modalClose from '../../.././assets/game/button/modalClose.png';
import collection from '../../.././assets/background/collection.png'
import backHome from '../../.././assets/game/button/backHome.png';

export default function Collection({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const characters = [
        { id: 1, name: '독수리', imageUrl: require('../../.././assets/characters/default/default_1.png')},
        { id: 2, name: '사자', imageUrl: require('../../.././assets/characters/default/default_2.png')},
        { id: 3, name: '판다', imageUrl: require('../../.././assets/characters/default/default_3.png')},
        { id: 4, name: '쿼카', imageUrl: require('../../.././assets/characters/default/default_4.png')},
        { id: 5, name: '호랑이', imageUrl: require('../../.././assets/characters/default/default_5.png')},
        { id: 6, name: '시바견', imageUrl: require('../../.././assets/characters/default/default_6.png')},
    ];
    

    const Item = ({item}) => (
        <TouchableOpacity
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                flex: 0.5,
                marginHorizontal: '5%',
                marginVertical: '5%',
                borderRadius: 20,
                aspectRatio: 1,
                overflow: 'hidden'
            }}
            onPress={() => {
                setModalVisible(true);
                setSelectedCharacter({...item});
        }}>
            <View>
                <Image source={item.imageUrl} style={{ 
                    resizeMode: 'contain',
                    width: '100%',
                    height: '100%',
                }}/>
            </View>
        </TouchableOpacity>
    )
    
    return (
        <View style={globalStyles.container}>
            <ImageBackground source={collection} style={[globalStyles.bgImg, { alignItems: 'center' }]}>
                <GameHeader />
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <DetailPage modalVisible={modalVisible} setModalVisible={setModalVisible} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter}/>
                </Modal>
                <CollectionHeader navigation={navigation}/>
                <View style={{ flex: 6.5, width: '100%' }}>
                    <FlatList 
                        data={characters}
                        renderItem={({item}) => <Item item={item} />}
                        keyExtractor={item => item.id.toString()}
                        columnWrapperStyle={{ justifyContent: 'center' }}
                        numColumns={2}
                    />
                </View>
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

function DetailPage(props) {

    return (
        <View style={styles.modalStyle}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 6, alignItems: 'center', marginStart: '10%' }}>
                   <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{props.selectedCharacter.name}</Text>
                </View>
                <TouchableOpacity onPress={() => props.setModalVisible(false)} style={{ flex: 1 }}>
                    <Image source={modalClose} style={{ resizeMode: 'contain', width: '70%' }} />
                </TouchableOpacity>
            </View>
            <View style={{ 
                flex: 5, 
                width: '100%', 
                backgroundColor: '#FFF7DB', 
                borderBottomColor: '#000000', 
                borderBottomWidth: 3,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={props.selectedCharacter.imageUrl} style={{ flex: 5, resizeMode: 'contain', overflow: 'hidden' }}/>
                <TouchableOpacity style={{
                    flex: 1,
                    width: '30%',
                    backgroundColor: '#DD4F00',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: '5%',
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: '#BE4400'
                }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>대표동물</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, width: '100%', backgroundColor: '#FFF2BA', marginBottom: '10%' }}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        backgroundColor: '#FBA728',
        marginHorizontal: '5%',
        marginTop: '45%',
        marginBottom: '10%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})