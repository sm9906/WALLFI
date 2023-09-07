import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards:[], // 월렛 들어갈 때 카드 컴포넌트 받아오면서 저장.
}


export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers:{
  }
})


export const {} = walletSlice.actions
export default walletSlice.reducer