import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestGet, requestPost, requestPut } from '../../common/http-common';

// 사용자 게임 정보 불러오기
export const getGameInfo = createAsyncThunk('GET_GAME_INFO', async(_, { rejectWithValue }) => {
  try {
    const res = await requestPost('game/getinfo')
    return res.data.data;

  } catch (e) {
    console.error('홈슬라이스/getGameInfo 실패', e);
    return rejectWithValue(e.res);
  }
})

// 메인 캐릭터 불러오기
export const getMainCharacter = createAsyncThunk('GET_MAIN_CHARACTER', async(_, { rejectWithValue }) => {
  try {
    const res = await requestPost('character/getmain');

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
    console.error('홈슬라이스/getMainCharacter 실패', e);
    return rejectWithValue(e.res);
  }
});

// 캐릭터 리스트 불러오기
export const getCharacterList = createAsyncThunk('GET_CHARACTER_LIST', async(_, { rejectWithValue }) => {
  try {
    const res = await requestPost('character/getcharacters');

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
    console.error('홈슬라이스/getCharacterList 실패', e);
    return rejectWithValue(e.res);
  }
})

// 캐릭터 수정하기 / 메인 수정 / 스탯 수정 
export const updateCharacter = createAsyncThunk('UPDATE_CHARACTER', async (data, { rejectWithValue }) => {
  try {
    await requestPut('character/change/status', data)
    return data;

  } catch (e) {
    console.error('홈슬라이스/updatecharacter 실패', e);
    return rejectWithValue(e.res);
  }
})

// 사용자 포인트 수정
export const updatePoint = createAsyncThunk('UPDATE_POINT', async (data, { rejectWithValue }) => {
  try {
    await requestPost('game/pointup', data)
    return data;

  } catch (e) {
    console.error('홈슬라이스/updatepoint 실패', e);
    return rejectWithValue(e.res);
  }
})

// 캐릭터 색 수정
export const changeColor = createAsyncThunk('CHANGE_COLOR', async (data, { rejectWithValue }) => {
  try {
    const res = await requestPut('character/change/color', data);
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
    console.error('홈슬라이스/changeColor 실패', e);
    return rejectWithValue(e.res);
  }
})

// 캐릭터 1개 뽑기
export const getRandomCharacter = createAsyncThunk('GET_RANDOM_CHARACTER', async(_, { rejectWithValue }) => {
  try {
    const res = await requestPost('character/shop');

    const characterDto = res.data.data.characterDto;
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
    console.error('홈슬라이스/getRandomCharacter 실패', e)
    return rejectWithValue(e.res);
  }
})

// 캐릭터 10개 뽑기
export const getRandomTenCharacter = createAsyncThunk('GET_RANDOM_TEN_CHARACTER', async(_, { rejectWithValue }) => {
  try {
    const res = await requestPost('character/shopten/');

    const characterDtoList = res.data.data.characterDtoList;
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
    console.error('홈슬라이스/getRandomTenCharacter 실패', e)
    return rejectWithValue(e.res);
  }
})

// 캐릭터 치장 아이템 뽑기
export const getRandomItem = createAsyncThunk('GET_RANDOM_ITEM', async(_, { rejectWithValue }) => {
  try {
    const res = await requestPost('deco/item');
    const item = res.data.data.itemName;

    return item;

  } catch (e) {
    console.error('홈슬라이스/getRandomItem 실패', e)
    return rejectWithValue(e.res);
  }
})

// 사용자가 보유하고 있는 아이템 조회

// 캐릭터들 치장 데이터 받아오기
export const getAnimalDeco = createAsyncThunk('GET_ANIMAL_DECO', async (userId, { rejectWithValue }) => {
  try {
    const res = await axios.get('deco/', {
      userId: userId
    })
    const animalDeco = res.data;
    return animalDeco;

  } catch (e) {
    console.log('치장/animalDeco 실패', e)
    // return rejectWithValue(e.res); // 데코 서버 생기면 아래거 지우고 활성화
    return {
      data: {
        animal: {
          SHIBA: {
            name: "ssafy_cap",
            y: -49.947266697883606,
            x: -47.696984589099884,
            rotation: 0,
            size: 1.2000000029802322,
          },
          LION: {
            name: "crown_cap",
            y: 44.35295867919922,
            x: 5.424107074737549,
            rotation: 360,
            size: 3,
          },
          EAGLE: {
            name: "ssafy_cap",
            y: -79.34322757516588,
            x: 29.05329304933548,
            rotation: 311,
            size: 1.800000011920929, // 1 이어도 상관없
          },
          QUOKKA: {
            name: "ruby_necklace",
            y: -6.104631543159485,
            x: 5.712890565395355,
            rotation: 0,
            size: 1.4000000059604645,
          },
          PANDA: {
            name: "crown_cap",
            y: -41.13839244842529,
            x: -72.00753259658813,
            rotation: 39,
            size: 1.2000000029802322,
          },
          TIGER: {
            name: "ruby_necklace",
            y: 15.401785850524902,
            x: 18.57003402709961,
            rotation: 151,
            size: 1.2000000029802322,
          },
        }
      }
    }
  }
});

// 악세서리 데이터 서버에 전송하기
export const sendAnimalDeco = createAsyncThunk('SEND_ANIMAL_DECO', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('실제 엔드포인트 URL', data);
    return res.data;
  } catch (e) {
    console.error('홈슬라이스/sendAnimalDeco 실패', e);
    return rejectWithValue(e.res);
  }
});

