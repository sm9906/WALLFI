import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { globalStyles } from '../homestyles/global.js';
import { images } from '../../../common/imgDict.js';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../homecomponents/ScreenSize.js';

import GameHeader from '../homecomponents/GameHeader';
import PageHeader from '../homecomponents/PageHeader.js';

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

  return (
    <View style={btnGroup.btnContainer}>
      <TouchableOpacity style={[btnGroup.btnStyle, {backgroundColor: props.selectedBtn === 0 ? '#0065FE' : '#599CFF'}]} onPress={() => props.setSelectedBtn(0)}>
        <Text style={btnGroup.btnText}>구매</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[btnGroup.btnStyle, {backgroundColor: props.selectedBtn === 1 ? '#0065FE' : '#599CFF'}]} onPress={() => props.setSelectedBtn(1)}>
        <Text style={btnGroup.btnText}>판매</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[btnGroup.btnStyle, {backgroundColor: props.selectedBtn === 2 ? '#0065FE' : '#599CFF'}]} onPress={() => props.setSelectedBtn(2)}>
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

// 구매 버튼
function Purchase() {

  return (
    <View style={{ flex: 7, alignItems: 'center' }}>
      <Search />
      <View style={{ flex: 6 }}><Text>아이템목록 들어와야함</Text></View>
    </View>
  )
}

// 검색창
function Search() {

  return (
    <View style={search.searchContainer}>
      <View style={search.searchBox}>
        <TextInput style={{ marginHorizontal: '5%', marginVertical: '3%' }} placeholder='검색어를 입력해 주세요'/>
      </View>
      <TouchableOpacity style={search.searchBtn}><Text>검색</Text></TouchableOpacity>
    </View>
  )
}

// 판매 버튼
function Sale() {

  return (
    <Text style={{ flex: 7 }}>판매</Text>
  )
}

// 거래내역 버튼
function History() {

  return (
    <Text style={{ flex: 7 }}>거래내역</Text>
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
    backgroundColor: '#D9EFFF',
    marginHorizontal: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  searchBtn: { 
    flex: 1, 
    height: '50%', 
    backgroundColor: '#D9EFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center', 
    justifyContent: 'center' 
  }
})