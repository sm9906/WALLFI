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

export default function LogIn({navigation}){

  const dispatch = useDispatch();

  const [ID, setID] = useState('ssafy');
  const [password, setPassword] = useState('ssafy');
  // const [ID, setID] = useState('');
  // const [password, setPassword] = useState('');
  
  const onPress = async()=>{
    await dispatch(postLogIn({userId:ID, password})).unwrap()
    .then(()=>
        navigation.navigate('Wallet')
    )
  }
  return(
    <View style={styles.background}>
      
      <View style={styles.txtContainer}>
        <Text style={styles.txtSize}>아이디</Text>
        <TextInput 
              autoCapitalize="none"
              keyboardShouldPersistTaps="handled" 
              placeholder="  아이디"
              onChangeText={text => setID(text)}
              style={styles.inputBox}
        />
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.txtSize}>비밀번호</Text>
        <TextInput  
              autoCapitalize="none"
              keyboardShouldPersistTaps="handled" 
              placeholder="  비밀번호"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={styles.inputBox}
        />
      </View>
      
      <TouchableOpacity style={ButtonStyle.button} onPress={onPress}>
        <Text style={ButtonStyle.btnFont}>로그인</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({  
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
  }

})