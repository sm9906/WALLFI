import React, {useState} from "react";
import { View, Text, TextInput, Image, ScrollView , TouchableOpacity, StyleSheet } from 'react-native';
import { ConvPad } from "../walletcomponents/sendmoney/ConvKeypad";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function SendHow({route, navigation}){
  const accountTo = route.params.account;
  const bankTo = route.params.bank;

  const [money, setMoney] = useState(0);


  return(
    <View style={styles.background}>
      <Text>{bankTo} {accountTo}</Text>
      <Text style={styles.infoText}>얼마를 보낼까요?</Text>
      <Text>{money}원</Text>
      <Text>신한 110-556-869686 0원</Text>
      <ConvPad />
    </View>
  )
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor:'white',
  }

})
