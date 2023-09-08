import React from 'react';
import { View, Text, TextInput, Image, ScrollView , TouchableOpacity, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../ScreenSize';

const convInput = ['+1만', '+5만', '+10만', '+100만', '전액'];

export const ConvPad = () => {
  return(
    <View style={styles.convPad}>{
      convInput.map((conv, index)=>{
        return(
        <TouchableOpacity style={styles.convBtn} key={index}>
          <Text style={styles.convFont}>{conv}</Text>
        </TouchableOpacity>)
      })}
      
    </View>
  )
}

const styles = StyleSheet.create({
  convPad:{
    width: SCREEN_WIDTH,
    flexDirection:'row',
    height: SCREEN_HEIGHT*0.04,
    alignItems:'center',
    justifyContent:'space-around',
  },
  convBtn:{
    width:'15%',
    height:'100%',
    backgroundColor:'#F3F6FB',
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  convFont:{
    color:'#498AC6',
    fontWeight:'bold',
  }
})