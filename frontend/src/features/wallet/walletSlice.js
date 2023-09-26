import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from  '../../common/http-common';
import {ISO} from './walletcomponents/GlobalInfo'

import flagKRW from '../../assets/flag/KRW.png';
import flagUSD from '../../assets/flag/USD.png';
import flagEUR from '../../assets/flag/EUR.png';
import flagCNY from '../../assets/flag/CNY.png';
import flagJPY from '../../assets/flag/JPY.png';
import flagAUD from '../../assets/flag/AUD.png';

const flagImage = {
  'KRW': flagKRW,
  'USD': flagUSD,
  'EUR': flagEUR,
  'JPY': flagJPY,
  'CNY': flagCNY,
  'AUD': flagAUD 
}

export const makeAccount = createAsyncThunk('POST_MAKEACCOUJNT', async(data, {rejectWithValue})=>{
  try{
    const response = await axios.post('product',data);
  }catch(err){
    console.log(err)
    return rejectWithValue(err);
  }
})

// 환율 정보 불러오기
export const getExchangeRate = createAsyncThunk('GET_EXCHANGE_RATE', async(_,{ rejectWithValue })=>{
  try{
    const response = await axios.get('exchange/info')
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
export const getAccounts = createAsyncThunk('GET_ACCOUNT', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`account?userId=${data.userId}&userMainAccount=${data.mainAccount}`,{
    })
    const accountDtoList = response.data.data.accountDtoList;
      const accounts = accountDtoList.map((account, index)=>{
        const data = {
          accId: index,
          accountnum: account.계좌번호,
          ntnCode:account.통화, 
          balance: account.잔액통화별,
          cardType: account.상품명, // '저축예금' || '정기적금'
          image: flagImage[account.통화],
          ISO: ISO[account.통화]
        }
        return data
      })
    return accounts
  } catch (err) {
    console.log(err)
    return rejectWithValue(err.response);
  }
});

//이체 axios

// export const postExchange = createAsyncThunk('POST_EXCHANGE', async())
export const postSendMoney = createAsyncThunk('POST_SENDMONEY', async(data, { rejectWithValue }) => {
  try {
    const response = await axios.post('bank/transfer', data)
    return response
  } catch (err) {
    console.log('지갑Slice.postSendMoney',err.response)
    return rejectWithValue(err.response);
  }
})

export const postExchangeKRW = createAsyncThunk('POST_EXCHANGEKRW', async(data, { rejectWithValue }) => {
  try {
    const response = await axios.post('exchange/toglobal', data)
    return response
  } catch (err) {
    console.log('지갑Slice.EXCHANGEMONEY',err.response)
    return rejectWithValue(err.response);
  }
})

export const postExchangeFOR = createAsyncThunk('POST_EXCHANGEFOR', async(data, { rejectWithValue }) => {
  try {
    const response = await axios.post('exchange/fromglobal', data)
    return response
  } catch (err) {
    console.log('지갑Slice.EXCHANGEMONEY',err.response)
    return rejectWithValue(err.response);
  }
})

const initialState = {
  cards:null, // 월렛 들어갈 때 카드 컴포넌트 받아오면서 저장.
  exchangeRates: null,
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
      state.cards = payload
    })
  }
})


export const { minusMoney, exchangeMoney } = walletSlice.actions
export default walletSlice.reducer
