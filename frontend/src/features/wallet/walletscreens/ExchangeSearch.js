import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';
import Promotion from '../../../assets/wallet/Promotion.png'
import { Background } from '../walletcomponents/CommonStyle';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './WalletHome';
import GoFight from '../walletcomponents/GoFight';
import { useSelector } from 'react-redux';

export default function ExchangeSearch(){
  const {exchangeRates} = useSelector((state)=>state.wallet); 
  const exchanges = Object.values(exchangeRates);
  return(
    <View style={{...Background.background, justifyContent:'flex-start'}}>
      <View style={{...styles.excontainer, marginTop:'15%'}}>
        {exchanges&&exchanges.slice(0,3).map((exchange, index)=>{
          return <ShwoExchange key={index} {...exchange}/>
        })}
      </View>
      <View style={{...styles.excontainer}}>
        {exchanges&&exchanges.slice(3,5).map((exchange, index)=>{
          return <ShwoExchange key={index} {...exchange}/>
        })}
      </View>
      <Image source={Promotion} style={{width:SCREEN_WIDTH*0.8, resizeMode:'contain'}}>
      </Image>
      <GoFight />
    </View>
  )
}

const styles = StyleSheet.create({
  excontainer:{
    width:'85%',
    height:'15%',
    margin:'3%',
    borderRadius: 15,
    backgroundColor: '#E6F0FC',
    padding:'3%',
    flexDirection:'row',
    justifyContent:'space-around'
  }
})

function ShwoExchange({통화코드:ntnCode, 매매기준환율:exchangeRate, 전일대비:compareDt}){
  const sholdShowCreatedown = compareDt<0;
  const trim_compareDt = sholdShowCreatedown? compareDt*-1: compareDt
  const num_exchangeRate = exchangeRate.toLocaleString('es-US')
  return(
    <View style={styleShow.container}>
      <View style={styleShow.ntnContainer}>
        <Text style={styleShow.ntnText}>{ntnCode}</Text>
      </View>
      <Text style={styleShow.exchangeRate}>{num_exchangeRate}</Text>
      <View style={{flexDirection:'row', alignItems:'center' }}>{sholdShowCreatedown?
      (<AntDesign name="caretdown" size={RFPercentage(2)}  color="#0085FF"/>):(<AntDesign name="caretup" size={RFPercentage(2)} color="red" />)}
      <Text style={{fontSize:RFPercentage(2), color:sholdShowCreatedown?'#0085FF':'red'}}>{'  ' +trim_compareDt}</Text>
      </View>
    </View>
  )
}

const styleShow = StyleSheet.create({
  container:{
    width:'33%',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  ntnContainer:{
    backgroundColor:'#3D8CEB',
    width:'50%',
    alignItems:'center',
    borderRadius:20,
  },
  ntnText:{
    color:'white',
    fontSize:RFPercentage(2),
  },
  exchangeRate:{
    fontSize:RFPercentage(3),
  },
  compareDt:{
  }
})

