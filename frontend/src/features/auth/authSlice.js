import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../common/http-common";
import { retrieveData, storageData } from "../../common/api/JWT-common";

// 로그인 버튼 누르면, 로그인 처리,
export const postLogIn = createAsyncThunk('POST_LOGIN', async(data, { rejectWithValue })=>{
  try{
    const response = await axios.post('user/login',data);
    storageData(response.headers['access-token']);
    return response.data.data;
  }catch(err){
    console.log('회원관리/authSlice.postLogIn',err.response.data)
  }
})

export const postSignUp = createAsyncThunk('POST_SIGNUP', async(data, {rejectWithValue})=>{
  try{
    const response = await axios.post('user/signup',data)
    return response.data.data
  }catch(err){
    console.error('회원가입/autSlice.POST_SIGNUP', err.response.data)
    return rejectWithValue(err.response.data);
  }
})


const initialState = {
  userId:'',
  mainAccount:"",
  // userId:'ssafy',
  // mainAccount:"110001785538",
  isLoading: false
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
    .addCase(postSignUp.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(postSignUp.fulfilled, (state) => {
      state.isLoading = false;
    })
  }
})


export const {} = authSlice.actions
export default authSlice.reducer