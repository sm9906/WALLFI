import React, {useState} from "react";
import { View, Text, TextInput, Image, ScrollView , TouchableOpacity, StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import {Background, ButtonStyle} from "../walletcomponents/CommonStyle";
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./WalletHome";


const BANKS=['신한','농협','하나','카카오뱅크','토스뱅크']

let accId = 0;

export default function SendWho({route, navigation}){
  const type = route.params.type // '송금' || '환전'
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('신한');
  const [nation, setNation]= useState('USD');
  accId = route.params.data.accId
  const data = route.params.data
  return(
    <View style={{...Background.background, justifyContent:'none'}}>
      <View style={{height:SCREEN_HEIGHT*0.7, justifyContent:'center', alignItems:'center'}} >
        {type==='송금'?<SendMoney setBank={setBank} setAccount={setAccount}  />:<Exchange setNation={setNation}/>} 
        <TouchableOpacity style={{...ButtonStyle.button, marginTop:'10%'}} onPress={()=>navigation.navigate('SendHow',{type: type, account, bank, nation, data})}>
          <Text style={ButtonStyle.btnFont}>다음</Text>
        </TouchableOpacity>       
    </View>
    </View>
  )
}

const SendMoney = (props) => {
  return(
    <View style={{height:SCREEN_HEIGHT*0.3, justifyContent:'center', alignItems:'center'}}>
       <View style={styles.info}>
          <Text style={styles.infoText}>누구에게 {"\n"}보낼까요?</Text>
        </View> 
        <View style={styles.input}>
          <SelectDropdown
            data={BANKS}
            onSelect={(selectedItem, index)=>{
              props.setBank(selectedItem)
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
            onChangeText={text => props.setAccount(text)}
          />
        </View>
      </View>
  )
}

const Exchange = (props) => {
  const fromNation ='KRW'
  const toNation = fromNation === 'KRW' ?['USD','JPY','EUR','GBP','AUD']:['KRW'];  
  return(
    <View style={{height:SCREEN_HEIGHT*0.3, justifyContent:'center', alignItems:'center'}}>
    {/* // <View style={{height:SCREEN_HEIGHT*0.7, justifyContent:'center', alignItems:'center'}}> */}
      <View style={styles.info}>
          <Text style={styles.infoText}>어떤 화폐로 {"\n"}바꿀까요?</Text>
          <Text style={{color:'#908686', fontSize:RFPercentage(2)}}>해외 통장은 원화로만 가능합니다.</Text>
      </View>
      <View style={styles.exchangeInput}>
        <View style={{ width:'40%'}}>
          <Text style={styles.exTxt}>KRW</Text>
        </View>
        <AntDesign name="arrowright" size={RFPercentage(3)} color="black" />
        <SelectDropdown
          data={toNation}
          onSelect={(selectedItem, index)=>{
            props.setNation(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index)=>{
            return selectedItem
          }}
          defaultValue={toNation[0]}
          buttonStyle={{backgroundColor:'white',width:'40%'}}
          buttonTextStyle={{...styles.txtSize, fontWeight:'bold'}}
        />
      </View>
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
    height:'30%',
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