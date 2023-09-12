import React, { FC } from "react";
import { StatusBar } from "expo-status-bar";
import {Text, TouchableOpacity, 
  View, Image, StyleSheet } from "react-native";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../ScreenSize";
import { useNavigation } from "@react-navigation/native";
import {colors} from './CardInfo';

const CardItem = (props) => {
  // configuring navigation
  const navigation = useNavigation();
  console.log(props)
  const data ={
    nation:'KRW',
    accountnum:'1111111111',
    balance:1000000,
  }
  const id = props.data.accId
  // move to balance page
  const handlePress = () => {
    console.log();
  };

  return (
    <View style={{...styles.card, backgroundColor:colors[id%5]}}>
      <View style={styles.account}>
       <Text style={styles.cardinfo}>{data.nation}{data.accountnum}</Text>
      </View> 
      <View style={styles.balance}>
        <Text style={{...styles.cardinfo, fontSize:30, }}>{data.balance.toLocaleString('es-US')}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={()=>navigation.navigate('SendWho', {type:'송금'})} style={styles.button}>
            <Text>송금하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('SendWho', {type:'환전'})} style={styles.button}>
            <Text>환전하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card:{
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.22,
    backgroundColor: '#293694',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    paddingVertical:SCREEN_HEIGHT * 0.23 * 0.05,
    marginHorizontal: SCREEN_WIDTH * 0.05
  },
  cardinfo:{
    color:'white'
  },
  account:{
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth*3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop:'5%',
    width: '100%',
    height:'30%',
  },
  balance:{
    height:'70%',
    width:'100%',
    justifyContent:'space-evenly',
    alignItems: 'center'
  }, 
  buttons:{
    width:'70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button:{
    paddingHorizontal:'5%',
    paddingVertical:'2%',
    backgroundColor:'white',
  }
});