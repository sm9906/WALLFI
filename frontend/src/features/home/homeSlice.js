import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../common/http-common';


// 사용자 게임 정보 불러오기
export const getGameInfo = createAsyncThunk('GET_GAME_INFO', async (userId, { rejectWithValue }) => {
  try {
    const res = await axios.post('game/getinfo', {
      userId: userId,
    })
    return res.data.data;
  } catch (e) {
    return rejectWithValue(e.res);
  }
})

// 메인 캐릭터 불러오기
export const getMainCharacter = createAsyncThunk('GET_MAIN_CHARACTER', async (userId, { rejectWithValue }) => {
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
export const getCharacterList = createAsyncThunk('GET_CHARACTER_LIST', async (userId, { rejectWithValue }) => {
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
export const updateCharacter = createAsyncThunk('UPDATE_CHARACTER', async (data, { rejectWithValue }) => {
  try {
    console.log('홈슬라이스/updateCharacter 데이터 전달 확인 ', data)
    await axios.put('character/change/status', data)
    // .then(res=>console.log('해쒕', res));
    return data;
  } catch (e) {
    console.log('홈슬라이스/updatecharacter 실패', e);
    return rejectWithValue(e.res);
  }
})

// 사용자 포인트 수정
export const updatePoint = createAsyncThunk('UPDATE_POINT', async (data, { rejectWithValue }) => {
  try {
    console.log('홈슬라이스/updatePoint 데이터 전달 확인', data)
    await axios.post('game/pointup', data)
    return data;
  } catch (e) {
    console.log('홈슬라이스/updatepoint 실패', e);
    return rejectWithValue(e.res);
  }
})

// 캐릭터 색 수정
export const changeColor = createAsyncThunk('CHANGE_COLOR', async (data, { rejectWithValue }) => {
  try {
    console.log('홈슬라이스/changeColor 데이터 전달 확인', data);
    const res = await axios.put('character/change/color', data);
    const color = res.data.data.characterDto;
    const changeCharacterColor = {
      characterIdx: color.characterIdx,
      characterType: color.characterType,
      color: color.color,
      level: color.level,
      exp: color.exp,
      hp: color.hp,
      atk: color.atk,
      def: color.def,
      main: color.main
    }

    return changeCharacterColor;

  } catch (e) {
    console.log('홈슬라이스/changeColor 실패', e.res);
    return rejectWithValue(e.res);
  }
})

// 캐릭터 1개 뽑기
export const getRandomCharacter = createAsyncThunk('GET_RANDOM_CHARACTER', async (userId, { rejectWithValue }) => {
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

// 캐릭터 10개 뽑기
export const getRandomTenCharacter = createAsyncThunk('GET_RANDOM_TEN_CHARACTER', async (userId, { rejectWithValue }) => {
  try {
    console.log('홈슬라이스/getRandomTenCharacter 데이터 전달 확인 ', userId)
    const res = await axios.post('character/shopten/', {
      userId: userId
    })

    const characterDtoList = res.data.data.characterDtoList;
    console.log('성공', characterDtoList)
    const characters = characterDtoList.map((a) => {
      const character = {
        characterIdx: a.characterIdx,
        characterType: a.characterType,
        color: a.color,
        level: a.level,
        exp: a.exp,
        hp: a.hp,
        atk: a.atk,
        def: a.def,
        main: a.main
      }

      return character;
    })

    return characters;

  } catch (e) {
    console.log('홈슬라이스/getRandomTenCharacter 실패', e)
    return rejectWithValue(e.res);
  }
})

// 캐릭터들 치장 데이터 뽑아오기
export const getAnimalDeco = createAsyncThunk('GET_ANIMAL_DECO', async (userId, { rejectWithValue }) => {
  try {
    const res = await axios.get('deco/', {
      userId: userId
    })
    const animalDeco = res.data;
    return animalDeco;

  } catch (e) {
    console.log('치장/animalDeco 실패', e)
    // return rejectWithValue(e.res);
    return {
      data: {
        user: "ssafy",
        animal: {
          "SHIBA": {
            "crown_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ruby_necklace": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ssafy_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
          },
          "LION": {
            "crown_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ruby_necklace": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ssafy_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
          },
          "QUOKKA": {
            "crown_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ruby_necklace": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ssafy_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
          },
          "TIGER": {
            "crown_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ruby_necklace": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ssafy_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
          },
          "PANDA": {
            "crown_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ruby_necklace": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ssafy_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
          },
          "EAGLE": {
            "crown_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ruby_necklace": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
            "ssafy_cap": {
              y: 11,
              x: 12,
              rotation: 90,
              size: 1.2,
              reverse: true
            },
          },
        }
      }
    }
  }
})


const initialState = {
  exchangeInfo: null,
  mainCharacter: null,
  characters: null,
  userGameInfo: null,
  pressedAnimal: null,
  animalDeco: null,
  pressedAccessory: null,
}


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPressedAnimal: (state, action) => {
      state.pressedAnimal = action.payload;
    },
    setPressedAccessory: (state, action) => {
      state.pressedAccessory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMainCharacter.fulfilled, (state, action) => {
        state.mainCharacter = action.payload;
      })
      .addCase(getCharacterList.fulfilled, (state, action) => {
        state.characters = action.payload;
      })
      .addCase(getGameInfo.fulfilled, (state, action) => {
        state.userGameInfo = action.payload;
      })
      .addCase(getRandomCharacter.fulfilled, (state, action) => {
        console.log('캐릭터 랜덤 뽑기 성공!', action.payload)
      })
      .addCase(getRandomTenCharacter.fulfilled, (state, action) => {
        console.log('캐릭터 10개 뽑기 성공!', action.payload)
      })
      .addCase(updateCharacter.fulfilled, (state, action) => {
        console.log('캐릭터 변경 성공!', action.payload)
      })
      .addCase(updatePoint.fulfilled, (state, action) => {
        console.log('포인트 변경 성공!', action.payload)
      })
      .addCase(changeColor.fulfilled, (state, action) => {
        console.log('캐릭터 색 변경 성공!', action.payload);
      })
      .addCase(getAnimalDeco.fulfilled, (state, action) => {
        state.animalDeco = action.payload;
      })
  }
})

export const { setPressedAnimal, setPressedAccessory } = homeSlice.actions;
export default homeSlice.reducer