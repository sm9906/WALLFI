import React, {useRef, useState} from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { RFPercentage } from "react-native-responsive-fontsize";
import { postSignUp } from "../authSlice";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../wallet/walletcomponents/ScreenSize";;
import AuthButton from "../authcomponents/AuthButton";

import { AuthStyle } from "./LogIn";

export default function SignUp({navigation}){
  const dispatch = useDispatch();

  const userId = useRef('');
  const name = useRef('');
  const password = useRef('');
  
  const onPress = async()=>{
    const data ={
      name : name.current,
      userId : userId.current,
      password : password.current
    }
    await dispatch(postSignUp(data)).then((res)=>{
      navigation.navigate('LogIn');      
    });
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
              onChangeText={text => name.current=text}
              style={AuthStyle.inputBox}
        />
      </View>
      <View style={AuthStyle.txtContainer}>
        <Text style={AuthStyle.txtSize}>아이디</Text>
        <TextInput 
              autoCapitalize="none"
              keyboardShouldPersistTaps="handled" 
              placeholder="  아이디"
              onChangeText={text => userId.current=text}
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
              onChangeText={text => password.current=text}
              style={AuthStyle.inputBox}
        />
      </View>
      <AuthButton btnTxt='회원가입' onPress={onPress}/>
      <View style={AuthStyle.goSignupTxt}>
        <Text> 이미 계정이 있다면 </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('LogIn')}><Text style={AuthStyle.goSignup}>로그인</Text></TouchableOpacity>
        <Text> 하러 가기 </Text>
      </View>
    </View>
  )
}
