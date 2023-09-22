import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

import { globalStyles } from '../../homestyles/global.js';
import { images } from '../../../../common/imgDict.js';

import ButtonGroup from './ButtonGroup.js';
import Search from './Search.js';
import List from './ItemList.js';

// 구매 버튼
export default function Purchase() {

  const [selectedBtn, setSelectedBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  return (
    <View style={styles.purchaseContainer}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}>
        <ItemDetail selectedItem={selectedItem} setModalVisible={setModalVisible}/>
      </Modal>
      <ButtonGroup selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn}/>
      <Search />
      <View style={styles.itemContainer}>
        <Content 
          selectedBtn={selectedBtn} 
          setModalVisible={setModalVisible}
          setSelectedItem={setSelectedItem}
          setSelectedBtn={setSelectedBtn} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  purchaseContainer: { 
    flex: 7, 
    width: '100%', 
    alignItems: 'center'
  },
  itemContainer: { 
    flex: 6, 
    width: '80%', 
    marginBottom: '5%' 
  }
})

// 캐릭터 데이터
const character = [
  {id: 1, name: '호랑이', imageUrl: images.defaultCharacter.TIGER.LED, price: '100만'},
  {id: 2, name: '호랑이', imageUrl: images.defaultCharacter.SHIBA.LED, price: '1만'},
  {id: 3, name: '몰리', imageUrl: images.defaultCharacter.MOLLY.BASIC, price: '1만'},
  {id: 4, name: '호랑이', imageUrl: images.defaultCharacter.LION.LED, price: '1만'},
  {id: 5, name: '호랑이', imageUrl: images.defaultCharacter.QUOKKA.LED, price: '1만'},
  {id: 6, name: '호랑이', imageUrl: images.defaultCharacter.EAGLE.LED, price: '1만'},
  {id: 7, name: '호랑이', imageUrl: images.defaultCharacter.PANDA.LED, price: '1만'},
  {id: 8, name: '호랑이', imageUrl: images.defaultCharacter.TIGER.LED, price: '1만'},
  {id: 9, name: '호랑이', imageUrl: images.defaultCharacter.TIGER.LED, price: '1만'},
  {id: 10, name: '호랑이', imageUrl: images.defaultCharacter.TIGER.LED, price: '1만'},
  {id: 11, name: '호랑이', imageUrl: images.defaultCharacter.TIGER.LED, price: '1만'},
  {id: 12, name: '호랑이', imageUrl: images.defaultCharacter.TIGER.LED, price: '1만'},
  {id: 13, name: '호랑이', imageUrl: images.defaultCharacter.TIGER.LED, price: '1만'},
]

// 치장 데이터
const deco = [
  {id: 1, name: '트로피', imageUrl: images.defaultCharacter.MOLLY.BASIC, price: '1만'}
]

// 버튼을 누를 때 마다 나오는 컨텐츠
function Content(props) {

  return (
    <List
      data={props.selectedBtn ? deco : character}
      setModalVisible={props.setModalVisible}
      setSelectedBtn={props.setSelectedBtn}
      setSelectedItem={props.setSelectedItem}
    />
  )
}

// 아이템 상세 정보 모달창
function ItemDetail(props) {
  const image = props.selectedItem.imageUrl;

  return (
    <View style={[globalStyles.modalStyle, { backgroundColor: '#A6C9FF' }]}>
      <View style={detail.itemImgBox}>
        <Image source={image} style={detail.imgStyle}/>
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.selectedItem.name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Image source={images.gameIcon.coin} style={{ resizeMode: 'contain', height: '100%', width: '10%' }}/>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: '2%' }}>{props.selectedItem.price}</Text>
          </View>
        </View>
        <Text style={{ flex: 1 }}>경험치 / 공격력 / 방어력 / 레벨</Text>
      </View>
      <View style={detail.btnGroup}>
        <TouchableOpacity style={[detail.modalBtn, detail.purchaseBtn]}>
          <Text style={detail.btnText}>구매</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[detail.modalBtn, detail.closeBtn]}
          onPress={() => props.setModalVisible(false)}>
          <Text style={detail.btnText}>나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const detail = StyleSheet.create({
  itemImgBox: {
    flex: 3,
    width: '80%',
    marginVertical: '10%',
    backgroundColor: 'white',
    borderRadius: 20
  },
  imgStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  },
  btnGroup: {
    flex: 1, 
    flexDirection: 'row', 
    marginBottom: '1%'
  },
  modalBtn: {
    flex: 1, 
    height: '60%',
    marginHorizontal: '10%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  purchaseBtn: {
    backgroundColor: '#FF4242',
    borderColor: '#FF6060',
    borderWidth: 3
  },
  closeBtn: {
    backgroundColor: '#0094FF',
    borderColor: '#5EB6F6',
    borderWidth: 3
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
})