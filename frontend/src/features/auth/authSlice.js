import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CardInfo } from "../wallet/walletcomponents/walletcards/CardInfo";
import axios from "../../common/http-common";

// 로그인 버튼 누르면, 로그인 처리,
export const postLogIn = createAsyncThunk('LOGIN', async(data, { rejectWithValue })=>{
  try{
    console.log(data)
    const response = await axios.post('user/login',data)
    return response.data.data;
  }catch(err){
    return rejectWithValue(err.response.data)
  }
})


const initialState = {
  userId:'',
  mainAccount:'',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
  },
  extraReducers: (builder)=>{
    builder
    .addCase(postLogIn.fulfilled, (state, payload) => {
      console.log(payload)
      state.userId=payload.payload.userId;
      state.mainAccount = payload.payload.userMainAccount
    })
  }
})


export const {} = authSlice.actions
export default authSlice.reducer