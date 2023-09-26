import React, {useState} from "react";
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import { ButtonStyle } from "../../wallet/walletcomponents/CommonStyle";

export default function AuthButton(props){
  const btnTxt = props.btnTxt
  const onPress = props.onPress
  return(
    <View>
      <TouchableOpacity style={ButtonStyle.button} onPress={()=>{onPress()}}>
        <Text style={ButtonStyle.btnFont}>{btnTxt}</Text>
      </TouchableOpacity>
    </View>
  )
}