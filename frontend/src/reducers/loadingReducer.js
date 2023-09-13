import { SET_BATTLE_LOADING, SET_GUTS, SET_HP_BAR } from "../actions/loadingActions";

const initialState = {
  battleLoading: false,
  playerGuts: 0,
  enemyGuts: 0,
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BATTLE_LOADING:
      return { ...state, battleLoading: action.payload };
    case SET_GUTS:
      if (action.target === 'player') {
        return {
          ...state,
          playerGuts: action.direction === 'up' ? state.playerGuts + 1 : Math.max(0, state.playerGuts - 1)
        };
      } else if (action.target === 'enemy') {
        return {
          ...state,
          enemyGuts: action.direction === 'up' ? state.enemyGuts + 1 : Math.max(0, state.enemyGuts - 1)
        };
      }
      return state;
    default:
      return state;
  }
};

export default loadingReducer;