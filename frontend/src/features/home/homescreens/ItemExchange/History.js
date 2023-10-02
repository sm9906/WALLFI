import React, { useState } from 'react';
import { 
  View,
  StyleSheet,
  FlatList,
  Image,
  Text
} from 'react-native';

import images from '../../../../common/imgDict';

import ButtonGroup from './ButtonGroup';

// 거래내역 버튼
export default function History() {

  const [selectedBtn, setSelectedBtn] = useState(false);

  return (
    <View style={styles.historyContainer}>
      <ButtonGroup 
        title1={'구매내역'} 
        title2={'판매내역'} 
        selectedBtn={selectedBtn} 
        setSelectedBtn={setSelectedBtn} />
      <View style={styles.itemContainer}>
        <Content selectedBtn={selectedBtn} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  historyContainer: { 
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

const purchaseHistory = [
  {id: 1, name: '호랑이', price: '100만', imageUrl: images.defaultCharacter.TIGER.LED },
  {id: 2, name: '독수리', price: '100만', imageUrl: images.defaultCharacter.EAGLE.LED },
]

const saleHistory = [
  {id: 1, name: '호랑이', price: '100만', imageUrl: images.defaultCharacter.TIGER.LED, completion: false },
  {id: 2, name: '호랑이', price: '100만', imageUrl: images.defaultCharacter.TIGER.LED, completion: true },
]

function Content(props) {

  return (
    <List selectedBtn={props.selectedBtn} />
  )
}

function List(props) {

  return (
    <FlatList 
      data={props.selectedBtn ? saleHistory : purchaseHistory}
      renderItem={({item}) => 
        <Item item={item} selectedBtn={props.selectedBtn}/>
      }
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ alignItems: 'center' }}
      showsVerticalScrollIndicator={false}
    />
  )
}

function Item(props) {

  const color = props.item.completion ? '#4AD479' : '#F56551';

  return (
    <View style={listItem.container}>
      <View style={listItem.imgBox}>
        <Image source={props.item.imageUrl} style={listItem.imgStyle}/>
      </View>
      <View style={listItem.textBox}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ flex: 1, color: 'white', fontSize: 15 }}>{props.item.name}</Text>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={images.gameIcon.coin} style={{ resizeMode: 'contain', height: '70%', width: '18%' }}/>
            <Text style={{ color: 'white', fontSize: 15, width: '42%' }}> {props.item.price}</Text>
          </View>
        </View>
          { props.selectedBtn ? 
            <View style={[listItem.completionStyle, { backgroundColor: color }]}>
              <Text style={{ fontSize: 16, color: 'white' }}>{ props.item.completion ? '판매완료' : '판매중' }</Text>
            </View> 
            : null 
          }
      </View>
    </View>
  )
}

const listItem = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(137, 146, 193, 0.8)',
    borderRadius: 10,
    aspectRatio: 3,
    width: '100%',
    overflow: 'hidden',
    margin: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imgBox: {
    flex: 1,
    height: '70%',
    backgroundColor: 'white',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgStyle: { 
    resizeMode: 'contain', 
    width: '70%', 
    height: '70%' 
  },
  textBox: {
    flex: 3,
    height: '70%',
    marginEnd: '5%',
    flexDirection: 'row'
  },
  completionStyle: { 
    width: '40%',
    alignItems: 'center', 
    justifyContent: 'center',
    marginVertical: '5%',
    borderRadius: 10
  }
})