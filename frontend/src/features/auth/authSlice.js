import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CardInfo } from "../wallet/walletcomponents/walletcards/CardInfo";
import axios from "axios";

// 로그인 버튼 누르면, 로그인 처리,
// 환율 받아오기, 계좌 받아오기 
export const rcvExchangeRate = createAsyncThunk('RCV_EXCHANGE_RATE', async()=>{
  try{
    const response = await axios.get('http://192.168.100.210:8088/exchange/info',{
      headers:{
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
  }catch(err){
    console.log('authSlice.rcvExchangeRate',err);
  }
});


// 처음 로그인 해서 계좌 불러오는 action

// 처음 불러온 카드 추가 로직 
export const rcvAccount = createAsyncThunk('', async (userInfo, { rejectWithValue }) => {
  try {
    const response = await axios.post('', userInfo);
    // console.log(response.data);
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const initialState = {
  name:'',
  cards:[], // 월렛 들어갈 때 카드 컴포넌트 받아오면서 저장.
  exchangeRate:[],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    
    // 카드 추가, 돈 추가, 빼는 로직 
  },
  extraReducers:(builder)=>{
    builder.addCase(rcvExchangeRate.fulfilled, (state, {payload})=>{
      console.log(payload)
      // state.exchangeRate = payload
    })
  }
})


export const {} = authSlice.actions
export default authSlice.reducer