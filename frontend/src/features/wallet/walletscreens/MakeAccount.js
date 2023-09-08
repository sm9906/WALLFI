import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import JumpAccount from '../../../assets/wallet/JumpAccount.png';
import BaseballAccount from '../../../assets/wallet/BaseballAccount.png';
import {Background} from '../walletcomponents/CommonStyle';
import GoFight from '../walletcomponents/GoFight';

import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../walletcomponents/ScreenSize';


export default function MakeAccount({ navigation }){
return(
  <View style={Background.background} >
    <TouchableOpacity onPress={()=>navigation.navigate('ExchangeSearch')}>
      <Image source={JumpAccount} style={{width:SCREEN_WIDTH*0.9, resizeMode:'contain'}}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate('ExchangeSearch')}>
      <Image source={BaseballAccount} style={{width:SCREEN_WIDTH*0.9, resizeMode:'contain'}}/>
    </TouchableOpacity>
    {/* <Image source={BaseballAccount} style={{width:'90%', resizeMode:'contain'}}/> */}
    <GoFight/>
  </View>
)}