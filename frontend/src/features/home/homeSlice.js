import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// 메인 캐릭터 불러오기
export const getMainCharacter = createAsyncThunk('GET_MAIN_CHARACTER', async(_, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://j9d101a.p.ssafy.io:8094/character/getmain', {
      userId: 'ssafy',

      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    const characterDto = res.data.data.characterDto;
    const data = {
      characterIdx: characterDto.characterIdx,
      characterType: characterDto.characterType,
      color: characterDto.color,
      level: characterDto.level,
      exp: characterDto.exp,
      hp: characterDto.hp,
      atk: characterDto.atk,
      def: characterDto.def,
      main: characterDto.main
    };

    console.log('확인', data);

    return data;

  } catch (e) {
    return rejectWithValue(e.res);
  }
});

// 처음 게임에 들어와서 캐릭터를 만들어주는 action

const initialState = {
  mainCharacter: null,
}


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder.addCase(getMainCharacter.fulfilled, (state, action) => {
      console.log('확인2', action.payload);
      state.mainCharacter = action.payload;
    })
  }
})

export const {  } = homeSlice.actions
export default homeSlice.reducer