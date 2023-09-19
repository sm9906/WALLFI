import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { updateCharacter } from '../homeSlice.js';
import { globalStyles } from "../homestyles/global.js";
import { images } from '../../../common/imgDict.js';

import GameHeader from '../homecomponents/GameHeader.js';
import ExpBar from '../homecomponents/exp/ExpBar.js';
import PageHeader from '../homecomponents/PageHeader.js';

const type = {
    EAGLE: '독수리',
    LION: '사자',
    PANDA: '판다',
    QUOKKA: '쿼카',
    SHIBA: '시바',
    TIGER: '호랑이',
    MOLLY: '몰리',
}

export default function Collection({navigation}) {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // 유저의 캐릭터 목록 조회
  const userId = useSelector(state=>state.auth.userId)
  const characterList = useSelector(state => state.home.characters);
  const characters = []
  characterList.map((character) => {
    characters.push({
      id: character.characterIdx,
      name: type[character.characterType],
      imageUrl: images.defaultCharacter[character.characterType][character.color],
      level: character.level,
      exp: character.exp,
      main: character.main
    })
  })

  const Item = ({item}) => (
    <TouchableOpacity
      style={styles.gridStyle}
      onPress={() => {
        setModalVisible(true);
        setSelectedCharacter({...item});
      }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={item.imageUrl} style={styles.gridItemStyle}/>    
      </View>
    </TouchableOpacity>
  )
    
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={images.Background.collection} style={[globalStyles.bgImg, { alignItems: 'center' }]}>
        <GameHeader />
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
          <DetailPage modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
            selectedCharacter={selectedCharacter} 
            setSelectedCharacter={setSelectedCharacter}
            userId = {userId}
          />
        </Modal>
        <PageHeader navigation={navigation} color={'#DD4F00'} title={'동물도감'}/>
        <View style={{ flex: 6.5, width: '100%' }}>
        <FlatList 
            data={characters}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={{ justifyContent: 'center' }}
            numColumns={2}/>
        </View>
      </ImageBackground>
      <StatusBar />
    </View>
  )
}

function DetailPage(props) {
  const dispatch = useDispatch();
  const setMain = () => {
    dispatch(updateCharacter({act: '', characterIdx: props.selectedCharacter.id, statusType: 'isMain', userId: props.userId, value: 0}))
  }
  return (
    <View style={styles.modalStyle}>
        <View style={styles.modalBox}>
            <View style={styles.modalContent}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{props.selectedCharacter.name}</Text>
            </View>
            <TouchableOpacity onPress={() => props.setModalVisible(false)} style={{ flex: 1 }}>
                <Image source={images.btnSource.modalClose} style={{ resizeMode: 'contain', width: '70%' }} />
            </TouchableOpacity>
        </View>
        <View style={styles.modalItems}>
            <Image source={props.selectedCharacter.imageUrl} style={{ flex: 5, resizeMode: 'contain', overflow: 'hidden' }}/>
            {
              props.selectedCharacter.main 
                ? <TouchableOpacity style={styles.mainCharacterBtn}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>현재 대표동물</Text>
                  </TouchableOpacity>
                : <TouchableOpacity style={styles.mainCharacterBtn} onPress={()=>{ setMain(); props.setModalVisible(false);}}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>대표동물</Text>
                  </TouchableOpacity>
            }
        </View>
        <View style={styles.modalBottom}>        
        <ExpBar ExpStyle={ExpStyle} exp={props.selectedCharacter.exp} level={props.selectedCharacter.level}/> 
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
  },
  gridStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    flex: 0.5,
    marginHorizontal: '5%',
    marginVertical: '5%',
    borderRadius: 20,
    aspectRatio: 1,
    overflow: 'hidden',
  },
  gridItemStyle: { 
    resizeMode: 'contain', 
    width: '100%', 
    height: '100%' 
  },
  modalBox: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  modalContent: { 
    flex: 6, 
    alignItems: 'center', 
    marginStart: '10%' 
  },
  modalItems: { 
    flex: 5, 
    width: '100%', 
    backgroundColor: '#FFF7DB', 
    borderBottomColor: '#000000', 
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainCharacterBtn: {
    flex: 1,
    width: '30%',
    backgroundColor: '#DD4F00',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#BE4400'
  },
  modalBottom: { 
    flex: 2, 
    width: '100%', 
    backgroundColor: '#FFF2BA', 
    marginBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const ExpStyle = StyleSheet.create({
  container:{
    width:'80%',
    height: "50%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  LvTxt:{
    color:'#FF5C00',
    alignContent:'center',
    fontWeight:'bold',
    fontSize:RFPercentage(3)
  },
  barContainer: {
      width: "60%",
      height: "50%",
      backgroundColor: "#929292",
      borderRadius:5
  },
  exp:{
    backgroundColor:'#FF5C00',
    height:'100%',
    borderRadius:5
  }
})
