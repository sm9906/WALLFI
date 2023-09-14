import { SET_BATTLE_LOADING, SET_GUTS, SET_HP_BAR, RESET_LOADING } from "../actions/loadingActions";

const initialState = {
  battleLoading: false,
  guts: {
    playerGuts: 0,
    enemyGuts: 0,
  },
  hp: {
    playerHp: 1000,
    enemyHp: 1000
  }
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
          hp: {
            ...state.hp,
            playerHp: action.hp
          }
        };
      } else if (action.target === 'enemy') {
        return {
          ...state,
          hp: {
            ...state.hp,
            enemyHp: action.hp
          }
        };
      }
      return state;
    case RESET_LOADING:
      return {
        battleLoading: false,
        guts: {
          playerGuts: 0,
          enemyGuts: 0,
        },
        hp: {
          playerHp: 1000,
          enemyHp: 1000
        }
      }
    default:
      return state;
  }
};

export default loadingReducer;