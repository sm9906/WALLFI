import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestGet, requestPost, requestPut } from '../../common/http-common';

// 사용자 게임 정보 불러오기
export const getGameInfo = createAsyncThunk('GET_GAME_INFO', async (_, { rejectWithValue }) => {
  try {
    const res = await requestPost('game/getinfo')
    return res.data.data;

  } catch (e) {
    console.error('홈슬라이스/getGameInfo 실패', e);
    return rejectWithValue(e.res);
  }
})

// 메인 캐릭터 불러오기
export const getMainCharacter = createAsyncThunk('GET_MAIN_CHARACTER', async (_, { rejectWithValue }) => {
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
export const getCharacterList = createAsyncThunk('GET_CHARACTER_LIST', async (_, { rejectWithValue }) => {
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
export const getRandomCharacter = createAsyncThunk('GET_RANDOM_CHARACTER', async (_, { rejectWithValue }) => {
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
export const getRandomTenCharacter = createAsyncThunk('GET_RANDOM_TEN_CHARACTER', async (_, { rejectWithValue }) => {
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
export const getItemList = createAsyncThunk('GET_ITEM_LIST', async(_, { rejectWithValue }) => {
  try {
    const response = await requestGet('deco/itemList')
    const itemList = response.data.data;
    const items = itemList.map((i) => {
      const item = {
        itemIdx: i.itemIdx,
        itemName: i.itemName
      }

      return item;
    })

    return items;

  } catch (e) {
    console.error('홈슬라이스/getItemList 실패', e);
    return rejectWithValue(e.res);
  }
})

//  계정 악세 정보 받아오기
export const getAccessoryList = createAsyncThunk('GET_ACCESSORY_LIST', async (_, { rejectWithValue }) => {
  try {
    const res = await requestGet('deco/itemList')
    const accessoryList = res.data.data
    return accessoryList;

  } catch (e) {
    console.log('치장/accessoryList 실패', e)
    return rejectWithValue(e.res);
  }
});

// 캐릭터들 치장 데이터 받아오기
export const getAnimalDeco = createAsyncThunk('GET_ANIMAL_DECO', async (_, { rejectWithValue }) => {
  try {
    const res = await requestGet('deco')
    const animalDeco = res.data.data
    return animalDeco;

  } catch (e) {
    console.log('치장/animalDeco 실패', e)
    return rejectWithValue(e.res);
  }
});

// 악세서리 데이터 서버에 전송하기
export const sendAnimalDeco = createAsyncThunk('SEND_ANIMAL_DECO', async (data, { rejectWithValue }) => {
  try {
    const res = await requestPost('deco/update', data);
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
    await requestPost('buy', data);
    return data;

  } catch (e) {
    console.error('홈슬라이스/getBuy 실패', e);
    return rejectWithValue(e.res);
  }
})

// 거래소에서 상품 판매하기
export const sellItem = createAsyncThunk('SELL_ITEM', async(data, { rejectWithValue }) => {
  try {
    await requestPost('sell', data).then(res => console.log(res));
    return data;
  } catch (e) {
    console.error('홈슬라이스/sellItem 실패', e);
    return rejectWithValue(e.res);
  }
})

const initialState = {
  exchangeInfo: null,
  mainCharacter: null,
  characters: null,
  items: null,
  userGameInfo: null,
  purchaseCharacters: null,
  purchaseItems: null,
  animalDeco: null,
  pressedAnimal: null,
  pressedAccessory: null,
  music: null,
  now : null,
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
      const newDeco = action.payload;
      const characterIdx = newDeco.characterIdx;

      const existingDecoIndex = state.animalDeco.findIndex(
        (deco) => deco.characterIdx === characterIdx
      );

      if (existingDecoIndex !== -1) {
        state.animalDeco[existingDecoIndex] = newDeco;
      } else {
        state.animalDeco.push(newDeco);
      }
    },
    ChangeMusic : (state, action) => {
      state.now = action.payload;
      if(!action.payload && state.music){
        state.music.unloadAsync()
        state.music = null;
      }
    },
    DJ: (state, action) => {
      // 실행시킬 BGM 넣기
      if (state.music) {
        state.music.unloadAsync();
        state.music = null;
      }
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
        const newArray = state.characters.filter(obj => obj.characterType !== 'MOLLY');
        state.characters = newArray;
      })
      .addCase(getGameInfo.fulfilled, (state, action) => {
        state.userGameInfo = action.payload;
      })
      .addCase(getItemList.fulfilled, (state, action) => {
        state.items = action.payload;
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
        state.animalDeco = action.payload
      })
      .addCase(getBuy.fulfilled, (state, action) => {
        const idx = action.payload.goodsIdx;
        const newArray1 = state.purchaseCharacters.filter(obj => obj.goodsIdx !== idx);
        const newArray2 = state.purchaseItems.filter(obj => obj.goodsIdx !== idx);
        state.purchaseCharacters = newArray1;
        state.purchaseItems = newArray2;
      })
      .addCase(sellItem.fulfilled, (state, action) => {
        if (action.payload.goodsType === 'c') {
          const idx = action.payload.characterIdx;
          const newArray = state.characters.filter(obj => obj.characterIdx !== idx);
          state.characters = newArray;
        } else {
          const idx = action.payload.itemIdx;
          const newArray = state.items.filter(obj => obj.itemIdx !== idx);
          state.items = newArray;
        }
      })
  }
})

export const { setPressedAnimal, setPressedAccessory, setAnimalDeco, DJ, PlayMusic, StopMusic, DeleteMusic, ChangeMusic } = homeSlice.actions;

export default homeSlice.reducer