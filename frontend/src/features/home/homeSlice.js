import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../common/http-common';


// 사용자 게임 정보 불러오기
export const getGameInfo = createAsyncThunk('GET_GAME_INFO', async(userId, { rejectWithValue }) => {
  try {
    const res = await axios.post('game/getinfo', {
      userId: userId,
    })
    return res.data.data;
  } catch(e) {
    return rejectWithValue(e.res);
  }
})

// 메인 캐릭터 불러오기
export const getMainCharacter = createAsyncThunk('GET_MAIN_CHARACTER', async(userId, { rejectWithValue }) => {
  try {
    const res = await axios.post('character/getmain', {
      userId: userId,
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
    const res = await axios.post('character/getcharacters', {
      userId: userId,
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

// 캐릭터 수정하기 / 메인 수정 / 스탯 수정 
export const updateCharacter = createAsyncThunk('UPDATE_CHARACTER', async(data, { rejectWithValue }) => {
  try {
    console.log('홈슬라이스/updateCharacter 데이터 전달 확인 ', data)
    await axios.put('character/change/status', data)
    // .then(res=>console.log('해쒕', res));
    return data;
  } catch (e) {
    console.log('홈슬라이스/updatecharacter 실패',e);
    return rejectWithValue(e.res);
  }
})

// 사용자 포인트 수정
export const updatePoint = createAsyncThunk('UPDATE_POINT', async(data, { rejectWithValue }) => {
  try {
    console.log('홈슬라이스/updatePoint 데이터 전달 확인', data)
    await axios.put('game/pointup', data).then(res => console.log('포인트', res));
    return data;
  } catch (e) {
    console.log('홈슬라이스/updatepoint 실패', e);
    return rejectWithValue(e.res);
  }
})

// 캐릭터 뽑기
export const getRandomCharacter = createAsyncThunk('GET_RANDOM_CHARACTER', async(userId, { rejectWithValue }) => {
  try {
    console.log('홈슬라이스/getRandomCharacter 데이터 전달 확인 ', userId)
    const res = await axios.post('character/shop', {
      userId: userId
    })

    const characterDto = res.data.data.characterDto;
    console.log('성공', characterDto)
    const character = {
      characterIdx: characterDto.characterIdx,
      characterType: characterDto.characterType,
      color: characterDto.color,
      level: characterDto.level,
      exp: characterDto.exp,
      hp: characterDto.hp,
      atk: characterDto.atk,
      def: characterDto.def,
      main: characterDto.main
    }

    return character;

  } catch (e) {
    console.log('홈슬라이스/getRandomCharacter 실패', e)
    return rejectWithValue(e.res);
  }
})


const initialState = {
  exchangeInfo: null,
  mainCharacter: null,
  characters: null,
  userGameInfo: null,
  randomCharacter: null,
}


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder
    .addCase(getMainCharacter.fulfilled, (state, action) => {
      console.log(action.payload);
      state.mainCharacter = action.payload;
    })
    .addCase(getCharacterList.fulfilled, (state, action) => {
      state.characters = action.payload;
    })
    .addCase(getGameInfo.fulfilled, (state, action) => {
      state.userGameInfo = action.payload;
    })
    .addCase(getRandomCharacter.fulfilled, (state, action) => {
      state.randomCharacter = action.payload;
    })
    .addCase(updateCharacter.fulfilled, (state, action)=>{
      console.log('캐릭터 변경 성공', action.payload)
    })
    .addCase(updatePoint.fulfilled, (state, action) => {
      console.log('포인트 변경 성공!', action.payload)
    })
  }
})

export const {  } = homeSlice.actions
export default homeSlice.reducer