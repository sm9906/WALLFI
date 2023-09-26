import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CardInfo } from "../wallet/walletcomponents/walletcards/CardInfo";
import axios from "../../common/http-common";

// 로그인 버튼 누르면, 로그인 처리,
export const postLogIn = createAsyncThunk('LOGIN', async(data, { rejectWithValue })=>{
  try{
    const response = await axios.post('user/login',data)
    return response.data.data;
  }catch(err){
    console.log('회원관리/authSlice.postLogIn',err.response.data)
    return rejectWithValue(err.response.data)
  }
})


const initialState = {
  // userId:'',
  // mainAccount:"",
  userId:'ssafy',
  mainAccount:"110001785538",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
  },
  extraReducers: (builder)=>{
    builder
    .addCase(postLogIn.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.mainAccount = action.payload.userMainAccount;
    })
    .addCase(postLogIn.rejected, (state, action) => {
    })
  }
})


export const {} = authSlice.actions
export default authSlice.reducer