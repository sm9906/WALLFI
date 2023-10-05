import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { 
  getCharacterList, 
  getGameInfo, 
  getItemList,
  getMainCharacter, 
  purchaseCharacter, 
  purchaseItem 
} from '../homeSlice';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../common/ScreenSize.js';

import LoadingImg from '../../../assets/game/loading/LoadingImg.gif'
import SSAFY from '../../../assets/wallet/SSAFY.png'


export default function GameLoading({navigation}) {

    const dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            await dispatch(getGameInfo()).then(res => console.log(res, '로딩'));
            await dispatch(getMainCharacter())
            await dispatch(getCharacterList())
            await dispatch(purchaseCharacter())
            await dispatch(purchaseItem())
            await dispatch(getItemList())
            setTimeout(()=>{
                navigation.navigate('GameHome');
            }, 2000)
        } catch (e) {
            console.log(e);
        }
    }

  return (
    <View style={loadingStyle.background}>
      <View>
      </View>
      <View style={{width:'70%'}}>
        <Text style={loadingStyle.titleWAL}>
            WALLET
        </Text>
        <Text style={loadingStyle.titleFIGHT}>
            FIGHT
        </Text>  
        <Image source={LoadingImg} style={loadingStyle.img}/>
        <Text style={loadingStyle.shinhanTXT}>
          아시나요?{'\n'}
          월피 캐릭터들은 
          {'\n'}각 국가의 환율과 연동됩니다.
        </Text>
      </View>
      <View style={loadingStyle.logoContainer}>
        <Image resizeMode='contain'style={loadingStyle.shinhanLogo} source={SSAFY}/>
        <Text style={loadingStyle.shinhanTXT}>SSAFY</Text>
      </View>

    </View>
  )
}

const loadingStyle = StyleSheet.create({
  background:{
    flex:1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  img:{
    resizeMode:'contain',
    height: SCREEN_HEIGHT*0.3,
    width: SCREEN_WIDTH*0.7,
  },
  titleWAL:{
    color:'white',
    fontWeight:'bold',
    fontSize:RFPercentage(5),
  },
  titleFIGHT:{
    color:'#FFB800',
    fontSize:RFPercentage(7),
    fontWeight:'bold'
  },
  logoContainer:{
    flexDirection:'row',
    height:'10%',
    justifyContent:'center',
    alignItems:'center'
  },
  shinhanLogo:{
    marginRight:'3%',
    height:SCREEN_HEIGHT*0.02,
    width:SCREEN_WIDTH*0.04
  },
  shinhanTXT:{
    color:'white'
  }
})
