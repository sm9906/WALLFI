import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:'',
  cards:[], // 월렛 들어갈 때 카드 컴포넌트 받아오면서 저장.
}

// 처음 로그인 해서 계좌 불러오는 action

// 카드 추가 로직 

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers:{
    // 돈 추가, 빼는 로직 
  }
})


export const {} = walletSlice.actions
export default walletSlice.reducer