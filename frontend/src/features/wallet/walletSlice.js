import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from  '../../common/http-common';
import { requestPost, requestGet } from "../../common/http-common";

import {ISO} from './walletcomponents/GlobalInfo'

import flagKRW from '../../assets/flag/KRW.png';
import flagUSD from '../../assets/flag/USD.png';
import flagEUR from '../../assets/flag/EUR.png';
import flagCNY from '../../assets/flag/CNY.png';
import flagJPY from '../../assets/flag/JPY.png';
import flagAUD from '../../assets/flag/AUD.png';
import flagETH from '../../assets/flag/white_ethereum.png'

const flagImage = {
  'KRW': flagKRW,
  'USD': flagUSD,
  'EUR': flagEUR,
  'JPY': flagJPY,
  'CNY': flagCNY,
  'AUD': flagAUD,
  'SEP': flagETH 
}

export const makeAccount = createAsyncThunk('POST_MAKEACCOUJNT', async(data, {rejectWithValue})=>{
  try{
    const response = await requestPost('product',data);
  }catch(err){
    console.log(err)
    return rejectWithValue(err);
  }
})

// 환율 정보 불러오기
export const getExchangeRate = createAsyncThunk('GET_EXCHANGE_RATE', async(_,{ rejectWithValue })=>{
  try{
    const response = await requestGet('exchange/info')
    const exchangeDtoList = response.data.data.exchangeDtoList;
    const exchanges = {} 
    exchangeDtoList.map((exchange)=>{
      exchange['ISO'] = ISO[exchange.통화코드];
      exchanges[exchange.통화코드] = exchange
    })
    return exchanges
  }catch(err){
    return rejectWithValue(err.response) 
  }
});

// 처음 로그인 해서 계좌 불러오는 action

// 처음 불러온 카드 추가 로직 
export const getAccounts = createAsyncThunk('GET_ACCOUNT', async (mainAccount, { rejectWithValue }) => {
  try {
    const response = await requestPost('account',{userMainAccount:mainAccount});
    const accountDtoList = response.data.data.accountDtoList;
    const accounts = [];
    const ethereum = [];
    for(let i = 0; i<accountDtoList.length; i++){
      const data = {
        accId: i,
        accountnum: accountDtoList[i].계좌번호,
        ntnCode:accountDtoList[i].통화, 
        balance: accountDtoList[i].잔액통화별,
        cardType: accountDtoList[i].상품명, // '저축예금' || '정기적금'
        image: flagImage[accountDtoList[i].통화],
        ISO: ISO[accountDtoList[i].통화]
      }
      if(data.cardType==='SEP'){
        ethereum.push(data);
      }else{
        accounts.push(data);
      }
    }
    const allAccounts = {'accounts':accounts, 'ethereum':ethereum};
    return allAccounts
  } catch (err) {
    console.log(err)
    return rejectWithValue(err.response);
  }
});

//이체 axios

// export const postExchange = createAsyncThunk('POST_EXCHANGE', async())
export const postSendMoney = createAsyncThunk('POST_SENDMONEY', async(data, { rejectWithValue }) => {
  try {
    const response = await requestPost('bank/transfer', data)
    return response
  } catch (err) {
    console.log('지갑Slice.postSendMoney',err.response)
    return rejectWithValue(err.response);
  }
})

export const postExchangeKRW = createAsyncThunk('POST_EXCHANGEKRW', async(data, { rejectWithValue }) => {
  try {
    const response = await requestPost('exchange/toglobal', data)
    return response
  } catch (err) {
    console.log('지갑Slice.EXCHANGEMONEY',err.response)
    return rejectWithValue(err.response);
  }
})

export const postExchangeFOR = createAsyncThunk('POST_EXCHANGEFOR', async(data, { rejectWithValue }) => {
  try {
    const response = await requestPost('exchange/fromglobal', data)
    return response
  } catch (err) {
    console.log('지갑Slice.EXCHANGEMONEY',err.response)
    return rejectWithValue(err.response);
  }
})

const initialState = {
  cards:null, // 월렛 들어갈 때 카드 컴포넌트 받아오면서 저장.
  exchangeRates: null,
  ethereum: null,
}


export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers:{
   
  },
  extraReducers: (builder)=>{
    builder.
    addCase(getExchangeRate.fulfilled, (state, {payload})=>{
      state.exchangeRates = payload;
    })
    .addCase(getAccounts.fulfilled, (state,{payload}) => {
      state.ethereum = payload.ethereum;
      state.cards = payload.accounts;
    })
  }
})


export const { minusMoney, exchangeMoney } = walletSlice.actions
export default walletSlice.reducer
