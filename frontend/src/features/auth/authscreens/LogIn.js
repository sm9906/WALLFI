import React, {useState} from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { ButtonStyle } from "../../wallet/walletcomponents/CommonStyle";


export default function LogIn(){
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  return(
    <View style={styles.background}>
      
      <View style={styles.txtContainer}>
        <Text>아이디</Text>
        <TextInput keyboardType="text" 
              keyboardShouldPersistTaps="handled" 
              placeholder="아이디"
              onChangeText={text => setID(text)}
              style={styles.inputBox}
        />
      </View>
      <View style={styles.txtContainer}>
        <Text>비밀번호</Text>
        <TextInput keyboardType="text" 
              keyboardShouldPersistTaps="handled" 
              placeholder="비밀번호"
              onChangeText={text => setPassword(text)}
              style={styles.inputBox}
        />
      </View>
      
      <TouchableOpacity style={ButtonStyle.button} onPress={()=>{console.log(props)}}>
        <Text style={ButtonStyle.btnFont}>로그인</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({  
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  inputBox:{
    borderWidth:1,
    borderColor:'grey',
    borderRadius:5,
    height:'70%',
    marginTop:'2%',
  },
  txtContainer:{
    width:'80%',
    height:'8%',
    marginBottom:'5%'
  }

})