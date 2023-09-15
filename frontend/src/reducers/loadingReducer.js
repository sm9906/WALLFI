import { SET_BATTLE_LOADING, SET_GUTS, SET_HP_BAR, SET_MAX_HP_BAR, SET_BANK_IDX, RESET_LOADING } from "../actions/loadingActions";

const initialState = {
  battleLoading: false,
  guts: {
    playerGuts: 0,
    enemyGuts: 0,
  },
  playerHp: {
    playerMaxHp: 50,
    playerNowHp: 50
  },
  enemyHp: {
    enemyMaxHp: 50,
    enemyNowHp: 50
  },
  bankIdx: ""
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BATTLE_LOADING:
      return { ...state, battleLoading: action.payload };
    case SET_GUTS:
      if (action.target === 'player') {
        return {
          ...state,
          guts: {
            ...state.guts,
            playerGuts: action.guts
          }
        };
      } else if (action.target === 'enemy') {
        return {
          ...state,
          guts: {
            ...state.guts,
            enemyGuts: action.guts
          }
        };
      }
      return state;
    case SET_HP_BAR:
      if (action.target === 'player') {
        return {
          ...state,
          playerHp: {
            ...state.playerHp,
            playerNowHp: action.hp
          }
        };
      } else if (action.target === 'enemy') {
        return {
          ...state,
          enemyHp: {
            ...state.enemyHp,
            enemyNowHp: action.hp
          }
        };
      }
      return state;
    case SET_MAX_HP_BAR:
      if (action.target === 'player') {
        return {
          ...state,
          playerHp: {
            ...state.hp,
            playerNowHp: action.hp,
            playerMaxHp: action.hp,
          },
        };
      } else if (action.target === 'enemy') {
        return {
          ...state,
          enemyHp: {
            ...state.hp,
            enemyNowHp: action.hp,
            enemyMaxHp: action.hp,
          }
        };
      }
      return state;
    case SET_BANK_IDX:
      return {
        ...state,
        bankIdx: action.payload
      };
    case RESET_LOADING:
      return {
        battleLoading: false,
        guts: {
          playerGuts: 0,
          enemyGuts: 0,
        },
        playerHp: {
          playerMaxHp: 50,
          playerNowHp: 50
        },
        enemyHp: {
          enemyMaxHp: 50,
          enemyNowHp: 50
        },
        bank: ""
      }
    default:
      return state;
  }
};

export default loadingReducer;