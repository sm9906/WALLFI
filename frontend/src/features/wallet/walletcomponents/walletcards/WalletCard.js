import React, { FC } from "react";
import { StatusBar } from "expo-status-bar";
import {Text, TouchableOpacity, 
  View, Image, StyleSheet } from "react-native";

import { ScreenHeight, ScreenWidth } from "../ScreenSize";
import { useNavigation } from "@react-navigation/native";
import {CardInfo} from './CardInfo';

const CardItem = (props) => {
  // configuring navigation
  const navigation = useNavigation();

  const info = {
    nation: '한국',
    accountnum : '1111111',
    balance: '1,000,000'
  }
  const data = new CardInfo(info);
  // move to balance page
  const handlePress = () => {
    console.log();
  };

  return (
    <>
     <View style={styles.card}>
      <View style={styles.account}>
       <Text style={styles.cardinfo}>{data.nation}{data.accountnum}</Text>
      </View> 
      <View style={styles.balance}>
        <Text style={{...styles.cardinfo, fontSize:30, }}>{data.balance}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={()=>navigation.navigate('ExchangeSearch')} style={styles.button}>
            <Text>송금하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('ExchangeSearch')} style={styles.button}>
            <Text>환전하기</Text>
          </TouchableOpacity>
        </View>
      </View>
     </View>
    </>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card:{
    width: ScreenWidth * 0.8,
    height: ScreenHeight * 0.23,
    backgroundColor: '#293694',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical:'5%'
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