// 현재 거래중인 캐릭터 조회
export const purchaseCharacter = createAsyncThunk('PURCHASE_CHARACTER', async(_, { rejectWithValue }) => {
  try {
    const response = await requestGet('character');
    
    const characterList = response.data.data;
    const characters = characterList.map((character) => {
      const data = {
        characterIdx: character.characterIdx,
        characterType: character.characterType,
        color: character.color,
        goodsIdx: character.goodsIdx,
        goodsType: character.goodsType,
        price: character.price,
        seller: character.seller
      }

      return data;
    })

    return characters;

  } catch (e) {
    console.error('홈슬라이스/purchaseCharacter 실패', e);
    return rejectWithValue(e.res);
  }
})

// 현재 거래중인 아이템 조회
export const purchaseItem = createAsyncThunk('PURCHASE_ITEM', async(_, { rejectWithValue }) => {
  try {
    const response = await requestGet('item');
    
    const itemList = response.data.data;
    const items = itemList.map((item) => {
      const data = {
        goodsIdx: item.goodsIdx,
        goodsType: item.goodsType,
        price: item.price,
        itemIdx: item.itemIdx,
        seller: item.seller,
        itemName: item.itemName
      }

      return data;
    })

    return items;

  } catch (e) {
    console.error('홈슬라이스/purchaseItem 실패', e);
    return rejectWithValue(e.res);
  }
})

// 거래소에서 상품 구매하기
export const getBuy = createAsyncThunk('GET_BUY', async(data, { rejectWithValue }) => {
  try {
    await requestPost('buy', data).then(res => console.log('홈슬라이스들어옴', res));
    return data;

  } catch (e) {
    console.error('홈슬라이스/getBuy 실패', e);
    return rejectWithValue(e.res);
  }
})

// 거래소에서 상품 판매하기

const initialState = {
  exchangeInfo: null,
  mainCharacter: null,
  characters: null,
  userGameInfo: null,
  purchaseCharacters: null,
  purchaseItems: null,
  // animalDeco: null, // 데코 서버 생기면 아래거 지우고 활성화
  animalDeco: {
    SHIBA: {
    name: "ssafy_cap",
    y: -49.947266697883606,
    x: -47.696984589099884,
    rotation: 0,
    size: 1.2000000029802322,
  },
  LION: {
    name: "crown_cap",
    y: 44.35295867919922,
    x: 5.424107074737549,
    rotation: 360,
    size: 3,
  },
  EAGLE: {
    name: "ssafy_cap",
    y: -79.34322757516588,
    x: 29.05329304933548,
    rotation: 311,
    size: 1.800000011920929, // 1 이어도 상관없
  },
  QUOKKA: {
    name: "ruby_necklace",
    y: -6.104631543159485,
    x: 5.712890565395355,
    rotation: 0,
    size: 1.4000000059604645,
  },
  PANDA: {
    name: "crown_cap",
    y: -41.13839244842529,
    x: -72.00753259658813,
    rotation: 39,
    size: 1.2000000029802322,
  },
  TIGER: {
    name: "ruby_necklace",
    y: 15.401785850524902,
    x: 18.57003402709961,
    rotation: 151,
    size: 1.2000000029802322,
  },
  },
  pressedAnimal: null,
  pressedAccessory: null,
  music: null,
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
    setAnimalDeco: (state, action) => {
      const animalType = Object.keys(action.payload)[0];
      state.animalDeco[animalType] = action.payload[animalType];
    },
    DJ: (state, action) => {
      // 실행시킬 BGM 넣기
      state.music = action.payload
      state.music ? state.music.setIsLoopingAsync(true) : null;
    },
    PlayMusic: (state, action) => {
      // 뮤직 스타트!
      state.music ? state.music.playAsync() : null;
    },
    StopMusic: (state, action) => {
      // 종료
      state.music ? state.music.pauseAsync() : null;
    },
    DeleteMusic: (state, action) => {
      // 음악 빼내기 
      if (state.music) {
        state.music.unloadAsync()
        state.music = null;
      }
    }
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
      .addCase(updateCharacter.fulfilled, (state, action) => {
        // 메인으로 설정한 캐릭터의 Idx 가져오기
        const id = action.payload.characterIdx;

        // characterIdx가 id와 같으면 해당 캐릭터를 메인캐릭터로 상태 변경
        state.characters.map(character => {
          if (character.characterIdx == id) {
            state.mainCharacter = character;
            character.main = true;
          } else {
            character.main = false;
          }
        })
      })
      .addCase(updatePoint.fulfilled, (state, action) => {

        // 상점에서 포인트를 사용했을 때 음수값으로 포인트를 입력하기 때문에 그대로 + 해주면됨
        state.userGameInfo.point += action.payload.point;
      })
      .addCase(changeColor.fulfilled, (state, action) => {

        // 캐릭터 색 변경대상 Idx값 가져오기
        const id = action.payload.characterIdx;

        // id값과 같은 characterIdx값을 갖고있는 객체의 색 상태값 변경
        state.characters.forEach(character => {
          if (character.characterIdx == id) {
            character.color = action.payload.color;
            return;
          }
        })
      })
      .addCase(purchaseCharacter.fulfilled, (state, action) => {
        state.purchaseCharacters = action.payload;
      })
      .addCase(purchaseItem.fulfilled, (state, action) => {
        state.purchaseItems = action.payload;
      })
      .addCase(getAnimalDeco.fulfilled, (state, action) => {
        state.animalDeco = action.payload.data.animal;
      })
      .addCase(getBuy.fulfilled, (state, action) => {
      })
  }
})

export const { setPressedAnimal, setPressedAccessory, setAnimalDeco, DJ, PlayMusic, StopMusic, DeleteMusic } = homeSlice.actions;

export default homeSlice.reducer