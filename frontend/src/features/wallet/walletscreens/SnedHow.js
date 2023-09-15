import React, {useState} from "react";
import { View, Text, TextInput, Image, ScrollView , TouchableOpacity, StyleSheet } from 'react-native';
import { ConvPad } from "../walletcomponents/sendmoney/ConvKeypad";
import { RFPercentage } from "react-native-responsive-fontsize";
import VirtualKeyboard from "../walletcomponents/sendmoney/VirtualKeypad";

export default function SendHow({route, navigation}){
  const accountTo = route.params.account;
  const bankTo = route.params.bank;

  const [money, setMoney] = useState('0');

  const addMoney=(value)=>{
    if(value===''){
      value='0'
    }
    console.log(typeof(value))
    if(typeof(value)==='number'){
      value += Number(money);
      console.log('ㅎㅇ')
      value = String(value);
    }
    setMoney(value);
  }

  return(
    <View style={styles.background}>
      <Text>{bankTo} {accountTo}</Text>
      <Text style={styles.infoText}>얼마를 보낼까요?</Text>
      <Text>{money}원</Text>
      <Text>신한 110-556-869686 0원</Text>
      <VirtualKeyboard color='black' pressMode='string' onPress={(val) => addMoney(val)} />
    </View>
  )
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor:'white',
  }

})
