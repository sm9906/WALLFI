import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'; 
import { RFPercentage } from "react-native-responsive-fontsize";

import ShinhanLogo from '../../../assets/wallet/ShinhanLogo.png'
import { Background } from "../walletcomponents/CommonStyle";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./WalletHome";
import { useDispatch, useSelector } from "react-redux";
import { getExchangeRate, getAccounts } from "../walletSlice";

export default function WalletLoading({navigation}){
  const dispatch = useDispatch();
  const { userId, mainAccount } = useSelector(state=>state.auth);
  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    try {
      await dispatch(getExchangeRate()).then((res) => console.log('환율 정보 조회 성공'));
      await dispatch(getAccounts({userId, mainAccount})).then((res) => console.log('계좌 조회 성공'));
      navigation.navigate('WalletHome')
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <View style={{...Background.whiteback, justifyContent:'space-between'}}>
      <View>
      </View>
      <View>
        <Text style={styles.inMyHand}>내 손 안의 작은 지갑</Text>
        <Text style={styles.walFi}>월피</Text>
        <View style={styles.walContainer}>
          <Text style={{...styles.walFi, color:'white'}}>WALFI</Text>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image style={styles.shinhanLogo} source={ShinhanLogo}/>
        <Text>Shinhan Bank</Text>
      </View>
    </View>
  )
} 

const styles = StyleSheet.create({
  inMyHand:{
    color:'#706C6C',
    fontSize:RFPercentage(3),
    fontWeight:'bold'
  },
  walFi:{
    color:'#0518AB',
    fontSize:RFPercentage(7),
    fontWeight:'900'
  },
  walContainer:{
    backgroundColor:'#0518AB',
    alignItems:'center',
    justifyContent:'center'
  },
  logoContainer:{
    flexDirection:'row',
    height:'10%',
    justifyContent:'center',
    alignItems:'center'

  },
  shinhanLogo:{
    resizeMode:'contain',
    marginRight:'3%',
    height:SCREEN_HEIGHT*0.02,
    width:SCREEN_WIDTH*0.04
  }
})

