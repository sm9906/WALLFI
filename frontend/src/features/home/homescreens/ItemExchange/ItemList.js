import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import { images } from '../../../../common/imgDict.js';

export default function List(props) {

  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 30 * 2;
  const numColumns = 2;

  return (
    <FlatList 
      data={props.data}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
      renderItem={({item}) => 
      <ItemList 
        item={item} 
        width={(containerWidth - margins) / numColumns}
        setModalVisible={props.setModalVisible}
        setSelectedItem={props.setSelectedItem} />}
      keyExtractor={item => item.id.toString()}
      columnWrapperStyle={{ justifyContent: 'flex-start' }}
      numColumns={numColumns}
    />
  )
}

function ItemList(props) {

  return (
    <TouchableOpacity 
      style={[itemGroup.itemBox, { width: props.width }]} 
      onPress={() => { props.setModalVisible(true); props.setSelectedItem({...props.item})}}>
      <View style={itemGroup.imageBox}>
        <Image source={props.item.imageUrl} style={itemGroup.itemImg} />
      </View>
      <View style={itemGroup.fontContainer}>
        <Text style={itemGroup.fontStyle}>{props.item.name}</Text>
        <View style={itemGroup.priceContainer}>
          <Image source={images.gameIcon.coin} style={itemGroup.coinIcon} />
          <View style={{ flex: 4, marginBottom: '5%' }}>
            <Text style={itemGroup.fontStyle}>  {props.item.price}</Text>
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
    height: '50%',
    width: '80%',
    marginVertical: '10%',
    backgroundColor: '#ECF7FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemImg: {
    resizeMode: 'contain', 
    width: '100%', 
    height: '100%' 
  },
  fontContainer: { 
    height: '50%',
    width: '70%',
    justifyContent: 'space-evenly',
  },
  fontStyle: { 
    fontSize: 12,
    fontWeight: 'bold',
    color: '#474747',
  },
  priceContainer: { 
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '40%'
  },
  coinIcon: { 
    flex: 1,
    resizeMode: 'contain', 
    height: '100%'
  }
})