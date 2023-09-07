import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Background } from '../walletcomponents/CommonStyle';
import axios from 'axios';

function ShwoExchange({ntnCode:통화코드, exchangeRate:매매기준환율, compareDt:전일대비}){
  return(
    <>
      <View>
        <Text>{ntnCode}</Text>
      </View>
    </>
  )
}

export default function ExchangeSearch({navigation}){
  const [exchanges, setExchages] = useState();
  useEffect(()=>{
    exchangeRate();
  }, []);

  const exchangeRate = async()=> {
    const result = await axios.get('http://192.168.100.210:8080/exchange/info',{
      headers:{
        'Content-Type': 'application/json'
      }
    });
    setExchages([...result.data.data.exchangeDtoList]);
  };

  return(
    <View style={{...Background.background, justifyContent:'flex-start'}}>
      <View style={{...styles.excontainer, marginTop:'15%'}}>
        <ShwoExchange/>
      </View>
      <View style={styles.excontainer}>
        
      </View>
      <Text>{exchanges&&exchanges.map((exchange)=>{
        return exchange.매매기준환율
      })}
      </Text>
      {/* </View> */}
      <Text>ㅁㄴㅇㄹ</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  excontainer:{
    width:'85%',
    height:'15%',
    margin:'3%',
    borderRadius: 15,
    backgroundColor: '#E6F0FC'
  }
})