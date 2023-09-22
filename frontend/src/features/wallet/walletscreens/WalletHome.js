import React, {useState} from 'react';
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

import CardItem from '../walletcomponents/walletcards/WalletCard';
import GoFight from '../walletcomponents/GoFight';
import {Background} from '../walletcomponents/CommonStyle';
import ShinhanLogo from '../../../assets/wallet/ShinhanLogo.png';
import Exchange from '../../../assets/wallet/Exchange.png'
import { getAccounts, getExchangeRate } from '../walletSlice';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../walletcomponents/ScreenSize";


export default function WalletHome({navigation}) {
  const dispatch = useDispatch();
  const {userId, mainAccount} = useSelector(state=>state.auth)
  // const {cards} = useSelector(state=>state.wallet);
  // 홈에 들어올 때 마다 새로고침 하는 게 맞는데 
  // 예적금 때문에 그럴 수 없음..

  const [cards, setCards] = useState();
  useFocusEffect(
    React.useCallback(()=>{
      getData()
    },[])
  )

  const getData = async() => {
    try {
      // console.log('?')
      await dispatch(getExchangeRate());
      const response = await dispatch(getAccounts({userId, mainAccount}));
      setCards(response.payload)
    } catch (err) {
      console.log('walletscreens/WalletLoading.js',err);
    }
  }
  
  return (
    <>
    {cards&&<View style={Background.background}>
      <View style={{height:SCREEN_HEIGHT*0.25}}>
        <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} horizontal={true} style={{marginHorizontal:SCREEN_WIDTH*0.05}}>
          {cards&&cards.map((card, index)=>{
              return(<CardItem key={index} data={card} />)
          })}
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('MakeAccount')}>
          <Image source={ShinhanLogo} style={{width:'20%', height:'35%', resizeMode:'contain'}}></Image>
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
