import React, {useEffect, useState, useMemo} from "react";
import { View, Text, StyleSheet } from 'react-native';
import { ConvPad } from "../walletcomponents/sendmoney/ConvKeypad";
import { RFPercentage } from "react-native-responsive-fontsize";
import VirtualKeyboard from "../walletcomponents/sendmoney/VirtualKeypad";
import { minusMoney, exchangeMoney, postSendMoney, postExchangeMoney } from "../walletSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SendHow({route, navigation}){
  const dispatch = useDispatch();

  // console.log('얼마나 보낼까요',route)
  const type= route.params.type;
  const outAcc = route.params.outAcc;
  const balance = outAcc.balance; 
  const outAccId = outAcc.accId
  // 이체 필요 부분
  const toAccount = type==='송금'?route.params.account :'';
  const toBank = type==='송금'?route.params.bank||'신한': '';
  // 환전 필요 부분
  const exchangeRate = type==='환전'?route.params.exchange:'0';
  const toNation = type==='환전'?route.params.toNation:'';
  const ISO = type==='환전'?route.params.ISO:outAcc.ISO;


  const [money, setMoney] = useState(0); // 입력 금액 (문자)

  const form_balance = Number(balance).toLocaleString('es-US'); // 잔액을 돈 형식 정규화

  const num_money=Number(money); // 입력 금액 -> 숫자
  const form_money=Number(money).toLocaleString('es-US'); // 돈 형식으로 정규화

  const exchangedMoney = ((Number(exchangeRate)*num_money)/(ISO==='¥'?100:1)).toFixed(0) // 환전 시 매매율 * 입력 금액해서 원화 표기 
  
  const form_exchangedMoney = Number(exchangedMoney).toLocaleString('es-US');

  const isOver = type==='송금'||toNation==='KRW'? 
      balance < num_money: balance< Number(exchangedMoney) // 잔액을 초과하는가?

  const {mainAccount, userId} = useSelector(state=>state.auth)
  const sendMoney = () => {
    const data = {
      '이체금액': num_money,
      '입금계좌번호' : '110001785532', // 일단 확인용으로 고정..
      '입금계좌통장메모': '보냅니다',
      '입금은행코드': toBank,
      '출금계좌번호': mainAccount,   
      '출금계좌통장메모':'',
      '통화코드': outAcc.ntnCode
    }
    dispatch(postSendMoney(data))
    .then((res)=>{senMoneydMemo(res)})
    .catch((err) => {
      console.log(err);
    })
  }

  const sendExchange= () => {
    const data = {
      "userId":userId,
      "금액": toNation==='KRW'?Number(exchangedMoney):money,
      "사용자대표계좌": mainAccount,
      "전신환매도환율": exchangeRate,
      "통화코드": toNation
    }
    console.log(data)
    dispatch(postExchangeMoney(data))
    .then((res)=>sendExchangeMemo(res))
    .catch((err)=>{
      console.log(err);
    })
  }

  const sendExchangeMemo = async(res) => {
    
    if(res.error){
      console.log('에러 발생')
    }

    await dispatch(exchangeMoney({num_money,exchangedMoney,outAccId,toNation}))
    const outISO = toNation==='KRW'? '원' : ISO
    const formMoney = toNation==='KRW'? form_exchangedMoney : form_money
    navigation.navigate('SendMemo', props = {type, toNation, toAccount, toBank, formMoney, outISO, outAcc})
  }


  const senMoneydMemo = async(res) => {
    if(res.error){
      console.log('에러 발생') // 여기 에러 발생하면 return 0으로 예외처리 
    }
    await dispatch(minusMoney({num_money, outAccId}))
    
    const outISO = ISO
    const formMoney = form_money
    navigation.navigate('SendMemo', props = {type, toNation, toAccount, toBank, formMoney, outISO, outAcc})
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
        if(type==='송금'){
          !isOver?sendMoney():null
        }else{
          !isOver?sendExchange():null
        }
      }else{
        setMoney((prev)=>prev==='0'?value:prev+value)
      }
    }  
  }


  return(
    <View style={styles.background}>
      <View style={styles.textContainer}>
        <View>
          <Text style={{...styles.accountTo,marginBottom:'5%' }}>{toBank} {toAccount} {toNation}</Text>
          <Text style={styles.infoText}>얼마를 {type==='송금'?'보낼':'바꿀'}까요?</Text>
        </View>
        <Text style={{...styles.currMoney, color:isOver?'red':'black'}}>{form_money}{ISO||'원'}</Text>
        {type==='환전'&&<Text style={{textAlign:'center', fontSize:RFPercentage(2), color:'grey'}}>{form_exchangedMoney}원</Text>}
        <View style={styles.myAccount}>
          <Text style={styles.accountTo} >신한 {outAcc.accountnum}   {form_balance}{outAcc.ISO}</Text>
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
