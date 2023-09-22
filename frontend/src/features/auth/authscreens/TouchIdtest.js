import React, { useState, useEffect } from "react";
import { 
  View,
  Text,
  Button
 } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

function Sensor(props){  
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  useEffect(()=>{
    (async()=>{
      const compatible = await LocalAuthentication.hasHardwareAsync();
      // 장치에서 얼굴이나 지문 인식을 사용할 수 있는지 확인. 
      setIsBiometricSupported(compatible);
    })
    onAuthenticate();
  })

  const onAuthenticate = ()=>{
    const auth = LocalAuthentication.authenticateAsync({
      propmptMessage: 'AUthenticate with TOouch ID', 
      // disableDeviceFallback 
    });
    auth.then(result=>{
      props.setIsAuthenticated(result.success);
    }).catch(err=>console.log(err))

  }
}

export default Sensor
    


