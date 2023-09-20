import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Modal
} from 'react-native';

import { images } from '../../../../common/imgDict.js';

// 구매 버튼
export default function Purchase() {

const [containerWidth, setContainerWidth] = useState(0);

const margins = 30 * 2;
const numColumns = 2;

return (
  <View style={styles.purchaseContainer}>
    <Search />
      <View style={styles.itemContainer}>
        <FlatList 
          data={itemData}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          renderItem={({item}) => 
          <ItemList 
            item={item} 
            width={(containerWidth - margins) / numColumns}
        />}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        numColumns={numColumns}
        />
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

// 검색창
function Search() {

  return (
    <View style={search.searchContainer}>
      <View style={search.searchBox}>
        <TextInput style={{ marginHorizontal: '5%', marginVertical: '3%' }} placeholder='검색어를 입력해 주세요'/>
      </View>
      <TouchableOpacity style={search.searchBtn}>
        <Text style={search.searchText}>검색</Text>
      </TouchableOpacity>
    </View>
  )
}

const search = StyleSheet.create({
  searchContainer: { 
    flex: 1, 
    width: '80%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  searchBox: { 
    flex: 4, 
    height: '50%', 
    backgroundColor: 'white',
    marginHorizontal: '2%',
    borderWidth: 1,
    borderColor: 'black',
  },
  searchBtn: { 
    flex: 1, 
    height: '50%', 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  searchText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B1C47'
  }
})

// 아이템 더미 데이터
const itemData = [
  {id: 1, name: '호랑이', imageUrl: images.defaultCharacter.TIGER.LED, price: '100만'},
  {id: 2, name: '호랑이', imageUrl: images.defaultCharacter.SHIBA.LED, price: '1만'},
  {id: 3, name: '호랑이', imageUrl: images.defaultCharacter.MOLLY.BASIC, price: '1만'},
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

// 아이템 리스트
function ItemList({item, width}) {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  return (
    <TouchableOpacity 
      style={[itemGroup.itemBox, { width: width }]} 
      onPress={() => { setModalVisible(true); setSelectedItem({...item})}}>
      <View style={itemGroup.imageBox}>
        <Image source={item.imageUrl} style={itemGroup.itemImg} />
      </View>
      <View style={itemGroup.fontContainer}>
        <Text style={itemGroup.fontStyle}>{item.name}</Text>
        <View style={itemGroup.priceContainer}>
          <Image source={images.gameIcon.coin} style={itemGroup.coinIcon} />
          <View style={{ flex: 4, marginBottom: '5%' }}>
            <Text style={itemGroup.fontStyle}>  {item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const itemGroup = StyleSheet.create({
  itemBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    aspectRatio: 0.7,
    overflow: 'hidden',
    margin: '5%',
    alignItems: 'center'
  },
  imageBox: { 
    flex: 10,
    width: '80%',
    marginVertical: '10%', 
    backgroundColor: '#ECF7FF'
  },
  itemImg: {
    resizeMode: 'contain', 
    width: '100%', 
    height: '100%' 
  },
  fontContainer: { 
    flex: 1, 
    width: '70%', 
    marginBottom: '5%',
    justifyContent: 'space-evenly'
  },
  fontStyle: { 
    fontSize: 12,
    fontWeight: 'bold',
    color: '#474747',
  },
  priceContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    marginTop: '5%', 
    alignItems: 'center' 
  },
  coinIcon: { 
    flex:1, 
    resizeMode: 'contain', 
    height: '100%'
  }
})

// 아이템 상세 정보 모달창
function ItemDetail() {

  return (
    <Modal></Modal>
  )
}