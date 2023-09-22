import React, {useState} from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { ButtonStyle } from "../../wallet/walletcomponents/CommonStyle";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../wallet/walletcomponents/ScreenSize";
import { RFPercentage } from "react-native-responsive-fontsize";
import { postLogIn } from "../authSlice";
import { useSelector, useDispatch } from "react-redux";
import AuthButton from "../authcomponents/AuthButton";
import Sensor from './TouchIdtest';

export default function LogIn({navigation}){

  const dispatch = useDispatch();

  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onPress = async()=>{
    await dispatch(postLogIn({userId:ID, password})).unwrap()
    .then(()=>
        navigation.navigate('Wallet')
    )
  }


  return(
    <View style={AuthStyle.background}>
      {!isAuthenticated&&<Sensor setIsAuthenticated={setIsAuthenticated}/>}
      <View> 
        <Text style={AuthStyle.header}>WALLET FIGHT</Text>
      </View>
      <View style={{...AuthStyle.txtContainer, marginTop:SCREEN_HEIGHT*0.06}}>
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
              style={AuthStyle.inputBox}R
        />
      </View>
      {/* <TouchableOpacity onPress={()=>{}}><Text style={AuthStyle.goSignup}>간편 로그인 등록하기</Text></TouchableOpacity> */}
      <AuthButton onPress={onPress} btnTxt='로그인'/>
      <View style={AuthStyle.goSignupTxt}>
        <Text>아직 계정이 없으신가요? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}><Text style={AuthStyle.goSignup}>회원가입</Text></TouchableOpacity>
      </View>
    </View>
  )
}

export const AuthStyle = StyleSheet.create({  
  header:{
    fontSize:RFPercentage(5),
    fontWeight:'bold',
    color:'#293694'
  },
  background:{
    height:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  inputBox:{
    borderWidth:1,
    borderColor:'grey',
    borderRadius:5,
    height:SCREEN_HEIGHT*0.05,
    marginTop:SCREEN_HEIGHT*0.01,
    fontSize:RFPercentage(2)
  },
  txtContainer:{
    width:SCREEN_WIDTH*0.8,
    height:SCREEN_HEIGHT*0.07,
    marginBottom: SCREEN_HEIGHT*0.03
  },
  txtSize:{
    fontSize:RFPercentage(2)
  },
  goSignupTxt:{
    flexDirection:'row',
    marginTop: SCREEN_HEIGHT*0.1,
    alignItems:'center'
  },
  goSignup:{
    color:'#293694',
    fontSize:RFPercentage(1.5)
  }

})