import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  name:'',
  cards:[], // 월렛 들어갈 때 카드 컴포넌트 받아오면서 저장.
}

// 환율 정보 불러오기
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


export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers:{

    
    // 카드 추가, 돈 추가, 빼는 로직 
  },
  // extraReducers: {
  // }
})


export const {} = walletSlice.actions
export default walletSlice.reducer