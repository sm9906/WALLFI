import React, {useState} from "react";
import {
  View,
  TouchableOpacity
} from 'react-native'
import { ButtonStyle } from "../../wallet/walletcomponents/CommonStyle";

export default function AuthButton(props){
  return(
    <View>
      <TouchableOpacity style={ButtonStyle.button} onPress={()=>{console.log(props)}}>
        <Text style={ButtonStyle.btnFont}>로그인</Text>
      </TouchableOpacity>
    </View>
  )
}