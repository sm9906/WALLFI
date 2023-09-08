import { StyleSheet, View, Image } from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from './ScreenSize';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Background=StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F3F6FB',
  }
})

export const ButtonStyle = StyleSheet.create({
  button:{
    width:SCREEN_WIDTH*0.8,
    height:SCREEN_HEIGHT*0.05,
    backgroundColor:'#293694',
    justifyContent:'center',
    alignItems:'center'
  },
  btnFont:{
    fontSize:RFPercentage(2),
    color:'white',
    fontWeight:'bold'
  }
})