import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import SendCheck from '../../../assets/wallet/SendCheck.png';
import { ButtonStyle } from "../walletcomponents/CommonStyle";
import { convStyle } from "../walletcomponents/sendmoney/ConvKeypad";
import { Background } from "../walletcomponents/CommonStyle";

export default function SendMemo({route,navigation}) {
  const type = route.params.type
  return (
    <View style={{...Background.whiteback, justifyContent:'space-evenly'}}>
      <View style={{alignItems:'center'}}>
        <Image source={SendCheck} />
        <Text style={styles.infoTxt}>{route.params.bankTo} {route.params.accountTo}</Text>
      </View>
      <Text style={styles.infoTxt}>{route.params.form_money}원 {'\n'} 보냈어요</Text>
      <TouchableOpacity style={{...convStyle.convBtn, height:'6%', width:'30%'}}>
        <Text style={{...convStyle.convFont, fontWeight:'bold', fontSize:RFPercentage(2)}} onPress={()=>navigation.navigate('SendWho',{type})}>추가 이체</Text> 
      </TouchableOpacity>
      <TouchableOpacity style={{...ButtonStyle.button, height:'8%'}} onPress={()=>navigation.navigate('WalletHome')}>
        <Text style={ButtonStyle.btnFont}>확인</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  infoTxt:{
    fontSize:RFPercentage(3),
    fontWeight:'bold'
  }

})