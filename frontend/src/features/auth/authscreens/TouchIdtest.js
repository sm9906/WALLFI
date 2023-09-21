import React from "react";
import { 
  View,
  Button
 } from "react-native";
import TouchID from "react-native-touch-id";
import * as LocalAuthentication from 'expo-local-authentication';

const optionalConfigObject = {   
  title: 'Authentication Required',  // 타이틀   
  imageColor: '#e00606',  // 지문인식 기본 컬러   
  imageErrorColor: '#ff0000',  // 지문인식 실패 컬러   
  sensorDescription: 'Touch sensor',  // 터치센서 
  sensorErrorDescription: 'Failed', // 터치센서 Fail Text 변경   
  cancelText: 'Cancel', // Android // 취소버튼 Text 변경   
  fallbackLabel: 'Show Passcode',  // ios ( 비어있으면 레이블이 숨겨짐 )   
  unifiedErrors: false, // 통합 오류 메시지 사용 ( 기본값 false)   
  passcodeFallback: false  // ios-faceId / touch 사용할 수 없는 경우 기기비밀번호 사용여부 
} 


function Sensor(){
  async function sensor(){
    try{
      const isSupported = await TouchID.isSupported(optionalConfigObject);
      console.log(`타입:${isSupported}`);
    }catch(err){
      console.log(err);
    } await TouchID.authenticate(
        'description', 
        optionalConfigObject
      );
    }catch(err){
      console.log(err)
    try{
      const res =
      console.log(err); 
    }
  }
  return(
    <View>
      <Button onPress={()=>sensor()} title="sensor"></Button>
    </View>
  )
}

// export default Sensor

// // const optionalConfigObject = {  
// // 	unifiedErrors: false  // 통합 오류 메시지 사용 ( 기본값 false )
// // 	passcodeFallback: false // true가 전달되면 기기가 touch id / face id 등에 등록되지 않은
// //     // 경우 isSupported에서 오류를 반환하도록 허용합니다. 
// //     // 그렇지 않으면 사용자가 등록되지 않은 경우에도 지원되는 방법 만 알려줍니다.(기본값 false) 
// //     } 
    


