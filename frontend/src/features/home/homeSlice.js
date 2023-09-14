import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// 환율정보 불러오기
export const getExchangeInfo = createAsyncThunk('GET_EXCHANGE_INFO', async(_, { rejectWithValue }) => {
  try {
    const res = await axios.get('http://j9d101a.p.ssafy.io:8094/exchange/info',{
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const exchangeData = res.data.data.exchangeDtoList;

    const exchangeDtoList = exchangeData.map((a) => {
      const exchange = {
        전일대비: a.전일대비,
        통화명: a.통화명,
        통화코드: a.통화코드
      }

      return exchange;
    })

    return exchangeDtoList;
    
  } catch (e) {
    return rejectWithValue(e.res);
  }
})

// 사용자 게임 정보 불러오기
export const getGameInfo = createAsyncThunk('GET_GAME_INFO', async(userId, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://j9d101a.p.ssafy.io:8094/game/getinfo', {
      userId: userId,

      headers: {
        'Content-Type': 'application/json',
      }
    })

    const gameUser = res.data.data;

    return gameUser;
    
  } catch(e) {
    return rejectWithValue(e.res);
  }
})

// 메인 캐릭터 불러오기
export const getMainCharacter = createAsyncThunk('GET_MAIN_CHARACTER', async(userId, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://j9d101a.p.ssafy.io:8094/character/getmain', {
      userId: userId,

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

    return data;

  } catch (e) {
    return rejectWithValue(e.res);
  }
});

// 캐릭터 리스트 불러오기
export const getCharacterList = createAsyncThunk('GET_CHARACTER_LIST', async(userId, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://j9d101a.p.ssafy.io:8094/character/getcharacters', {
      userId: userId,

      headers: {
        'Content-Type': 'application/json',
      }
    })

    const characterDtoList = res.data.data.characterDtoList;
    const characters = characterDtoList.map((character) => {
      const data = {
        characterIdx: character.characterIdx,
        characterType: character.characterType,
        color: character.color,
        level: character.level,
        exp: character.exp,
        hp: character.hp,
        atk: character.atk,
        def: character.def,
        main: character.main
      }

      return data;

    })

    return characters;

  } catch (e) {
    return rejectWithValue(e.res);
  }
})

// 캐릭터 수정하기
export const updateCharacter = createAsyncThunk('UPDATE_CHARACTER', async(data, { rejectWithValue }) => {
  try {
    await axios.put('http://j9d101a.p.ssafy.io:8094/character/change/status', 
    data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (e) {
    return rejectWithValue(e.res);
  }
})


const initialState = {
  exchangeInfo: null,
  mainCharacter: null,
  characters: null,
  userGameInfo: null,
}


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder.addCase(getMainCharacter.fulfilled, (state, action) => {
      state.mainCharacter = action.payload;
    }).addCase(getCharacterList.fulfilled, (state, action) => {
      state.characters = action.payload;
    }).addCase(getGameInfo.fulfilled, (state, action) => {
      state.userGameInfo = action.payload;
    }).addCase(getExchangeInfo.fulfilled, (state, action) => {
      state.exchangeInfo = action.payload;
    }).addCase(updateCharacter.fulfilled, (state, action) => {
      const {characterIdx, main} = action.payload;

      if (main) {
        const characterToUpdate = state.characters.find((character) => {
          if (characterToUpdate) {
            characterToUpdate.main = true;
          }
        })
      }
    })
  }
})

export const {  } = homeSlice.actions
export default homeSlice.reducer