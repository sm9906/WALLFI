import React, {useState} from "react";
import { View, Text, StyleSheet } from 'react-native';
import { ConvPad } from "../walletcomponents/sendmoney/ConvKeypad";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function SendHow({route, navigation}){

  const accountTo = route.params.account;
  const bankTo = route.params.bank; 
  const type = route.params.type;

  const [money, setMoney] = useState(0);
  const num_money=Number(money).toLocaleString('es-US');

  const balance = '1,000,000'.replace(/,/g, '');;
  const isOver = Number(balance) < Number(money)
  const addMoney=(value)=>{
    const currMon = money;
    if(typeof(value)==='number'){
      value += Number(money);
      value = String(value);
      setMoney(value);
    }else{
      if(value === 'back'){
        setMoney(currMon.length===1?'0':currMon.slice(0,-1));
      }else if(value === 'clear'){
        setMoney('0');
      }else if(value==='all'){
        console.log('전액')
      }else if(value==='완료'){
        !isOver?navigation.navigate('SendMemo', props = {type, accountTo, bankTo, num_money}):null
      }else{
        setMoney((prev)=>prev==='0'?value:prev+value)
      }
    }  
  }
  return(
    <View style={styles.background}>
      <View style={styles.textContainer}>
        <View>
          <Text style={{...styles.accountTo,marginBottom:'5%' }}>{bankTo} {accountTo}</Text>
          <Text style={styles.infoText}>얼마를 보낼까요?</Text>
        </View>
        <Text style={{...styles.currMoney, color:isOver?'red':'black'}}>{num_money}원</Text>
        <View style={styles.myAccount}>
          <Text style={styles.accountTo} >신한 110-556-869686 0원</Text>
        </View>
      </View>
      <ConvPad addMoney={addMoney} />
    </View>
  )
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor:'white',
    padding:'10%'
  },
  textContainer:{
    flex:0.8,
    justifyContent:'space-between',
    padding:'3%'
  },
  myAccount:{
    backgroundColor:'#F3F6FB',
    borderRadius:10,
    height: '10%',
    justifyContent:'center',
    paddingHorizontal:'5%'
  },
  accountTo:{
    color:'#646566',
  },
  infoText:{
    fontSize:RFPercentage(3),
    fontWeight:'bold',
  },
  currMoney:{
    textAlign:'center',
    fontSize:RFPercentage(3)
  }

})
