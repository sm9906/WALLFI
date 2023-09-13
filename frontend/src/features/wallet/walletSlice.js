import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from  '../../common/http-common';


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
// 환율 정보 불러오기
export const getExchangeRate = createAsyncThunk('GET_EXCHANGE_RATE', async(_,{ rejectWithValue })=>{
  try{
    const response = await axios.get('exchange/info')
    const exchangeDtoList = response.data.data.exchangeDtoList;
    return exchangeDtoList 
  }catch(err){
    return rejectWithValue(err.response) 
  }
});

export const signup = createAsyncThunk('SIGNUP', async (userInfo, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/signup', userInfo);
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});


// 처음 로그인 해서 계좌 불러오는 action

// 처음 불러온 카드 추가 로직 
export const getAccount = createAsyncThunk('GET_ACCOUNT', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('account?userId=ssafy')
    const accountDtoList = response.data.data.accountDtoList;
      const accounts = accountDtoList.map((account, index)=>{
        const data = {
          accId: index,
          accountnum: account.계좌번호,
          ntnCode:account.통화, 
          balance: account.잔액통화별,
          cardType: account.상품명,
          image: flagImage[account.통화],
        }
        return data
      })
    return accounts
  } catch (err) {
    console.log(err)
    return rejectWithValue(err.response);
  }
});


const initialState = {
  cards:null, // 월렛 들어갈 때 카드 컴포넌트 받아오면서 저장.
  exchangeRates: null,
}


export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers:{
    minusMoney(state, action){
      console.log(action);
      const data = action.payload
      state.cards[data.accId].balance -= data.num_money
    },
    exchangeMoney(state, action){
      console.log(action.payload);
      // 내 통장, ntnCode 받아서 ntnCode에 해당하는 통장 id 찾기. 
      // 내 통장에서 금액 차감하고 ntnCode 해당 통장에는 넣어야 한다. 
      // 여기서 환율? 을 뽑아내야함. 
    },
    checkAcc(state, action){
      console.log(action.payload)
      // 해당 Id에 해당하는 통장의 내역을 보여줌. 
    }
    // 카드 추가, 돈 추가, 빼는 로직 
  },
  extraReducers: (builder)=>{
    builder.
    addCase(getExchangeRate.fulfilled, (state, {payload})=>{
      state.exchangeRates = payload;
    })
    .addCase(getAccount.fulfilled, (state,{payload}) => {
      state.cards = payload
    })
  }
})


export const { minusMoney } = walletSlice.actions
export default walletSlice.reducer