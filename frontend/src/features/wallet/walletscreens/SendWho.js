import React, {useState} from "react";
import { View, Text, TextInput, Image, ScrollView , TouchableOpacity, StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import {Background, ButtonStyle} from "../walletcomponents/CommonStyle";
import SelectDropdown from 'react-native-select-dropdown'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./WalletHome";
const BANKS=['신한','농협','하나','카카오뱅크','토스뱅크']

export default function SendWho({navigation}){
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('신한');
  return(
    <View style={{...Background.background, justifyContent:'none'}}>
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
        <TouchableOpacity style={{...ButtonStyle.button, marginTop:'10%'}} onPress={()=>navigation.navigate('SendHow',{account, bank})}>
          <Text style={ButtonStyle.btnFont}>다음</Text>
        </TouchableOpacity>
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