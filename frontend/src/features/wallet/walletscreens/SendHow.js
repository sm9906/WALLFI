import React, {useEffect, useState, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import ChangeForm from "../walletcomponents/ChangeForm";
import { RFPercentage } from "react-native-responsive-fontsize";
import ConvPad, { NoConvPad, EthereumConvPad } from "../walletcomponents/virtualkeyboard/ConvKeypad";
import { ButtonStyle } from "../walletcomponents/CommonStyle";

import { postSendMoney, postExchangeKRW, postExchangeFOR } from "../walletSlice";
import axios from "../../../common/http-common";


export default function SendHow({route, navigation}){
  const dispatch = useDispatch();

  const type= route.params.type;
  const outAcc = route.params.outAcc;
  const balance = outAcc.balance; 
  // 이체 필요 부분
  const toAccount = type==='송금'?route.params.account :'';
  const toBank = type==='송금'?route.params.bank||'신한': '';
  // 환전 필요 부분
  const exchangeRate = type==='환전'?route.params.exchange:'0';
  const toNation = type==='환전'?route.params.toNation:'';
  const ISO = type==='환전'?route.params.ISO:outAcc.ISO;
  
  const form_balance = ChangeForm(balance); // 잔액을 돈 형식 정규화
  // 입력 금액 
  const [money, setMoney] = useState(0); // 입력 금액 (문자)
  const num_money=Number(money); // 입력 금액 -> 숫자
  const form_money = ChangeForm(money);

  // 원화로 계산한 외화
  const exchangedMoney = ((Number(exchangeRate)*num_money)/(ISO==='¥'?100:1)).toFixed(0) // 환전 시 매매율 * 입력 금액해서 원화 표기 
  const form_exchangedMoney = ChangeForm(exchangedMoney)

  // 잔액 확인
  const isOver = type==='송금'||toNation==='KRW'? 
      balance < num_money: balance< Number(exchangedMoney) 

  const {mainAccount, userId} = useSelector(state=>state.auth)
  // 송금하기. 
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

  // 환전 하기 - 원화 -> 외화 / 외화 -> 원화
  const sendExchange= () => {
    const data = {
      // "userId":userId,
      "금액": toNation==='KRW'?Number(money):Number(money),
      "사용자대표계좌": mainAccount,
    }
    if(toNation!=='KRW'){      
      data["도착계좌통화코드"] = toNation
      data["전신환매도환율"]= exchangeRate
      dispatch(postExchangeKRW(data))
      .then((res)=>sendExchangeMemo(res))
      .catch((err)=>{
        console.log(err);
      })
    }else{
      data["전신환매입환율"] = exchangeRate
      data["출발계좌통화코드"] = outAcc.ntnCode;
      dispatch(postExchangeFOR(data))
      .then((res)=>sendExchangeMemo(res))
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  // 환전 - 메모로 보내기
  const sendExchangeMemo = async(res) => {
    if(res.error){
      console.log('에러 발생')
    }
    const outISO = toNation==='KRW'? '원' : ISO
    const formMoney = toNation==='KRW'? form_exchangedMoney : form_money
    navigation.navigate('SendMemo', props = {type, toNation, toAccount, toBank, formMoney, outISO, outAcc})
  }

  // 이체 - 메모로 보내기. 
  const senMoneydMemo = async(res) => {
    if(res.error){
      console.log('에러 발생') // 여기 에러 발생하면 return 0으로 예외처리 
    }
    const outISO = ISO
    const formMoney = form_money
    navigation.navigate('SendMemo', props = {type, toNation, toAccount, toBank, formMoney, outISO, outAcc})
  }
  
  // 가상 키 입력받은거 처리하는 부분 
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
        setMoney(String(balance));
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
        <View>
          <Text style={{...styles.currMoney, color:isOver?'red':'black'}}>{form_money}{ISO||'원'}</Text>
          <Text style={styles.warnTxt}>{isOver&&'잔액 부족!'}</Text>
        </View>
        {type==='환전'&&<Text style={{textAlign:'center', fontSize:RFPercentage(2), color:'grey'}}>{form_exchangedMoney}원</Text>}
        <View style={styles.myAccount}>
          <Text style={styles.accountTo} >신한 {outAcc.accountnum}   {form_balance}{outAcc.ISO}</Text>
        </View>
      </View>
      {type==="송금"?<ConvPad addMoney={addMoney} />:<NoConvPad addMoney={addMoney}/>}
    </View>
  )
}

export const EthereumHow = ({route, navigation}) => {
  const {mainAccount} = useSelector(state=>state.auth)
  const dispatch = useDispatch();

  const outAcc = route.params.outAcc;
  const balance = outAcc.balance; 
  // 이체 필요 부분
  const toAccount = route.params.account;
  const toBank = route.params.bank;
  // 환전 필요 부분
  const ISO = outAcc.ISO;
  const form_balance = ChangeForm(balance); // 잔액을 돈 형식 정규화
  // 입력 금액 
  const [gas, setGas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDecimal, setIsDecimal] = useState(false);
  const [money, setMoney] = useState('0'); // 입력 금액 (문자)
  
  const num_money = Number(money); // 입력 금액 -> 숫자

  // 잔액 확인
  const isOver = balance < (num_money + gas); 
    
  useFocusEffect(()=>{
    axios.get('crypto/gas').then((res)=>{
      setGas(Number(res.data.data.ethGas))
    }
    )
  })

  const addMoney=(value)=>{
    const currMon = money;
    if(value === 'back'){
      if(currMon.slice(-1)==='.'){
        setIsDecimal(false);
      }
      setMoney(currMon.length===1?'0':currMon.slice(0,-1));

    }else if(value === 'clear'){
      setMoney('0');
    }else if(value === '.'){
      if(!isDecimal){
        setIsDecimal(true);
        setMoney(prev=>(prev==='0'&&value!=='.')?value:prev+value);
      }
    }else{
      setMoney((prev)=>prev==='0'?value:prev+value)
    } 
  }

  const sendEthereum = async() => {
    await setIsLoading(true)
    const data = {
      // '이체금액': num_money+gas,
      '이체금액':0.000001,
      '입금계좌번호' : '123', // 일단 확인용으로 고정..
      '입금계좌통장메모': '보냅니다',
      '입금은행코드': toBank,
      '출금계좌번호': mainAccount,   
      '출금계좌통장메모':'',
      '통화코드': 'SEP'
    }
    const response = await dispatch(postSendMoney(data));
    if(!response.error){
      setIsLoading(false)
      navigation.navigate('SendMemo', props = {type:'송금', toNation:'', toAccount, toBank, formMoney:money, outISO:ISO, outAcc:mainAccount})
    }
  }

  return(
    <View style={styles.background}>
      <View style={styles.textContainer}>
        <View>
          <Text style={{...styles.accountTo,marginBottom:'5%' }}>{toBank} {toAccount}</Text>
          <Text style={styles.infoText}>얼마를 보낼까요?</Text>
        </View>
        <View>
          <Text style={{...styles.currMoney, color:isOver?'#FF6666':'black'}}>{money}{ISO}</Text>
          <Text style={styles.warnTxt}>{isOver&&'잔액 부족!'}</Text>
          <Text style={{...styles.accountTo, textAlign:'center', marginTop:'5%'}}>{gas}ETH의 가스비(수수료)가 발생합니다</Text>
        </View>
        <View style={styles.myAccount}>
          <Text style={styles.accountTo} >신한 {mainAccount}   {form_balance}{ISO}</Text>
        </View>
        <EthereumConvPad addMoney={addMoney}/>
        <TouchableOpacity disabled={isLoading} style={{...ButtonStyle.button, height:'8%', backgroundColor:isLoading?'grey':'#293694'}} onPress={()=>!isOver&&sendEthereum()} >
          <Text style={ButtonStyle.btnFont}>확인</Text> 
        </TouchableOpacity>
      </View>      
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
  },
  warnTxt:{
    color:'#FF6666',
    textAlign:'center',
  },

})
