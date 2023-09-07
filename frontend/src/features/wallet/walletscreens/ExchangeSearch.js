import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Background } from '../walletcomponents/CommonStyle';
import axios from 'axios';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

function ShwoExchange({통화코드:ntnCode, 매매기준환율:exchangeRate, 전일대비:compareDt}){
  console.log(ntnCode)
  return(
    <View style={styleShow.container}>
      <View style={styleShow.ntnContainer}>
        <Text style={styleShow.ntnText}>{ntnCode}</Text>
      </View>
      <Text style={styleShow.exchangeRate}>{exchangeRate}</Text>
      <Text>{compareDt}</Text>
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
      <View style={{...styles.excontainer, marginTop:'15%', flexDirection:'row'}}>
        {exchanges&&exchanges.map((exchange, index)=>{
            if(index<=2){
              return <ShwoExchange key={index} {...exchange}/>
            }else{
              return null;
            }
          })
        }
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
    backgroundColor: '#E6F0FC',
    padding:'3%'
  }
})