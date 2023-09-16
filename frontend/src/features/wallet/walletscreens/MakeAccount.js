import React from 'react';
import { 
  View,
  Image,
  TouchableOpacity,
  Text
 } from 'react-native';

import JumpAccount from '../../../assets/wallet/JumpAccount.png';
import BaseballAccount from '../../../assets/wallet/BaseballAccount.png';
import LevelupAccount from '../../../assets/wallet/LevelupAccount.png'

import { RFPercentage } from "react-native-responsive-fontsize";
import {Background} from '../walletcomponents/CommonStyle';
import GoFight from '../walletcomponents/GoFight';
import { CardInfo } from '../walletcomponents/walletcards/CardInfo';

import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../walletcomponents/ScreenSize';

export default function MakeAccount({ navigation }){
  
  const onPress = () => {
    const info = {
      
    }
  }
  return(
    <View style={Background.background} >
      <View style={{width:'90%',}}>
        <Text style={{fontSize:RFPercentage(3), fontWeight:'bold'}}>적금</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('MakeDeposit',{type:'Levelup'})}>
        <Image source={LevelupAccount} style={{width:SCREEN_WIDTH*0.9, height:SCREEN_HEIGHT*0.25, resizeMode:'contain'}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('MakeDeposit')}>
        <Image source={JumpAccount} style={{width:SCREEN_WIDTH*0.9, height:SCREEN_HEIGHT*0.25, resizeMode:'contain'}}/>
      </TouchableOpacity>
      {/* <Image source={BaseballAccount} style={{width:'90%', resizeMode:'contain'}}/> */}
      <GoFight/>
    </View>
  )
}
