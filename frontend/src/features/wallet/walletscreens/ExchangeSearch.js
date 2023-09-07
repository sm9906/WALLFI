import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export default function ExchangeSearch({navigation}){
  useLayoutEffect(()=>{
    const exchangeRate =async()=> {await axios.get('http://192.168.100.210:8080/exchange/info',{
        headers:{
          'Content-Type': 'application/json'
        }
      });
      console.log(exchangeRate.data.data.exchangeDtoList)
    }
  }, [])

  return(
    <View>
      <Text>ㅁㄴㅇㄹ</Text>
    </View>
  )
}