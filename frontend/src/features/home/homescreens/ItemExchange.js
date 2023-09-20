import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { globalStyles } from '../homestyles/global.js';
import { images } from '../../../common/imgDict.js';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../homecomponents/ScreenSize.js';

import GameHeader from '../homecomponents/GameHeader';
import PageHeader from '../homecomponents/PageHeader.js';

import Purchase from './ItemExchange/Purchase.js';
import Sale from './ItemExchange/Sale.js';
import History from './ItemExchange/History.js';

export default function ItemExchange({ navigation }) {
  const [selectedBtn, setSelectedBtn] = useState(0);
  
  return (
    <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
        <ImageBackground source={images.Background.itemExchange} style={globalStyles.bgImg}>
            <GameHeader />
            <PageHeader navigation={navigation} color={'#091044'} title={'거래소'}/>
            <View style={{ flex: 6.5, alignItems: 'center' }}>
              <View style={styles.contentBox}>
                <ButtonGroup selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />
                <Content selectedBtn={selectedBtn} />
              </View>
            </View>
        </ImageBackground>
    </View>
  )
}

// 구매 / 판매 / 거래내역 버튼그룹
function ButtonGroup(props) {

  // 현재 누른 버튼에 대한 배경 색 스타일 코드
  const backgroundColor = (num) => {
    return props.selectedBtn === num ? '#0065FE' : '#599CFF';
  }

  return (
    <View style={btnGroup.btnContainer}>
      <TouchableOpacity style={[btnGroup.btnStyle, {backgroundColor: backgroundColor(0)}]} onPress={() => props.setSelectedBtn(0)}>
        <Text style={btnGroup.btnText}>구매</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[btnGroup.btnStyle, {backgroundColor: backgroundColor(1)}]} onPress={() => props.setSelectedBtn(1)}>
        <Text style={btnGroup.btnText}>판매</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[btnGroup.btnStyle, {backgroundColor: backgroundColor(2)}]} onPress={() => props.setSelectedBtn(2)}>
        <Text style={btnGroup.btnText}>거래내역</Text>
      </TouchableOpacity>
    </View>
  )
}

// 버튼을 누를 때 마다 나오는 컨텐츠
function Content(props) {

  return (
    props.selectedBtn == 0 ? <Purchase /> : props.selectedBtn == 1 ? <Sale /> : <History />
  )
}

const styles = StyleSheet.create({
  contentBox: {
    width: '90%',
    height: '95%',
    backgroundColor: 'rgba(46, 45, 113, 0.79)',
    borderRadius: 20,
    alignItems: 'center'
  }
})

const btnGroup= StyleSheet.create({
  btnContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: '5%'
  },
  btnStyle: {
    flex: 0.25,
    height: '50%',
    backgroundColor: '#599CFF',
    marginHorizontal: '1%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  }
})