import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ButtonGroup from './ButtonGroup.js';
import Search from './Search.js';
import List from '../ItemExchange/ItemList.js';

import { globalStyles } from '../../homestyles/global.js';
import { type } from '../../../../common/characterType.js';
import { images } from '../../../../common/imgDict.js';
import { sellItem } from '../../homeSlice.js';

import { SCREEN_HEIGHT } from '../../homecomponents/ScreenSize.js';

// 판매 버튼을 눌렀을 때 뜨는 화면 
export default function Sale() {

  const [selectedBtn, setSelectedBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  return (
    <View style={styles.saleContainer}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}>
        <ItemDetail 
          selectedItem={selectedItem} 
          setModalVisible={setModalVisible}
        />
      </Modal>
      <ButtonGroup 
        title1={'캐릭터'} 
        title2={'아이템'} 
        selectedBtn={selectedBtn} 
        setSelectedBtn={setSelectedBtn} />
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
  saleContainer: { 
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

// 캐릭터 / 아이템 버튼을 누를때마다 나오는 컨텐츠
function Content(props) {

  const characterList = useSelector(state => state.home.characters);
  const itemList = useSelector(state => state.home.items);
  const characters = [], items = [];
  characterList.map((character) => {

    if (character.main === false) {
      characters.push({
        id: character.characterIdx,
        name: type[character.characterType],
        imgUrl: images.defaultCharacter[character.characterType][character.color],
        level: character.level,
        atk: character.atk,
        def: character.def,
        type: 'c'
      })
    }
  })

  const itemName = {
    CROWN_CAP: '왕관',
    RUBY_NECKLACE: '루비목걸이',
    SSAFY_CAP: '싸피모자',
  }

  itemList.map((item) => {
    items.push({
      id: item.itemIdx,
      name: itemName[item.itemName],
      imgUrl: images.accessory[item.itemName.toLowerCase()],
      type: 'i'
    })
  })

  return (
    <List
      type={'sale'}
      selectedBtn={props.selectedBtn}
      data={props.selectedBtn ? items : characters}
      setModalVisible={props.setModalVisible}
      setSelectedBtn={props.setSelectedBtn}
      setSelectedItem={props.setSelectedItem}
    />
  )
}

// 아이템 상세 정보 모달창
function ItemDetail(props) {

  const [price, setPrice] = useState(0);
  const numPrice = Number(price); // 입력 금액 -> 숫자

  const image = props.selectedItem.imgUrl;
  const type = props.selectedItem.type;

  const dispatch = useDispatch();
  const saleItem = async() => {
    try {
      dispatch(sellItem({
        characterIdx: type === 'c' ? props.selectedItem.id : null,
        goodsType: type,
        itemIdx: type === 'i' ? props.selectedItem.id : null,
        price: numPrice}));
    } catch (err) {
      console.log('sellItem', err);
    }
  }

  return (
    <View style={[globalStyles.modalStyle, { backgroundColor: '#A6C9FF' }]}>
      <View style={detail.itemImgBox}>
        <Image source={image} style={detail.imgStyle}/>
      </View>
      <View style={detail.textGroup}>
        <Text style={detail.itemName}>{props.selectedItem.name}</Text>
        <View style={detail.price}>
          <Image source={images.gameIcon.ethereum} style={detail.coinImg}/>
          <TextInput 
            style={detail.priceText} 
            keyboardType="number-pad"
            placeholder='가격 입력'
            value={String(price)}
            onChangeText={setPrice}
          />
        </View>
        {
          type === 'i' ? null :
          <View style={detail.stats}>
            <Text style={detail.statsText}>Atk. {props.selectedItem.atk}</Text>
            <Text style={detail.statsText}>Def. {props.selectedItem.def}</Text>
          </View>
        }
      </View>
      <View style={detail.btnGroup}>
        <TouchableOpacity style={[detail.modalBtn, detail.purchaseBtn]}
          onPress={() => {
            saleItem();
            props.setModalVisible(false);
          }}
        >
          <Text style={detail.btnText}>판매</Text>
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
    height: '20%', 
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
  stats: { 
    height: '40%', 
    width: '30%',
    marginVertical: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  statsText: {
    fontSize: 16,
    marginVertical: '10%',
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