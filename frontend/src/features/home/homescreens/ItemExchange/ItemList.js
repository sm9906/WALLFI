import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import { images } from '../../../../common/imgDict.js';

// FlatList
export default function List(props) {

  const type = props.type;
  const dataType = props.selectedBtn ? 'item' : 'character';

  return (
    <FlatList 
      data={props.data}
      renderItem={({item}) => 
      <ItemList
        type={type}
        dataType={dataType}
        item={item}
        setModalVisible={props.setModalVisible}
        setSelectedItem={props.setSelectedItem} />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ alignItems: 'center' }}
      showsVerticalScrollIndicator={false}
    />
  )
}

// 아이템 리스트
function ItemList(props) {

  return (
    <TouchableOpacity 
      style={itemGroup.itemBox} 
      onPress={() => { props.setModalVisible(true); props.setSelectedItem({...props.item})}}>
      <View style={itemGroup.imageBox}>
        <Image source={props.item.imageUrl} style={itemGroup.itemImg} />
      </View>
      <View style={itemGroup.fontContainer}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={itemGroup.fontStyle}>{props.item.name}</Text>
          {
            props.type === 'purchase' ? 
              <View style={itemGroup.priceContainer}> 
                <Image source={images.gameIcon.coin} style={itemGroup.coinIcon} />
                <Text style={{ color: 'white', fontSize: 15, width: '90%' }}> {props.item.price}</Text>
              </View>
            : props.dataType === 'character' ? 
              <View style={itemGroup.priceContainer}>
                <Text style={{ color: 'white', fontSize: 15 }}>LV.{props.item.level}</Text>
              </View>
            : null
          }
        </View>
      </View>
    </TouchableOpacity>
  )
}

const itemGroup = StyleSheet.create({
  itemBox: {
    backgroundColor: 'rgba(137, 146, 193, 0.8)',
    borderRadius: 10,
    aspectRatio: 3,
    width: '100%',
    overflow: 'hidden',
    marginVertical: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imageBox: { 
    flex: 1,
    height: '70%',
    backgroundColor: 'white',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemImg: {
    resizeMode: 'contain', 
    width: '70%', 
    height: '70%' 
  },
  fontContainer: { 
    flex: 3,
    height: '70%',
    marginEnd: '5%',
    flexDirection: 'row'
  },
  fontStyle: { 
    flex: 1,
    fontSize: 15,
    color: 'white',
  },
  priceContainer: { 
    flex: 1,
    flexDirection: 'row'
  },
  coinIcon: { 
    resizeMode: 'contain', 
    height: '70%',
    width: '10%'
  }
})