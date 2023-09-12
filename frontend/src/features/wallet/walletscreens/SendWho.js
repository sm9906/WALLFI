import React, {useState} from "react";
import { View, Text, TextInput, Image, ScrollView , TouchableOpacity, StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import {Background, ButtonStyle} from "../walletcomponents/CommonStyle";
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./WalletHome";
const BANKS=['신한','농협','하나','카카오뱅크','토스뱅크']

export default function SendWho({route, navigation}){
  const type = route.params.type // '송금' || '환전'
  return(
    <View style={{...Background.background, justifyContent:'none'}}>
        {type==='송금'?<SendMoney />:<Exchange />}        
    </View>
  )
}

const SendMoney = () => {
  const navigation = useNavigation()
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('신한');
  return(
    <View style={{height:SCREEN_HEIGHT*0.7, justifyContent:'center', alignItems:'center'}}>
       <View style={styles.info}>
          <Text style={styles.infoText}>누구에게 {"\n"}보낼까요?</Text>
        </View> 
        <View style={styles.input}>
          <SelectDropdown
            data={BANKS}
            onSelect={(selectedItem, index)=>{
              setBank(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index)=>{
              return selectedItem
            }}
            defaultValue={BANKS[0]}
            buttonStyle={styles.bankSel}
          />
          <TextInput keyboardType="number-pad" 
            keyboardShouldPersistTaps="handled" 
            style={styles.accountInput}
            placeholder="계좌번호"
            onChangeText={text => setAccount(text)}
          />
        </View>
        <TouchableOpacity style={{...ButtonStyle.button, marginTop:'10%'}} onPress={()=>navigation.navigate('SendHow',{type: '송금', account, bank})}>
          <Text style={ButtonStyle.btnFont}>다음</Text>
        </TouchableOpacity>
      </View>
  )
}

const Exchange = () => {
  const navigation = useNavigation();
  // const 뱅크 나를 제외하고 나라들 배열
  const fromKRW = ['USD','JPY','EUR','GBP','AUD'] 
  const toKRW = ['KRW']

  const [nation, setNation]= useState('USD');
  return(
    <View style={{height:SCREEN_HEIGHT*0.7, justifyContent:'center', alignItems:'center'}}>
    {/* // <View style={{height:SCREEN_HEIGHT*0.7, justifyContent:'center', alignItems:'center'}}> */}
      <View style={styles.info}>
          <Text style={styles.infoText}>어디로 {"\n"}보낼까요?</Text>
          <Text style={{color:'#908686'}}>해외 통장은 원화로만 가능합니다.</Text>
      </View>
      <View style={styles.exchangeInput}>
        <View style={{ width:'40%'}}>
          <Text style={styles.exTxt}>KRW</Text>
        </View>
        <AntDesign name="arrowright" size={RFPercentage(3)} color="black" />
        <SelectDropdown
          data={fromKRW}
          onSelect={(selectedItem, index)=>{
            setNation(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index)=>{
            return selectedItem
          }}
          defaultValue={fromKRW[0]}
          buttonStyle={{backgroundColor:'white',width:'40%'}}
          buttonTextStyle={styles.exTxt}
        />
        
      </View>
      <TouchableOpacity style={{...ButtonStyle.button, marginTop:'10%'}} onPress={()=>navigation.navigate('SendHow',{nation, type: '환전'})}>
          <Text style={ButtonStyle.btnFont}>다음</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  info:{
    paddingLeft: SCREEN_WIDTH*0.1, 
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT*0.2,
    alignItems:'flex-start'
  },
  infoText:{
    fontSize:RFPercentage(4),
    fontWeight:'bold',
  },
  input:{
    backgroundColor:"white",
    width:SCREEN_WIDTH*0.8,
    height:SCREEN_HEIGHT*0.11,
    borderRadius: 10,
    paddingHorizontal:'4%'
  },
  exchangeInput:{
    backgroundColor:'white',
    width:SCREEN_WIDTH*0.8,
    height:'15%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'4%',
    borderRadius:10
  },
  exTxt:{
    fontWeight:'bold', fontSize:RFPercentage(2)
  },
  bankSel:{
    width:'100%',
    backgroundColor:'white',
    borderRadius: 10,
    borderBottomColor: Background.background.backgroundColor,
    borderBottomWidth: StyleSheet.hairlineWidth*5,
  },
  accountInput:{
    flex:1
  },
})