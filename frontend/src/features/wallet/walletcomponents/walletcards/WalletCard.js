import React, { FC } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableOpacity, 
  View,
  Image,
  StyleSheet
 } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

import {colors} from './CardInfo';
import ChangeForm from "../ChangeForm";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../ScreenSize";


const CardItem = (props) => {
  // configuring navigation
  const navigation = useNavigation();
  const data = props.data;
  const id = props.data.accId
  console.log(data)
  return (
    <View style={{...styles.card, backgroundColor:data.cardType!=='SEP'?colors[id%5]:'black'}}>
      <View style={styles.account}>
        {data.image&&<Image source={data.image} style={styles.flagImg}/>}
        <Text style={{...styles.cardinfo, fontSize:RFPercentage(2)}}>   {data.ntnCode}   {data.cardType==='저축예금'?data.accountnum:data.cardType}</Text>
      </View> 
      <View style={styles.balance}>
        <Text style={styles.cardinfo}>{ChangeForm(data.balance)} {data.ISO}</Text>
        <View style={styles.buttons}>
          {(data.cardType==='저축예금'||data.cardType==='SEP')&&
          <TouchableOpacity onPress={()=>navigation.navigate('SendWho', {type:'송금', data})} style={styles.button}>
            <Text style={styles.txtSize}>송금하기</Text>
          </TouchableOpacity>}
          {data.cardType==='저축예금'&&
          <TouchableOpacity onPress={()=>navigation.navigate('SendWho', {type:'환전', data})} style={styles.button}>
            <Text style={styles.txtSize}>환전하기</Text>
          </TouchableOpacity>}
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
    color:'white',
    fontSize:RFPercentage(3),
    fontWeight:'bold'
  },
  account:{
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth*3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical:'5%',
    width: '100%',
    height:'30%',
    alignItems:'center'
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
    justifyContent: 'space-evenly',
  },
  button:{
    marginHorizontal:'5%',
    paddingHorizontal:'5%',
    paddingVertical:'2%',
    backgroundColor:'white',
  },
  txtSize:{
    fontSize:RFPercentage(2) 
  },
  flagImg:{
    resizeMode:'contain',
    marginTop:'2%',
    height: SCREEN_WIDTH*0.05,
    width: SCREEN_WIDTH*0.05,
    borderRadius:100
  }
});
