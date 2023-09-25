import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import { useSelector } from 'react-redux';

import ButtonGroup from './ButtonGroup.js';
import Search from './Search.js';
import List from '../ItemExchange/ItemList.js';

import { type } from '../../../../common/characterType.js';
import { images } from '../../../../common/imgDict.js';

// 판매 버튼을 눌렀을 때 뜨는 화면 
export default function Sale() {

  const [selectedBtn, setSelectedBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  return (
    <View style={styles.saleContainer}>
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
  const characters = [];
  characterList.map((character) => {

    if (character.main === false) {
      characters.push({
        id: character.characterIdx,
        name: type[character.characterType],
        imageUrl: images.defaultCharacter[character.characterType][character.color],
        level: character.level,
        exp: character.exp,
        hp: character.hp,
        atk: character.atk,
        def: character.def
      })
    }
  })

  const deco = [];

  return (
    <List
      type={'sale'}
      selectedBtn={props.selectedBtn}
      data={props.selectedBtn ? deco : characters}
      setModalVisible={props.setModalVisible}
      setSelectedBtn={props.setSelectedBtn}
      setSelectedItem={props.setSelectedItem}
    />
  )
}