import React, {useState} from "react";
import { View, Text, StyleSheet } from 'react-native';
import { ConvPad } from "../walletcomponents/sendmoney/ConvKeypad";
import { RFPercentage } from "react-native-responsive-fontsize";
import VirtualKeyboard from "../walletcomponents/sendmoney/VirtualKeypad";
import { minusMoney } from "../walletSlice";
import { useDispatch } from "react-redux";

export default function SendHow({route, navigation}){
  console.log('얼마나 보낼까요',route)

  const dispatch = useDispatch();
  
  const accountTo = route.params.account||'';
  const bankTo = route.params.bank||''; 
  const type = route.params.type;
  const nationTo = type==='환전'?route.params.nation:'';
  const {accId, accountnum, balance} = route.params.data

  // dispatch()

  const [money, setMoney] = useState(0);
  const num_money=Number(money);
  const form_money=Number(money).toLocaleString('es-US');
  const form_balance = Number(balance).toLocaleString('es-US');
  const isOver = balance < num_money
  
  const sendMoney = async() => {
    console.log(typeof(money))
    await dispatch(minusMoney({num_money, accId}))
    navigation.navigate('SendMemo', props = {type, accountTo, bankTo, form_money})
  }
  
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
        !isOver?sendMoney():null
      }else{
        setMoney((prev)=>prev==='0'?value:prev+value)
      }
    }  
  }


  return(
    <View style={styles.background}>
      <View style={styles.textContainer}>
        <View>
          <Text style={{...styles.accountTo,marginBottom:'5%' }}>{bankTo} {accountTo} {nationTo}</Text>
          <Text style={styles.infoText}>얼마를 {type==='송금'?'보낼':'바꿀'}까요?</Text>
        </View>
        <Text style={{...styles.currMoney, color:isOver?'red':'black'}}>{form_money}원</Text>
        <View style={styles.myAccount}>
          <Text style={styles.accountTo} >신한 {accountnum}   {form_balance}원</Text>
        </View>
      </View>
      {type==="송금"?<ConvPad addMoney={addMoney} />:<VirtualKeyboard addMoney={addMoney}/>}
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
    fontSize:RFPercentage(1.5),
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
