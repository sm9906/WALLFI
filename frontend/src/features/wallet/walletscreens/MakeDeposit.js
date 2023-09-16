import React, {useState, useEffect} from "react";
import { 
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput
 } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";

import { Background, ButtonStyle } from "../walletcomponents/CommonStyle";

import { SCREEN_HEIGHT } from "./WalletHome";


const Deposit = {
  'Levelup':{
    '기본금리': 3.7,
    '추가금리': 0.1,
    'message': '최고 레벨 캐릭터 수 +',
    '가입기간': 12,
}}

const selNations = ['KRW','USD','JPY','EUR','CNY','AUD'];

export default function MakeDetail({route,navigation}){
  console.log(route.params.type) // LevelUp
  const type = route.params.type;
  const money = '100,000원'
  return(
    <View style={{...Background.background, padding:'10%', justifyContent:'none'}}>
      <View style={styles.titleContent}>
        <Text style={styles.nowRate}>{`현재 적용 금리 ${Deposit[type]['기본금리']}%`}</Text>
        <Text style={styles.rateBg}>{`연 ${Deposit[type]['기본금리']}%`}</Text>
        <Text style={styles.rateBg}>{`${Deposit[type]['message']} ${Deposit[type]['추가금리']}%`}</Text>
      </View>
      <View style={styles.middleContainer}>
        <Text style={{ alignSelf: 'flex-end', marginBottom:'5%', fontWeight:'bold'}}>{`가입기간 ${Deposit[type]['가입기간']}개월`}</Text>
        <View style={styles.inputContainer}>
          <SelectDropdown
            data={selNations}
            onSelect={(selectedItem, index)=>{
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index)=>{
              return selectedItem
            }}
            defaultValue={selNations[0]}
            buttonStyle={styles.nationSel}
            dropdownIconPosition={'left'}
          />
          <TextInput placeholder="금액 입력" style={styles.txtInput}/>
        </View>
        <View style={{width:'100%'}}>
          <Text style={styles.rateCalc}>만기 시 받는 이자 </Text>
          <Text style={{...styles.rateCalc, marginBottom:'15%'}}>{money}</Text>
        </View>
        <TouchableOpacity style={ButtonStyle.button}>
          <Text style={{...ButtonStyle.btnFont, fontSize:RFPercentage(2.5)}}>가입</Text>
        </TouchableOpacity>
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  titleContent:{
    width:'100%',
    color:'#123C8D',
    height:SCREEN_HEIGHT*0.2,
    marginBottom:SCREEN_HEIGHT*0.15
  },
  rateBg:{
    backgroundColor:'#B9C2FF',
    marginVertical:'2%',
    borderRadius:10,
    paddingHorizontal:'3%',
    paddingVertical:'3%',
    color:'#123C8D',
    alignSelf: 'flex-start'
  },
  middleContainer:{
    width:'95%',
    height:SCREEN_HEIGHT*0.2,
    justifyContent:'center',
    alignItems:'center',
  },
  inputContainer:{
    borderRadius:15,
    borderBlockColor: Background.background.backgroundColor,
    backgroundColor:'white',
    height:'70%',
    width:'100%',
    paddingHorizontal:'10%',
    marginBottom:SCREEN_HEIGHT*0.08
  },
  txtInput:{
    height:'40%',
    fontSize:RFPercentage(2.5),
    paddingHorizontal:'10%',
    color:'grey'
  },
  nationSel:{
    width:'100%',
    height:'35%',
    marginTop:'10%',
    backgroundColor:'white',
    borderRadius: 10,
    borderBottomColor: Background.background.backgroundColor,
    borderBottomWidth: StyleSheet.hairlineWidth*5,
  },
  nowRate:{
    fontSize:RFPercentage(3),
    fontWeight:'bold',
    marginBottom:SCREEN_HEIGHT*0.02,
  },
  plusInfo:{
    fontWeight:'bold',
  },
  rateCalc:{
    fontWeight:'bold',
    fontSize:RFPercentage(3.5),
  },

})