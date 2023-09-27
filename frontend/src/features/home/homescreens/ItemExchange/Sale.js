import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';

import ButtonGroup from './ButtonGroup.js';
import Search from './Search.js';

// 판매 버튼
export default function Sale() {

  const [selectedBtn, setSelectedBtn] = useState(false);

  return (
    <View style={styles.saleContainer}>
      <ButtonGroup selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />
      <Search />
      <View style={styles.itemContainer}></View>
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