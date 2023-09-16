import React, { useEffect, useRef, useState } from "react";
import { StyleSheet,
  View,
  Animated, 
  Text 
} from "react-native";
import ExpoInfo from "./ExpInfo";

export default function ExpBar(props){
  const exPercentage = (props.exp/ExpoInfo[props.level])*100;
  const ExpStyle = props.ExpStyle
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


