import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { globalStyles } from '../../homestyles/global.js';
import { images } from '../../../../common/imgDict.js';
import { getBuy } from '../../homeSlice.js';

import ButtonGroup from './ButtonGroup.js';
import Search from './Search.js';
import List from './ItemList.js';

// 구매 버튼
export default function Purchase() {

  const [selectedBtn, setSelectedBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const characterName = {
    EAGLE: '독수리',
    LION: '사자',
    PANDA: '판다',
    QUOKKA: '쿼카',
    SHIBA: '시바',
    TIGER: '호랑이'
  }

  const itemName = {
    CROWN_CAP: '왕관',
    RUBY_NECKLACE: '루비목걸이',
    SSAFY_CAP: '싸피모자',
  }

  const characterData = useSelector(state => state.home.purchaseCharacters);
  const itemData = useSelector(state => state.home.purchaseItems);
  let character = [], item = [];

  characterData.map((data, idx) => {
    character.push({
      id: idx,
      goodsIdx: data.goodsIdx,
      name: characterName[data.characterType],
      imgUrl: images.defaultCharacter[data.characterType][data.color],
      price: data.price,
      seller: data.seller
    });
  })

  itemData.map((data, idx) => {
    item.push({
      id: idx,
      goodsIdx: data.goodsIdx,
      name: itemName[data.itemName],
      imgUrl: images.accessory[data.itemName.toLowerCase()],
      price: data.price,
      seller: data.seller
    })
  })

  return (
    <View style={styles.purchaseContainer}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}>
        <ItemDetail selectedItem={selectedItem} setModalVisible={setModalVisible}/>
      </Modal>
      <ButtonGroup 
        title1={'캐릭터'} 
        title2={'아이템'} 
        selectedBtn={selectedBtn} 
        setSelectedBtn={setSelectedBtn}/>
      <Search />
      <View style={styles.itemContainer}>
        <Content 
          selectedBtn={selectedBtn} 
          setModalVisible={setModalVisible}
          setSelectedItem={setSelectedItem}
          setSelectedBtn={setSelectedBtn}
          character={character}
          item={item} />
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

// 버튼을 누를 때 마다 나오는 컨텐츠
function Content(props) {

  const character = props.character;
  const item = props.item;

  return (
    <List
      type={'purchase'}
      selectedBtn={props.selectedBtn}
      data={props.selectedBtn ? item : character}
      setModalVisible={props.setModalVisible}
      setSelectedBtn={props.setSelectedBtn}
      setSelectedItem={props.setSelectedItem}
    />
  )
}

// 아이템 상세 정보 모달창
function ItemDetail(props) {
  const image = props.selectedItem.imgUrl;

  // 구매하기
  const dispatch = useDispatch();
  const purchaseItem = async() => {
    try {
      dispatch(getBuy({ goodsIdx: props.selectedItem.goodsIdx, price: props.selectedItem.price }));
    } catch (err) {
      console.log('purchaseItem', err);
    }
  }

  return (
    <View style={[globalStyles.modalStyle, { backgroundColor: '#A6C9FF' }]}>
      <View style={detail.itemImgBox}>
        <Image source={image} style={detail.imgStyle}/>
      </View>
      <View style={detail.textGroup}>
        <Text style={detail.itemName}>{props.selectedItem.seller}의 {props.selectedItem.name}</Text>
        <View style={detail.price}>
          <Image source={images.gameIcon.ethereum} style={detail.coinImg}/>
          <Text style={detail.priceText}>{props.selectedItem.price}</Text>
        </View>
      </View>
      <View style={detail.btnGroup}>
        <TouchableOpacity style={[detail.modalBtn, detail.purchaseBtn]}
          onPress={() => { 
            purchaseItem();
            props.setModalVisible(false);
        }}
        >
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
    borderRadius: 20,
    justifyContent: 'center'
  },
  imgStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: '70%'
  },
  textGroup: { 
    flex: 3, 
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  itemName: { 
    height: '40%', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  price: { 
    width: '45%', 
    height: '18%', 
    backgroundColor: '#559AEC', 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: '#77B2F8',
    borderWidth: 2
  },
  coinImg: { 
    resizeMode: 'contain', 
    width: '30%', 
    height: '90%' 
  },
  priceText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'right', 
    width: '60%' 
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