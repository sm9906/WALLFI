import React, {useState} from "react";
import { View, Text, TextInput, Image, ScrollView , TouchableOpacity, StyleSheet } from 'react-native';
import { ConvPad } from "../walletcomponents/sendmoney/ConvKeypad";
import { RFPercentage } from "react-native-responsive-fontsize";

const BACK = 'back';
const CLEAR = 'clear';

export default function SendHow({route, navigation}){
  const accountTo = route.params.account;
  const bankTo = route.params.bank;

  const [money, setMoney] = useState('0');

  const addMoney=(value)=>{
    const currMon = money;
    if(typeof(value)==='number'){
      value += Number(money);
      value = String(value);
      setMoney(value);
    }else{
      if(value === 'back'){
        setMoney(currMon.length===1?'0':currMon.slice(0,-1));
      }else if(value === 'clear'){
        setMoney('0');
      }else if(value==='all'){
        console.log('전액')
      }else{
        setMoney((prev)=>prev==='0'?value:prev+value)
      }
    }  
  }

  return(
    <View style={styles.background}>
      <Text>{bankTo} {accountTo}</Text>
      <Text style={styles.infoText}>얼마를 보낼까요?</Text>
      <Text>{money}원</Text>
      <Text>신한 110-556-869686 0원</Text>
      <ConvPad addMoney={addMoney} />
    </View>
  )
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor:'white',
  }

})
