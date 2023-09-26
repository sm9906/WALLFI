import React, {useState} from "react";
import { View, Text, TextInput, Image, ScrollView , TouchableOpacity, StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import {Background, ButtonStyle} from "../walletcomponents/CommonStyle";
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../walletcomponents/ScreenSize";
import { useSelector } from "react-redux";

const BANKS=['신한','농협','하나','카카오뱅크','토스뱅크']

let accId = 0;

export default function SendWho({route}){
  return(
    <View style={{...Background.background, justifyContent:'none'}}>
      {route.params.type==='송금'?<SendMoney outAcc={route.params.data}/>:<Exchange outAcc={route.params.data}/>} 
    </View>
  )
}

const SendMoney = (props) => {
  const navigation = useNavigation();
  
  const [bank, setBank] = useState('신한');
  const [account, setAccount] = useState('');

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
            buttonTextStyle={styles.txtSize}
          />
          <TextInput keyboardType="number-pad" 
            keyboardShouldPersistTaps="handled" 
            style={styles.accountInput}
            placeholder="계좌번호"
            onChangeText={text => setAccount(text)}
          />
        </View>
        <TouchableOpacity style={{...ButtonStyle.button, marginTop:'10%'}} onPress={()=>navigation.navigate('SendHow',{type:"송금", bank, account, outAcc:props.outAcc})}>
          <Text style={ButtonStyle.btnFont}>다음</Text>
        </TouchableOpacity>       
      </View>
  )
}

const Exchange = (props) => {
  const navigation = useNavigation();

  const fromNation = props.outAcc.ntnCode;
  const selNations = fromNation === 'KRW' ?['USD','JPY','EUR','CNY','AUD']:['KRW']; 
  
  const [toNation, setToNation] = useState(selNations[0]);
  
  const exchangeRate = useSelector(state => state.wallet.exchangeRates[fromNation!=='KRW'?fromNation:toNation])
  const exchange = fromNation!=='KRW'?exchangeRate.전신환매입환율:exchangeRate.전신환매도환율
  const ISO = exchangeRate.ISO

  return(
    <View style={{height:SCREEN_HEIGHT*0.7, justifyContent:'center', alignItems:'center'}}>
    {/* // <View style={{height:SCREEN_HEIGHT*0.7, justifyContent:'center', alignItems:'center'}}> */}
      <View style={styles.info}>
          <Text style={styles.infoText}>어떤 화폐로 {"\n"}바꿀까요?</Text>
          <Text style={{color:'#908686', fontSize:RFPercentage(2)}}>해외 통장은 원화로만 가능합니다.</Text>
      </View>
      <View style={styles.exchangeInput}>
        <View style={{ width:'40%'}}>
          <Text style={styles.exTxt}>{fromNation}</Text>
        </View>
        <AntDesign name="arrowright" size={RFPercentage(3)} color="black" />
        <SelectDropdown
          data={selNations}
          onSelect={(selectedItem, index)=>{
            setToNation(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index)=>{
            return selectedItem
          }}
          defaultValue={selNations[0]}
          buttonStyle={{backgroundColor:'white',width:'40%'}}
          buttonTextStyle={{...styles.txtSize, fontWeight:'bold'}}
        />
      </View>
      <View style={{flexDirection:'row', justifyContent:'flex-start', width:'60%', alignItems:'center'}}>
        <Text style={{fontSize:RFPercentage(2)}}>매매 기준율    </Text>
        <Text style={styles.exTxt}>{exchangeRate.ISO} {exchange}</Text>
      </View>
      <TouchableOpacity style={{...ButtonStyle.button, marginTop:'10%'}} onPress={()=>navigation.navigate('SendHow',{outAcc:props.outAcc, type:'환전',exchange, toNation, ISO})}>
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
    height:'10%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'4%',
    borderRadius:10
  },
  exTxt:{
    fontWeight:'bold',
     fontSize:RFPercentage(2)
  },
  bankSel:{
    width:'100%',
    height:'50%',
    backgroundColor:'white',
    borderRadius: 10,
    borderBottomColor: Background.background.backgroundColor,
    borderBottomWidth: StyleSheet.hairlineWidth*5,
  },
  accountInput:{
    fontSize:RFPercentage(2),
    flex:1
  },
  txtSize:{
    fontSize:RFPercentage(2)
  }
})