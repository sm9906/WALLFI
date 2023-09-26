import React, {useState} from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { RFPercentage } from "react-native-responsive-fontsize";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../wallet/walletcomponents/ScreenSize";;
import { ButtonStyle } from "../../wallet/walletcomponents/CommonStyle";
import AuthButton from "../authcomponents/AuthButton";

import { AuthStyle } from "./LogIn";

export default function SignUp({navigation}){
  const dispatch = useDispatch();

  const [ID, setID] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  const onPress = async()=>{
    console.log(1)
  }
  return(
    <View style={AuthStyle.background}>
      <Text style={{...AuthStyle.header, marginBottom:SCREEN_HEIGHT*0.02}}>WALLET FIGHT</Text>
      <View style={AuthStyle.txtContainer}>
        <Text style={AuthStyle.txtSize}>이름</Text>
        <TextInput 
              autoCapitalize="none"
              keyboardShouldPersistTaps="handled" 
              placeholder="  이름"
              onChangeText={text => setName(text)}
              style={AuthStyle.inputBox}
        />
      </View>
      <View style={AuthStyle.txtContainer}>
        <Text style={AuthStyle.txtSize}>아이디</Text>
        <TextInput 
              autoCapitalize="none"
              keyboardShouldPersistTaps="handled" 
              placeholder="  아이디"
              onChangeText={text => setID(text)}
              style={AuthStyle.inputBox}
        />
      </View>
      <View style={AuthStyle.txtContainer}>
        <Text style={AuthStyle.txtSize}>비밀번호</Text>
        <TextInput  
              autoCapitalize="none"
              keyboardShouldPersistTaps="handled" 
              placeholder="  비밀번호"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={AuthStyle.inputBox}
        />
      </View>
      <AuthButton btnTxt='회원가입'/>
      <View style={AuthStyle.goSignupTxt}>
        <Text> 이미 계정이 있다면 </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('LogIn')}><Text style={AuthStyle.goSignup}>로그인</Text></TouchableOpacity>
        <Text> 하러 가기 </Text>
      </View>
    </View>
  )
}
