import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

import JumpAccount from '../../../assets/wallet/JumpAccount.png';
import BaseballAccount from '../../../assets/wallet/BaseballAccount.png';
import {Background} from '../walletcomponents/Background';
import GoFight from '../walletcomponents/walletcards/GoFight';



export default function MakeAccount({ navigation }){
return(
  <View style={Background.background} >
    <TouchableHighlight style={{flex:1}} onPress={()=>navigation.navigate('ExchangeSearch')}>
      <Image source={JumpAccount} style={{width:'90%', resizeMode:'contain'}}/>
    </TouchableHighlight>
    {/* <Image source={BaseballAccount} style={{width:'90%', resizeMode:'contain'}}/> */}
    <GoFight/>
  </View>
)}