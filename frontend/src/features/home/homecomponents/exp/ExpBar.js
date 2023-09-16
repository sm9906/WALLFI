import React, { useEffect, useRef, useState } from "react";
import { StyleSheet,
  View,
  Animated, 
  Text 
} from "react-native";
import ExpoInfo from "./ExpInfo";

export default function ExpBar(props){
  console.log('홈컴포넌트/경험치바 props 확인 ',props)
  const exPercentage = (props.exp/ExpoInfo[props.level])*100
  return(
    <View style={ExpStyle.container}>
      <Text style={ExpStyle.LvTxt}>LV. {props.level}</Text>
      <View style={ExpStyle.barContainer}>
        <View style={{...ExpStyle.exp, width:`${exPercentage}%`}}>
        </View>
      </View>
    </View>
  )
}

const ExpStyle = StyleSheet.create({
  container:{
    width:'80%',
    height: "50%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  LvTxt:{
    color:'white',
    alignContent:'center',
    fontWeight:'bold',
    textShadowColor: "#272B49",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
  },
  barContainer: {
      width: "70%",
      height: "80%",
      backgroundColor: "#D9D9D9",
      borderRadius: 15,
  },
  exp:{
    backgroundColor:'#F6B101',
    borderRadius: 15,
    height:'100%',
  }
})

