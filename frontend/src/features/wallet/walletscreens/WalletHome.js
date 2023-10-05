import React, {useState, useEffect, useRef} from 'react';
import { 
  StyleSheet,
  Dimensions,
  Text, View, Image, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import SSAFY from '../../../assets/wallet/SSAFY.png'

import CardItem from '../walletcomponents/walletcards/WalletCard';
import GoFight from '../walletcomponents/GoFight';
import {Background} from '../walletcomponents/CommonStyle';
import ShinhanLogo from '../../../assets/wallet/ShinhanLogo.png';
import Exchange from '../../../assets/wallet/Exchange.png'
import { getAccounts, getExchangeRate } from '../walletSlice';
import { ChangeMusic } from '../../home/homeSlice';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../walletcomponents/ScreenSize";


import Music from '../../home/homecomponents/Music';

export default function WalletHome({navigation}) {
  const dispatch = useDispatch();
  const {mainAccount} = useSelector(state=>state.auth);
  const {accounts, ethereum}=useSelector(state=>state.wallet);
  const [type, setType] = useState(true);
  const scrollViewRef = useRef(null);
  const cards = type?accounts:ethereum;

  useFocusEffect(
    React.useCallback(()=>{
      getData()
    },[])
  )

  useEffect(()=>{
    changeCard();
  },[type])

  const getData = async() => {
    dispatch(ChangeMusic());
    try {
      await dispatch(getExchangeRate());
      await dispatch(getAccounts(mainAccount));
    } catch (err) {
      console.log('walletscreens/WalletLoading.js',err);
    }
  }

  const changeCard = () => {
    scrollViewRef.current?scrollViewRef.current.scrollTo({ x: 0, animated: false }):null;
  }
  
  return (
    <>
    {cards&&
    <View style={Background.background}>
      <View style={{flexDirection:'row', height:SCREEN_HEIGHT*0.05}}>
        <TouchableOpacity onPress={()=>setType(true)}><Text style={{...styles.accountTxt, color:type?'black':'grey'}}>전체 계좌</Text></TouchableOpacity> 
        <Text style={styles.accountTxt}>    |   </Text>
        <TouchableOpacity onPress={()=>setType(false)}><Text style={{...styles.accountTxt, color:!type?'black':'grey'}}>가상 화폐</Text></TouchableOpacity> 
      </View>
      <View style={{height:SCREEN_HEIGHT*0.25}}>
        <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} horizontal={true} style={{marginHorizontal:SCREEN_WIDTH*0.05}} ref={scrollViewRef}>
          {cards&&cards.map((card, index)=>{
              return(<CardItem key={index} data={card} />)
          })}
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('MakeAccount')}>
          <Image source={SSAFY} style={{width:'20%', height:'35%', resizeMode:'contain'}}></Image>
          <Text style={styles.txtSize}>예적금 만들기</Text>
          <Text style={{marginLeft:'40%'}}>&gt;</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('ExchangeSearch')}>
          <Image source={Exchange} style={{width:'20%', height:'35%', resizeMode:'contain'}}></Image>
          <Text style={styles.txtSize}>오늘의 환율</Text>
          <Text style={{marginLeft:'40%'}}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <GoFight />
    </View>}
    </>
  );
}

const styles = StyleSheet.create({
  accountTxt:{
    fontWeight:'bold',
    fontSize:RFPercentage(2)
  },
  buttons:{
    marginTop:'10%',
    height:'40%',
    width: '100%',
    alignItems:'center',
    justifyContent: 'space-evenly'
  },
  button:{
    flexDirection:'row',
    height:'20%',
    width : '80%',
    backgroundColor:'white',
    borderRadius: 10,
    paddingHorizontal:'10%',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  txtSize:{
    fontSize:RFPercentage(2)
  }

});
