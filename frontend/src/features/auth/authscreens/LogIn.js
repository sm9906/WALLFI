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

export default function LogIn({navigation}){
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const onPress= ()=>{
    navigation.navigate('Wallet');
  }
  return(
    <View style={styles.background}>
      
      <View style={styles.txtContainer}>
        <Text>아이디</Text>
        <TextInput 
              keyboardShouldPersistTaps="handled" 
              placeholder="  아이디"
              onChangeText={text => setID(text)}
              style={styles.inputBox}
        />
      </View>
      <View style={styles.txtContainer}>
        <Text>비밀번호</Text>
        <TextInput  
              keyboardShouldPersistTaps="handled" 
              placeholder="  비밀번호"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={styles.inputBox}
        />
      </View>
      
      <TouchableOpacity style={ButtonStyle.button} onPress={() => navigation.navigate('Wallet')}>
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
  },
  txtContainer:{
    width:SCREEN_WIDTH*0.8,
    height:SCREEN_HEIGHT*0.07,
    marginBottom: SCREEN_HEIGHT*0.03
  }

})