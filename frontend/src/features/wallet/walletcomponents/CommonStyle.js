import { StyleSheet, View, Image } from 'react-native';
import {ScreenWidth, ScreenHeight} from './ScreenSize';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Background=StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F3F6FB',
  },
  whiteback:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  }
})

export const ButtonStyle = StyleSheet.create({
  button:{
    width:ScreenWidth*0.8,
    height:ScreenHeight*0.05,
    backgroundColor:'#293694',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  btnFont:{
    fontSize:RFPercentage(2),
    color:'white',
    fontWeight:'bold',
  }
})