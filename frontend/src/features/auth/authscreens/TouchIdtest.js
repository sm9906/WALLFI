import React, { useState, useEffect } from "react";
import { 
  View,
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
      console.log(compatible)
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

    })

  }
}

export default Sensor

// // const optionalConfigObject = {  
// // 	unifiedErrors: false  // 통합 오류 메시지 사용 ( 기본값 false )
// // 	passcodeFallback: false // true가 전달되면 기기가 touch id / face id 등에 등록되지 않은
// //     // 경우 isSupported에서 오류를 반환하도록 허용합니다. 
// //     // 그렇지 않으면 사용자가 등록되지 않은 경우에도 지원되는 방법 만 알려줍니다.(기본값 false) 
// //     } 
    


